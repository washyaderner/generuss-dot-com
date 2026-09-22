import crypto from "crypto"

// Stateless, tamper-proof chat session. The server signs a small state blob
// (session id, turn count, strikes, a hash of the transcript so far) and the
// widget sends it back with the history. A forged or edited history fails the
// hash check and gets dropped, so a visitor cannot put words in the
// assistant's mouth or reset their own strike count.

export type ChatMessage = { role: "user" | "assistant"; content: string }

export type ChatState = {
  sid: string
  n: number // user turns so far
  strikes: number
  h: string // transcript hash
  lead: 0 | 1 // a contact point was captured this session
  t: number // issued at, ms
}

const MAX_AGE_MS = 24 * 60 * 60 * 1000

function secret(): string {
  const s = process.env.GCHAT_HMAC_SECRET
  if (!s || s.length < 32) throw new Error("GCHAT_HMAC_SECRET is missing")
  return s
}

function mac(body: string): string {
  return crypto.createHmac("sha256", secret()).update(body).digest("base64url")
}

export function newSessionId(): string {
  return `s_${Date.now().toString(36)}_${crypto.randomBytes(6).toString("hex")}`
}

export function freshState(): ChatState {
  return { sid: newSessionId(), n: 0, strikes: 0, h: transcriptHash([]), lead: 0, t: Date.now() }
}

export function signState(state: ChatState): string {
  const body = Buffer.from(JSON.stringify(state)).toString("base64url")
  return `${body}.${mac(body)}`
}

export function verifyState(token: unknown): ChatState | null {
  if (typeof token !== "string" || token.length > 1500) return null
  const [body, sig] = token.split(".")
  if (!body || !sig) return null
  const expected = Buffer.from(mac(body))
  const given = Buffer.from(sig)
  if (expected.length !== given.length || !crypto.timingSafeEqual(expected, given)) return null
  try {
    const s = JSON.parse(Buffer.from(body, "base64url").toString("utf8"))
    if (
      typeof s.sid !== "string" ||
      typeof s.n !== "number" ||
      typeof s.strikes !== "number" ||
      typeof s.h !== "string" ||
      typeof s.t !== "number"
    ) {
      return null
    }
    if (Date.now() - s.t > MAX_AGE_MS) return null
    return { sid: s.sid, n: s.n, strikes: s.strikes, h: s.h, lead: s.lead ? 1 : 0, t: s.t }
  } catch {
    return null
  }
}

export function transcriptHash(messages: ChatMessage[]): string {
  return crypto
    .createHash("sha256")
    .update(JSON.stringify(messages.map((m) => [m.role, m.content])))
    .digest("base64url")
}

// Per-visitor key for rate limits. Keyed with the server secret so the stored
// value cannot be reversed into an IP address.
export function hashIp(ip: string): string {
  return crypto.createHmac("sha256", secret()).update(`ip:${ip}`).digest("hex").slice(0, 32)
}
