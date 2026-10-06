import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa"
import { Link } from "../i18n/Link"
import { Link as RouterLink } from "react-router-dom"
import { Mail, Phone, MapPin, ArrowLeftRight } from "lucide-react"
import logoUrl from "../assets/images/logo.jpeg"
import SDGBadges from "./SDGBadges"
import { useBrand } from "../brand/brand"

/**
 * Brand-aware footer. Youth (and anything that falls back to Youth) gets the
 * nonprofit footer with the legal registration line. Med is a paid service,
 * so it gets neutral business copy and must never show nonprofit claims.
 */
export default function Footer() {
  const isMed = useBrand() === "med"
  const contactEmail = isMed ? "med@rydn.ca" : "info@rydn.ca"

  return (
    <footer className="mt-24 bg-gradient-to-br from-slate-50 via-white to-sky-50/40 dark:from-slate-900 dark:via-slate-900 dark:to-slate-950 border-t border-slate-200 dark:border-slate-800">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        {/* Top: 4 columns */}
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-12">
          {/* Brand + newsletter */}
          <div className="lg:col-span-5">
            <Link to="/" className="inline-flex items-center gap-2">
              <img src={logoUrl} alt={isMed ? "RooZ Med logo" : "RYDN logo"} className="h-12 w-auto" />
            </Link>
            <p className="mt-4 max-w-md text-slate-600 dark:text-slate-400 leading-relaxed">
              {isMed
                ? "RooZ Med helps students get into English-taught medicine, dentistry, and pharmacy programs in Italy, with IMAT preparation, 1-on-1 tutoring, and admissions consulting."
                : "A Canadian nonprofit connecting students with advisors who can guide them through academics, career paths, and life decisions — for free."}
            </p>

            {/* Newsletter */}
            <form
              className="mt-6 max-w-md"
              onSubmit={(e) => {
                e.preventDefault()
                const data = new FormData(e.currentTarget)
                const email = data.get("email")
                const list = isMed ? "RooZ Med" : "RYDN"
                window.location.href = `mailto:${contactEmail}?subject=Newsletter signup&body=Please add me to the ${list} newsletter: ${email}`
              }}
            >
              <label htmlFor="newsletter" className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                Stay in the loop
              </label>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                {isMed
                  ? "Get IMAT tips, key dates, and admissions updates. No spam."
                  : "Get updates on workshops and new advisors. No spam."}
              </p>
              <div className="mt-3 flex gap-2">
                <input
                  id="newsletter"
                  name="email"
                  type="email"
                  required
                  placeholder="you@example.com"
                  className="flex-1 rounded-full border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 dark:text-slate-100 px-4 py-2.5 text-sm placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                />
                <button
                  type="submit"
                  className="inline-flex items-center justify-center rounded-full bg-slate-900 dark:bg-sky-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-sky-600 dark:hover:bg-sky-500"
                >
                  Subscribe
                </button>
              </div>
            </form>
          </div>

          {isMed ? (
            <>
              {/* Med only has the landing page so far, so link its sections.
                  The brand-aware Link resolves "/#x" to /med#x (or /<lang>/med#x). */}
              <div className="lg:col-span-2">
                <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-slate-100">RooZ Med</h2>
                <ul className="mt-4 space-y-3 text-slate-600 dark:text-slate-400">
                  <li><Link to="/#plan-builder" className="hover:text-emerald-700 dark:hover:text-emerald-400 transition">Build your plan</Link></li>
                  <li><Link to="/#services" className="hover:text-emerald-700 dark:hover:text-emerald-400 transition">Services</Link></li>
                  <li><Link to="/#free-consultation" className="hover:text-emerald-700 dark:hover:text-emerald-400 transition">Free consultation</Link></li>
                </ul>
              </div>

              <div className="lg:col-span-2">
                <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-slate-100">Programs</h2>
                <ul className="mt-4 space-y-3 text-slate-600 dark:text-slate-400">
                  <li>Medicine</li>
                  <li>Dentistry</li>
                  <li>Pharmacy</li>
                </ul>
              </div>
            </>
          ) : (
            <>
              {/* Programs */}
              <div className="lg:col-span-2">
                <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-slate-100">Programs</h2>
                <ul className="mt-4 space-y-3 text-slate-600 dark:text-slate-400">
                  <li><Link to="/" className="hover:text-sky-700 dark:hover:text-sky-400 transition">Advising</Link></li>
                  <li><Link to="/workshops" className="hover:text-sky-700 dark:hover:text-sky-400 transition">Workshops</Link></li>
                  <li><Link to="/blog" className="hover:text-sky-700 dark:hover:text-sky-400 transition">Blog</Link></li>
                  <li><Link to="/become-advisor" className="hover:text-sky-700 dark:hover:text-sky-400 transition">Become an Advisor</Link></li>
                  <li><Link to="/partner-with-us" className="hover:text-sky-700 dark:hover:text-sky-400 transition">Partnerships</Link></li>
                </ul>
              </div>

              {/* About */}
              <div className="lg:col-span-2">
                <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-slate-100">Organization</h2>
                <ul className="mt-4 space-y-3 text-slate-600 dark:text-slate-400">
                  <li><Link to="/about-us" className="hover:text-sky-700 dark:hover:text-sky-400 transition">About Us</Link></li>
                  <li><Link to="/our-team" className="hover:text-sky-700 dark:hover:text-sky-400 transition">Our Team</Link></li>
                  <li><Link to="/governance" className="hover:text-sky-700 dark:hover:text-sky-400 transition">Governance</Link></li>
                  <li><Link to="/press" className="hover:text-sky-700 dark:hover:text-sky-400 transition">Press & Media</Link></li>
                  <li><Link to="/donation" className="hover:text-sky-700 dark:hover:text-sky-400 transition">Support Us</Link></li>
                  <li><Link to="/contact-us" className="hover:text-sky-700 dark:hover:text-sky-400 transition">Contact</Link></li>
                </ul>
              </div>
            </>
          )}

          {/* Contact */}
          <div className="lg:col-span-3">
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-slate-100">Contact</h2>
            <ul className="mt-4 space-y-3 text-slate-600 dark:text-slate-400">
              <li className="flex items-start gap-3">
                <Mail size={16} className="mt-1 text-sky-600 shrink-0" />
                <a href={`mailto:${contactEmail}`} className="hover:text-sky-700 dark:hover:text-sky-400 transition">{contactEmail}</a>
              </li>
              <li className="flex items-start gap-3">
                <Phone size={16} className="mt-1 text-sky-600 shrink-0" />
                <a href="tel:+16474983938" className="hover:text-sky-700 dark:hover:text-sky-400 transition">(647) 498-3938</a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={16} className="mt-1 text-sky-600 shrink-0" />
                <span>Richmond Hill, ON, Canada</span>
              </li>
            </ul>

            {/* Social, these are the nonprofit's accounts, so Youth only */}
            {!isMed && (
              <div className="mt-6 flex gap-2">
                <a
                  href="https://www.linkedin.com/company/rooz-youth-development-network"
                  target="_blank" rel="noreferrer noopener" aria-label="LinkedIn"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 transition hover:bg-sky-600 hover:text-white hover:border-sky-600"
                >
                  <FaLinkedinIn className="h-4 w-4" />
                </a>
                <a
                  href="https://www.facebook.com/profile.php?id=61578801275086"
                  target="_blank" rel="noreferrer noopener" aria-label="Facebook"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 transition hover:bg-sky-600 hover:text-white hover:border-sky-600"
                >
                  <FaFacebookF className="h-4 w-4" />
                </a>
                <a
                  href="https://instagram.com/rydn.ca"
                  target="_blank" rel="noreferrer noopener" aria-label="Instagram"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 transition hover:bg-sky-600 hover:text-white hover:border-sky-600"
                >
                  <FaInstagram className="h-4 w-4" />
                </a>
              </div>
            )}
          </div>
        </div>

        {/* UN SDG alignment badges (nonprofit only) */}
        {!isMed && (
          <div className="mt-12 pt-6 border-t border-slate-200 dark:border-slate-800">
            <SDGBadges />
          </div>
        )}

        {/* Bottom bar */}
        <div className="mt-8 border-t border-slate-200 dark:border-slate-800 pt-6 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          {isMed ? (
            <div className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
              <p>RooZ Med · Study Medicine in Italy</p>
              <p className="mt-0.5 text-xs">
                IMAT preparation, tutoring &amp; admissions consulting · © {new Date().getFullYear()} RooZ Med
              </p>
            </div>
          ) : (
            <div className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
              <p>RooZ Youth Development Network · Réseau de développement de la jeunesse RooZ</p>
              <p className="mt-0.5 text-xs">
                Registered Canadian nonprofit · Ontario Corp. No.&nbsp;1001539743 · © {new Date().getFullYear()}
              </p>
            </div>
          )}
          <div className="text-sm text-slate-500 dark:text-slate-400 flex gap-4 flex-wrap items-center">
            {/* Legal pages are shared org-wide and only exist under /youth,
                so we use absolute RouterLink paths — the brand-aware Link
                would try to rewrite them under /med/* on Med pages, 404ing. */}
            <RouterLink to="/youth/privacy-policy" className="hover:text-slate-900 dark:hover:text-slate-100 transition">Privacy</RouterLink>
            <span aria-hidden>·</span>
            <RouterLink to="/youth/terms-of-service" className="hover:text-slate-900 dark:hover:text-slate-100 transition">Terms</RouterLink>
            <span aria-hidden>·</span>
            <RouterLink to="/youth/contact-us" className="hover:text-slate-900 dark:hover:text-slate-100 transition">Contact</RouterLink>
            <span aria-hidden>·</span>
            {/* Native RouterLink — bypasses the brand-aware Link so this
                genuinely goes to the gateway (not back to Youth homepage). */}
            <RouterLink
              to="/"
              className="inline-flex items-center gap-1.5 hover:text-slate-900 dark:hover:text-slate-100 transition"
            >
              <ArrowLeftRight size={13} />
              Switch brand
            </RouterLink>
          </div>
        </div>
      </div>
    </footer>
  )
}
