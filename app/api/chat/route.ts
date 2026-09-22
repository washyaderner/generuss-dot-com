import { NextResponse } from "next/server"
import { z } from "zod"
import { buildSystemPrompt, STRIKE_INTENTS, type Cta, type Intent } from "@/lib/chat/prompt"
import { guard, pickReply, extractContacts, EMAIL_RE, MAX_MESSAGE_CHARS } from "@/lib/chat/guard"
import { cleanReply } from "@/lib/chat/clean"
import { generateReply } from "@/lib/chat/llm"
import { gateCounters, logTurns, type Counters, type LeadRow, type TurnRow } from "@/lib/chat/store"
import { sendLeadEmail } from "@/lib/chat/notify"
import {
  freshState,
  hashIp,
  signState,
  transcriptHash,
  verifyState,
  type ChatMessage,
  type ChatState,
} from "@/lib/chat/token"

// POST /api/chat: the generuss.com assistant.
// Layers, cheapest first: origin and bot checks, signed session (turn cap and
// strikes), burst limiter, stored per-visitor and global limits, the
// deterministic guard, then one model call. Every turn is logged; the first
// time a visitor leaves an email or phone number, Russ gets an email.

export const runtime = "nodejs"
export const dynamic = "force-dynamic"
export const maxDuration = 30

const LIMITS = {
  sessionTurns: 30,
  sessionStrikes: 3,
  ipPerMinute: 6,
  ipPer10Min: 15,
  ipPerDay: 60,
  ipStrikesPerHour: 4,
  globalModelCallsPerDay: Number(process.env.GCHAT_DAILY_CAP || 400),
  leadEmailsPerDay: 30,
  historyForModel: 16,
  burstPer30s: 6,
}

const ALLOWED_ORIGINS = new Set([
  "https://generuss.com",
  "https://www.generuss.com",
  "https://generuss-dot-com.vercel.app",
  "http://localhost:3000",
])

const Body = z.object({
  message: z.string().min(1).max(4000),
  messages: z
    .array(z.object({ role: z.enum(["user", "assistant"]), content: z.string().max(4000) }))
    .max(80)
    .default([]),
  token: z.string().max(1500).nullish(),
  page: z.string().max(200).nullish(),
  website: z.string().max(200).nullish(), // honeypot, humans never see it
  openedMs: z.number().nullish(),
})

// Per-instance burst limiter. Catches floods even if storage is slow or down.
const burst = new Map<string, number[]>()
function burstLimited(key: string): boolean {
  const now = Date.now()
  const hits = (burst.get(key) || []).filter((t) => now - t < 30_000)
  hits.push(now)
  burst.set(key, hits)
  if (burst.size > 5000) burst.clear()
  return hits.length > LIMITS.burstPer30s
}

function originAllowed(origin: string | null): boolean {
  if (!origin) return false
  if (ALLOWED_ORIGINS.has(origin)) return true
  // Vercel preview deployments of this project (hash URLs and branch aliases).
  return /^https:\/\/generuss-dot-(com-)?[a-z0-9-]+-washyaderners-projects\.vercel\.app$/.test(origin)
}

function clientIp(req: Request): string {
  const fwd = req.headers.get("x-forwarded-for") || ""
  return fwd.split(",")[0].trim() || req.headers.get("x-real-ip") || "unknown"
}

const BOT_UA = /(curl|wget|python-requests|aiohttp|httpx|go-http-client|java\/|okhttp|libwww|scrapy|headlesschrome|phantomjs|puppeteer|playwright|bot\b|spider|crawler)/i

function seedFor(state: ChatState): number {
  let h = state.n * 31
  for (const ch of state.sid) h = (h * 33 + ch.charCodeAt(0)) | 0
  return h
}

function clip(v: string | null | undefined, n: number): string | null {
  const t = (v || "").trim()
  return t ? t.slice(0, n) : null
}

