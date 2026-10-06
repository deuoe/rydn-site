/**
 * Gateway — the two-tile brand picker at the bare rydn.ca root.
 *
 * This page is intentionally outside the normal Layout (no Navbar, no Footer,
 * no FloatingBookNow). It's a canada.ca-style splash that only renders when a
 * visitor hits the exact root URL. Deep links like /youth/our-team or
 * /med/anything bypass the gateway entirely so SEO and bookmarks keep working.
 *
 * Two paths:
 *   RooZ Youth  → /youth    (free nonprofit, Canadian students, red+white)
 *   RooZ Med    → /med      (paid service, Italian med/dent/vet, green/white/red)
 */
import { useNavigate } from "react-router-dom"
import { motion } from "motion/react"
import { ArrowRight, Sparkles } from "lucide-react"
import logoUrl from "./assets/images/Logo.jpg"

/** Inline Canadian flag SVG — crisp at any size, no external asset needed. */
function CanadianFlag({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 24" className={className} xmlns="http://www.w3.org/2000/svg" aria-label="Canadian flag">
      {/* Red bars on the sides */}
      <rect x="0" y="0" width="12" height="24" fill="#D52B1E" />
      <rect x="36" y="0" width="12" height="24" fill="#D52B1E" />
      {/* White middle */}
      <rect x="12" y="0" width="24" height="24" fill="#FFFFFF" />
      {/* Simplified 11-point maple leaf centered */}
      <path
        d="M24 4.5 L25 7.5 L28 6.5 L26.5 9 L29.5 10 L26.5 11.5 L27.5 14.5 L24.5 13.5 L24 17 L23.5 13.5 L20.5 14.5 L21.5 11.5 L18.5 10 L21.5 9 L20 6.5 L23 7.5 Z"
        fill="#D52B1E"
      />
    </svg>
  )
}

/** Inline Italian flag SVG — three equal vertical stripes. */
function ItalianFlag({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 32" className={className} xmlns="http://www.w3.org/2000/svg" aria-label="Italian flag">
      <rect x="0" y="0" width="16" height="32" fill="#009246" />
      <rect x="16" y="0" width="16" height="32" fill="#FFFFFF" />
      <rect x="32" y="0" width="16" height="32" fill="#CE2B37" />
    </svg>
  )
}

type TileProps = {
  to: string
  flag: React.ReactNode
  name: string
  tagline: string
  description: string
  cta: string
  /** Tailwind classes for the hover glow — one per brand */
  glowClass: string
  /** Tailwind classes for the CTA button */
  ctaClass: string
  /** Side accent stripe color classes */
  stripeClass: string
}

function BrandTile({
  to,
  flag,
  name,
  tagline,
  description,
  cta,
  glowClass,
  ctaClass,
  stripeClass,
}: TileProps) {
  const navigate = useNavigate()
  return (
    <motion.button
      type="button"
      onClick={() => navigate(to)}
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ scale: 1.02, y: -4 }}
      whileTap={{ scale: 0.98 }}
      className="group relative flex flex-col w-full text-left overflow-hidden rounded-3xl bg-white/[0.03] backdrop-blur-xl border border-white/15 hover:border-white/30 transition-all duration-300 shadow-2xl"
    >
      {/* Hover glow — colored to the brand */}
      <div className={`pointer-events-none absolute -inset-px rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl ${glowClass}`} />

      {/* Side accent stripe */}
      <div className={`absolute left-0 top-0 bottom-0 w-1.5 ${stripeClass}`} />

      <div className="relative p-8 sm:p-10 flex flex-col h-full gap-6">
        {/* Flag badge */}
        <div className="flex items-center justify-between">
          <div className="h-10 w-20 rounded-md overflow-hidden ring-2 ring-white/20 shadow-lg">
            {flag}
          </div>
          <ArrowRight
            size={22}
            className="text-white/40 group-hover:text-white group-hover:translate-x-1 transition-all"
          />
        </div>

        {/* Name + tagline + description */}
        <div className="flex-1">
          <h2 className="font-display text-3xl sm:text-4xl font-semibold text-white tracking-tight">
            {name}
          </h2>
          <p className="mt-2 text-sm sm:text-base font-semibold text-white/70 uppercase tracking-wider">
            {tagline}
          </p>
          <p className="mt-5 text-base sm:text-lg text-white/80 leading-relaxed">
            {description}
          </p>
        </div>

        {/* CTA */}
        <div className="pt-2">
          <span
            className={`inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-bold shadow-lg group-hover:shadow-xl transition ${ctaClass}`}
          >
            {cta}
            <ArrowRight size={16} />
          </span>
        </div>
      </div>
    </motion.button>
  )
}

