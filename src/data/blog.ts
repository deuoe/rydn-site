/**
 * Blog post registry — single source of truth for /blog and /blog/:slug.
 *
 * Adding a new article = adding one entry to ARTICLES below. Articles are
 * stored as plain data (no markdown parser dependency), with the body as
 * an array of "blocks" so each post can mix paragraphs, headings, lists,
 * pull-quotes, and CTAs without needing a CMS.
 *
 * If/when we outgrow this, swap to MDX or a headless CMS — the BlogPost
 * page only needs to consume the same data shape.
 */

import type { Advisor } from "./advisors"
import { ADVISORS } from "./advisors"

export type BlockParagraph = { type: "p"; text: string }
export type BlockHeading = { type: "h2" | "h3"; text: string }
export type BlockList = { type: "ul" | "ol"; items: string[] }
export type BlockQuote = { type: "quote"; text: string; cite?: string }
export type BlockCallout = { type: "callout"; text: string; tone?: "info" | "tip" | "warning" }
export type BlockCta = { type: "cta"; text: string; href: string; label: string }

export type ArticleBlock =
  | BlockParagraph
  | BlockHeading
  | BlockList
  | BlockQuote
  | BlockCallout
  | BlockCta

export type ArticleCategory =
  | "preMed"
  | "applications"
  | "studyTips"
  | "careers"
  | "international"
  | "founderNotes"

export const CATEGORY_LABELS: Record<ArticleCategory, string> = {
  preMed: "Pre-med",
  applications: "Applications",
  studyTips: "Study tips",
  careers: "Careers",
  international: "International students",
  founderNotes: "Founder notes",
}

export type Article = {
  /** URL slug — used in /blog/:slug */
  slug: string
  /** Article headline */
  title: string
  /** 1-2 sentence summary shown on the index and at the top of the post */
  excerpt: string
  /** Author — references an Advisor slug for byline + photo */
  authorSlug?: string
  /** Optional override if author isn't in the advisor registry */
  authorName?: string
  /** ISO date (YYYY-MM-DD) */
  publishedDate: string
  /** Estimated reading time in minutes */
  readMinutes: number
  /** Primary category (one) — drives the filter chip */
  category: ArticleCategory
  /** Free-text tags for SEO + future filtering */
  tags?: string[]
  /** Body content as ordered blocks */
  body: ArticleBlock[]
}

// Helper to look up an author advisor (for byline rendering on the post page)
export function getAuthor(article: Article): Advisor | undefined {
  if (!article.authorSlug) return undefined
  return ADVISORS.find((a) => a.slug === article.authorSlug)
}

export function getArticleBySlug(slug: string): Article | undefined {
  return ARTICLES.find((a) => a.slug === slug)
}

/**
 * Sort articles newest first. Used by the index page and by the
 * "related articles" widget at the bottom of each post.
 */
export function listArticlesNewestFirst(): Article[] {
  return [...ARTICLES].sort((a, b) =>
    a.publishedDate < b.publishedDate ? 1 : -1
  )
}

// ============================================================
// SEED ARTICLES
// ============================================================