export async function POST(req: Request) {
  const origin = req.headers.get("origin")
  if (!originAllowed(origin)) return NextResponse.json({ error: "forbidden" }, { status: 403 })

  let body: z.infer<typeof Body>
  try {
    body = Body.parse(await req.json())
  } catch {
    return NextResponse.json({ error: "bad request" }, { status: 400 })
  }

  const message = body.message.trim()
  if (!message) return NextResponse.json({ error: "empty" }, { status: 400 })
  const page = (body.page || "/").slice(0, 200)
  const ua = req.headers.get("user-agent") || ""
  const ipHash = hashIp(clientIp(req))

  // Restore the signed session. History only counts if it matches the hash we
  // signed last turn; otherwise the visitor starts clean (strikes carry over).
  const prior = verifyState(body.token)
  const state: ChatState = prior ?? freshState()
  let history: ChatMessage[] = []
  if (prior && transcriptHash(body.messages) === prior.h) history = body.messages
  const previousUserMessages = history.filter((m) => m.role === "user").map((m) => m.content)
  let counters: Counters | null = null

  const respond = async (opts: {
    reply: string
    cta: Cta
    intent: Intent
    blocked?: string | null
    strike?: boolean
    model?: string | null
    tokensIn?: number
    tokensOut?: number
    latencyMs?: number
    lead?: LeadRow | null
    log?: boolean
  }) => {
    const transcript: ChatMessage[] = [
      ...history,
      { role: "user", content: message.slice(0, MAX_MESSAGE_CHARS) },
      { role: "assistant", content: opts.reply },
    ]
    const next: ChatState = {
      sid: state.sid,
      n: state.n + 1,
      strikes: state.strikes + (opts.strike ? 1 : 0),
      h: transcriptHash(transcript),
      lead: state.lead || (opts.lead && (opts.lead.email || opts.lead.phone) ? 1 : 0),
      t: Date.now(),
    }
    if (opts.log !== false) {
      const turns: TurnRow[] = [
        { session_id: state.sid, ip_hash: ipHash, role: "user", content: message, page },
        {
          session_id: state.sid,
          ip_hash: ipHash,
          role: "assistant",
          content: opts.reply,
          intent: opts.intent,
          blocked: opts.blocked ?? null,
          model: opts.model ?? null,
          tokens_in: opts.tokensIn ?? null,
          tokens_out: opts.tokensOut ?? null,
          latency_ms: opts.latencyMs ?? null,
          page,
        },
      ]
      const logged = await logTurns(turns, opts.lead ?? null)
      if (logged?.notify && opts.lead && counters && counters.leads_notified_day < LIMITS.leadEmailsPerDay) {
        await sendLeadEmail({ lead: opts.lead, transcript, page })
      }
    }
    return NextResponse.json({
      message: opts.reply,
      cta: opts.cta,
      token: signState(next),
      sessionId: state.sid,
    })
  }

  // Bots: the honeypot field, a no-UA or scripted client, or a first message
  // sent faster than a person can open the widget and type.
  const tooFast = state.n === 0 && typeof body.openedMs === "number" && body.openedMs < 600
  if (body.website || !ua || BOT_UA.test(ua) || tooFast) {
    return respond({
      reply: pickReply("spam", seedFor(state)),
      cta: "none",
      intent: "spam",
      blocked: body.website ? "honeypot" : tooFast ? "too_fast" : "bot_ua",
      strike: true,
    })
  }

  if (state.n >= LIMITS.sessionTurns) {
    return respond({ reply: pickReply("session_cap", 0), cta: "book_call", intent: "other", blocked: "session_cap", log: false })
  }
  if (state.strikes >= LIMITS.sessionStrikes) {
    return respond({ reply: pickReply("strikes_cap", 0), cta: "book_call", intent: "other", blocked: "strikes_cap", log: false })
  }
  if (burstLimited(ipHash)) {
    return respond({ reply: pickReply("rate_limited", 0), cta: "book_call", intent: "other", blocked: "burst", log: false })
  }

  counters = await gateCounters(ipHash)
  if (counters) {
    if (
      counters.ip_1m > LIMITS.ipPerMinute ||
      counters.ip_10m > LIMITS.ipPer10Min ||
      counters.ip_day > LIMITS.ipPerDay
    ) {
      return respond({ reply: pickReply("rate_limited", 0), cta: "book_call", intent: "other", blocked: "ip_limit" })
    }
    if (counters.ip_strikes_1h >= LIMITS.ipStrikesPerHour) {
      return respond({ reply: pickReply("strikes_cap", 0), cta: "book_call", intent: "other", blocked: "ip_strikes" })
    }
  }

  const verdict = guard(message, { previousUserMessages, strikes: state.strikes, seed: seedFor(state) })
  if (verdict.action === "block") {
    return respond({
      reply: verdict.reply,
      cta: verdict.cta,
      intent: verdict.intent,
      blocked: verdict.reason,
      strike: verdict.strike,
    })
  }

  if (counters && counters.global_llm_day >= LIMITS.globalModelCallsPerDay) {
    return respond({ reply: pickReply("unavailable", 0), cta: "book_call", intent: "other", blocked: "global_cap" })
  }

  const today = new Date().toLocaleDateString("en-US", {
    timeZone: "America/Los_Angeles",
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  let result
  try {
    result = await generateReply({
      system: buildSystemPrompt({ today, page }),
      history: history.slice(-LIMITS.historyForModel),
      user: message,
    })
  } catch (err) {
    console.error("[chat] model call failed:", err instanceof Error ? err.message : err)
    return respond({ reply: pickReply("unavailable", 0), cta: "book_call", intent: "other", blocked: "model_error" })
  }

  const p = result.parsed
  const reply = cleanReply(p.reply) || pickReply("unavailable", 0)

  // Lead fields count only when the visitor actually typed them.
  const userText = [...previousUserMessages, message].join("\n")
  const userDigits = userText.replace(/\D/g, "")
  const typed = extractContacts(message)
  const modelEmail = p.lead.email && userText.toLowerCase().includes(p.lead.email.toLowerCase()) ? p.lead.email : null
  const email = (typed.emails[0] || modelEmail || "").toLowerCase() || null
  const modelPhoneDigits = (p.lead.phone || "").replace(/\D/g, "")
  const phone = typed.phones[0] || (modelPhoneDigits.length >= 10 && userDigits.includes(modelPhoneDigits) ? p.lead.phone : null)
  const leadFields = {
    name: clip(p.lead.name, 120),
    email: email && new RegExp(EMAIL_RE.source).test(email) ? email : null,
    phone: clip(phone, 40),
    business: clip(p.lead.business, 200),
    need: clip(p.lead.need, 400),
    timeline: clip(p.lead.timeline, 120),
    budget: clip(p.lead.budget, 120),
  }
  // Pitches, spam, and job seekers never become leads.
  const leadEligible = !STRIKE_INTENTS.includes(p.intent) && p.intent !== "job_seeker"
  const hasLeadInfo = leadEligible && Object.values(leadFields).some(Boolean)
  const lead: LeadRow | null = hasLeadInfo
    ? { session_id: state.sid, ...leadFields, summary: clip(p.summary, 600) }
    : null

  return respond({
    reply,
    cta: p.cta,
    intent: p.intent,
    strike: STRIKE_INTENTS.includes(p.intent),
    model: result.model,
    tokensIn: result.tokensIn,
    tokensOut: result.tokensOut,
    latencyMs: result.latencyMs,
    lead,
  })
}
