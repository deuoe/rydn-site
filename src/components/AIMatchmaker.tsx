import { useEffect, useRef, useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import { Sparkles, X, Send, RotateCcw, ArrowRight, ExternalLink, Loader2, MessageCircleQuestion } from "lucide-react"
import { useTranslation } from "../i18n/useTranslation"
import { OPEN_AI_CHAT_EVENT, openAIChat, type AIChatMode } from "./aiChatBus"

/**
 * AI ADVISOR MATCHMAKER + GENERAL CHAT
 *
 * Two modes:
 *   - "matchmaker": recommends RYDN advisors based on what the student is exploring
 *   - "general":    answers general FAQ questions about RYDN; refers complex ones to WhatsApp
 *
 * Triggered EITHER by:
 *   a) The inline pill on the home page (dispatches a "rydn:open-ai-chat" event)
 *   b) The "Ask AI" option in the floating chat menu (dispatches same event with mode="general")
 *
 * Cloudflare Worker setup lives in cloudflare-worker/worker.js
 */
const AI_WORKER_URL = "https://rydn-ai-proxy.sam-146.workers.dev"

/** Booking links keyed by advisor name (must exactly match worker.js list). */
const ADVISOR_BOOKING_LINKS: Record<string, string | null> = {
  Ilia: "https://outlook.office.com/book/RYDN1@rydn.ca/s/WDGqbdBASEKfJ4bfCfkoEQ2",
  Sahar: "https://outlook.office.com/book/RYDN1@rydn.ca/s/PaIUazNXTkqwJRQDQA9Rqg2",
  "Sara Roozbahani": "https://outlook.office.com/book/RYDN1@rydn.ca/s/p_MxjUFix02viC9r-uO9Pg2",
  "Sam Sina": "https://outlook.office.com/book/RYDN1@rydn.ca/s/9b_p31eCcEyWYRkSozwUhw2?ismsaljsauthenabled",
  Sadaf: "https://outlook.office.com/book/RYDN1@rydn.ca/s/ynxd7Kn3y0esoVFbvnpfMw2",
  Helia: "https://outlook.office.com/book/RYDN1@rydn.ca/s/QLxjEWE6a0Chv3L9I-xj9g2",
  Iliya: "https://outlook.office.com/book/RYDN1@rydn.ca/s/z32K193SL0OAEB-b9HfH6Q2",
  Sara: null,
  Mahan: null,
  Jennifer: "https://outlook.office.com/book/RYDN1@rydn.ca/s/vJPCy85x_kC5W0yDNMEIow2",
  Tina: "https://outlook.office.com/book/RYDN1@rydn.ca/s/zRAFcE2eLEGuWGtMwvxucA2",
  Valentina: "https://outlook.office.com/book/RYDN1@rydn.ca/s/E08RGS0aKUK55tj_wj7zYQ2",
}

type Mode = AIChatMode
type Message = {
  role: "user" | "assistant"
  content: string
  recommended_advisors?: string[]
}

const STORAGE_KEY = "rydn-aichat-history"

function parseRecommendation(text: string): { clean: string; advisors: string[] | null } {
  const match = text.match(/\{\s*"recommended_advisors"\s*:\s*\[[^\]]*\]\s*\}/)
  if (!match) return { clean: text.trim(), advisors: null }
  try {
    const parsed = JSON.parse(match[0]) as { recommended_advisors: string[] }
    const clean = text.replace(match[0], "").trim()
    return { clean, advisors: parsed.recommended_advisors }
  } catch {
    return { clean: text.trim(), advisors: null }
  }
}

/**
 * The chat modal. Mount ONCE in Layout — it listens for global open events
 * dispatched via openAIChat(mode).
 */
