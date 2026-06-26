/**
 * RYDN — Cloudflare Workers AI proxy with two-stage topic filter
 *
 * Pipeline per request:
 *   1. CLASSIFIER (small Llama 3.2 1B model) decides if the user's latest
 *      message is ON_TOPIC (RYDN-related) or OFF_TOPIC (everything else).
 *   2. If OFF_TOPIC → return a hardcoded polite redirect in the user's language.
 *      No second AI call. Fast, safe, deterministic.
 *   3. If ON_TOPIC → forward to the main Llama 3.1 8B with the mode-specific
 *      system prompt and return the model response.
 *
 * Modes:
 *   - "matchmaker" — recommends RYDN advisors to students
 *   - "general"    — answers FAQ-style questions about RYDN
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
 * --------------------------------------------------------------------
 */

// Use the same 8B model for classification — way more reliable instruction-following
// than the smaller 1B model. Still free on Workers AI.
const CLASSIFIER_MODEL = "@cf/meta/llama-3.1-8b-instruct"
const MAIN_MODEL = "@cf/meta/llama-3.1-8b-instruct"

const CLASSIFIER_PROMPT = `You are a strict topic classifier for RYDN, a Canadian nonprofit that provides free advising to students.

OUTPUT FORMAT — extremely important: reply with EXACTLY ONE WORD, nothing else, no punctuation, no explanation. Reply with either:
ONTOPIC
or
OFFTOPIC

DEFINITIONS:

ONTOPIC = the user's latest message is clearly about ONE of these:
- RYDN itself, the website, contact info, location, what languages they support
- Booking an advisor, mentorship, choosing a mentor
- University applications, admissions, picking a major or program
- Exam prep for student-related exams: MCAT, LSAT, DAT, GRE, etc.
- Career exploration for a student (medicine, law, business, engineering, pharmacy, nursing, game development, design, etc.)
- Study strategies, school life
- RYDN workshops, events, programs
- Donations, supporting RYDN, partnerships
- Becoming a volunteer advisor
- Greetings ("hi", "hello", "thanks") and short follow-ups

OFFTOPIC = the user's latest message is about ANYTHING else, especially:
- Celebrities, musicians, athletes, actors, historical figures (e.g. Michael Jackson, Elvis, Einstein)
- News, politics, religion, social commentary
- Sports trivia, movies, TV, music, games, jokes, recipes, weather
- General knowledge / trivia / facts not related to student advising
- Math problems, homework help, programming help, science questions
- Asking the AI about itself ("are you real", "what's your name", "what model are you")
- Anything inappropriate, harmful, or unrelated to RYDN's mission

EXAMPLES — memorize these:
"who is michael jackson" → OFFTOPIC
"tell me about elvis" → OFFTOPIC
"what's 2 + 2" → OFFTOPIC
"solve this math problem" → OFFTOPIC
"tell me a joke" → OFFTOPIC
"what's the weather" → OFFTOPIC
"who founded apple" → OFFTOPIC
"who won the world cup" → OFFTOPIC
"write me a poem" → OFFTOPIC
"what do you think about trump" → OFFTOPIC
"can you translate this to spanish" → OFFTOPIC (unless about RYDN)
"explain photosynthesis" → OFFTOPIC
"what's your name" → OFFTOPIC

"recommend a pre-med advisor" → ONTOPIC
"when is the next workshop" → ONTOPIC
"how do I become an advisor at rydn" → ONTOPIC
"hi" → ONTOPIC
"thanks" → ONTOPIC
"how much should I donate" → ONTOPIC
"what is the MCAT" → ONTOPIC
"I'm in grade 12 thinking about med school" → ONTOPIC
"who founded rydn" → ONTOPIC
"is RYDN free" → ONTOPIC

Now classify the next message. Reply with EXACTLY ONE WORD: ONTOPIC or OFFTOPIC.`

