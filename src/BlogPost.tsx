import { useParams } from "react-router-dom"
import { motion } from "motion/react"
import { ArrowLeft, ArrowRight, Calendar, Clock, Share2, Sparkles } from "lucide-react"
import Container from "./components/Container"
import SkeletonImage from "./components/SkeletonImage"
import { Link } from "./i18n/Link"
import {
  getArticleBySlug,
  getAuthor,
  listArticlesNewestFirst,
  CATEGORY_LABELS,
  type ArticleBlock,
} from "./data/blog"
import NotFound from "./NotFound"

/**
 * /blog/:slug — individual article page.
 *
 * Renders a typed block array (paragraphs, headings, lists, callouts,
 * quotes, CTAs) into clean editorial typography. Bottom of the page
 * shows two related articles to keep readers in the blog.
 */
export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>()
  const article = slug ? getArticleBySlug(slug) : undefined

  if (!article) {
    return <NotFound />
  }

  const author = getAuthor(article)
  const related = listArticlesNewestFirst()
    .filter((a) => a.slug !== article.slug && a.category === article.category)
    .slice(0, 2)

  const handleShare = async () => {
    if (typeof navigator === "undefined") return
    const url = window.location.href
    const text = `${article.title} — ${article.excerpt}`
    if (navigator.share) {
      try {
        await navigator.share({ title: article.title, text, url })
      } catch {
        /* user cancelled */
      }
    } else if (navigator.clipboard) {
      navigator.clipboard.writeText(url)
      alert("Link copied to clipboard")
    }
  }

  return (
    <>
      {/* ===================== HERO ===================== */}
      <section className="relative isolate -mt-20 pt-32 pb-12 overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-sky-900">
        <div className="grain -z-10" />
        <div className="absolute -top-20 -left-20 -z-10 h-96 w-96 rounded-full bg-sky-500/30 blur-3xl animate-float" />
        <div
          className="absolute -bottom-32 -right-32 -z-10 h-[28rem] w-[28rem] rounded-full bg-amber-400/20 blur-3xl animate-float"
          style={{ animationDelay: "2s" }}
        />

        <Container>
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-sm text-white/80 hover:text-white transition mb-8"
          >
            <ArrowLeft size={16} /> All articles
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl"
          >
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur px-4 py-1.5 text-xs font-semibold text-white border border-white/20">
              <Sparkles size={12} className="text-amber-300" />
              {CATEGORY_LABELS[article.category]}
            </span>
            <h1 className="font-display mt-6 text-4xl sm:text-5xl md:text-6xl font-semibold text-white leading-[1.1]">
              {article.title}
            </h1>
            <p className="mt-6 max-w-3xl text-lg sm:text-xl text-white/85 leading-relaxed">
              {article.excerpt}
            </p>

            {/* Byline + metadata */}
            <div className="mt-8 flex items-center gap-4 flex-wrap">
              {author?.photo && (
                <SkeletonImage
                  src={author.photo}
                  alt={author.name}
                  shape="rounded-full"
                  className="w-12 h-12 ring-2 ring-white/30"
                />
              )}
              <div className="text-white">
                <p className="text-sm font-semibold">
                  {author?.name ?? article.authorName ?? "RYDN team"}
                </p>
                <p className="text-xs text-white/70 flex items-center gap-2 mt-0.5">
                  <Calendar size={12} />
                  {formatDate(article.publishedDate)}
                  <span aria-hidden>·</span>
                  <Clock size={12} />
                  {article.readMinutes} min read
                </p>
              </div>

              <button
                onClick={handleShare}
                className="ml-auto inline-flex items-center gap-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white px-4 py-2 text-sm font-semibold backdrop-blur transition"
                aria-label="Share article"
              >
                <Share2 size={14} />
                Share
              </button>
            </div>
          </motion.div>
        </Container>
      </section>

      {/* ===================== ARTICLE BODY ===================== */}
      <article className="py-16 bg-white">
        <Container>
          <div className="max-w-3xl mx-auto">
            {article.body.map((block, idx) => (
              <Block key={idx} block={block} />
            ))}

            {/* Author bio card at the end */}
            {author && (
              <div className="mt-16 rounded-3xl bg-slate-50 border border-slate-200 p-7 flex gap-5 items-center">
                <SkeletonImage
                  src={author.photo}
                  alt={author.name}
                  shape="rounded-full"
                  className="w-16 h-16 ring-2 ring-white shadow shrink-0"
                />
                <div className="flex-1">
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Written by
                  </p>
                  <p className="mt-1 font-bold text-slate-900">{author.name}</p>
                  <p className="text-sm text-slate-600">{author.description}</p>
                </div>
                <Link
                  to={`/advisors/${author.slug}`}
                  className="inline-flex items-center gap-2 rounded-full bg-slate-900 text-white px-4 py-2 text-sm font-semibold hover:bg-sky-600 transition whitespace-nowrap"
                >
                  Read story <ArrowRight size={14} />
                </Link>
              </div>
            )}
          </div>
        </Container>
      </article>

      {/* ===================== RELATED ===================== */}
      {related.length > 0 && (
        <section className="py-16 bg-slate-50">
          <Container>
            <div className="max-w-5xl mx-auto">
              <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-sky-600 text-center">
                Keep reading
              </p>
              <h2 className="mt-3 font-display text-3xl sm:text-4xl font-semibold text-slate-900 text-center">
                Related articles
              </h2>
              <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-gradient-to-r from-sky-400 via-indigo-500 to-amber-400" />

              <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
                {related.map((r) => {
                  const rAuthor = getAuthor(r)
                  return (
                    <Link
                      key={r.slug}
                      to={`/blog/${r.slug}`}
                      className="group block rounded-3xl bg-white border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition p-6"
                    >
                      <span className="inline-flex items-center gap-1 rounded-full bg-sky-50 text-sky-700 px-3 py-1 text-xs font-semibold border border-sky-100">
                        {CATEGORY_LABELS[r.category]}
                      </span>
                      <h3 className="mt-3 font-display text-lg font-bold text-slate-900 leading-tight group-hover:text-sky-700 transition">
                        {r.title}
                      </h3>
                      <p className="mt-2 text-sm text-slate-600 leading-relaxed line-clamp-2">
                        {r.excerpt}
                      </p>
                      <p className="mt-3 text-xs text-slate-500 flex items-center gap-2">
                        {rAuthor?.name ?? r.authorName ?? "RYDN team"}
                        <span aria-hidden>·</span>
                        <Clock size={11} />
                        {r.readMinutes} min
                      </p>
                    </Link>
                  )
                })}
              </div>
            </div>
          </Container>
        </section>
      )}
    </>
  )
}

