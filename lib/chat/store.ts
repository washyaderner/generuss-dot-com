// Chat storage in Supabase (tables gchat_turns and gchat_leads). The site only
// calls two functions, gchat_gate and gchat_log, with the publishable key, and
// both refuse any call without GCHAT_DB_SECRET. If storage is down the chat
// keeps working on the in-memory limiter; nothing here throws to the caller.

export type Counters = {
  ip_10m: number
  ip_day: number
  ip_strikes_1h: number
  global_llm_day: number
  leads_notified_day: number
}

export type TurnRow = {
  session_id: string
  ip_hash: string
  role: "user" | "assistant"
  content: string
  intent?: string | null
  blocked?: string | null
  model?: string | null
  tokens_in?: number | null
  tokens_out?: number | null
  latency_ms?: number | null
  page?: string | null
}

export type LeadRow = {
  session_id: string
  name?: string | null
  email?: string | null
  phone?: string | null
  business?: string | null
  need?: string | null
  timeline?: string | null
  budget?: string | null
  summary?: string | null
}

async function rpc<T>(fn: string, body: Record<string, unknown>, timeoutMs = 2500): Promise<T | null> {
  const url = process.env.GCHAT_SUPABASE_URL
  const key = process.env.GCHAT_SUPABASE_KEY
  const secret = process.env.GCHAT_DB_SECRET
  if (!url || !key || !secret) return null
  const ctrl = new AbortController()
  const timer = setTimeout(() => ctrl.abort(), timeoutMs)
  try {
    const res = await fetch(`${url}/rest/v1/rpc/${fn}`, {
      method: "POST",
      headers: { apikey: key, Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({ p_secret: secret, ...body }),
      signal: ctrl.signal,
      cache: "no-store",
    })
    if (!res.ok) {
      console.error(`[chat] ${fn} failed: ${res.status}`)
      return null
    }
    return (await res.json()) as T
  } catch (err) {
    console.error(`[chat] ${fn} error:`, err instanceof Error ? err.message : err)
    return null
  } finally {
    clearTimeout(timer)
  }
}

export function gateCounters(ipHash: string): Promise<Counters | null> {
  return rpc<Counters>("gchat_gate", { p_ip_hash: ipHash })
}

export async function logTurns(turns: TurnRow[], lead?: LeadRow | null): Promise<{ notify: boolean } | null> {
  return rpc<{ notify: boolean }>("gchat_log", { p_turns: turns.slice(0, 4), p_lead: lead ?? null })
}
