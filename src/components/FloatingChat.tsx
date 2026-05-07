import { useEffect, useRef, useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import { MessageCircle, X, Mail } from "lucide-react"
import { FaWhatsapp, FaTelegram } from "react-icons/fa"
import type { IconType } from "react-icons"
import type { LucideIcon } from "lucide-react"

/**
 * Floating quick-contact button (bottom-right).
 *
 * Tap → expands to show WhatsApp / Telegram / Email options. Each option opens
 * the relevant native app or mailto link. Closes on outside-click.
 *
 * --------------------------------------------------------------------
 * TODO — verify these channels are actually set up before going live:
 *
 *   1. WhatsApp: confirm +1 (647) 498-3938 has a WhatsApp account.
 *      If you use a separate WhatsApp Business number, swap it below.
 *      Format: digits only, country code first (no + or spaces).
 *
 *   2. Telegram: replace TELEGRAM_USERNAME with your real Telegram handle
 *      (without the @). E.g. if your channel is @rydnca, use "rydnca".
 *      If you don't use Telegram, set it to null and that option hides.
 *
 *   3. Email already wired to info@rydn.ca.
 * --------------------------------------------------------------------
 */
const WHATSAPP_NUMBER: string | null = "16474983938"
const TELEGRAM_USERNAME: string | null = "rydn_ca" // TODO replace with real
const EMAIL = "info@rydn.ca"

const PREFILL_MESSAGE = "Hi RYDN! I have a question about advising."

type Channel = {
  name: string
  Icon: IconType | LucideIcon
  href: string
  bg: string
}

export default function FloatingChat() {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false)
    }
    document.addEventListener("mousedown", onClick)
    document.addEventListener("keydown", onKey)
    return () => {
      document.removeEventListener("mousedown", onClick)
      document.removeEventListener("keydown", onKey)
    }
  }, [])

  const channels: Channel[] = [
    ...(WHATSAPP_NUMBER
      ? [{
          name: "WhatsApp",
          Icon: FaWhatsapp as IconType,
          href: `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(PREFILL_MESSAGE)}`,
          bg: "bg-emerald-500 hover:bg-emerald-600",
        }]
      : []),
    ...(TELEGRAM_USERNAME
      ? [{
          name: "Telegram",
          Icon: FaTelegram as IconType,
          href: `https://t.me/${TELEGRAM_USERNAME}`,
          bg: "bg-sky-500 hover:bg-sky-600",
        }]
      : []),
    {
      name: "Email",
      Icon: Mail as LucideIcon,
      href: `mailto:${EMAIL}?subject=${encodeURIComponent("Question for RYDN")}&body=${encodeURIComponent(PREFILL_MESSAGE)}`,
      bg: "bg-slate-700 hover:bg-slate-800",
    },
  ]

  return (
    <div
      ref={ref}
      className="fixed right-4 lg:right-6 z-30 bottom-[calc(env(safe-area-inset-bottom)+6.5rem)] lg:bottom-6"
    >
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 12 }}
            transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
            className="absolute bottom-full right-0 mb-3 flex flex-col items-end gap-2 min-w-[170px]"
          >
            {channels.map((c, i) => (
              <motion.a
                key={c.name}
                href={c.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.04 }}
                className={`inline-flex items-center gap-2.5 pl-4 pr-5 py-2.5 rounded-full text-white text-sm font-semibold shadow-lg transition ${c.bg}`}
              >
                <c.Icon className="h-4 w-4" />
                <span>{c.name}</span>
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileTap={{ scale: 0.92 }}
        onClick={() => setOpen(o => !o)}
        aria-label={open ? "Close chat options" : "Open chat options"}
        aria-expanded={open}
        className="relative inline-flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-sky-500 to-indigo-600 text-white shadow-xl hover:shadow-2xl transition focus:outline-none focus:ring-4 focus:ring-sky-300/50"
      >
        <AnimatePresence mode="wait" initial={false}>
          {open ? (
            <motion.span
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <X size={22} />
            </motion.span>
          ) : (
            <motion.span
              key="chat"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <MessageCircle size={24} />
            </motion.span>
          )}
        </AnimatePresence>

        {/* Subtle pulse ring on first load to draw the eye */}
        <span className="absolute inset-0 rounded-full bg-sky-500/40 animate-ping pointer-events-none opacity-30" />
      </motion.button>
    </div>
  )
}