// ============================================================
// Block renderer
// ============================================================
function Block({ block }: { block: ArticleBlock }) {
  switch (block.type) {
    case "p":
      return (
        <p className="text-base md:text-lg text-slate-700 leading-relaxed mb-5">
          {block.text}
        </p>
      )
    case "h2":
      return (
        <h2 className="font-display text-2xl md:text-3xl font-bold text-slate-900 mt-10 mb-4">
          {block.text}
        </h2>
      )
    case "h3":
      return (
        <h3 className="font-display text-xl md:text-2xl font-bold text-slate-900 mt-8 mb-3">
          {block.text}
        </h3>
      )
    case "ul":
      return (
        <ul className="list-disc list-outside ml-6 mb-6 space-y-2 text-slate-700 leading-relaxed">
          {block.items.map((item, i) => (
            <li key={i} className="text-base md:text-lg">
              {item}
            </li>
          ))}
        </ul>
      )
    case "ol":
      return (
        <ol className="list-decimal list-outside ml-6 mb-6 space-y-2 text-slate-700 leading-relaxed">
          {block.items.map((item, i) => (
            <li key={i} className="text-base md:text-lg">
              {item}
            </li>
          ))}
        </ol>
      )
    case "quote":
      return (
        <blockquote className="border-l-4 border-sky-500 pl-5 my-6 italic text-slate-700 text-lg md:text-xl">
          "{block.text}"
          {block.cite && (
            <footer className="not-italic text-sm text-slate-500 mt-2">
              — {block.cite}
            </footer>
          )}
        </blockquote>
      )
    case "callout":
      return (
        <div
          className={
            "my-6 rounded-2xl border-l-4 p-5 " +
            (block.tone === "warning"
              ? "border-amber-500 bg-amber-50"
              : block.tone === "tip"
                ? "border-emerald-500 bg-emerald-50"
                : "border-sky-500 bg-sky-50")
          }
        >
          <p className="text-base text-slate-800 leading-relaxed">{block.text}</p>
        </div>
      )
    case "cta":
      return (
        <div className="my-10 rounded-3xl bg-gradient-to-br from-slate-900 via-sky-900 to-indigo-900 p-8 text-center text-white">
          <p className="text-lg md:text-xl font-semibold leading-tight">{block.text}</p>
          <Link
            to={block.href}
            className="mt-5 inline-flex items-center gap-2 rounded-full bg-amber-400 text-slate-900 px-6 py-3 font-bold hover:bg-amber-300 transition"
          >
            {block.label} <ArrowRight size={16} />
          </Link>
        </div>
      )
  }
}

function formatDate(iso: string): string {
  try {
    const d = new Date(iso + "T12:00:00")
    return d.toLocaleDateString("en-CA", { year: "numeric", month: "long", day: "numeric" })
  } catch {
    return iso
  }
}