export default function Gateway() {
  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-slate-950">
      {/* Animated background: three large soft gradient blobs — one red (Youth),
          one green (Med), one blue (shared), slowly drifting. */}
      <div className="absolute inset-0 -z-10">
        <motion.div
          className="absolute -top-32 -left-32 h-[32rem] w-[32rem] rounded-full bg-red-500/25 blur-3xl"
          animate={{ x: [0, 40, 0], y: [0, 30, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-1/3 -right-32 h-[36rem] w-[36rem] rounded-full bg-emerald-500/25 blur-3xl"
          animate={{ x: [0, -50, 0], y: [0, -40, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-0 left-1/3 h-[28rem] w-[28rem] rounded-full bg-sky-500/15 blur-3xl"
          animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
        />
        {/* Subtle grain / noise overlay */}
        <div
          className="absolute inset-0 opacity-[0.08] mix-blend-overlay pointer-events-none"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          }}
        />
      </div>

      {/* Content column */}
      <div className="relative mx-auto flex min-h-screen max-w-6xl flex-col items-center justify-center px-6 py-16">
        {/* RooZ identity header */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center text-center"
        >
          <div className="h-20 w-20 rounded-2xl overflow-hidden ring-2 ring-white/20 shadow-2xl">
            <img src={logoUrl} alt="RooZ" className="h-full w-full object-cover" />
          </div>
          <div className="mt-5 inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur px-4 py-1.5 text-xs font-semibold text-white/90 border border-white/20">
            <Sparkles size={13} className="text-amber-300" />
            Welcome to RooZ
          </div>
          <h1 className="font-display mt-5 text-5xl sm:text-6xl md:text-7xl font-semibold text-white tracking-tight leading-[1.05]">
            Two paths.
            <br />
            <span className="bg-gradient-to-r from-red-400 via-white to-emerald-400 bg-clip-text text-transparent">
              Same mission.
            </span>
          </h1>
          <p className="mt-5 max-w-xl text-base sm:text-lg text-white/70 leading-relaxed">
            Choose your journey — whether you're exploring universities in Canada
            or chasing medicine, dentistry, or veterinary school in Italy.
          </p>
        </motion.div>

        {/* Two tiles */}
        <div className="mt-14 grid w-full gap-6 md:grid-cols-2">
          <BrandTile
            to="/youth"
            flag={<CanadianFlag className="h-full w-full" />}
            name="RooZ Youth"
            tagline="RYDN · Free for students"
            description="RooZ Youth Development Network — our Canadian nonprofit connecting students with free 1-on-1 advising, workshops, and mentorship from university students who've walked the path."
            cta="Enter RooZ Youth"
            glowClass="bg-red-500/40"
            ctaClass="bg-white text-slate-900 hover:bg-slate-100"
            stripeClass="bg-red-500"
          />
          <BrandTile
            to="/med"
            flag={<ItalianFlag className="h-full w-full" />}
            name="RooZ Med"
            tagline="IMAT · Italian medicine"
            description="Expert IMAT preparation, 1-on-1 tutoring, admissions consulting, and curated question banks for students aiming at Italian med, dental, and veterinary schools."
            cta="Enter RooZ Med"
            glowClass="bg-emerald-500/40"
            ctaClass="bg-gradient-to-r from-emerald-500 via-emerald-400 to-emerald-500 text-white hover:from-emerald-600 hover:to-emerald-600"
            stripeClass="bg-gradient-to-b from-emerald-500 via-white to-red-500"
          />
        </div>

        {/* Footer micro-copy */}
        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-14 text-center text-xs text-white/40"
        >
          <p>
            A RooZ initiative · Est. 2026 · Richmond Hill, Ontario
          </p>
        </motion.footer>
      </div>
    </main>
  )
}