export const ARTICLES: Article[] = [
  // ----------------------------------------------------------
  {
    slug: "pre-med-in-canada-complete-guide",
    title: "Choosing pre-med in Canada: a complete guide for high school students",
    excerpt:
      "Pre-med isn't a program in Canada — it's a path. Here's how to actually plan for medical school admission, course by course, year by year, without burning out.",
    authorSlug: "sara-roozbahani",
    publishedDate: "2026-06-15",
    readMinutes: 9,
    category: "preMed",
    tags: ["pre-med", "Canada", "university applications", "high school", "MCAT"],
    body: [
      {
        type: "p",
        text: "Here's something nobody tells you in Grade 11: \"pre-med\" isn't a program you can apply to in Canada. It's not a major. It's not a degree. It's a category of choices you start making in high school and keep making through your undergrad — choices about courses, GPA, research, volunteering, and ultimately your MCAT and medical school applications. This guide walks through how to actually plan that journey, written from inside it.",
      },
      {
        type: "h2",
        text: "What pre-med actually means in Canada",
      },
      {
        type: "p",
        text: "Most Canadian medical schools accept students from ANY undergraduate background, as long as you've completed certain prerequisite courses (typically a year of biology, chemistry, biochemistry, and sometimes physics or English). So technically, you can major in music and still apply to med school. In practice though, most successful applicants choose a science-heavy program because it covers the prereqs naturally, plus the MCAT tests Biology, Chemistry, Biochemistry, Physics, Sociology, and Psychology.",
      },
      {
        type: "p",
        text: "Popular Canadian \"pre-med\" undergraduate paths include: Bachelor of Science (general), Health Sciences (McMaster's program is famous for this), Biomedical Sciences, Life Sciences, Biology, Biochemistry, Psychology, and Kinesiology. None of them are objectively better — what matters is GPA, MCAT, and the rest of your application.",
      },
      {
        type: "callout",
        tone: "tip",
        text: "The single most predictive factor for getting into Canadian med school is your GPA — not the prestige of your undergrad program. Picking a program you can excel in beats picking a 'harder' program where you'll struggle.",
      },
      {
        type: "h2",
        text: "Grade-by-grade roadmap",
      },
      {
        type: "h3",
        text: "Grade 11 — Lay the foundation",
      },
      {
        type: "ul",
        items: [
          "Take Grade 11 Biology, Chemistry, Physics, and a strong English course. These set you up for Grade 12 requirements.",
          "Get involved in ONE meaningful extracurricular (sports, club, volunteering) — not five shallow ones.",
          "Start tracking your grades. Canadian med schools care about average GPA, often weighted by year, so consistency matters.",
        ],
      },
      {
        type: "h3",
        text: "Grade 12 — Apply to undergrad",
      },
      {
        type: "ul",
        items: [
          "Pick 6 Grade 12 courses that include Biology, Chemistry, Advanced Functions, Calculus & Vectors, English, and one elective. These are the standard prereqs for science programs at Canadian universities.",
          "Apply to OUAC by January for Ontario universities. Most med-friendly programs (McMaster Health Sci, U of T Life Sci, Waterloo Bio, Queen's Health Sci) have higher cutoffs — aim for ~92%+ in your top 6.",
          "Some programs (McMaster Health Sci especially) require a supplementary application — these are personal-essay heavy and shouldn't be left to the last minute.",
        ],
      },
      {
        type: "h3",
        text: "Year 1 of undergrad — Don't break your GPA",
      },
      {
        type: "ul",
        items: [
          "First-year courses often have the steepest GPA drops because the workload jump from high school is real. Many students take a smaller course load (4 instead of 5) in the first term.",
          "Find a study system that works for YOU — not what worked in Grade 12.",
          "Start exploring research opportunities through professor office hours, NSERC USRA grants (Year 2+), or volunteer lab assistant roles.",
        ],
      },
      {
        type: "h3",
        text: "Years 2-3 — Build your application",
      },
      {
        type: "ul",
        items: [
          "Hit the MCAT prerequisites if you haven't yet: a year of biology, gen chem, organic chem, biochem, physics (often), and intro to psychology + sociology.",
          "Volunteer consistently in one or two settings (hospital, community, research). Med schools want depth, not breadth.",
          "Take the MCAT the summer between Year 3 and Year 4, OR the summer between Year 2 and Year 3 if you're targeting early/3-year applications.",
        ],
      },
      {
        type: "h3",
        text: "Year 4 — Apply",
      },
      {
        type: "ul",
        items: [
          "Canadian med school applications open in summer; deadlines are typically October-November.",
          "OMSAS (Ontario), AMS (Alberta), McGill, UBC each have their own portals.",
          "Personal statement work starts in spring. Get someone to read it — ideally several people, including someone who's recently applied (or a RYDN advisor who has).",
        ],
      },
      {
        type: "h2",
        text: "The three things that move the needle most",
      },
      {
        type: "ol",
        items: [
          "GPA — Canadian med schools care more than US ones. Below 3.7 (out of 4.0) is hard. Above 3.85 opens most doors.",
          "MCAT — A balanced score above 510 is the rough threshold. Some schools weight subsections differently.",
          "Personal statement + interview — These differentiate between qualified applicants. They reward authenticity and clarity over polish.",
        ],
      },
      {
        type: "h2",
        text: "What we wish more high school students knew",
      },
      {
        type: "p",
        text: "Pre-med doesn't have to be a straight path. The most successful applicants we've talked to had a winding journey — switching programs, taking a gap year, transferring schools, doing research that surprised them. Med schools don't just want straight-A robots. They want people who can think about why they want to be doctors and who have the resilience to handle a 7+ year journey.",
      },
      {
        type: "p",
        text: "If you're in high school right now wondering if pre-med is for you: focus on doing well in Grade 12, picking an undergrad program you'll enjoy, and getting some exposure to healthcare (volunteer at a hospital, shadow a doctor, work as a personal support worker). The rest will unfold as you figure out what you actually love.",
      },
      {
        type: "cta",
        text: "Want to talk through your specific situation with someone 2-3 years ahead of you?",
        href: "/#advisors",
        label: "Find a free advisor",
      },
    ],
  },

  // ----------------------------------------------------------
  {
    slug: "mcat-prep-timeline-canadian-students",
    title: "The MCAT prep timeline: what to do 12, 6, and 3 months out",
    excerpt:
      "A realistic month-by-month roadmap for Canadian pre-med students preparing for the MCAT — without the burnout, the panic, or the $4,000 prep course.",
    authorSlug: "helia",
    publishedDate: "2026-06-08",
    readMinutes: 7,
    category: "preMed",
    tags: ["MCAT", "pre-med", "study plan", "Canada", "exam prep"],
    body: [
      {
        type: "p",
        text: "Most MCAT prep advice online is American — focused on July admission cycles, $4,000 prep courses, and 90-day cram sprints. As Canadian pre-med students, our timelines are different. We're applying to OMSAS in October, our schools weight GPA more heavily, and most of us don't have the budget for Princeton Review.",
      },
      {
        type: "p",
        text: "Here's a realistic prep timeline built for Canadian undergrads — primarily for someone targeting a summer test date (May, June, or July) before fall applications.",
      },
      {
        type: "h2",
        text: "12 months out — Foundation phase",
      },
      {
        type: "p",
        text: "If you haven't already, finish your MCAT prerequisite courses. The MCAT covers biology, biochemistry, general chemistry, organic chemistry, physics, sociology, and psychology. If you've taken these in undergrad, you have the foundation. If not, this is when to schedule them.",
      },
      {
        type: "ul",
        items: [
          "Take the AAMC sample test (free) just to see where you land cold.",
          "Buy The Princeton Review or Kaplan books used (cost: $50-150 vs. $300+ new).",
          "Set up a study calendar — but don't actually start grinding yet.",
        ],
      },
      {
        type: "h2",
        text: "6 months out — Content phase",
      },
      {
        type: "p",
        text: "This is when content review starts. The goal: cover all the material once before you start doing full practice tests. About 15-20 hours per week.",
      },
      {
        type: "ul",
        items: [
          "Work through one book or section per week (Biology Week 1, Chemistry Week 2, etc.).",
          "Make Anki flashcards as you go. They're free, they're spaced-repetition, and they'll save you in the last month.",
          "End each week with a section-specific practice test. Track which topics you keep missing.",
        ],
      },
      {
        type: "callout",
        tone: "tip",
        text: "Don't try to memorize everything. The MCAT tests reasoning more than recall. If you understand the underlying concept, you can derive details.",
      },
      {
        type: "h2",
        text: "3 months out — Practice phase",
      },
      {
        type: "p",
        text: "Switch from content review to full-length practice tests. Take one AAMC-style test per week, time it like the real thing (7.5 hours including breaks), and spend the rest of the week reviewing every single question you missed.",
      },
      {
        type: "ul",
        items: [
          "Use the AAMC official practice tests (4 currently) — these are the most representative.",
          "Supplement with Blueprint or Kaplan practice tests for variety.",
          "Score after each test. Aim for steady improvement, not perfection.",
          "Stop ALL new content review after the second practice test. Focus only on the gaps you keep missing.",
        ],
      },
      {
        type: "h2",
        text: "1 week out — Taper",
      },
      {
        type: "p",
        text: "The most counterintuitive advice: don't cram. Athletes don't run a marathon the day before race day. Studying hard in the final week often hurts test-day performance more than it helps.",
      },
      {
        type: "ul",
        items: [
          "Light review only — flashcards, formula sheets, your weakest topics.",
          "Sleep 8+ hours every night.",
          "Take ONE last practice test 4-5 days out, then stop.",
          "Day before: drive to the test centre to make sure you know the route. Pack snacks. Sleep early.",
        ],
      },
      {
        type: "h2",
        text: "What we'd skip",
      },
      {
        type: "p",
        text: "Save your money on these:",
      },
      {
        type: "ul",
        items: [
          "$4,000 prep courses — most of their content is in the books you can buy used.",
          "Multiple Q-banks — pick one (UWorld is good but expensive; AAMC's official one is essential).",
          "Apps that promise to gamify MCAT prep. The studies don't show they work.",
        ],
      },
      {
        type: "cta",
        text: "Want a study plan tailored to your timeline and current scores?",
        href: "/#advisors",
        label: "Book a free session with an MCAT advisor",
      },
    ],
  },

  // ----------------------------------------------------------
  {
    slug: "writing-personal-statement-canadian-universities",
    title: "How to write a personal statement that actually gets read",
    excerpt:
      "Admissions readers spend less than 4 minutes on each statement. Here's how to write the kind they remember — for Canadian undergrad, medical, and graduate applications.",
    authorSlug: "sahar",
    publishedDate: "2026-05-30",
    readMinutes: 8,
    category: "applications",
    tags: ["personal statement", "university applications", "writing", "essay", "Canada"],
    body: [
      {
        type: "p",
        text: "The personal statement is the most rewritten, agonized-over part of every Canadian university application — and the most misunderstood. Here's the truth: an admissions reader spends 3-4 minutes on yours, max. They've read 200 statements that week. They're tired. If your opening sentence doesn't earn the next one, they'll skim. This guide is about writing the kind that doesn't get skimmed.",
      },
      {
        type: "h2",
        text: "Step 1: Find the moment, not the theme",
      },
      {
        type: "p",
        text: "Most personal statement drafts open with a theme: \"Ever since I was young, I've been passionate about helping people.\" These all sound the same to the reader. The fix isn't to find a more original theme — it's to start with a specific moment that the theme reveals itself through.",
      },
      {
        type: "p",
        text: "Instead of: \"I've always loved science.\" Try: \"It was 11:47 PM, I was alone in the genetics lab, and my hands were shaking.\"",
      },
      {
        type: "p",
        text: "The first sentence puts the reader in your head. They want to know what happens next. That's the difference between a statement that gets read and one that gets skimmed.",
      },
      {
        type: "h2",
        text: "Step 2: Pick the right scope",
      },
      {
        type: "p",
        text: "Personal statements fail in two opposite directions: too broad (a vague life summary) or too narrow (one anecdote with no implications). The sweet spot is two or three connected moments that reveal a pattern of how you think or act.",
      },
      {
        type: "p",
        text: "Bad: \"I have been involved in many activities including swim team, debate club, hospital volunteering, and tutoring.\" (This is a resume, not a story.)",
      },
      {
        type: "p",
        text: "Good: \"In the same week that my chemistry teacher gave me back my first 95 and my grandmother was diagnosed with diabetes, I started reading every paper I could find on glycaemic control. Three years later, I'm running a small study at my university on insulin resistance.\" (This connects moments, shows growth, hints at the future.)",
      },
      {
        type: "h2",
        text: "Step 3: Cut the resume voice",
      },
      {
        type: "p",
        text: "The number-one mistake: writing your statement in the voice of a resume. Phrases like \"developed leadership skills,\" \"demonstrated commitment to,\" \"contributed to a diverse team\" — these are dead language. They show the reader nothing.",
      },
      {
        type: "callout",
        tone: "tip",
        text: "Read your draft out loud. Anywhere you sound like a LinkedIn profile, rewrite it as if you're telling a friend over coffee. That's almost always better.",
      },
      {
        type: "h2",
        text: "Step 4: Show the change, not the conclusion",
      },
      {
        type: "p",
        text: "Most statements try to end with neat conclusions: \"and that's why I want to be a doctor.\" Stronger statements end with the change in thinking, not the final destination.",
      },
      {
        type: "p",
        text: "Compare these endings:",
      },
      {
        type: "ul",
        items: [
          "\"This experience confirmed that medicine is my calling.\" — generic, sounds rehearsed.",
          "\"I used to think medicine was about knowing the right answer. Now I think it's about asking the right question while someone is afraid. I want to keep learning how to do that.\" — specific, honest, shows reflection.",
        ],
      },
      {
        type: "h2",
        text: "Step 5: Edit ruthlessly",
      },
      {
        type: "p",
        text: "A personal statement is a tiny essay. Every paragraph that doesn't earn its place needs to go. After your first draft, ask each paragraph: \"What would be lost if I deleted this?\" If the answer is \"not much,\" cut it.",
      },
      {
        type: "ul",
        items: [
          "First draft: write it in one sitting, don't self-edit. Capture the raw version.",
          "Second draft (next day): cut 30% of the word count. Most of it was filler.",
          "Third draft: read aloud. Fix what sounds awkward.",
          "Fourth draft: have ONE person you trust read it. Listen to where they got confused, not whether they liked it.",
          "Fifth draft: final polish. Stop editing.",
        ],
      },
      {
        type: "h2",
        text: "A quick checklist",
      },
      {
        type: "ul",
        items: [
          "Does the opening sentence make me want to read the second sentence?",
          "Does each paragraph reveal something new about how you think or act?",
          "Could I cut 20% of the words without losing meaning? (If yes, do it.)",
          "Does the ending reflect growth, not just a conclusion?",
          "Would the person I describe in this statement actually recognize themselves?",
        ],
      },
      {
        type: "p",
        text: "If you can answer yes to all five, you've written something that admissions readers will remember.",
      },
      {
        type: "cta",
        text: "Want someone to actually read your draft and give specific feedback?",
        href: "/#advisors",
        label: "Find an advisor who's been there",
      },
    ],
  },
]
