import { REPLY_SCHEMA, INTENTS, CTAS, type Cta, type Intent } from "./prompt"
import type { ChatMessage } from "./token"

// One model call per visitor turn: OpenAI Chat Completions with a strict JSON
// schema, so the reply, intent, CTA, and lead fields always parse. The model is
// set by GCHAT_MODEL. If the call fails, the route answers with a canned
// message and the booking link; it never switches to a different model.

export type ModelReply = {
  reply: string
  intent: Intent
  cta: Cta
  lead: {
    name: string | null
    email: string | null
    phone: string | null
    business: string | null
    need: string | null
    timeline: string | null
    budget: string | null
  }
  summary: string
}

export type ModelResult = {
  parsed: ModelReply
  model: string
  tokensIn: number
  tokensOut: number
  latencyMs: number
}

export const DEFAULT_MODEL = "gpt-5.6-terra"

export async function generateReply(args: {
  system: string
  history: ChatMessage[]
  user: string
  model?: string
  timeoutMs?: number
}): Promise<ModelResult> {
  const key = process.env.OPENAI_API_KEY
  if (!key) throw new Error("OPENAI_API_KEY is missing")
  const model = args.model || process.env.GCHAT_MODEL || DEFAULT_MODEL
  const effort = process.env.GCHAT_REASONING || "low"

  const body: Record<string, unknown> = {
    model,
    messages: [
      { role: "system", content: args.system },
      ...args.history.map((m) => ({ role: m.role, content: m.content })),
      { role: "user", content: args.user },
    ],
    response_format: { type: "json_schema", json_schema: REPLY_SCHEMA },
    max_completion_tokens: 1600,
    prompt_cache_key: "generuss-chat-v1",
  }
  // Reasoning models take an effort level; chat-tuned models reject it.
  if (!/chat-latest|^gpt-4/.test(model) && effort !== "off") body.reasoning_effort = effort

  const ctrl = new AbortController()
  const timer = setTimeout(() => ctrl.abort(), args.timeoutMs ?? 25000)
  const started = Date.now()
  try {
    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify(body),
      signal: ctrl.signal,
    })
    const data = await res.json()
    if (!res.ok) throw new Error(`OpenAI ${res.status}: ${JSON.stringify(data?.error?.message ?? data).slice(0, 300)}`)
    const choice = data.choices?.[0]
    if (choice?.message?.refusal) throw new Error("model refused")
    const content: string | undefined = choice?.message?.content
    if (!content) throw new Error(`empty reply (finish_reason ${choice?.finish_reason})`)
    const parsed = JSON.parse(content) as ModelReply
    if (typeof parsed.reply !== "string" || !parsed.reply.trim()) throw new Error("reply missing")
    if (!INTENTS.includes(parsed.intent)) parsed.intent = "other"
    if (!CTAS.includes(parsed.cta)) parsed.cta = "none"
    return {
      parsed,
      model: data.model || model,
      tokensIn: data.usage?.prompt_tokens ?? 0,
      tokensOut: data.usage?.completion_tokens ?? 0,
      latencyMs: Date.now() - started,
    }
  } finally {
    clearTimeout(timer)
  }
}
