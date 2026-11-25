import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa"
import { Link } from "../i18n/Link"
import { Link as RouterLink } from "react-router-dom"
import { Mail, Phone, MapPin, ArrowLeftRight } from "lucide-react"
import logoUrl from "../assets/images/rooz-logo-reversed.png"
import SDGBadges from "./SDGBadges"
import EmailCaptureForm from "./EmailCaptureForm"
import RydnSeal from "./RydnSeal"
import MedDueLockup from "./MedDueLockup"
import { useBrand } from "../brand/brand"

/**
 * Brand-aware footer.
 *
 * - Youth gets the nonprofit footer with the legal registration line.
 * - Med is a paid service, so it gets neutral business copy and must never
 *   show nonprofit claims.
 * - Academy is commercial too (courses & training), so it gets business copy
 *   as well, no nonprofit claims, no SDG badges.
 * - France is a future nonprofit, so it gets nonprofit-style copy, but
 *   WITHOUT any registration claims: the French association is in formation
 *   and is not registered yet, so there is no corp number and no SDG badges.
 */
export default function Footer() {
  const brand = useBrand()
  const isMed = brand === "med"
  const isAcademy = brand === "academy"
  const isFrance = brand === "france"
  const isYouth = brand === "youth"
  const contactEmail = isMed ? "med@rydn.ca" : "info@rydn.ca"

  const logoAlt =
    isMed ? "RooZ Med logo"
    : isAcademy ? "RooZ Academy logo"
    : isFrance ? "RooZ France logo"
    : "RYDN logo"

  const description =
    isMed
      ? "RooZ Med helps students get into English-taught medicine, dentistry, and pharmacy programs in Italy, with IMAT preparation, 1-on-1 tutoring, and admissions consulting."
      : isAcademy
        ? "RooZ Academy is RooZ's education and training division, practical courses and training programs, built from what we've learned advising students. Programs are in development."
        : isFrance
          ? "RooZ France est le foyer français de l'écosystème RooZ, une association de jeunesse en cours de création, qui apporte les programmes RooZ et les échanges européens en France."
          : "A Canadian nonprofit connecting students with advisors who can guide them through academics, career paths, and life decisions, for free."

  const listName =
    isMed ? "RooZ Med"
    : isAcademy ? "RooZ Academy"
    : isFrance ? "RooZ France"
    : "RYDN"

  const newsletterBlurb =
    isMed
      ? "Get IMAT tips, key dates, and admissions updates. No spam."
      : isAcademy
        ? "Get notified when the first courses open. No spam."
        : isFrance
          ? "Recevez les actualités de l'association et des échanges de jeunesse. Pas de spam."
          : "Get updates on workshops and new advisors. No spam."

  // Newsletter label + button: French on the France page, English elsewhere.
  const newsletterLabel = isFrance ? "Restez informé(e)" : "Stay in the loop"
  const newsletterButton = isFrance ? "S'abonner" : "Subscribe"

  return (
    <footer className="mt-24 bg-rydn-navy-deep text-white border-t-2 border-rydn-gold">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        {/* Top: 4 columns */}
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-12">
          {/* Brand + newsletter */}
          <div className="lg:col-span-5">
            <div className="flex items-center gap-4">
              <Link to="/" className="inline-flex items-center gap-2">
                <img src={logoUrl} alt={logoAlt} className="h-12 w-auto" />
              </Link>
              <RydnSeal className="h-14 w-14 shrink-0 text-rydn-gold" />
            </div>
            {isMed && (
              <div className="mt-5">
                <MedDueLockup size="sm" />
              </div>
            )}
            <p className="mt-4 max-w-md text-slate-300 leading-relaxed">
              {description}
            </p>

            {/* Newsletter, real capture via Forminit (see EmailCaptureForm),
                not a mailto link: the address is stored, nothing depends on
                the visitor having a mail client configured. */}
            <div className="mt-6 max-w-md">
              <label htmlFor="newsletter" className="text-sm font-semibold text-white">
                {newsletterLabel}
              </label>
              <p className="mt-1 text-sm text-slate-400">
                {newsletterBlurb}
              </p>
              <div className="mt-3">
                <EmailCaptureForm
                  source={`Newsletter: ${listName}`}
                  list={listName}
                  inputId="newsletter"
                  buttonLabel={newsletterButton}
                  successMessage={isFrance ? "Merci, vous êtes inscrit(e) !" : "You're subscribed, welcome aboard!"}
                  inputClassName="flex-1 rounded-full border border-white/25 bg-white/10 text-white px-4 py-2.5 text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-rydn-gold focus:border-rydn-gold disabled:opacity-60"
                  buttonClassName="inline-flex items-center justify-center rounded-full bg-rydn-gold px-5 py-2.5 text-sm font-semibold text-rydn-navy-deep transition hover:bg-rydn-gold-light disabled:opacity-60 disabled:cursor-not-allowed"
                />
              </div>
            </div>
          </div>

          {isMed ? (
            <>
              {/* Med only has the landing page so far, so link its sections.
                  The brand-aware Link resolves "/#x" to /med#x (or /<lang>/med#x). */}
              <div className="lg:col-span-2">
                <h2 className="text-sm font-bold uppercase tracking-wider text-rydn-gold">RooZ Med</h2>
                <ul className="mt-4 space-y-3 text-slate-300">
                  <li><Link to="/#plan-builder" className="hover:text-emerald-700 dark:hover:text-emerald-400 transition">Build your plan</Link></li>
                  <li><Link to="/#services" className="hover:text-emerald-700 dark:hover:text-emerald-400 transition">Services</Link></li>
                  <li><Link to="/#free-consultation" className="hover:text-emerald-700 dark:hover:text-emerald-400 transition">Free consultation</Link></li>
                </ul>
              </div>

              <div className="lg:col-span-2">
                <h2 className="text-sm font-bold uppercase tracking-wider text-rydn-gold">Programs</h2>
                <ul className="mt-4 space-y-3 text-slate-300">
                  <li>Medicine</li>
                  <li>Dentistry</li>
                  <li>Pharmacy</li>
                </ul>
              </div>
            </>
          ) : isAcademy ? (
            <>
              {/* Academy only has the coming-soon page so far, plain text,
                  not links, so nothing here can 404. */}
              <div className="lg:col-span-2">
                <h2 className="text-sm font-bold uppercase tracking-wider text-rydn-gold">RooZ Academy</h2>
                <ul className="mt-4 space-y-3 text-slate-300">
                  <li><Link to="/" className="hover:text-amber-700 dark:hover:text-amber-400 transition">About RooZ Academy</Link></li>
                  <li>
                    <a href="mailto:info@rydn.ca?subject=RooZ Academy: I'm interested" className="hover:text-amber-700 dark:hover:text-amber-400 transition">
                      Get in touch
                    </a>
                  </li>
                </ul>
              </div>

              <div className="lg:col-span-2">
                <h2 className="text-sm font-bold uppercase tracking-wider text-rydn-gold">Coming soon</h2>
                <ul className="mt-4 space-y-3 text-slate-300">
                  <li>Courses</li>
                  <li>Training programs</li>
                  <li>Workshops</li>
                </ul>
              </div>
            </>
          ) : isFrance ? (
            <>
              {/* France only has the coming-soon page so far, plain text,
                  not links, so nothing here can 404. */}
              <div className="lg:col-span-2">
                <h2 className="text-sm font-bold uppercase tracking-wider text-rydn-gold">RooZ France</h2>
                <ul className="mt-4 space-y-3 text-slate-300">
                  <li><Link to="/" className="hover:text-blue-700 dark:hover:text-blue-400 transition">À propos de RooZ France</Link></li>
                  <li>
                    <a href="mailto:info@rydn.ca?subject=RooZ France: Je m'intéresse" className="hover:text-blue-700 dark:hover:text-blue-400 transition">
                      Nous contacter
                    </a>
                  </li>
                </ul>
              </div>

              <div className="lg:col-span-2">
                <h2 className="text-sm font-bold uppercase tracking-wider text-rydn-gold">Bientôt</h2>
                <ul className="mt-4 space-y-3 text-slate-300">
                  <li>Programmes jeunesse</li>
                  <li>Échanges européens</li>
                </ul>
              </div>
            </>
          ) : (
            <>
              {/* Programs */}
              <div className="lg:col-span-2">
                <h2 className="text-sm font-bold uppercase tracking-wider text-rydn-gold">Programs</h2>
                <ul className="mt-4 space-y-3 text-slate-300">
                  <li><Link to="/" className="hover:text-rydn-gold-light transition">Advising</Link></li>
                  <li><Link to="/workshops" className="hover:text-rydn-gold-light transition">Workshops</Link></li>
                  <li><Link to="/blog" className="hover:text-rydn-gold-light transition">Blog</Link></li>
                  <li><Link to="/become-advisor" className="hover:text-rydn-gold-light transition">Become an Advisor</Link></li>
                  <li><Link to="/partner-with-us" className="hover:text-rydn-gold-light transition">Partnerships</Link></li>
                </ul>
              </div>

              {/* About */}
              <div className="lg:col-span-2">
                <h2 className="text-sm font-bold uppercase tracking-wider text-rydn-gold">Organization</h2>
                <ul className="mt-4 space-y-3 text-slate-300">
                  <li><Link to="/about-us" className="hover:text-rydn-gold-light transition">About Us</Link></li>
                  <li><Link to="/our-team" className="hover:text-rydn-gold-light transition">Our Team</Link></li>
                  <li><Link to="/governance" className="hover:text-rydn-gold-light transition">Governance</Link></li>
                  <li><Link to="/press" className="hover:text-rydn-gold-light transition">Press & Media</Link></li>
                  <li><Link to="/donation" className="hover:text-rydn-gold-light transition">Support Us</Link></li>
                  <li><Link to="/contact-us" className="hover:text-rydn-gold-light transition">Contact</Link></li>
                </ul>
              </div>
            </>
          )}

          {/* Contact */}
          <div className="lg:col-span-3">
            <h2 className="text-sm font-bold uppercase tracking-wider text-rydn-gold">Contact</h2>
            <ul className="mt-4 space-y-3 text-slate-300">
              <li className="flex items-start gap-3">
                <Mail size={16} className="mt-1 text-rydn-gold shrink-0" />
                <a href={`mailto:${contactEmail}`} className="hover:text-rydn-gold-light transition">{contactEmail}</a>
              </li>
              <li className="flex items-start gap-3">
                <Phone size={16} className="mt-1 text-rydn-gold shrink-0" />
                <a href="tel:+16474983938" className="hover:text-rydn-gold-light transition">(647) 498-3938</a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={16} className="mt-1 text-rydn-gold shrink-0" />
                <span>Richmond Hill, ON, Canada</span>
              </li>
            </ul>

            {/* Social, these are the nonprofit's accounts, so Youth only */}
            {isYouth && (
              <div className="mt-6 flex gap-2">
                <a
                  href="https://www.linkedin.com/company/rooz-youth-development-network"
                  target="_blank" rel="noreferrer noopener" aria-label="LinkedIn"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/5 text-slate-200 transition hover:bg-rydn-gold hover:text-rydn-navy-deep hover:border-rydn-gold"
                >
                  <FaLinkedinIn className="h-4 w-4" />
                </a>
                <a
                  href="https://www.facebook.com/profile.php?id=61578801275086"
                  target="_blank" rel="noreferrer noopener" aria-label="Facebook"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/5 text-slate-200 transition hover:bg-rydn-gold hover:text-rydn-navy-deep hover:border-rydn-gold"
                >
                  <FaFacebookF className="h-4 w-4" />
                </a>
                <a
                  href="https://instagram.com/rydn.ca"
                  target="_blank" rel="noreferrer noopener" aria-label="Instagram"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/5 text-slate-200 transition hover:bg-rydn-gold hover:text-rydn-navy-deep hover:border-rydn-gold"
                >
                  <FaInstagram className="h-4 w-4" />
                </a>
              </div>
            )}
          </div>
        </div>

        {/* UN SDG alignment badges (registered Canadian nonprofit only) */}
        {isYouth && (
          <div className="mt-12 pt-6 border-t border-white/10">
            <SDGBadges />
          </div>
        )}

        {/* Bottom bar */}
        <div className="mt-8 border-t border-white/10 pt-6 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          {isMed ? (
            <div className="text-sm text-slate-400 leading-relaxed">
              <p>RooZ Med · Study Medicine in Italy</p>
              <p className="mt-0.5 text-xs">
                IMAT preparation, tutoring &amp; admissions consulting · © {new Date().getFullYear()} RooZ Med
              </p>
            </div>
          ) : isAcademy ? (
            <div className="text-sm text-slate-400 leading-relaxed">
              <p>RooZ Academy · Courses &amp; Training</p>
              <p className="mt-0.5 text-xs">
                Education &amp; training programs, in development · © {new Date().getFullYear()} RooZ Academy
              </p>
            </div>
          ) : isFrance ? (
            <div className="text-sm text-slate-400 leading-relaxed">
              <p>RooZ France · Jeunesse &amp; Échanges européens</p>
              <p className="mt-0.5 text-xs">
                Association française à but non lucratif en cours de création, pas encore enregistrée · © {new Date().getFullYear()} RooZ France
              </p>
            </div>
          ) : (
            <div className="text-sm text-slate-400 leading-relaxed">
              <p>RooZ Youth Development Network · Réseau de développement de la jeunesse RooZ</p>
              <p className="mt-0.5 text-xs">
                Registered Canadian nonprofit · Ontario Corp. No.&nbsp;1001539743 · © {new Date().getFullYear()}
              </p>
            </div>
          )}
          <div className="text-sm text-slate-400 flex gap-4 flex-wrap items-center">
            {/* Legal pages are shared org-wide and only exist under /youth,
                so we use absolute RouterLink paths, the brand-aware Link
                would try to rewrite them under /med/* on Med pages, 404ing.
                Labels are brand-aware: France visitors get French labels.
                The France Contact link goes to the French interest mailto
                rather than the English /youth/contact-us page. */}
            <RouterLink to="/youth/privacy-policy" className="hover:text-white transition">{isFrance ? "Confidentialité" : "Privacy"}</RouterLink>
            <span aria-hidden>·</span>
            <RouterLink to="/youth/terms-of-service" className="hover:text-white transition">{isFrance ? "Conditions" : "Terms"}</RouterLink>
            <span aria-hidden>·</span>
            {isFrance ? (
              <a href="mailto:info@rydn.ca?subject=RooZ France: Je m'intéresse" className="hover:text-white transition">Contact</a>
            ) : (
              <RouterLink to="/youth/contact-us" className="hover:text-white transition">Contact</RouterLink>
            )}
            <span aria-hidden>·</span>
            {/* Native RouterLink, bypasses the brand-aware Link so this
                genuinely goes to the gateway (not back to Youth homepage). */}
            <RouterLink
              to="/"
              className="inline-flex items-center gap-1.5 hover:text-white transition"
            >
              <ArrowLeftRight size={13} />
              {isFrance ? "Changer de marque" : "Switch brand"}
            </RouterLink>
          </div>
        </div>
      </div>
    </footer>
  )
}