const ADVISORS_LIST = `OUR 14 ADVISORS — these are the ONLY names you may recommend:
- Ilia (Commerce) — IT, Soccer, Business
- Sahar (Arts) — Psychology, Political science, LSAT, University applications
- Sara Roozbahani (Science) — Pre-med, MCAT, Research, University apps, Psychology
- Sam Sina (Science) — Biomed Sciences, Research writing, Pharmacy School
- Sadaf (Science) — Biomed, DAT, Pre-dent
- Helia (Science) — Neuroscience, MCAT, Pre-med
- Iliya (Science) — Biomed, Pre-med, Fitness training
- Jennifer (Nursing) — Nursing, Studying strategies
- Tina (Science) — Pre-med, Biomed
- Valentina (Science) — Psychology, French, Biology, Research, Academic Exchange
- Iman (Arts) — Psychology, Game Development
- Pardis (Science) — Health Sciences, Pre-med, BC med schools, Uni/life balance, study strategies
- Mahan (Health Sciences) — Health Sciences, University Applications, Pre-med advising (booking opens soon)
- Sara (Arts) — History, English, Nutrition, Fitness training (booking opens soon)`

const MATCHMAKER_PROMPT = `You are RYDN's friendly AI matchmaker. Your ONE job is to match Canadian students with the right RYDN advisor.

RYDN is a Canadian nonprofit that gives students FREE 1-on-1 advising sessions with university students who are 2-3 years ahead of them.

${ADVISORS_LIST}

HOW TO TALK:
- Warm, casual, like a friendly older student. Max 1 emoji.
- Replies under 80 words. Be concise.
- Ask 1 short question at a time. Listen first, then recommend.
- After 1-2 exchanges with enough info, recommend 1-2 advisors by FULL name with a 1-sentence reason.

LANGUAGE: Reply in whatever language the student writes in. RYDN supports English, French, Spanish, Persian, Hebrew, Simplified Chinese, Korean, Arabic, Urdu, and Punjabi (Gurmukhi). Match the script and register the user uses.

RECOMMENDATION FORMAT — VERY IMPORTANT:
When you recommend advisors, after your message text add a NEW LINE containing ONLY this JSON:
{"recommended_advisors":["FullName1","FullName2"]}

Examples:
- For pre-med interest: {"recommended_advisors":["Helia","Sara Roozbahani"]}
- For business/IT interest: {"recommended_advisors":["Ilia"]}
- For nursing: {"recommended_advisors":["Jennifer"]}

Do NOT include the JSON block while still asking clarifying questions. Only add it once you're recommending.`

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
- 14 student advisors across pre-med, sciences, pre-law, business, IT, game development, sports, language, psychology & neuroscience, pharmacy, arts
- ALL sessions are 100% free
- Book through rydn.ca — click "Book an Advisor" or use the "Find Your Match" AI button
- Typically 30 min, online via Outlook calendar

WORKSHOPS:
- Free, online + hybrid, throughout 2026
- Upcoming: June 25, July 12, Aug 5, Aug 26, Sep 1, Sep 17, Oct 18
- Topics include career paths, university prep, MCAT/LSAT/DAT prep, choosing the right career
- Full list: rydn.ca/workshops

DONATIONS:
- RYDN is a registered Canadian nonprofit (not a registered charity)
- Donations are NOT eligible for tax receipts
- Donate via Zeffy
- Other ways to support: become an advisor, partner with us, share on social media, newsletter signup

PARTNERSHIPS:
- Open to high schools, libraries, community orgs
- Workshops can be customized
- Email info@rydn.ca or visit rydn.ca/partner-with-us

