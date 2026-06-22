import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa"
import { Link } from "../i18n/Link"
import { Mail, Phone, MapPin } from "lucide-react"
import logoUrl from "../assets/images/logo.jpeg"
import SDGBadges from "./SDGBadges"

export default function Footer() {
  return (
    <footer className="mt-24 bg-gradient-to-br from-slate-50 via-white to-sky-50/40 dark:from-slate-900 dark:via-slate-900 dark:to-slate-950 border-t border-slate-200 dark:border-slate-800">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        {/* Top: 4 columns */}
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-12">
          {/* Brand + newsletter */}
          <div className="lg:col-span-5">
            <Link to="/" className="inline-flex items-center gap-2">
              <img src={logoUrl} alt="RYDN logo" className="h-12 w-auto" />
            </Link>
            <p className="mt-4 max-w-md text-slate-600 dark:text-slate-400 leading-relaxed">
              A Canadian nonprofit connecting students with advisors who can guide them through
              academics, career paths, and life decisions — for free.
            </p>

            {/* Newsletter */}
            <form
              className="mt-6 max-w-md"
              onSubmit={(e) => {
                e.preventDefault()
                const data = new FormData(e.currentTarget)
                const email = data.get("email")
                window.location.href = `mailto:info@rydn.ca?subject=Newsletter signup&body=Please add me to the RYDN newsletter: ${email}`
              }}
            >
              <label htmlFor="newsletter" className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                Stay in the loop
              </label>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                Get updates on workshops and new advisors. No spam.
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

          {/* Contact */}
          <div className="lg:col-span-3">
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900 dark:text-slate-100">Contact</h2>
            <ul className="mt-4 space-y-3 text-slate-600 dark:text-slate-400">
              <li className="flex items-start gap-3">
                <Mail size={16} className="mt-1 text-sky-600 shrink-0" />
                <a href="mailto:info@rydn.ca" className="hover:text-sky-700 dark:hover:text-sky-400 transition">info@rydn.ca</a>
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

            {/* Social */}
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
          </div>
        </div>

        {/* UN SDG alignment badges */}
        <div className="mt-12 pt-6 border-t border-slate-200 dark:border-slate-800">
          <SDGBadges />
        </div>

        {/* Bottom bar */}
        <div className="mt-8 border-t border-slate-200 dark:border-slate-800 pt-6 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <div className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
            <p>RooZ Youth Development Network · Réseau de développement de la jeunesse RooZ</p>
            <p className="mt-0.5 text-xs">
              Registered Canadian nonprofit · Ontario Corp. No.&nbsp;1001539743 · © {new Date().getFullYear()}
            </p>
          </div>
          <div className="text-sm text-slate-500 dark:text-slate-400 flex gap-4 flex-wrap">
            <Link to="/privacy-policy" className="hover:text-slate-900 dark:hover:text-slate-100 transition">Privacy</Link>
            <span aria-hidden>·</span>
            <Link to="/terms-of-service" className="hover:text-slate-900 dark:hover:text-slate-100 transition">Terms</Link>
            <span aria-hidden>·</span>
            <Link to="/contact-us" className="hover:text-slate-900 dark:hover:text-slate-100 transition">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
