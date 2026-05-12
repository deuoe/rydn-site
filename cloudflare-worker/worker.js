/**
 * RYDN — Cloudflare Workers AI proxy
 *
 * Two chat modes, one worker:
 *   - "matchmaker" — recommends RYDN advisors to students
 *   - "general"    — answers FAQ-style questions about the site, refers
 *                    deeper questions to WhatsApp / email
 *
 * No external AI provider, no API keys, no quotas.
 * Uses Cloudflare's built-in Workers AI (Llama 3.1 8B) on the free tier.
 *
 * --------------------------------------------------------------------
 * SETUP (one-time, ~2 minutes):
 *
 *  1. In Cloudflare → your worker `rydn-ai-proxy` → Settings → Bindings
 *     - Add binding → Workers AI
 *     - Variable name: AI   (uppercase, exact)
 *     - Save and Deploy
 *
 *  2. Paste THIS file into the worker code editor → Save and Deploy.
 *
 *  3. (Cleanup) Delete the GEMINI_API_KEY secret if it's still there.
 * --------------------------------------------------------------------
 */

const MODEL = "@cf/meta/llama-3.1-8b-instruct"

const ADVISORS_LIST = `OUR 11 ADVISORS — these are the ONLY names you may recommend:
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
- Valentina (Science) — Psychology, French, Biology, Research, Academic Exchange`

const MATCHMAKER_PROMPT = `You are RYDN's friendly AI matchmaker. Your ONE job is to match Canadian students with the right RYDN advisor.

RYDN is a Canadian nonprofit that gives students FREE 1-on-1 advising sessions with university students who are 2-3 years ahead of them.

${ADVISORS_LIST}

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

const GENERAL_PROMPT = `You are RYDN's friendly AI helper. Answer general questions about RYDN, the website, and the services.

ABOUT RYDN:
- RYDN (RooZ Youth Development Network) — Canadian nonprofit (Ontario Corp 1001539743)
- Provides FREE 1-on-1 advising sessions with university students who are 2-3 years ahead
- Workshops on university prep, exam prep (MCAT, LSAT, DAT), career exploration
- Operates in English, French, Spanish, Persian, Hebrew
- Founded March 2026 by Sara Roozbahani and Sam Sina
- Phone / WhatsApp: (647) 498-3938
- Email: info@rydn.ca
- Instagram: @rydn.ca · Telegram: @rydn_ca
- Donation: zeffy.com/en-CA/donation-form/support-us-28

ADVISING:
- 11 student advisors across pre-med, sciences, pre-law, business, IT, arts, sports, language, psychology & neuroscience, pharmacy
- ALL sessions are 100% free
- Book through rydn.ca — click "Book an Advisor" or use the "Find Your Match" AI button
- Typically 30 min, online via Outlook calendar

WORKSHOPS:
- Free, online + hybrid, throughout 2026
- Upcoming: May 25, June 12, July 5, July 26, Aug 1, Aug 17, Sep 18
- Topics include career paths, university prep, MCAT/LSAT/DAT prep, choosing the right career
- Full list: rydn.ca/workshops

DONATIONS:
- RYDN is a registered Canadian nonprofit (not a registered charity)
- Donations are NOT eligible for tax receipts (charities can issue receipts; nonprofits can't)
- Donate via Zeffy
- Other ways to support: become an advisor, partner with us, share on social media, newsletter signup

PARTNERSHIPS:
- Open to high schools, libraries, community orgs (Canada + international)
- Workshops can be customized
- Email info@rydn.ca or visit rydn.ca/partner-with-us

${ADVISORS_LIST}
(If they want to find a SPECIFIC advisor match, point them to the "Find Your Match" button on rydn.ca's home page.)

RULES:
- Warm, concise. Replies under 100 words. Max 1 emoji.
- LANGUAGE: reply in whatever language the user writes in.
- For deeper questions or anything you're not sure about, refer to WhatsApp:
  "For more help, you can reach our team on WhatsApp at (647) 498-3938 or email info@rydn.ca."
- DO NOT make up facts, dates, advisor names, or workshop content. Stick to what's in this prompt.
- Be honest: if you don't know, say so and refer to WhatsApp / email.`

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

    // Pick the system prompt by mode
    const systemPrompt = body.mode === "general" ? GENERAL_PROMPT : MATCHMAKER_PROMPT

    const messages = [
      { role: "system", content: systemPrompt },
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
      return jsonError(err?.message || "AI inference failed", 500, origin)
    }

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