${ADVISORS_LIST}
(If they want to find a SPECIFIC advisor match, point them to the "Find Your Match" button on rydn.ca's home page.)

RULES:
- Warm, concise. Replies under 100 words. Max 1 emoji.
- LANGUAGE: reply in whatever language the user writes in.
- For deeper questions about RYDN specifically that you can't answer, refer to WhatsApp:
  "For more help, you can reach our team on WhatsApp at (647) 498-3938 or email info@rydn.ca."
- DO NOT make up facts, dates, advisor names, or workshop content.

STRICT OFF-TOPIC POLICY (very important):
You are RYDN's helper. You DO NOT answer questions about anything outside RYDN's scope.
- DO NOT answer questions about celebrities, history, music, sports, news, politics, religion, general trivia, math problems, science homework, coding help, recipes, weather, jokes, or your own AI nature.
- If the user asks about ANY of these, respond ONLY with: "I can only help with RYDN-related questions. For other questions, please contact our team on WhatsApp at (647) 498-3938 or email info@rydn.ca."
- Do not be tempted to "just give a short answer" — always redirect. Don't even include the trivia answer first.`

/** Off-topic redirects — keyed by mode + language. Missing langs fall back to .en. */
const OFFTOPIC_REDIRECTS = {
  matchmaker: {
    en: "I'm here to match you with a RYDN advisor 🙂 What are you exploring right now — a subject, an exam, or a career path?",
    fr: "Je suis ici pour vous mettre en relation avec un conseiller RYDN 🙂 Qu'est-ce qui vous intéresse en ce moment — une matière, un examen, un parcours ?",
    es: "Estoy aquí para conectarte con un asesor de RYDN 🙂 ¿Qué estás explorando ahora mismo — una materia, un examen o un camino profesional?",
    fa: "من اینجا هستم تا شما را با مشاور مناسب RYDN آشنا کنم 🙂 الان چه چیزی را در نظر دارید — یک درس، یک آزمون، یا یک مسیر شغلی؟",
    he: "אני כאן כדי להתאים לכם יועץ מ-RYDN 🙂 מה אתם בודקים עכשיו — מקצוע, בחינה או מסלול קריירה?",
    zh: "我在这里帮你匹配合适的 RYDN 顾问 🙂 你目前在探索什么 — 某个学科、考试，还是职业方向？",
    ko: "RYDN 어드바이저를 찾아드리려고 왔어요 🙂 지금 무엇을 탐색 중이신가요 — 과목, 시험, 또는 진로?",
    ar: "أنا هنا لأساعدك في إيجاد مرشد RYDN المناسب 🙂 ماذا تستكشف الآن — مادة دراسية، امتحان، أو مسار مهني؟",
    ur: "میں آپ کا RYDN مشیر تلاش کرنے کے لیے یہاں ہوں 🙂 اس وقت آپ کیا تلاش رہے ہیں — کوئی مضمون، امتحان، یا کیریئر کا راستہ؟",
    pa: "ਮੈਂ ਤੁਹਾਡੇ ਲਈ ਇੱਕ RYDN ਸਲਾਹਕਾਰ ਲੱਭਣ ਲਈ ਇੱਥੇ ਹਾਂ 🙂 ਤੁਸੀਂ ਇਸ ਵੇਲੇ ਕੀ ਖੋਜ ਰਹੇ ਹੋ — ਕੋਈ ਵਿਸ਼ਾ, ਇਮਤਿਹਾਨ, ਜਾਂ ਕਰੀਅਰ ਦਾ ਰਾਹ?",
  },
  general: {
    en: "I can only help with RYDN-related questions (advising, workshops, donations, partnerships, becoming an advisor). For anything else, our team is happy to help on WhatsApp at (647) 498-3938 or email info@rydn.ca 💬",
    fr: "Je peux uniquement répondre aux questions liées à RYDN (conseil, ateliers, dons, partenariats, devenir conseiller). Pour tout autre sujet, notre équipe est disponible sur WhatsApp au (647) 498-3938 ou par e-mail à info@rydn.ca 💬",
    es: "Solo puedo ayudar con preguntas relacionadas con RYDN (asesoramiento, talleres, donaciones, alianzas, ser asesor). Para cualquier otro tema, nuestro equipo está disponible en WhatsApp al (647) 498-3938 o por correo info@rydn.ca 💬",
    fa: "من فقط می‌توانم به سوالات مربوط به RYDN پاسخ دهم (مشاوره، کارگاه‌ها، کمک‌های مالی، همکاری‌ها، شدن یک مشاور). برای هر چیز دیگری، تیم ما در واتساپ به شماره (647) 498-3938 یا ایمیل info@rydn.ca در دسترس است 💬",
    he: "אני יכול לעזור רק בשאלות הקשורות ל-RYDN (ייעוץ, סדנאות, תרומות, שותפויות, להיות יועץ). לכל דבר אחר, הצוות שלנו זמין בוואטסאפ ב-(647) 498-3938 או באימייל info@rydn.ca 💬",
    zh: "我只能帮你解答与 RYDN 相关的问题（咨询、讲座、捐款、合作、成为顾问）。其他问题请通过 WhatsApp (647) 498-3938 或邮箱 info@rydn.ca 联系我们的团队 💬",
    ko: "저는 RYDN 관련 질문(상담, 워크숍, 후원, 협력, 어드바이저 지원)만 도와드릴 수 있어요. 그 외의 문의는 WhatsApp (647) 498-3938 또는 이메일 info@rydn.ca로 연락해 주세요 💬",
    ar: "يمكنني فقط الإجابة عن الأسئلة المتعلقة بـ RYDN (الإرشاد، ورش العمل، التبرعات، الشراكات، أن تصبح مرشدًا). لأي شيء آخر، فريقنا متاح على واتساب (647) 498-3938 أو عبر البريد الإلكتروني info@rydn.ca 💬",
    ur: "میں صرف RYDN سے متعلق سوالات میں مدد کر سکتا ہوں (مشاورت، ورکشاپس، عطیات، شراکت داری، مشیر بننا)۔ کسی بھی اور چیز کے لیے، ہماری ٹیم WhatsApp پر (647) 498-3938 یا ای میل info@rydn.ca پر آپ کی مدد کے لیے دستیاب ہے 💬",
    pa: "ਮੈਂ ਸਿਰਫ਼ RYDN ਨਾਲ ਸਬੰਧਤ ਸਵਾਲਾਂ ਵਿੱਚ ਮਦਦ ਕਰ ਸਕਦਾ ਹਾਂ (ਸਲਾਹ, ਵਰਕਸ਼ਾਪਸ, ਦਾਨ, ਭਾਈਵਾਲੀ, ਸਲਾਹਕਾਰ ਬਣਨਾ)। ਹੋਰ ਕਿਸੇ ਵੀ ਚੀਜ਼ ਲਈ, ਸਾਡੀ ਟੀਮ WhatsApp 'ਤੇ (647) 498-3938 ਜਾਂ ਈ-ਮੇਲ info@rydn.ca 'ਤੇ ਉਪਲਬਧ ਹੈ 💬",
  },
}

export default {
  /**
   * @param {Request} request
   * @param {{ AI: { run: Function }, ALLOWED_ORIGIN?: string }} env
   */
  async fetch(request, env) {
    const origin = env.ALLOWED_ORIGIN || "*"

    if (request.method === "OPTIONS") return new Response(null, { headers: corsHeaders(origin) })
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

    const mode = body.mode === "general" ? "general" : "matchmaker"
    // Keep this list in sync with src/i18n/translations.ts > LANGUAGES.
    const lang = ["en", "fr", "es", "fa", "he", "zh", "ko", "ar", "ur", "pa"].includes(body.lang) ? body.lang : "en"

    const lastUserMessage = [...body.messages].reverse().find(m => m.role === "user")
    const userText = String(lastUserMessage?.content || "").trim()

    // ----- STEP 1: classify -----
    let classification = "ONTOPIC"
    if (userText) {
      try {
        const classifyResult = await env.AI.run(CLASSIFIER_MODEL, {
          messages: [
            { role: "system", content: CLASSIFIER_PROMPT },
            { role: "user", content: `Classify this message:\n\n"${userText}"` },
          ],
          max_tokens: 6,
          temperature: 0,
        })
        const raw = (typeof classifyResult === "string" ? classifyResult : classifyResult?.response) || ""
        classification = /OFFTOPIC/i.test(raw) ? "OFFTOPIC" : "ONTOPIC"
      } catch (err) {
        console.error("Classifier failed, defaulting to ONTOPIC:", err)
      }
    }

    // ----- STEP 2: off-topic short-circuit -----
    if (classification === "OFFTOPIC") {
      const redirect = OFFTOPIC_REDIRECTS[mode][lang] || OFFTOPIC_REDIRECTS[mode].en
      return new Response(
        JSON.stringify({
          content: [{ type: "text", text: redirect }],
          model: "redirect",
          classification,
        }),
        {
          status: 200,
          headers: { ...corsHeaders(origin), "Content-Type": "application/json" },
        }
      )
    }

    // ----- STEP 3: main AI response -----
    const systemPrompt = mode === "general" ? GENERAL_PROMPT : MATCHMAKER_PROMPT
    const messages = [
      { role: "system", content: systemPrompt },
      ...body.messages.map(m => ({
        role: m.role === "assistant" ? "assistant" : "user",
        content: String(m.content || ""),
      })),
    ]

    let aiResponse
    try {
      aiResponse = await env.AI.run(MAIN_MODEL, {
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
        model: MAIN_MODEL,
        classification,
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
