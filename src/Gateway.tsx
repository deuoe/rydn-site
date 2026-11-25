/**
 * Gateway, hero-first front door at the bare rydn.ca root.
 *
 * This page is intentionally outside the normal Layout (no Navbar, no Footer,
 * no FloatingBookNow). It's a canada.ca-style splash that only renders when a
 * visitor hits the exact root URL. Deep links like /youth/our-team or
 * /med/anything bypass the gateway entirely so SEO and bookmarks keep working.
 *
 * Structure: a warm hero on top (what RooZ is, with an interactive world
 * map), then the four doors below.
 *
 * Four paths:
 *   RooZ Youth    → /youth    (free nonprofit, Canadian students, red+white)
 *   RooZ Med      → /med      (paid service, Italian med/dent/vet, green/white/red)
 *   RooZ Academy  → /academy  (courses & training, coming soon, amber)
 *   RooZ France   → /france   (French youth association, in formation, blue)
 */
import { Link, useNavigate } from "react-router-dom"
import { motion, useReducedMotion } from "motion/react"
import { ArrowRight, ChevronDown, GraduationCap, Sparkles } from "lucide-react"
import logoUrl from "./assets/images/rooz-logo-reversed.png"
import WorldMap from "./components/WorldMap"
import RydnSeal from "./components/RydnSeal"

/** Inline Canadian flag SVG , crisp at any size, no external asset needed. */
function CanadianFlag({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 24" className={className} xmlns="http://www.w3.org/2000/svg" aria-label="Canadian flag">
      {/* Red bars on the sides */}
      <rect x="0" y="0" width="12" height="24" fill="#D52B1E" />
      <rect x="36" y="0" width="12" height="24" fill="#D52B1E" />
      {/* White middle */}
      <rect x="12" y="0" width="24" height="24" fill="#FFFFFF" />
      {/* 11-point maple leaf, official flag geometry (drawn on a 4800-unit
          square centred at the origin) scaled into the 24×24 white square. */}
      <path
        transform="translate(24 12) scale(0.005)"
        d="m-90 2030 45-863a95 95 0 0 0-111-98l-859 151 116-320a65 65 0 0 0-20-73l-941-762 212-99a65 65 0 0 0 34-79l-186-572 542 115a65 65 0 0 0 73-38l105-247 423 454a65 65 0 0 0 111-57l-204-1052 327 189a65 65 0 0 0 91-27l332-652 332 652a65 65 0 0 0 91 27l327-189-204 1052a65 65 0 0 0 111 57l423-454 105 247a65 65 0 0 0 73 38l542-115-186 572a65 65 0 0 0 34 79l212 99-941 762a65 65 0 0 0-20 73l116 320-859-151a95 95 0 0 0-111 98l45 863z"
        fill="#D52B1E"
      />
    </svg>
  )
}

/** Inline Italian flag SVG , three equal vertical stripes. */
function ItalianFlag({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 32" className={className} xmlns="http://www.w3.org/2000/svg" aria-label="Italian flag">
      <rect x="0" y="0" width="16" height="32" fill="#009246" />
      <rect x="16" y="0" width="16" height="32" fill="#FFFFFF" />
      <rect x="32" y="0" width="16" height="32" fill="#CE2B37" />
    </svg>
  )
}

/** Inline French flag SVG , three equal vertical stripes. */
function FrenchFlag({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 32" className={className} xmlns="http://www.w3.org/2000/svg" aria-label="French flag">
      <rect x="0" y="0" width="16" height="32" fill="#0055A4" />
      <rect x="16" y="0" width="16" height="32" fill="#FFFFFF" />
      <rect x="32" y="0" width="16" height="32" fill="#EF4135" />
    </svg>
  )
}

/** Academy badge, a GraduationCap icon instead of a national flag, since
 *  Academy isn't tied to one country. Same badge footprint as the flags. */
function AcademyBadge() {
  return (
    <div className="flex h-full w-full items-center justify-center bg-amber-400/20">
      <GraduationCap size={26} className="text-amber-300" aria-label="RooZ Academy" />
    </div>
  )
}

