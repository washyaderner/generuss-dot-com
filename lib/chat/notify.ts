import type { ChatMessage } from "./token"
import type { LeadRow } from "./store"

// Emails Russ the first time a chat visitor leaves an email or phone number.
// Reply-To is the visitor, so answering the email answers the lead.

export async function sendLeadEmail(args: {
  lead: LeadRow
  transcript: ChatMessage[]
  page: string
}): Promise<boolean> {
  const key = process.env.RESEND_API_KEY
  if (!key) {
    console.error("[chat] RESEND_API_KEY missing, lead email skipped")
    return false
  }
  const to = process.env.GCHAT_NOTIFY_TO || "russ@generuss.com"
  const from = process.env.GCHAT_NOTIFY_FROM || "Generuss Chat <no-reply@mail.generuss.com>"
  const { lead, transcript, page } = args

  // Name, business, and time keep each lead in its own Gmail thread.
  const who = lead.name || lead.email || lead.phone || "a visitor"
  const biz = lead.business && lead.business !== who ? ` (${lead.business})` : ""
  const need = lead.need ? ` - ${lead.need}` : ""
  const at = new Date().toLocaleString("en-US", {
    timeZone: "America/Los_Angeles",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  })
  const subject = `Chat lead: ${who}${biz}${need} [${at}]`.slice(0, 160)

  const fields = [
    ["Name", lead.name],
    ["Email", lead.email],
    ["Phone", lead.phone],
    ["Business", lead.business],
    ["Need", lead.need],
    ["Timeline", lead.timeline],
    ["Budget", lead.budget],
    ["Page", page || "/"],
    ["Session", lead.session_id],
  ]
    .filter(([, v]) => v)
    .map(([k, v]) => `${k}: ${v}`)
    .join("\n")

  const convo = transcript
    .map((m) => `${m.role === "user" ? "Visitor" : "Assistant"}: ${m.content}`)
    .join("\n\n")

  const text = `${lead.summary ? `${lead.summary}\n\n` : ""}${fields}\n\nCONVERSATION\n\n${convo}\n\nSent by the generuss.com chat assistant.`

  const ctrl = new AbortController()
  const timer = setTimeout(() => ctrl.abort(), 5000)
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from,
        to: [to],
        subject,
        text,
        ...(lead.email ? { reply_to: lead.email } : {}),
      }),
      signal: ctrl.signal,
    })
    if (!res.ok) {
      console.error(`[chat] lead email failed: ${res.status} ${(await res.text()).slice(0, 200)}`)
      return false
    }
    return true
  } catch (err) {
    console.error("[chat] lead email error:", err instanceof Error ? err.message : err)
    return false
  } finally {
    clearTimeout(timer)
  }
}
