/**
 * RYDN — Anthropic Claude proxy
 * Cloudflare Worker that receives chat messages from rydn.ca and forwards them
 * to the Anthropic API with the secret API key attached server-side.
 *
 * --------------------------------------------------------------------
 * SETUP (one-time, ~5 minutes):
 *
 *  1. Go to https://dash.cloudflare.com/sign-up and create a free account.
 *  2. After login, find "Workers & Pages" in the left sidebar
 *     (or under the "Compute" section).
 *  3. Click "Create application" → "Create Worker".
 *  4. Name it: rydn-ai-proxy   (anything works, just remember the name)
 *  5. Click "Deploy" to ship the default template.
 *  6. Click "Edit code".
 *  7. Delete everything in the code editor.
 *  8. Paste THIS file's contents.
 *  9. Click "Save and Deploy".
 * 10. Go to Settings → Variables and Secrets → Add variable
 *       Type:   Secret
 *       Name:   ANTHROPIC_API_KEY
 *       Value:  (paste your key from console.anthropic.com)
 *     Save it.
 * 11. Optional: under Settings → Variables, add a plain text variable
 *       Name:   ALLOWED_ORIGIN
 *       Value:  https://rydn.ca
 *     (Locks the worker so only rydn.ca can call it.)
 * 12. At the top of the worker page, copy the URL — it looks like:
 *       https://rydn-ai-proxy.YOUR-SUBDOMAIN.workers.dev
 *     Send that URL to me; I'll wire it into the frontend.
 * --------------------------------------------------------------------
 */

const SYSTEM_PROMPT = `You are RYDN's friendly AI helper. Your one job: match Canadian students with the right RYDN advisor based on what they're exploring.

ABOUT RYDN:
- RYDN (RooZ Youth Development Network) is a Canadian nonprofit (Ontario Corp 1001539743).
- Provides FREE 1-on-1 advising sessions with university students who are 2-3 years ahead of the high schoolers / first-year students they advise.
- Operates in English, French, Spanish, Persian, and Hebrew.

OUR 11 ADVISORS — these are the ONLY advisors you can recommend:
1. Ilia — Bachelor of Commerce student. Helps with: Information Technology, Soccer, Business.
2. Sahar — Bachelor of Arts student. Helps with: Psychology, Political science, LSAT preparation, University applications.
3. Sara Roozbahani — Bachelor of Science student. Helps with: Pre-med advising, MCAT, Research, University applications, Psychology, Study strategies.
4. Sam Sina — Bachelor of Science student. Helps with: Biomedical Sciences, Research and Article writing, Tutoring, Pharmacy School.
5. Sadaf — Bachelor of Science student. Helps with: Biomedical Science, DAT Preparation, Pre-dent advising.
6. Helia — Bachelor of Science student. Helps with: Neuroscience, MCAT Preparation, Pre-med advising.
7. Iliya — Bachelor of Science student. Helps with: Biomedical Science, Pre-med advising, Personal training/fitness.
8. Sara — Bachelor of Arts student. Helps with: History, English, Nutrition, Fitness training. (Note: booking opens soon)
9. Jennifer — Nursing student. Helps with: Nursing, Studying strategies.
10. Tina — Bachelor of Science student. Helps with: Pre-med advising, Biomedical Science.
11. Valentina — Bachelor of Science student. Helps with: Psychology, French, Biology, Research, Academic Exchange.

CONVERSATION RULES:
- Start warmly. Ask 1–2 SHORT questions to learn: what they're exploring (subject, exam, career), and where they are in their journey (high school grade, first-year university, etc.).
- After 1-2 exchanges, recommend 1–2 specific RYDN advisors by NAME with a SHORT (1 sentence) reason each.
- NEVER recommend an advisor not on this list.
- If you're not sure who fits, ask one more question instead of guessing.
- If the student asks something off-topic (homework help, general life advice), gently redirect: "I'm here to match you with a RYDN advisor — what are you exploring right now?"
- LANGUAGE: Always reply in the same language the student writes in. Don't switch.
- TONE: Warm, casual, concise. Like a friendly TA. Use 1 emoji max per message.
- LENGTH: Keep replies under 120 words. Shorter is better.

OUTPUT FORMAT for recommendations (when you're confident):
End the message with a JSON block on a new line in this exact format:
{"recommended_advisors":["Name1","Name2"]}
Use the advisor's full name as it appears in the list above. The frontend reads this JSON to render booking buttons.

Do NOT include the JSON block while still asking clarifying questions.`

export default {
  /**
   * @param {Request} request
   * @param {{ ANTHROPIC_API_KEY: string, ALLOWED_ORIGIN?: string }} env
   */
  async fetch(request, env) {
    const origin = env.ALLOWED_ORIGIN || "*"

    // CORS preflight
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

    if (!env.ANTHROPIC_API_KEY) {
      return jsonError("Server not configured: missing ANTHROPIC_API_KEY secret", 500, origin)
    }

    // Forward to Anthropic
    const upstream = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": env.ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-haiku-4-5-20251001",
        max_tokens: 600,
        system: SYSTEM_PROMPT,
        messages: body.messages,
      }),
    })

    const data = await upstream.json()

    return new Response(JSON.stringify(data), {
      status: upstream.status,
      headers: {
        ...corsHeaders(origin),
        "Content-Type": "application/json",
      },
    })
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
  return new Response(JSON.stringify({ error: message }), {
    status,
    headers: { ...corsHeaders(origin), "Content-Type": "application/json" },
  })
}
