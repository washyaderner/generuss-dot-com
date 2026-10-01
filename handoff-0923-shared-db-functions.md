# Handoff: the Generuss database functions are pinned by a Tarotdoxa deploy check

## Provenance

Written 2026-09-23 about 12:15 PM PT by Kit (claude-opus-5-5, session a3afec13-8176-4e6f-b6b6-9074c65ec0cf), during Tarotdoxa upgrade build 01. Nothing in this repo was changed. Status tokens follow the evidence-bar rule.

## TL;DR

- Seven Generuss functions live in the Supabase project that Tarotdoxa and OGC also use (`lgnfbveoxhgudvtxxjgk`).
- Tarotdoxa's worker deploy runs a safety probe. Since 9/23 that probe lets these seven through, by exact name, arguments and owner.
- So a change to a name, an argument list or the owner of any of them blocks every Tarotdoxa worker deploy until the allow-list is updated.
- `gd_lead_notified` takes no token.
- No repo under `/Users/studio/Build` holds the SQL for these functions.

## 1. Facts [VERIFIED]

- **The seven, as pinned** in `/Users/studio/Build/tarotdoxa-worker/execution/probe-anon-grants.py` (the `anon_executable_definer_functions` check, about lines 113-148):
  - `public.gchat_gate(p_secret text, p_ip_hash text)`
  - `public.gchat_log(p_secret text, p_turns jsonb, p_lead jsonb)`
  - `public.gd_lead_submit(p jsonb)`
  - `public.gd_lead_notified(p_id uuid)`
  - `public.gd_report_peek(p_id uuid, p_token text)`
  - `public.gd_report_preview(p_id uuid, p_token text)`
  - `public.gd_report_decide(p_id uuid, p_token text, p_action text, p_walkthrough text)`
- **Why they were pinned:** all seven are SECURITY DEFINER, owned by `postgres`, and anon can execute them. The probe blocks a Tarotdoxa deploy on any function like that, so these seven blocked every Tarotdoxa worker deploy from 8:30 AM PT on 9/23 until the allow-list merged (worker PR #24).
- **What the review read in the bodies (9/23):** none touches a Tarotdoxa table. The `gchat_*` functions check `gchat_secret_ok(p_secret)`. The `gd_report_*` functions check the sha256 of `p_token` against `approve_token_hash`. `gd_lead_submit` is throttled per `ip_hash`.
- **`gd_lead_notified`:** its body is `update gd_leads set notified_at = now() where id = p_id and notified_at is null and created_at > now() - interval '1 hour'`. It takes no token. Anyone who holds a lead's id can stamp it as notified inside its first hour. Lead ids are random uuids.
- **Who calls them:** a search of every file type under `/Users/studio/Build` (9/23) found one caller, `lib/chat/store.ts` in this repo, which calls `gchat_gate` and `gchat_log`. No repo holds the SQL that defines any of the seven, and no caller of the `gd_*` functions was found under `/Users/studio/Build`.
- **The probe checks the signature and the owner, not the body.** A `CREATE OR REPLACE` that keeps the same signature stays allowed, whatever the new body does.

## 2. Suggestions [ASSUMED]

- Before changing a name, an argument list or the owner of one of the seven, update the allow-list in `tarotdoxa-worker/execution/probe-anon-grants.py` in the same pass, or Tarotdoxa deploys stop.
- Keep the SQL for these functions in a repo (a migrations folder here), so a body change shows up in a diff.
- If `gd_lead_notified` matters (for example, if a stamped lead skips a notice), give it the same token check the `gd_report_*` functions use.
- Add a short line about the pinning to `docs/CHAT_BOT.md`, then delete this handoff.
