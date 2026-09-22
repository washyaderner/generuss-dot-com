import { ALLOWED_LINK_HOSTS } from "./knowledge"

// Enforces the voice and link rules on whatever the model wrote: no em or en
// dashes, no markdown, and no links outside the allowlist (so an injected
// prompt can never make the assistant show a phishing URL).

const URL_IN_TEXT = /\bhttps?:\/\/[^\s<>"')]+|\bwww\.[^\s<>"')]+/gi

export function hostAllowed(url: string): boolean {
  try {
    const u = new URL(url.startsWith("http") ? url : `https://${url}`)
    return ALLOWED_LINK_HOSTS.includes(u.hostname.toLowerCase())
  } catch {
    return false
  }
}

export function cleanReply(reply: string): string {
  let r = reply
    .replace(/\[([^\]]+)\]\((https?:\/\/[^)\s]+)\)/g, "$1\n$2")
    .replace(/[\u2014\u2013]/g, " - ")
    .replace(/[\u2018\u2019]/g, "'")
    .replace(/[\u201C\u201D]/g, '"')
    .replace(/\*\*|__|`/g, "")
    .replace(/^#{1,6}\s*/gm, "")
    .replace(URL_IN_TEXT, (u) => {
      const trimmed = u.replace(/[.,;:!?]+$/, "")
      const tail = u.slice(trimmed.length)
      return hostAllowed(trimmed) ? trimmed + tail : tail
    })
    .replace(/[ \t]{2,}/g, " ")
    .replace(/[ \t]+\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim()
  if (r.length > 1200) r = r.slice(0, 1200).replace(/\s+\S*$/, "") + "..."
  return r
}
