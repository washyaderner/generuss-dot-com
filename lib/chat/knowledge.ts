// The chat assistant's knowledge library.
//
// Every fact here is public: it comes from generussdesign.com, generuss.com,
// tarotdoxa.com, pharallax.ai, Russ's published blog posts, or a live product.
// Update this file when an offer, price, or project changes; the assistant
// only knows what is written here. Last full refresh: 2026-09-22.
//
// Never add: the day job or its employer, family members, home location,
// phone numbers, client names that are not already public, or any number
// that is not published somewhere Russ controls.

export const KNOWLEDGE_DATE = "2026-09-22";

export const BOOKING_URL = "https://app.cal.com/generuss/discovery-call";
export const RUSS_EMAIL = "russ@generuss.com";

// Links the assistant may show. Anything else is stripped from replies.
export const ALLOWED_LINK_HOSTS = [
  "generuss.com",
  "www.generuss.com",
  "generussdesign.com",
  "www.generussdesign.com",
  "app.cal.com",
  "cal.com",
  "oregonghostconference.com",
  "tarotdoxa.com",
  "pharallax.ai",
  "crystalseedtarot.com",
  "vibenthrivetherapy.com",
  "www.vibenthrivetherapy.com",
  "styx-stones-bones.pages.dev",
  "www.youtube.com",
  "youtube.com",
  "x.com",
  "github.com",
  "www.upwork.com",
];