export default function AIMatchmaker() {
  const { t, lang } = useTranslation()
  const [open, setOpen] = useState(false)
  const [mode, setMode] = useState<Mode>("matchmaker")
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const bottomRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Listen for global open events
  useEffect(() => {
    const handler = (e: Event) => {
      const ce = e as CustomEvent<{ mode?: Mode }>
      const newMode: Mode = ce.detail?.mode === "general" ? "general" : "matchmaker"
      // If switching mode, reset the conversation so prompts don't get mixed
      if (newMode !== mode) {
        setMessages([])
        setError(null)
        setInput("")
      }
      setMode(newMode)
      setOpen(true)
    }
    window.addEventListener(OPEN_AI_CHAT_EVENT, handler)
    return () => window.removeEventListener(OPEN_AI_CHAT_EVENT, handler)
  }, [mode])

  // Restore chat history on mount
  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY)
      if (saved) {
        const parsed = JSON.parse(saved) as { mode: Mode; messages: Message[] }
        if (parsed.messages) setMessages(parsed.messages)
        if (parsed.mode) setMode(parsed.mode)
      }
    } catch {
      /* ignore */
    }
  }, [])

  // Persist on change
  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ mode, messages }))
    } catch {
      /* ignore */
    }
  }, [mode, messages])

  // Scroll on new message
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, loading])

  // Focus input on open
  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 200)
  }, [open])

  const reset = () => {
    setMessages([])
    setError(null)
    setInput("")
  }

  const send = async () => {
    const text = input.trim()
    if (!text || loading) return
    setError(null)

    const newMessages: Message[] = [...messages, { role: "user", content: text }]
    setMessages(newMessages)
    setInput("")
    setLoading(true)

    try {
      const res = await fetch(AI_WORKER_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mode,
          lang,
          messages: newMessages.map(m => ({ role: m.role, content: m.content })),
        }),
      })

      const data = await res.json().catch(() => ({}))

      if (!res.ok) {
        const detail = data?.error?.message || data?.error || `HTTP ${res.status}`
        console.error("[AIMatchmaker] worker error:", detail, data)
        setError(`${t("matchmaker.error")} (${detail})`)
        return
      }

      const reply: string = data?.content?.[0]?.text ?? data?.completion ?? ""
      if (!reply) {
        console.error("[AIMatchmaker] empty reply:", data)
        setError(`${t("matchmaker.error")} (empty response)`)
        return
      }

      const { clean, advisors } =
        mode === "matchmaker" ? parseRecommendation(reply) : { clean: reply.trim(), advisors: null }

      setMessages([
        ...newMessages,
        { role: "assistant", content: clean, recommended_advisors: advisors ?? undefined },
      ])
    } catch (e) {
      console.error("[AIMatchmaker]", e)
      setError(`${t("matchmaker.error")} (${e instanceof Error ? e.message : "network"})`)
    } finally {
      setLoading(false)
    }
  }

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      send()
    }
  }

  // Mode-dependent strings
  const titleText = mode === "general" ? t("matchmaker.generalTitle") : t("matchmaker.title")
  const subtitleText = mode === "general" ? t("matchmaker.generalSubtitle") : t("matchmaker.subtitle")
  const welcomeText = mode === "general" ? t("matchmaker.generalWelcome") : t("matchmaker.welcome")
  const HeaderIcon = mode === "general" ? MessageCircleQuestion : Sparkles

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-end md:items-center justify-center p-0 md:p-6"
        >
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setOpen(false)} />

          <motion.div
            initial={{ y: 60, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 60, opacity: 0, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 280, damping: 28 }}
            className="relative w-full md:max-w-lg h-[85vh] md:h-[640px] md:max-h-[85vh] bg-white rounded-t-3xl md:rounded-3xl shadow-2xl overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="relative px-5 py-4 bg-gradient-to-br from-violet-600 via-fuchsia-600 to-rose-500 text-white">
              <div className="flex items-center gap-3">
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/15 backdrop-blur">
                  <HeaderIcon size={20} className="text-amber-200" />
                </div>
                <div className="flex-1 min-w-0">
                  <h2 className="font-display text-xl font-semibold leading-tight">{titleText}</h2>
                  <p className="text-xs text-white/80 truncate">{subtitleText}</p>
                </div>
                <button
                  onClick={() => setOpen(false)}
                  aria-label={t("matchmaker.close")}
                  className="inline-flex h-8 w-8 items-center justify-center rounded-full hover:bg-white/15 transition"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-5 space-y-4 bg-gradient-to-b from-slate-50 to-white">
              <MessageBubble role="assistant" text={welcomeText} />

              {messages.map((m, i) => (
                <div key={i}>
                  <MessageBubble role={m.role} text={m.content} />
                  {m.recommended_advisors && m.recommended_advisors.length > 0 && (
                    <div className="mt-3 ml-2 space-y-2">
                      {m.recommended_advisors.map((name, j) => {
                        const link = ADVISOR_BOOKING_LINKS[name]
                        return (
                          <a
                            key={j}
                            href={link ?? "#"}
                            target={link ? "_blank" : undefined}
                            rel={link ? "noopener noreferrer" : undefined}
                            onClick={!link ? (e) => e.preventDefault() : undefined}
                            className={
                              "block w-full rounded-2xl border p-4 shadow-sm transition " +
                              (link
                                ? "border-violet-200 bg-white hover:bg-violet-50 hover:border-violet-400 hover:shadow-md cursor-pointer"
                                : "border-slate-200 bg-slate-50 opacity-70 cursor-not-allowed")
                            }
                          >
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="font-semibold text-slate-900">{name}</p>
                                <p className="text-xs text-slate-500 mt-0.5">
                                  {link ? `${t("matchmaker.bookButton")} ${name.split(" ")[0]}` : "Booking opens soon"}
                                </p>
                              </div>
                              {link && <ExternalLink size={16} className="text-violet-600" />}
                            </div>
                          </a>
                        )
                      })}
                    </div>
                  )}
                </div>
              ))}

              {loading && (
                <div className="flex items-center gap-2 text-sm text-slate-500">
                  <Loader2 size={14} className="animate-spin" />
                  {t("matchmaker.thinking")}
                </div>
              )}

              {error && (
                <div className="rounded-xl bg-rose-50 border border-rose-200 text-rose-700 px-4 py-3 text-sm">
                  {error}
                </div>
              )}

              <div ref={bottomRef} />
            </div>

            {/* Input */}
            <div className="border-t border-slate-200 bg-white px-3 py-3 flex items-center gap-2">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={onKeyDown}
                placeholder={t("matchmaker.placeholder")}
                className="flex-1 min-w-0 rounded-full border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500"
                disabled={loading}
              />
              {messages.length > 0 && (
                <button
                  onClick={reset}
                  aria-label={t("matchmaker.reset")}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full text-slate-500 hover:bg-slate-100 transition"
                >
                  <RotateCcw size={16} />
                </button>
              )}
              <button
                onClick={send}
                disabled={!input.trim() || loading}
                aria-label={t("matchmaker.send")}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-violet-600 to-fuchsia-600 text-white disabled:opacity-40 disabled:cursor-not-allowed shadow-md hover:shadow-lg transition"
              >
                <Send size={16} />
              </button>
            </div>
            <div className="px-4 pb-3 pt-1 text-[10px] text-slate-400 text-center">
              {t("matchmaker.poweredBy")}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function MessageBubble({ role, text }: { role: "user" | "assistant"; text: string }) {
  const isUser = role === "user"
  return (
    <div className={"flex " + (isUser ? "justify-end" : "justify-start")}>
      <div
        className={
          "max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed whitespace-pre-wrap " +
          (isUser
            ? "bg-gradient-to-br from-violet-600 to-fuchsia-600 text-white"
            : "bg-white border border-slate-200 text-slate-800")
        }
      >
        {text}
      </div>
    </div>
  )
}

/**
 * Standalone trigger button that dispatches the open event with matchmaker mode.
 * Use this anywhere on the page you want a "Find Your Match" entry point.
 */
export function FindMatchButton() {
  const { t } = useTranslation()
  return (
    <button
      onClick={() => openAIChat("matchmaker")}
      className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-violet-600 via-fuchsia-600 to-rose-500 hover:from-violet-700 hover:to-rose-600 text-white px-6 py-3 font-semibold shadow-md hover:shadow-xl transition focus:outline-none focus:ring-2 focus:ring-fuchsia-500 focus:ring-offset-2"
    >
      <Sparkles size={16} />
      {t("matchmaker.cta")}
      <ArrowRight size={14} />
    </button>
  )
}
