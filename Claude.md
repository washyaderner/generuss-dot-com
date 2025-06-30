# Claude Usage Guide

## 1. Overview
Claude is Anthropic's large-language-model (LLM) family (e.g. *claude-3-sonnet-20240229*).  You can access it via a simple CLI, the official SDKs (Node / Python), or through the helper script already included in this repo (`tools/llm_api.py`).

This guide collects senior-developer best practices for installing, configuring, and using Claude effectively inside the *generuss-dot-com* code-base.

---

## 2. Installation & Setup

### 2.1 CLI (recommended for quick tests)
```bash
# macOS (Homebrew)
brew install claude

# Linux (Homebrew on Linux)
brew install claude
```
The command will be available as `claude`. Verify:
```bash
claude --help
```

### 2.2 Environment variable
All Anthropic tools expect an API key in the environment variable `ANTHROPIC_API_KEY`.
```bash
export ANTHROPIC_API_KEY="sk-ant-…"
```
Place this in your shell profile or (preferably) in `.env.local` **never** commit real keys to git.

### 2.3 Python SDK
```bash
source venv/bin/activate
pip install anthropic
```

### 2.4 Node SDK
```bash
npm install anthropic
```

---

## 3. Quick CLI Usage
```bash
claude -m claude-3-sonnet-20240229 "Explain RAG in two sentences"
```
Optional flags:
* `-t`  – temperature (0 – 1)
* `--stream` – stream tokens as they arrive

---

## 4. Using the repo helper script
`tools/llm_api.py` already wraps Anthropic for you.  Example:
```bash
venv/bin/python3 tools/llm_api.py \
  --prompt "Summarise the latest commit message" \
  --provider anthropic \
  --model claude-3-sonnet-20240229
```
Add `--stream` for real-time streaming.

---

## 5. Prompt-writing Best Practices
1. **System prompt first** – set the tone & persona.
2. **Give context** – provide code or docs snippets.
3. **Clarify output format** – e.g. *markdown table*.
4. **Use examples** – "When input X, respond with Y".
5. Keep temperature low (≈0.2) for deterministic tasks.
6. Respect the 100k token context window but keep prompts concise.

---

## 6. Coding Examples
### 6.1  Node (TypeScript)
```ts
import Anthropic from "anthropic";
const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
const resp = await client.messages.create({
  model: "claude-3-sonnet-20240229",
  max_tokens: 1024,
  messages: [
    { role: "user", content: "Generate a haiku about automation" }
  ]
});
console.log(resp.content[0].text);
```

### 6.2  Python
```python
from anthropic import Anthropic, HUMAN_PROMPT, AI_PROMPT
import os
client = Anthropic(api_key=os.environ["ANTHROPIC_API_KEY"])
resp = client.completions.create(
    model="claude-3-sonnet-20240229",
    prompt=f"{HUMAN_PROMPT} Say hello{AI_PROMPT}",
    max_tokens=100,
)
print(resp.completion)
```

---

## 7. Troubleshooting
| Symptom | Likely Cause | Fix |
|---------|--------------|-----|
| `No API key provided` | `ANTHROPIC_API_KEY` not set | Export variable or add to `.env.local` |
| `Unknown model` | Typo in `-m` flag | Check model spelling & availability |
| Network timeout | Firewall or bad internet | Retry / check proxy settings |

---

## 8. Security & Governance
* **Never** hard-code keys in source files.
* Limit key scope/regenerate keys when employees leave.
* Monitor usage and cost via Anthropic dashboard.

---

## 9. Workflow Tips
* Use the CLI for interactive experimentation, then codify successful prompts in scripts or tests.
* Keep reusable prompts in `prompts/` with clear filenames.
* Log both prompt and response for reproducibility.
* Remember to add `.env.local` to `.gitignore` (already done in this repo).

---

Happy prompting! 🚀 