export const KNOWLEDGE = `
# WHO RUSS IS

- Russ Gardner (Russell Gardner) runs Generuss, a one-person studio that builds websites, automation, and AI systems for service businesses, founders, event organizers, and B2B teams.
- 20+ years in sales. He designs every site and system around how buyers actually decide, which is why his work leans so hard on conversion.
- He builds everything himself, with AI in the loop (Claude Code and his own agent stack). One human accountable: the person you talk to is the person who builds it. No account managers, no hand-offs.
- 17+ sites shipped. 5.0 stars from named clients. Works in Pacific Time with clients anywhere; everything is remote.
- Two sites. generuss.com (this site) covers his AI and automation work, his earlier portfolio, and his blog. generussdesign.com is the web design studio: offers, prices, case studies, free tools, and 50+ guides.
- Talk to him: book a free 30-minute discovery call on Google Meet at ${BOOKING_URL} or email ${RUSS_EMAIL}.
- Elsewhere: YouTube https://www.youtube.com/@generussai, X https://x.com/generussai, GitHub https://github.com/washyaderner, Upwork https://www.upwork.com/freelancers/generuss

# WHAT HE DOES

## 1. Custom websites (details at https://generussdesign.com)
Hand-coded sites (Astro, no page builders, no templates) built to turn visitors into booked calls and paying customers. Fast on every phone, free hosting on Cloudflare, and the client owns the code, domain, and content.

Three offers:
- The Launch Page, $500 flat. One page with one job: offer, proof, booking. Copy written for you in your voice, booking or contact form wired, mobile-first, free hosting ($0 a month), you own it, Loom walkthrough at handoff. Live in 7 days from kickoff or you don't pay the balance. Every dollar credits toward the full build for 6 months. Best for new or rebooting service businesses (therapists, trades, coaches, studios) that need to look hireable now. Live example: Vibe N Thrive.
- The Conversion-Engineered Site, from $4,500. The full custom build: discovery call and tech stack audit, conversion-first copy and structure, custom design, mobile-first, static-first architecture with no plugin rot, contact-to-CRM automation wired, launch docs and a Loom walkthrough, two rounds of revisions, 30 days of direct post-launch support. Live in 21 days or you don't pay the balance. Love the first design or your deposit back. Fixed scope, price locked up front.
- The Growth Engine, from $750 a month. The site plus monthly optimization across nine search and AI surfaces (SEO, AEO, GEO, map pack and Google Business Profile, voice search, speed and Core Web Vitals, conversion, email deliverability, social sharing). Fixes are shipped, not suggested. A 5-minute monthly report: what moved, what's next. Month one starts with the full nine-surface audit. Month to month, cancel anytime. Works on sites he built and sites he didn't. Includes priority turnaround on site changes.

Three ways to build (the paths page, https://generussdesign.com/paths/):
- Launch Page: bookable in days. Exemplar: Vibe N Thrive.
- Growth Site: built to get found and cited by Google, Maps, and AI assistants. From $4,500, or grown monthly on the Growth Engine. Exemplar: Pharallax, 199 indexed pages.
- Signature Scroll: a cinematic, art-directed scroll build for brands that live on feel (artists, venues, premium products, events). Quoted per build. Exemplar: Styx Stones and Bones, https://styx-stones-bones.pages.dev (in progress, live to click through).

Bonus with every build: a Pharallax Strategic Analysis ($497 value). Before he touches a pixel, his AI engine pressure-tests the business strategy so the build fixes what's actually broken.

## 2. Automation systems (details at https://generussdesign.com/automation)
For the leads that die after the form gets filled out. Four systems, each set up once and left running:
- Speed-to-lead: every form fill or missed call gets an instant, personal-sounding reply that books the next step in under a minute, and the owner gets pinged with context.
- Follow-up sequences: quotes that chase themselves, no-show recovery, day-3 and day-10 nudges written in the owner's voice. Sequences stop the moment a real conversation starts.
- Review engine: detects the happy moment, times the ask, and deep-links straight to the Google profile.
- CRM wiring: leads land tagged, deduped, and routed, so there's one pipeline instead of four inboxes.
Pricing: a single system is a fixed-scope build quoted after a short call. Full pipeline wiring is part of the Growth Engine ($750 a month). Russ maintains what he builds: everything ships documented with a walkthrough video, and if something breaks it's his phone that buzzes.
Proof: email flows (welcome, browse recovery, post-purchase) live in production for a specialty food brand, full case study after client sign-off. And Pharallax runs end to end without a human in the loop.

## 3. Search and AI visibility: SEO, AEO, GEO (details at https://generussdesign.com/seo)
- SEO gets you ranked in the list of links. AEO gets you into the answer box and People Also Ask. GEO (sometimes called GSO) gets you cited when ChatGPT, Claude, Perplexity, or Google's AI Overviews write the answer.
- He audits all nine surfaces with real data, hands over one plan ranked by impact in plain English (top three marked "this week"), then does the technical fixes himself: metadata, schema, speed, structure, llms.txt. For surfaces only the owner can touch, like a Google profile, he writes paste-ready copy.
- Technical fixes land right away. Rankings and AI citations usually move over weeks, not days.
- Runs on any site, any platform. Standalone audits and fixes are quoted after a quick look; the monthly version is the Growth Engine.

## 4. Custom AI tools, chat assistants, and agents
This is the core of generuss.com. Russ builds AI into real business workflows:
- AI tools that do hours of work in minutes. Example: an AI proposal generator for Invincible Media that turns a sales call transcript into a formatted 15+ page B2B growth plan, cutting proposals from 4+ hours to about 15 minutes. They hired him again to optimize their GPT-based GTM and RevOps proposal builder.
- Chat assistants trained on a business, like the one on this site.
- Autonomous agents with memory and tools (see Pharadoxa below), and AI products end to end (Pharallax, Tarotdoxa).
- He runs AI agents in his own business every day, so client automation runs on the same discipline: deterministic code for the predictable parts, AI only where judgment is needed, checks before anything ships.
Pricing: custom AI work is a fixed-scope build quoted after a discovery call.

## 5. Apps
He builds full products, not just sites. Tarotdoxa is his own: native iPhone and Android apps, the AI reading engine and backend, subscriptions, and the website. App projects are scoped and quoted on a call.

## 6. Sales strategy and systems
Two decades of selling shape everything he builds: scripts, call structure, follow-up, and the pages that do the selling. On his earlier site: in a past sales role, his scripting and live-call coaching took a real estate marketing firm's daily revenue from $55,440 to $87,120, and they created a dedicated Line Coach role for him. Sales thinking also runs this assistant.

## 7. Event and conference websites (details at https://generussdesign.com/event-websites)
Custom event sites that sell tickets: ticket path built first, a schedule people can read on a phone in a hallway, speaker and vendor directories, tiered sponsor walls, fast under announcement-day traffic, mobile-first. Hand-built from $500, live in 21 days, free hosting, you own everything, so there's no monthly platform fee riding on the event budget. Proof: the Oregon Ghost Conference platform.
Oregon Ghost Conference vendors and speakers get 20% off their first build (details at https://generussdesign.com/ogc). He knows the paranormal and metaphysical community, so vendors don't have to explain their world first.

# PRICES AT A GLANCE (all published)
- Launch Page: $500 flat, live in 7 days.
- Conversion-Engineered Site: from $4,500, live in 21 days.
- Growth Engine: from $750 a month, cancel anytime.
- Event websites: from $500.
- Website Taste Audit: $197 flat, 48-hour delivery, credits toward any build started within 30 days.
- Single automation system, standalone SEO audit and fixes, custom AI tools, apps, Signature Scroll builds: fixed-scope quote after a call.
- Hosting: $0 a month on Cloudflare for sites he builds.
- Discovery call: free, 30 minutes.
- For comparison: agencies often quote $15k to $50k and 12 weeks. A typical subscription site runs around $175 a month, roughly $6,300 over three years, and you never own it. Around month 26 a subscription has cost more than a $4,500 build.
Payment terms, deposits, and exact start dates are confirmed by Russ in the proposal.

# GUARANTEES AND TERMS
- Live in 21 days (7 for a Launch Page). Miss the date and you don't pay the balance until it's live.
- Love the first design or your deposit back. You see a real design direction before committing further.
- You own everything: code, domain, content. Hosted free, nothing held hostage, leave any time and take it with you.
- Two rounds of revisions included. 30 days of direct-line support after launch (one human, no ticket queue). Fixed scope, no surprise bills, no hourly billing.

# HOW A BUILD WORKS (21 days, zero hand-offs)
1. Discovery call, day 0. 30 minutes. He audits your current site live and points out where leads leak. You leave with 3 specific fixes whether or not you work together.
2. Stack audit and scope, days 1 to 3. He maps your buyer's path against the right tech and delivers a fixed-scope plan with the price locked.
3. Build with weekly Looms, days 4 to 18. You see progress every week and can redirect early. No giant reveal at the end.
4. Launch and 30-day support, days 19 to 21. Full documentation, a personal Loom handoff, and direct support.

# FREE THINGS TO OFFER
- Free tools at https://generussdesign.com/tools/ (they tell the truth even when the truth is "your site is fine"):
  - Website Leak Scanner, https://generussdesign.com/tools/website-leak-scanner : Russ tears down your actual site against five conversion leaks and emails a personal report the same day.
  - Slow-Site Cost Calculator, https://generussdesign.com/tools/slow-site-cost : turns load time into a monthly dollar figure.
  - Missed-Lead Calculator, https://generussdesign.com/tools/missed-lead-calculator : what slow follow-up costs per month.
  - Local Visibility Grade, https://generussdesign.com/tools/local-visibility : twelve checks on your Google presence, a letter grade, and the gaps to close first.
  - AI Visibility Check, https://generussdesign.com/tools/ai-visibility : Russ tests the prompts your customers actually use and sends back what ChatGPT and friends say about you, same day.
  - Hire vs. Automate, https://generussdesign.com/tools/hire-vs-automate : a hire against an automation over three years.
  - Workflow Automation Score, https://generussdesign.com/tools/automation-score : a 0 to 100 score plus the hours and dollars a workflow eats each year.
  - Rent vs Own, https://generussdesign.com/tools/rent-vs-own/ : a monthly Wix, Squarespace, Shopify, or agency bill against a one-time build with no hosting fees; shows the break-even month and says plainly when renting is cheaper.
  - Who Holds Your Keys?, https://generussdesign.com/tools/website-ownership-check/ : reads your domain's public records live (registrar, renewal date, transfer lock, DNS, host, email), then seven questions show which logins you actually control.
  - Word-of-Mouth Check, https://generussdesign.com/tools/word-of-mouth-check/ : for businesses that run on referrals; shows what a slowdown in referrals would cost and what a referral finds when they search the business name, with a straight answer when the owner is fine.
  - Google Review Calculator, https://generussdesign.com/tools/google-review-calculator/ : how many five-star reviews it takes to reach the rating you want, how long at your pace, and what one bad review costs.
  - Missed Call Calculator, https://generussdesign.com/tools/missed-call-calculator/ : what unanswered calls cost each month and what a missed-call text-back could win back.
  - Email Deliverability Check, https://generussdesign.com/tools/email-deliverability-check/ : checks a domain's SPF, DKIM, and DMARC live and explains in plain English whether follow-up emails are likely to land.
  - Ticket Fee Calculator, https://generussdesign.com/tools/ticket-fee-calculator/ : Eventbrite and eight other ticket platforms' fees next to your own site with Stripe, per event and per year, and when an owned event site pays for itself.
- The 5-Leak Website Teardown: drop a URL on the generussdesign.com home page and get the five biggest leaks with fixes, same day. No drip campaign.

# THINGS RUSS HAS BUILT

## Client work
- Oregon Ghost Conference, https://oregonghostconference.com : not just a website, the whole event platform. Public site (schedule, vendors, classes, events, Kids Zone, merch, ticketing), a four-step vendor, speaker, and sponsor application that autosaves, a vendor feedback survey that feeds the dashboard, and a private, role-gated Mission Control where the committee runs the conference (applications, roster, check-in, roadmap, an AI copilot). 15th annual conference, 100+ vendors, all editable without a developer. Astro, Cloudflare Pages, Supabase, Stripe.
- Invincible Media: the AI proposal generator (4+ hours down to about 15 minutes, 15+ page growth plans from call transcripts), then a second project optimizing their GPT-based GTM and RevOps proposal builder. Both 5 stars on Upwork.
- Crystal Seed Tarot, https://crystalseedtarot.com : a custom site for a working tarot reader's whole business. Booking, recurring events, blog, gallery, reviews, services menu, validated forms, 57 reusable components, mobile-first.
- Vibe'N Thrive, https://vibenthrivetherapy.com : a single-page conversion site for a vibroacoustic therapy practice. Explainer, services, pricing, founder story, booking, with the booking funnel tested end to end.
- Styx Stones and Bones, https://styx-stones-bones.pages.dev : an in-progress cinematic scroll build, the bar for his Signature Scroll path.
- An artist site for Resist Entertainment and a band site for Struggle Crew.
- Email automation for a specialty food brand: welcome, browse-recovery, and post-purchase flows live in production. Case study after client sign-off, so no name yet.

## Russ's own products
- Tarotdoxa, https://tarotdoxa.com : an AI tarot app with a real reader's voice, trained on a working Pacific Northwest reader's approach. Native iPhone and Android apps, a daily card weighed against real astrological transits, spreads from one card up to the ten-card Celtic Cross plus a couples spread, a journal, readings narrated out loud, astrology (birth chart, monthly, birthday year ahead), and follow-up chat on any reading. Privacy-first: readings live on the device, no ads, no trackers. Seven free days, then memberships at $10, $14, or $17 a month. Announced for the App Store and Google Play in September 2026; for the latest status point people to tarotdoxa.com. Russ built the apps, the backend, and the site.
- Pharallax, https://pharallax.ai : an adversarial strategy analysis engine. Three cognitive lenses pressure-test a business strategy against a large knowledge base and deliver a structured report by email, every analysis quality-scored before it sends. Tiers from a $497 Structural Read up to a $3,500 a month Strategic Arc, plus a free two-minute analysis. Its site runs 199 pages of pillar-and-cluster content, and there's a free dream tool at https://pharallax.ai/dream/
- generussdesign.com : his studio site. Astro, Tailwind, Cloudflare Pages. 50+ guides, 7 free tools, 100 desktop and 86 mobile on Google PageSpeed with zero layout shift (July 2026 audit).
- generuss.com : this site. Next.js, Contentful for the blog, Cal.com booking, and this AI assistant.

## Internal tools and experiments (proof he builds for himself first)
- Pharadoxa: an autonomous AI agent he built in March 2026, about 24 hours from first plan to first boot, with a 50-minute coding session. Long-term memory from years of his own AI conversations, 10 tools, Upwork job screening with apply-or-skip cards on Telegram, and a nightly "dream mode" that costs under 15 cents a night. Full story: https://generussdesign.com/blog/pharadoxa-build/
- Blast: his own Loom replacement, a menu-bar screen recorder with a web player.
- A fuel economy directory with 1,700+ pages generated from the EPA's public vehicle data (50,000+ vehicles, 1984 to 2027) and a fuel-cost calculator on every model page. Programmatic SEO from a public dataset. Still under a working name.
- Magic Search: finds any image on his Mac by what's in it (captions, text inside the image, labels), all on the device.
- Generuss Forms: custom forms and a multi-user admin portal with roles, per-project dashboards, and exports, used for Oregon Ghost Conference forms.
- Interactive web proposals with a built-in deposit checkout and view tracking.
- Outlier Sniper: a YouTube research tool that finds breakout videos in a niche. Being rebuilt.

# REVIEWS (quote short pieces, exactly)
- Jonny, Invincible Media (verified on Upwork): "Working with Russell has been nothing short of outstanding... he brought structure, clarity, and calm from day one." And: "every business deserves a secret weapon like Russell."
- Carson, Vibe N Thrive: "I've had many websites built over the years and have never had anybody provide such detail to their work. I was absolutely blown away by the results, communication, and turnover time."
- Leon McConnell, Resist Entertainment: "Exceeded my expectations by miles."
- Dirty Chai, Struggle Crew: "You took a simple thing and brought it to life."

# TECH HE USES
Astro, Tailwind, and Cloudflare Pages for most sites (static-first, fast, free hosting). Next.js and React when a project needs app-like behavior. Supabase for data and auth, Stripe for payments, Cal.com for booking, Resend for email, Klaviyo for e-commerce email flows. For AI: OpenAI and Anthropic models, OpenRouter, Pinecone for vector memory. Native iOS (Swift) and Android for apps. He picks the stack after hearing the goal, never before.

# BLOG AND CONTENT
- generussdesign.com blog: how he built the studio site, the Pharadoxa agent story, sales strategy in design, what an AI needs from you, and Claude's own retrospective on working with him.
- generuss.com blog: earlier posts on AI and sales.
- YouTube: https://www.youtube.com/@generussai
`;

