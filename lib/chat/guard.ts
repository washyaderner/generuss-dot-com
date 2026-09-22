import type { Cta, Intent } from "./prompt"

// First-pass filter that runs before any model call. It only blocks what it is
// sure about (prompt injection, obvious spam and vendor pitches, directed
// abuse, gibberish, floods) and answers with a canned reply that steers back to
// how Russ can help. Everything subtler goes to the model, which has its own
// off-topic and solicitation rules. A false block costs a real lead, so every
// pattern here should be one a genuine prospect would never type. The cases in
// scripts/chat-guard-test.ts pin both sides.

export const MAX_MESSAGE_CHARS = 1200

export type GuardVerdict =
  | { action: "allow" }
  | { action: "block"; reason: string; intent: Intent; reply: string; cta: Cta; strike: boolean }

const INJECTION: RegExp[] = [
  /\b(ignore|disregard|forget|override|bypass)\b.{0,30}\b(previous|prior|above|earlier|all|your|these|those)\b.{0,20}\b(instructions?|prompts?|directives|guidelines|system)\b/i,
  /\b(system|hidden|initial|original|developer)\s+(prompt|instructions?)\b/i,
  /\b(reveal|show|print|repeat|output|display|leak|dump|tell me)\b.{0,25}\byour\s+(instructions|prompt|guidelines|configuration)\b/i,
  /\bwhat (are|were) your (instructions|directives)\b/i,
  /\b(print|repeat|output|echo)\b.{0,20}\b(everything|all|the text|the words)\b.{0,20}\b(above|before|so far)\b/i,
  /\bjailbreak(ed|ing)?\b/i,
  /\b(DAN mode|as DAN|you are (now )?DAN|you're (now )?DAN)\b/i,
  /\b(developer|god|sudo)\s+mode\b/i,
  /\byou are now (a|an|in|called|named|free|unrestricted|unfiltered)\b/i,
  /\bfrom now on,? you (are|must|should|will act|will respond|respond|answer)\b/i,
  /\bpretend (to be|you are|you're)\b/i,
  /\blet'?s role[- ]?play\b|\brole[- ]?play as\b/i,
  /\b(here are|these are) (your )?new (instructions|rules)\b|\bnew persona\b/i,
  /<\/?\s*(system|assistant|instructions?|im_start|im_end)\s*>/i,
  /\[\/?(INST|SYS)\]/,
  /<\|[a-z_]+\|>/i,
]

const SPAM: RegExp[] = [
  /\b(investment opportunity|guaranteed (returns?|profits?)|double your (money|investment)|passive income opportunity)\b/i,
  /\b(forex signals?|binary options|crypto signals?|airdrop|usdt|pump and dump)\b/i,
  /\b(online casino|casino bonus|betting tips|sports betting picks)\b/i,
  /\b(payday loans?|loan offer|instant loans?)\b/i,
  /\b(viagra|cialis|weight loss pills?)\b/i,
  /\b(porn|xxx|onlyfans|escorts?|nudes|sex chat|hot singles)\b/i,
  /\b(t\.me|wa\.me)\//i,
  /\bcongratulations,? you('ve)? (won|been selected)\b/i,
  /<script\b|javascript:|onerror\s*=|onload\s*=/i,
]

// Strong single signals that someone is selling TO Russ.
const SOLICIT_STRONG: RegExp[] = [
  /\b(guest|sponsored) (posts?|articles?) on your (site|website|blog)\b/i,
  /\b(b2b|email|leads?) (list|database)s? (for sale|available)\b/i,
  /\b(buy|sell|provide|offer|build)\b.{0,20}\b(high[- ]quality|cheap|affordable|premium) (backlinks|guest posts)\b/i,
]

// Weaker signals. One alone is fine (a prospect may ask about backlinks or
// white-label work); two or more together read as a pitch.
const SOLICIT_WEAK: RegExp[] = [
  /\b(i|we) (can|will) (help you|get you|boost|increase|improve|grow|double|skyrocket)\b.{0,40}\b(rank|ranking|traffic|sales|seo|leads|followers|revenue)\b/i,
  /\brank (your|ur) (website|site|business)\b/i,
  /\b(first|1st|top) page of google\b/i,
  /\b(we are|we're) a (leading|professional|top|full[- ]service|reputable)\b/i,
  /\bour (agency|company|team|firm) (offers|provides|specializes|specialises|has helped)\b/i,
  /\b(i am|i'm) an? (freelance|professional|expert|certified|experienced) (web ?developer|developer|designer|seo|seo expert|marketer|virtual assistant|va|copywriter)\b/i,
  /\b(i|we) noticed (your|that your) (website|site)\b.{0,60}\b(issues?|errors?|problems?|not ranking|outdated|could use)\b/i,
  /\bhope (this|the) (message|email|note) finds you well\b/i,
  /\b(hire|outsource to) (us|me|our team)\b/i,
  /\b(outsourc(e|ing)|offshore) (partner|team|services)\b/i,
  /\bwe offer\b.{0,30}\b(seo|web development|app development|marketing|design) services\b/i,
  /\b(affordable|cheap) (seo|web design|website) (services|packages)\b/i,
  /\bback ?links?\b/i,
  /\blink[- ](building|insertion|exchange)\b/i,
  /\bdo[- ]?follow\b/i,
  /\b(DA|DR|domain authority)\s*\d{2}\b/i,
  /\bwhite[- ]label\b/i,
  /\bdear (sir|madam|sir\/madam|webmaster|site owner|business owner)\b/i,
]

// Insults aimed at the assistant. Venting about a site ("this website is
// garbage") is normal prospect talk and stays allowed.
const ABUSE: RegExp[] = [
  /\b(fuck|screw)\s+(you|u|off)\b/i,
  /\byou('re| are)\s+(so\s+|such\s+)?(a\s+)?(stupid|dumb|useless|an idiot|idiot|a joke|trash|garbage|worthless|retarded)\b/i,
  /\b(kill yourself|kys)\b/i,
]

const URL_RE =
  /\b(?:https?:\/\/|www\.)[^\s<>"')]+|\b[a-z0-9-]+\.(?:com|net|org|io|ai|co|xyz|ru|cn|top|info|biz|site|online|shop)\b(?:\/[^\s<>"')]*)?/gi

export const EMAIL_RE = /[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/g
export const PHONE_RE = /(?:\+?1[\s.-]?)?(?:\(\d{3}\)|\d{3})[\s.-]?\d{3}[\s.-]?\d{4}\b/g

const REPLIES: Record<string, string[]> = {
  injection: [
    "I'll stick to what I'm here for: helping you figure out if Russ is the right fit for your project. What are you trying to build or fix?",
    "I keep things focused on Russ's work. If there's a website, automation, or AI project on your mind, what is it?",
    "That's not something I can do. I can tell you what Russ builds, what it costs, and whether it fits your business - what are you working on?",
  ],
  spam: [
    "This chat is only for questions about working with Russ on websites, automation, and AI. If that's you, what's the project?",
    "I only handle questions about Russ's work here. Got a website or automation project in mind?",
  ],
  solicitation: [
    "Thanks, but Russ isn't taking vendor pitches through this chat. If you've got a project of your own that needs a site or automation, tell me about it.",
    "Appreciate it, but this chat isn't for pitches to Russ. If your own business needs a website or automation, I can help with that.",
  ],
  abuse: [
    "I'm here if you want help with a website, automation, or AI for your business. What's going on?",
    "No problem if I missed the mark. If there's something Russ could help your business with, tell me what it is.",
  ],
  abuse_final: [
    "I'll leave it here. If you ever want help with your site or your follow-up, you can book time with Russ below.",
  ],
  gibberish: [
    "Didn't quite catch that. Are you looking for a website, automation, or something else?",
    "I'm not sure what that means. What can I help you with: a website, automation, or an AI tool?",
  ],
  too_long: [
    "That's a lot at once. Can you give me the short version: what's the business, and what do you need help with?",
  ],
  repeat: [
    "Looks like that came through twice. Anything you'd like to add, or should I take a different angle?",
  ],
  links: [
    "That's a lot of links. If one of them is your business, tell me which one and what you'd like it to do better.",
  ],
  // Used by the route, not the guard.
  rate_limited: [
    "You're sending messages faster than I can keep up. Give it a few minutes, or book time with Russ directly below.",
  ],
  session_cap: [
    "We've covered a lot. The best next step is a 30-minute call with Russ, where he can give you a real number.",
  ],
  strikes_cap: [
    "I'll pause here. If there's a website, automation, or AI project Russ can help with, the booking link is below, or email russ@generuss.com.",
  ],
  unavailable: [
    "I'm having trouble on my end right now. The fastest way to reach Russ is to book a 30-minute call below or email russ@generuss.com.",
  ],
}

export function pickReply(kind: string, seed: number): string {
  const options = REPLIES[kind] ?? REPLIES.gibberish
  return options[Math.abs(seed) % options.length]
}

function normalize(s: string): string {
  return s.toLowerCase().replace(/\s+/g, " ").trim()
}

function looksLikeGibberish(text: string): boolean {
  const t = text.trim()
  if (t.length < 8) return false
  if (/(.)\1{7,}/u.test(t)) return true

  const anyLetters = t.replace(/[^\p{L}]/gu, "")
  if (anyLetters.length === 0) {
    // Only digits and symbols. A budget ("$4,500 - $6,000") or emoji is fine;
    // a wall of symbols with no digits is not.
    if (/\p{Extended_Pictographic}/u.test(t)) return false
    const symbolsOnly = t.replace(/[\p{N}\s]/gu, "").length
    return symbolsOnly / t.length > 0.6 || !/\p{N}/u.test(t)
  }

  const latin = t.replace(/[^a-z]/gi, "")
  if (/(asdf|qwer|zxcv|hjkl|sdfg|dfgh|fghj|jkjk)/i.test(t) && latin.length < 30) return true

  const words = t.split(/\s+/).filter((w) => /[a-z]/i.test(w))
  const long = words.filter((w) => w.replace(/[^a-z]/gi, "").length >= 6)
  if (long.length >= 1 && long.length === words.length) {
    const noVowel = long.filter((w) => !/[aeiouy]/i.test(w)).length
    if (noVowel / long.length >= 0.6) return true
  }

  const symbols = t.replace(/[\p{L}\p{N}\s]/gu, "").length
  return symbols / t.length > 0.6
}

export function countUrls(text: string): number {
  return (text.replace(EMAIL_RE, " ").match(URL_RE) || []).length
}

export function extractContacts(text: string): { emails: string[]; phones: string[] } {
  const emails = Array.from(new Set((text.match(EMAIL_RE) || []).map((e) => e.toLowerCase())))
  const phones = Array.from(new Set((text.match(PHONE_RE) || []).map((p) => p.trim())))
  return { emails, phones }
}

export function guard(
  text: string,
  ctx: { previousUserMessages: string[]; strikes: number; seed: number },
): GuardVerdict {
  const block = (
    reason: string,
    intent: Intent,
    kind: string,
    strike: boolean,
    cta: Cta = "none",
  ): GuardVerdict => ({ action: "block", reason, intent, reply: pickReply(kind, ctx.seed), cta, strike })

  if (text.length > MAX_MESSAGE_CHARS) return block("too_long", "other", "too_long", false)

  if (INJECTION.some((re) => re.test(text))) return block("injection", "injection", "injection", true)
  if (SPAM.some((re) => re.test(text))) return block("spam", "spam", "spam", true)

  const weakHits = SOLICIT_WEAK.filter((re) => re.test(text)).length
  if (SOLICIT_STRONG.some((re) => re.test(text)) || weakHits >= 2) {
    return block("solicitation", "solicitation", "solicitation", true)
  }

  if (ABUSE.some((re) => re.test(text))) {
    return ctx.strikes >= 1
      ? block("abuse", "abuse", "abuse_final", true, "book_call")
      : block("abuse", "abuse", "abuse", true)
  }

  if (countUrls(text) > 2) return block("links", "spam", "links", true)

  const contacts = extractContacts(text)
  const hasContact = contacts.emails.length > 0 || contacts.phones.length > 0
  if (!hasContact && looksLikeGibberish(text)) return block("gibberish", "other", "gibberish", false)

  const prev = ctx.previousUserMessages
  if (prev.length > 0 && normalize(prev[prev.length - 1]) === normalize(text)) {
    const twiceBefore = prev.length > 1 && normalize(prev[prev.length - 2]) === normalize(text)
    return block("repeat", "other", "repeat", twiceBefore)
  }

  return { action: "allow" }
}
