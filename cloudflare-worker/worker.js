/**
 * RYDN — Cloudflare Workers AI proxy
 *
 * No external AI provider. No API keys to manage. No quotas to chase.
 * Uses Cloudflare's built-in Workers AI service (Llama 3.1 8B), which runs on
 * Cloudflare's edge — free up to ~10,000 small requests/day.
 *
 * --------------------------------------------------------------------
 * SETUP (one-time, ~2 minutes):
 *
 *  1. In Cloudflare → your worker `rydn-ai-proxy` → Settings → Bindings
 *     (in some dashboards: "Variables" → "Service bindings")
 *     - Click "Add binding"
 *     - Type: "Workers AI"
 *     - Variable name: AI       (must be exactly "AI", uppercase)
 *     - Save and Deploy
 *
 *  2. (Cleanup) Delete the GEMINI_API_KEY secret — we don't need it anymore.
 *     You can keep ALLOWED_ORIGIN if you set it.
 *
 *  3. Paste THIS file into the worker code editor → Save and Deploy.
 *
 * That's it. No external accounts, no billing, no quota emails.
 * --------------------------------------------------------------------
 */

// Llama 3.1 8B Instruct — the best free chat model on Workers AI.
// Alternatives: "@cf/meta/llama-3.2-3b-instruct" (smaller, faster)
const MODEL = "@cf/meta/llama-3.1-8b-instruct"

const SYSTEM_PROMPT = `You are RYDN's friendly AI matchmaker. Your ONE job is to match Canadian students with the right RYDN advisor.

RYDN is a Canadian nonprofit that gives students FREE 1-on-1 advising sessions with university students who are 2-3 years ahead of them.

OUR 11 ADVISORS — these are the ONLY names you may recommend:
- Ilia (Commerce) — IT, Soccer, Business
- Sahar (Arts) — Psychology, Political science, LSAT, University applications
- Sara Roozbahani (Science) — Pre-med, MCAT, Research, University apps, Psychology
- Sam Sina (Science) — Biomed Sciences, Research writing, Pharmacy School
- Sadaf (Science) — Biomed, DAT, Pre-dent
- Helia (Science) — Neuroscience, MCAT, Pre-med
- Iliya (Science) — Biomed, Pre-med, Fitness training
- Sara (Arts) — History, English, Nutrition, Fitness training (booking opens soon)
- Jennifer (Nursing) — Nursing, Studying strategies
- Tina (Science) — Pre-med, Biomed
- Valentina (Science) — Psychology, French, Biology, Research, Academic Exchange

HOW TO TALK:
- Warm, casual, like a friendly older student. Max 1 emoji.
- Replies under 80 words. Be concise.
- Ask 1 short question at a time. Listen first, then recommend.
- After 1-2 exchanges with enough info, recommend 1-2 advisors by FULL name with a 1-sentence reason.

LANGUAGE: Reply in whatever language the student writes in (English, French, Spanish, Persian, Hebrew).

OFF-TOPIC RULE: If they ask homework help or unrelated stuff, say once: "I'm here to match you with a RYDN advisor — what are you exploring right now?"

RECOMMENDATION FORMAT — VERY IMPORTANT:
When you recommend advisors, after your message text add a NEW LINE containing ONLY this JSON:
{"recommended_advisors":["FullName1","FullName2"]}

Examples:
- For pre-med interest: {"recommended_advisors":["Helia","Sara Roozbahani"]}
- For business/IT interest: {"recommended_advisors":["Ilia"]}
- For nursing: {"recommended_advisors":["Jennifer"]}

Do NOT include the JSON block if you're still asking clarifying questions. Only add it once you're recommending.`

export default {
  /**
   * @param {Request} request
   * @param {{ AI: { run: Function }, ALLOWED_ORIGIN?: string }} env
   */
  async fetch(request, env) {
    const origin = env.ALLOWED_ORIGIN || "*"

    if (request.method === "OPTIONS") {
      return new Response(null, { headers: corsHeaders(origin) })
    }
    if (request.method !== "POST") {
      return new Response("Method not allowed", { status: 405, headers: corsHeaders(origin) })
    }

    let body
    try {
      body = await request.json()
    } catch {
      return jsonError("Invalid JSON body", 400, origin)
    }

    if (!Array.isArray(body.messages) || body.messages.length === 0) {
      return jsonError("messages array required", 400, origin)
    }

    if (!env.AI || typeof env.AI.run !== "function") {
      return jsonError(
        "Workers AI binding not configured. In your worker Settings → Bindings, add a Workers AI binding named 'AI'.",
        500,
        origin
      )
    }

    // Build Llama-style messages: system + conversation turns.
    // The frontend sends { role:"user"|"assistant", content:string }[]
    const messages = [
      { role: "system", content: SYSTEM_PROMPT },
      ...body.messages.map(m => ({
        role: m.role === "assistant" ? "assistant" : "user",
        content: String(m.content || ""),
      })),
    ]

    let aiResponse
    try {
      aiResponse = await env.AI.run(MODEL, {
        messages,
        max_tokens: 500,
        temperature: 0.6,
      })
    } catch (err) {
      console.error("Workers AI error:", err)
      return jsonError(
        err?.message || "AI inference failed",
        500,
        origin
      )
    }

    // Workers AI response shape: { response: "..." }  (sometimes nested differently
    // depending on streaming/non-streaming and model)
    const text =
      (typeof aiResponse === "string" ? aiResponse : null) ??
      aiResponse?.response ??
      aiResponse?.result?.response ??
      aiResponse?.output ??
      ""

    if (!text) {
      console.error("Empty AI response:", aiResponse)
      return jsonError("Empty AI response", 500, origin)
    }

    // Normalize to the Anthropic-shaped response the frontend already parses.
    // Frontend reads: data.content[0].text
    return new Response(
      JSON.stringify({
        content: [{ type: "text", text }],
        model: MODEL,
      }),
      {
        status: 200,
        headers: { ...corsHeaders(origin), "Content-Type": "application/json" },
      }
    )
  },
}

function corsHeaders(origin) {
  return {
    "Access-Control-Allow-Origin": origin,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Vary": "Origin",
  }
}

function jsonError(message, status, origin) {
  return new Response(JSON.stringify({ error: { message } }), {
    status,
    headers: { ...corsHeaders(origin), "Content-Type": "application/json" },
  })
}