type TileProps = {
  to: string
  flag: React.ReactNode
  name: string
  tagline: string
  description: string
  cta: string
  /** Tailwind classes for the hover glow , one per brand */
  glowClass: string
  /** Tailwind classes for the CTA button */
  ctaClass: string
  /** Side accent stripe color classes */
  stripeClass: string
  /** Small status chip shown on the tile, e.g. "Free". Optional: a tile
      without one renders no chip. */
  chip?: string
  /** Tailwind classes for the chip pill */
  chipClass?: string
  /** Subtle brand-tinted wash behind the tile content */
  washClass: string
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
  chip,
  chipClass,
  washClass,
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
      className="group relative flex flex-col w-full min-w-0 text-left overflow-hidden rounded-3xl bg-white/[0.03] backdrop-blur-xl border border-white/15 hover:border-white/30 transition-all duration-300 shadow-2xl"
    >
      {/* Brand-tinted wash */}
      <div className={`pointer-events-none absolute inset-0 ${washClass}`} />
      {/* Hover glow , colored to the brand */}
      <div className={`pointer-events-none absolute -inset-px rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl ${glowClass}`} />

      {/* Side accent stripe */}
      <div className={`absolute left-0 top-0 bottom-0 w-1.5 ${stripeClass}`} />

      {/* Tighter padding at lg so four-across tiles don't feel cramped */}
      <div className="relative p-8 sm:p-10 lg:p-6 flex flex-col h-full gap-6">
        {/* Flag badge + status chip */}
        <div className="flex items-center justify-between gap-3">
          <div className="h-10 w-20 rounded-md overflow-hidden ring-2 ring-white/20 shadow-lg">
            {flag}
          </div>
          {chip ? (
            <span className={`inline-flex items-center rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wider ${chipClass}`}>
              {chip}
            </span>
          ) : null}
          <ArrowRight
            size={22}
            className="text-white/40 group-hover:text-white group-hover:translate-x-1 transition-all shrink-0"
          />
        </div>

        {/* Name + tagline + description */}
        <div className="flex-1">
          <h2 className="font-display text-3xl sm:text-4xl lg:text-3xl font-semibold text-white tracking-tight">
            {name}
          </h2>
          <p className="mt-2 text-sm sm:text-base font-semibold text-white/70 uppercase tracking-wider">
            {tagline}
          </p>
          <p className="mt-5 text-base sm:text-lg lg:text-base text-white/80 leading-relaxed">
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
  const scrollToPaths = () => {
    document.getElementById("paths")?.scrollIntoView({ behavior: "smooth" })
  }
  // Visitors who ask for less motion get a still background: the blobs
  // render in place instead of drifting forever.
  const reduceMotion = useReducedMotion()

  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-rydn-navy-deep">
      {/* Animated background: four large soft gradient blobs , one red (Youth),
          one green (Med), one amber (Academy), one blue (France/shared),
          slowly drifting. Covers the whole page, hero + doors. */}
      <div className="absolute inset-0 -z-10">
        <motion.div
          className="absolute -top-32 -left-32 h-[32rem] w-[32rem] rounded-full bg-red-500/25 blur-3xl"
          animate={reduceMotion ? undefined : { x: [0, 40, 0], y: [0, 30, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-1/3 -right-32 h-[36rem] w-[36rem] rounded-full bg-emerald-500/25 blur-3xl"
          animate={reduceMotion ? undefined : { x: [0, -50, 0], y: [0, -40, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-0 left-1/3 h-[28rem] w-[28rem] rounded-full bg-sky-500/15 blur-3xl"
          animate={reduceMotion ? undefined : { x: [0, 30, 0], y: [0, -20, 0] }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -bottom-24 -right-24 h-[26rem] w-[26rem] rounded-full bg-amber-500/15 blur-3xl"
          animate={reduceMotion ? undefined : { x: [0, -30, 0], y: [0, 25, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
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

      {/* ===== HERO, what RooZ is, first ===== */}
      <section className="relative mx-auto flex min-h-screen max-w-7xl flex-col items-center justify-center px-6 py-16 text-center">
        {/* RooZ identity header */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center"
        >
          <div className="h-20 w-20 rounded-2xl overflow-hidden ring-2 ring-white/20 shadow-2xl">
            <img src={logoUrl} alt="RooZ" className="h-full w-full object-cover" />
          </div>
          <div className="mt-5 inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur px-4 py-1.5 text-xs font-semibold text-white/90 border border-white/20">
            <Sparkles size={13} className="text-amber-300" />
            Mentorship · Medicine · Learning · Europe
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-display mt-5 text-5xl sm:text-6xl md:text-7xl font-semibold text-white tracking-tight leading-[1.05]"
        >
          Find your path.
          <br />
          <span className="bg-gradient-to-r from-red-400 via-white to-emerald-400 bg-clip-text text-transparent">
            We&apos;ll walk it with you.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-5 max-w-2xl text-base sm:text-lg text-white/70 leading-relaxed"
        >
          RooZ is a community that helps students find their way. Free
          mentorship in Canada, a path to medicine, dentistry and veterinary
          school in Italy, practical courses, and youth exchanges in France
          and across Europe.
        </motion.p>

        {/* Interactive world map: Toronto, Ancona, and Paris markers link
            to their paths. Fixed view, no pan or zoom, so it never hijacks
            page scroll. Same slot the photo used to occupy. */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-10 w-full max-w-4xl overflow-hidden rounded-3xl ring-2 ring-white/20 shadow-2xl"
        >
          <WorldMap />
        </motion.div>

        {/* On small screens the map markers are small tap targets, so the
            three destinations are also listed as plain links below the map.
            Hidden on sm and up, where the map itself is the navigation. */}
        <div className="mt-4 flex w-full max-w-4xl flex-col gap-2 sm:hidden">
          <Link
            to="/youth"
            className="flex items-center gap-3 rounded-2xl bg-white/5 px-4 py-3 text-left text-sm font-semibold text-white ring-1 ring-white/15 transition hover:bg-white/10"
          >
            <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-red-500" />
            Toronto: free mentorship in Canada
          </Link>
          <Link
            to="/med"
            className="flex items-center gap-3 rounded-2xl bg-white/5 px-4 py-3 text-left text-sm font-semibold text-white ring-1 ring-white/15 transition hover:bg-white/10"
          >
            <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-emerald-500" />
            Ancona, Italy: study medicine
          </Link>
          <Link
            to="/france"
            className="flex items-center gap-3 rounded-2xl bg-white/5 px-4 py-3 text-left text-sm font-semibold text-white ring-1 ring-white/15 transition hover:bg-white/10"
          >
            <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-blue-500" />
            France: youth exchanges
          </Link>
        </div>

        {/* Scroll cue to the doors */}
        <motion.a
          href="#paths"
          onClick={(e) => {
            e.preventDefault()
            scrollToPaths()
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-10 inline-flex flex-col items-center gap-1 text-sm font-semibold text-white/70 transition hover:text-white"
        >
          Choose your path
          <motion.span
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.6, repeat: Infinity }}
          >
            <ChevronDown size={20} />
          </motion.span>
        </motion.a>
      </section>

      {/* ===== DOORS, the four paths ===== */}
      <section id="paths" className="relative mx-auto max-w-7xl scroll-mt-8 px-6 pb-16">
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center font-display text-4xl sm:text-5xl md:text-6xl font-semibold text-white tracking-tight leading-[1.05]"
        >
          Four paths.
          <br />
          <span className="bg-gradient-to-r from-red-400 via-white to-emerald-400 bg-clip-text text-transparent">
            Same mission.
          </span>
        </motion.h2>

        {/* Four tiles, 4 across on lg, 2×2 on md, stacked below */}
        <div className="mt-12 grid w-full gap-6 md:grid-cols-2 lg:grid-cols-4">
          <BrandTile
            to="/youth"
            flag={<CanadianFlag className="h-full w-full" />}
            name="RooZ Youth"
            tagline="RYDN · Free for students"
            description="RooZ Youth Development Network: our Canadian nonprofit connecting students with free 1-on-1 advising, workshops, and mentorship from university students who've walked the path."
            cta="Enter RooZ Youth"
            glowClass="bg-red-500/40"
            ctaClass="bg-white text-slate-900 hover:bg-slate-100"
            stripeClass="bg-red-500"
            chip="Free"
            chipClass="bg-red-500/20 text-red-100 ring-1 ring-red-400/40"
            washClass="bg-red-500/[0.06]"
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
            stripeClass="bg-emerald-500"
            washClass="bg-emerald-500/[0.06]"
          />
          <BrandTile
            to="/academy"
            flag={<AcademyBadge />}
            name="RooZ Academy"
            tagline="Courses · Skills · Growth"
            description="Practical courses and training programs from the RooZ team, built from what we've learned advising students. Programs are in development; enrolment isn't open yet."
            cta="Explore RooZ Academy"
            glowClass="bg-amber-500/40"
            ctaClass="bg-gradient-to-r from-amber-400 via-amber-500 to-orange-500 text-slate-900 hover:from-amber-500 hover:to-orange-600"
            stripeClass="bg-amber-500"
            chip="Coming soon"
            chipClass="bg-amber-500/20 text-amber-100 ring-1 ring-amber-400/40"
            washClass="bg-amber-500/[0.06]"
          />
          <BrandTile
            to="/france"
            flag={<FrenchFlag className="h-full w-full" />}
            name="RooZ France"
            tagline="France · Jeunesse & Erasmus+"
            description="Une association de jeunesse en cours de création, avec des programmes et des échanges européens à venir."
            cta="Découvrir RooZ France"
            glowClass="bg-blue-500/40"
            ctaClass="bg-gradient-to-r from-blue-600 via-blue-500 to-blue-600 text-white hover:from-blue-700 hover:to-blue-700"
            stripeClass="bg-blue-600"
            chip="In formation"
            chipClass="bg-blue-500/20 text-blue-100 ring-1 ring-blue-400/40"
            washClass="bg-blue-500/[0.06]"
          />
        </div>

        {/* Footer micro-copy, script accent with the RYDN 2026 seal */}
        <motion.footer
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-14 flex flex-col items-center gap-3 text-center"
        >
          <RydnSeal className="h-12 w-12 text-rydn-gold" />
          <p className="font-script text-2xl text-white/70">
            A RooZ initiative · Est. 2026 · Richmond Hill, Ontario
          </p>
        </motion.footer>
      </section>
    </main>
  )
}