// Ready answers. The assistant adapts these to the conversation; it does not
// have to quote them word for word.
export const FAQ: { q: string; a: string }[] = [
  { q: "What does Russ do?", a: "He builds websites, automation, and AI systems that turn visitors into booked calls and paying customers, for service businesses, founders, event organizers, and B2B teams. He builds every piece himself." },
  { q: "How much does a website cost?", a: "Published starting points: $500 for a one-page Launch Page, from $4,500 for the full Conversion-Engineered Site, and from $750 a month for the Growth Engine. Every project gets a fixed quote up front." },
  { q: "How much does automation cost?", a: "A single system, like instant lead replies or a review engine, is a fixed-scope build quoted after a short call. Full pipeline wiring is part of the Growth Engine at $750 a month." },
  { q: "How much does a custom AI tool, chatbot, or agent cost?", a: "It's scoped and quoted after a discovery call, as a fixed price. It depends on what the tool has to do and what it connects to." },
  { q: "How long does a build take?", a: "21 days from kickoff for a full build, about 7 days for a Launch Page. Miss the date and you don't pay the balance until it's live." },
  { q: "Do I own my website?", a: "Yes, all of it: code, domain, and content. Hosting is free on Cloudflare, so there are no hosting fees and nothing holding the site hostage." },
  { q: "Is there a monthly fee?", a: "Not for the site. Hosting is $0 a month. The only monthly option is the Growth Engine, if you want ongoing SEO and optimization, and you can cancel it anytime." },
  { q: "What if I don't like the design?", a: "You see a real design direction before committing further. If you don't love it, your deposit comes back." },
  { q: "What happens after launch?", a: "30 days of direct support with Russ, plus documentation and a Loom walkthrough. After that you can change it yourself, hire anyone, or have Russ handle it." },
  { q: "Do you use WordPress, Wix, Squarespace, or Shopify?", a: "Russ hand-codes sites instead of using page builders, so they load faster, rank better, and cost nothing to host. His SEO work, Taste Audit, and automations work on any platform, including sites he didn't build." },
  { q: "Can you redesign my existing site?", a: "Yes, redesigns are as common as new builds. On a quick call he'll tell you exactly what he'd change and what it would cost." },
  { q: "Do you work with sites you didn't build?", a: "Yes. The SEO audit, Growth Engine, Taste Audit, and automation work run on any site and any platform." },
  { q: "What industries do you work with?", a: "Service businesses (therapists, trades, coaches, clinics, studios), founders, event and conference organizers, creatives, and B2B teams. The paranormal and metaphysical community is a specialty thanks to the Oregon Ghost Conference work." },
  { q: "Can you build an app?", a: "Yes. Tarotdoxa is his own: native iPhone and Android apps, the AI engine, the backend, and the site. App projects are scoped on a call." },
  { q: "Can you build a chatbot like this one?", a: "Yes. This assistant is his work, and he builds the same kind of thing for businesses: trained on your offers, filtered for spam, and wired to send you the leads." },
  { q: "What's AEO and GEO?", a: "SEO gets you ranked in the links. AEO gets you into the answer box at the top. GEO gets you cited when ChatGPT or Google's AI Overviews write the answer. Most sites have only ever done the first one." },
  { q: "Does ChatGPT recommend my business?", a: "The AI Visibility Check answers exactly that: Russ tests the prompts your customers use and sends you what the AI tools say, same day, free." },
  { q: "Why is my website slow?", a: "Usually a page builder or theme shipping scripts to every visitor whether they're needed or not. The Slow-Site Cost Calculator shows what it costs you, and a hand-coded rebuild removes the weight." },
  { q: "Are Eventbrite fees worth it for my event?", a: "It depends on your volume. The Ticket Fee Calculator puts your ticket price and sales next to Eventbrite, eight other platforms, and your own site with Stripe, and it says plainly when staying put is the better deal." },
  { q: "My web designer registered my domain. Do I own it?", a: "Maybe not. Who Holds Your Keys? reads your domain's public record and walks you through the seven logins that decide who controls your site and your email. Everything Russ builds is in your name." },
  { q: "Is my Wix or Squarespace bill worth it?", a: "The Rent vs Own calculator puts your monthly bill next to a one-time build with no hosting fees and shows the break-even month. If renting is cheaper for you, it says so." },
  { q: "Do I need a website if all my customers come from referrals?", a: "Maybe not, if you are turning work away. Otherwise referrals still look you up first. The Word-of-Mouth Check shows what a slowdown would cost and what a referral finds when they search your name today; the $500 Launch Page is the smallest fix." },
  { q: "Why not just use a template or a subscription site?", a: "Templates and subscriptions are fine for something short-lived or live tonight for $0. For a site your business leans on for years, a $175 a month subscription passes the cost of a $4,500 build around month 26, and you still don't own it." },
  { q: "Is there a contract?", a: "Every project is a fixed-scope plan with the price locked before work starts, so you know exactly what you're getting and what it costs. Russ sends it after the discovery call." },
  { q: "How do payments work?", a: "A deposit to start and the balance at launch; Russ confirms the details in your proposal. If a full build misses the 21-day date, you don't pay the balance until it's live." },
  { q: "Do you offer discounts?", a: "The published ones: Oregon Ghost Conference vendors and speakers get 20% off a first build, the $500 Launch Page credits toward a full build for 6 months, and the $197 Taste Audit credits toward any build within 30 days. Scope can also shrink to fit a budget." },
  { q: "Can I get a free website?", a: "Not as an open offer. When Russ does a free build, he invites that business directly. Otherwise the free tools cost nothing, and the smallest paid door is the $500 Launch Page, which credits toward a full build for 6 months." },
  { q: "What's the Website Taste Audit?", a: "18 pass-or-fail design and conversion checks on your site, desktop and mobile, every fail with its fix, ranked worst first, plus a recorded walkthrough. $197 flat, in your inbox within 48 hours." },
  { q: "What's included in the discovery call?", a: "30 minutes on Google Meet. Russ audits your current site live, finds the biggest leaks, and you leave with 3 specific fixes whether or not you work together. No deck, no pitch." },
  { q: "Who will I work with?", a: "Russ, directly, start to finish. The person on the call is the person who builds it." },
  { q: "Where is Russ located?", a: "He works in Pacific Time and with clients anywhere. Everything runs remote: calls on Google Meet, weekly Loom updates." },
  { q: "Is Russ available right now?", a: "He keeps a limited number of builds at a time so each one gets his full attention. A discovery call is the fastest way to lock a start date." },
  { q: "Can I see examples?", a: "The Oregon Ghost Conference platform, Crystal Seed Tarot, Vibe'N Thrive, Pharallax, and Tarotdoxa are all live. Ask about any of them and I'll give you the link." },
  { q: "What results have clients gotten?", a: "Invincible Media cut proposal time from 4+ hours to about 15 minutes with the AI generator he built. His own studio site scores 100 desktop and 86 mobile on Google PageSpeed. Russ only publishes client numbers with the client's sign-off." },
  { q: "Are you a real person?", a: "No, I'm Russ's AI assistant. Russ is very real, and he gets a copy of the conversation when you leave your email." },
  { q: "What AI model are you?", a: "A commercial AI model that Russ set up and trained on his work. He builds assistants like this for other businesses too." },
  { q: "How do I contact Russ?", a: "Book a free 30-minute call or email russ@generuss.com." },
  { q: "Do you do SEO for local businesses?", a: "Yes: Google Business Profile, map pack, citations, reviews, and the site itself. The Local Visibility Grade is a free two-minute starting point." },
  { q: "Can you write my website copy?", a: "Yes. Copy is part of every build, written for conversion and in your voice." },
  { q: "Do you do e-commerce?", a: "He builds e-commerce email flows (welcome, browse recovery, post-purchase are live for a specialty food brand) and conversion work around stores. Full custom stores get scoped on a call." },
  { q: "Do you do logos or branding?", a: "Design direction is part of every build. A standalone brand identity project is something to raise on a call." },
  { q: "Do you do social media management or ads?", a: "No. He builds the site, the search visibility, and the automation that catches the traffic your ads and socials send." },
  { q: "Do you offer hourly work?", a: "Projects are fixed scope with the price locked up front, so there are no hourly billing surprises." },
  { q: "What's Pharallax?", a: "Russ's AI strategy engine at pharallax.ai. It pressure-tests a business strategy through three adversarial lenses and delivers a quality-scored report. Every website build includes an analysis free ($497 value)." },
  { q: "What's Tarotdoxa?", a: "Russ's own AI tarot app with a real reader's voice, for iPhone and Android, with a website at tarotdoxa.com. He built the apps, the AI engine, and the backend." },
  { q: "What's Pharadoxa?", a: "An autonomous AI agent Russ built for himself in about 24 hours: long-term memory, research, Upwork job screening, even a nightly dream mode. The story's on his blog." },
  { q: "Tell me about the Oregon Ghost Conference project.", a: "Russ built the conference's whole platform: public site with ticketing and schedule, a four-step vendor and speaker application, a feedback survey, and a private Mission Control dashboard the committee runs everything from. 100+ vendors, all editable without a developer." },
  { q: "I run an event. Can you help?", a: "Yes. Event sites are a specialty: ticketing first, a schedule that works on a phone, vendor and speaker directories, sponsor tiers. From $500, live in 21 days, no monthly platform fee." },
  { q: "I'm an Oregon Ghost Conference vendor.", a: "Then you get 20% off your first build, and Russ already knows your world. Custom sites start at $500 with free hosting." },
  { q: "Can you automate my proposals, onboarding, or reporting?", a: "That's squarely his lane. The Invincible Media proposal generator took a 4-hour task down to 15 minutes. The first step is mapping your current process on a call." },
  { q: "What's speed-to-lead?", a: "Every new lead gets a personal-sounding reply in under a minute, with the next step booked, before a competitor has opened their inbox. It's usually the highest-value automation for a service business." },
  { q: "Will automation make my business feel robotic?", a: "Not the way Russ builds it. Everything is written in your voice, timed like a person would time it, and stops the moment a real conversation starts." },
  { q: "I'm not technical. Who maintains this?", a: "Russ does. Everything ships documented with a walkthrough video, and if something breaks, his phone buzzes, not yours." },
  { q: "Do you do WordPress maintenance or fix my current site?", a: "Ongoing WordPress upkeep isn't one of his offers, but he audits and optimizes any site on any platform. The Taste Audit or a quick call will tell you whether fixing or rebuilding makes more sense." },
  { q: "Are you hiring?", a: "Generuss is a one-person studio, so there are no open roles listed. If you want to reach Russ anyway, russ@generuss.com works." },
  { q: "Can I partner with Russ or refer clients?", a: "Send Russ a note at russ@generuss.com with what you have in mind. He reads those himself." },
];
