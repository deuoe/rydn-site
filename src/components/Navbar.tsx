import { useLocation, Link as RouterLink } from "react-router-dom"
import { Link } from "../i18n/Link"
import { useLocalizedNavigate } from "../i18n/useLocalizedNav"
import { stripLangPrefix, stripBrandPrefix } from "../i18n/useLocalizedNav"
import { AnimatePresence, motion } from "motion/react"
import { useEffect, useState, type ComponentProps } from "react"
import { Calendar, Mail, ArrowLeftRight } from "lucide-react"
import logoUrl from "../assets/images/logo.jpeg"
import LanguageSwitcher from "./LanguageSwitcher"
import ThemeToggle from "./ThemeToggle"
import MedDueLockup from "./MedDueLockup"
import { ButtonLink } from "./Button"
import { buttonClasses } from "./buttonClasses"
import { useTranslation } from "../i18n/useTranslation"
import { haptic } from "../lib/rydnNative"
import { useBrand } from "../brand/brand"

/**
 * Take the user to the advisors section. From the home page, scroll smoothly.
 * From any other page, navigate to /#advisors and let HomePage scroll on mount.
 */
function bookNowHref(onHome: boolean) {
  return onHome ? "#advisors" : "/#advisors"
}

export default function Navbar() {
  const navigate = useLocalizedNavigate()
  const location = useLocation()
  const { t } = useTranslation()
  const brand = useBrand()
  const isMed = brand === "med"
  // Academy and France only have a coming-soon page each, so they get a
  // minimal nav: no Youth links (they would resolve under /academy or
  // /france and 404) and no Book Now / Support CTAs (same reason).
  const isNewBrand = brand === "academy" || brand === "france"
  const newBrandMailto =
    brand === "academy"
      ? "mailto:info@rydn.ca?subject=RooZ Academy: I'm interested"
      : "mailto:info@rydn.ca?subject=RooZ France: Je m'intéresse"
  const newBrandVariant = brand === "academy" ? "academy" as const : "france" as const
  // France is French-first: the minimal nav speaks French on the France
  // brand, whatever the URL language prefix. Academy keeps its English nav.
  const isFrance = brand === "france"
  const newBrandHome = isFrance ? "Accueil" : "Home"
  const newBrandSwitch = isFrance ? "Changer de marque" : "Switch brand"
  const newBrandContact = isFrance ? "Nous contacter" : "Get in touch"
  const newBrandContactShort = isFrance ? "Contacter" : "Contact"
  const [nav, setNav] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const toggle = () => setNav(!nav)

  // Compare against the language- AND brand-stripped path so /, /youth, /fr/youth,
  // etc. all count as the home page for layout decisions. Lets us treat the brand
  // homepage (e.g. /youth) exactly like the old root homepage for the nav state.
  const cleanPath = stripBrandPrefix(stripLangPrefix(location.pathname))
  const onHome = cleanPath === "/" || cleanPath === ""
  // Academy/France coming-soon pages have light backgrounds and no dark
  // hero, so the transparent (white-text) nav would be unreadable there,
  // the header stays solid on these brands. Youth/Med keep the transparent
  // hero nav, which is designed for their dark home heroes.
  const transparent = onHome && !scrolled && !isNewBrand

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    setNav(false)
  }, [location.pathname])

  // Nav items are brand-specific. Youth routes (free advising nonprofit) show
  // the full student-focused menu. Med routes (paid IMAT prep) show a short
  // list focused on the service, no "Become Advisor", no "Blog" etc.
  // Academy/France show Home only, they have no inner pages yet.
  const navigation = isMed
    ? [
        { name: "Home", path: "/" },
        { name: "Services", path: "/#services" },
      ]
    : isNewBrand
      ? [{ name: newBrandHome, path: "/" }]
      : [
          { name: t("nav.home"), path: "/" },
          { name: t("nav.about"), path: "/about-us" },
          { name: t("nav.ourTeam"), path: "/our-team" },
          { name: t("nav.becomeAdvisor"), path: "/become-advisor" },
          { name: t("nav.workshops"), path: "/workshops" },
          { name: t("nav.stories"), path: "/stories" },
          { name: t("nav.blog"), path: "/blog" },
        ]

  const handleBookNow = (e: React.MouseEvent) => {
    // Native iOS haptic on Book Now tap (no-op on web)
    haptic("medium")
    if (onHome) {
      e.preventDefault()
      const advisors = document.getElementById("advisors")
      if (advisors) advisors.scrollIntoView({ behavior: "smooth", block: "start" })
    }
    // Otherwise allow Link's default to navigate to /#advisors
  }

  return (
    <header
      className={
        "sticky top-0 z-40 w-full transition-all duration-300 pt-[env(safe-area-inset-top)] " +
        (transparent
          ? "bg-transparent border-b border-transparent"
          : "bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200/70 dark:border-slate-700/70 shadow-sm")
      }
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 lg:px-8 py-3">
        {/* Logo + Med Due lockup on Med pages */}
        <div className="flex items-center">
          <Link to="/" className="select-none" aria-label="RYDN home">
            <span
              className={
                "inline-flex items-center rounded-xl overflow-hidden bg-white p-1 transition-all duration-300 " +
                (transparent
                  ? "ring-1 ring-white/40 shadow-lg shadow-black/20"
                  : "ring-1 ring-slate-200 shadow-sm")
              }
            >
              <img
                src={logoUrl}
                alt="RooZ Youth Development Network logo"
                className="h-10 w-auto block"
              />
            </span>
          </Link>
          {isMed && (
            <div className="hidden lg:block ml-4">
              <MedDueLockup size="sm" tone={transparent ? "dark" : "light"} />
            </div>
          )}
        </div>

        {/* Desktop Navbar */}
        <ul className="hidden lg:flex items-center gap-1">
          {navigation.map(item => {
            const active = cleanPath === item.path || (item.path === "/" && (cleanPath === "" || cleanPath === "/"))
            return (
              <li key={item.path}>
                <button
                  onClick={() => navigate(item.path)}
                  className={
                    "relative px-3 py-2 rounded-lg text-sm font-semibold transition " +
                    (active
                      ? transparent
                        ? "text-white"
                        : "text-rydn-gold-dark dark:text-rydn-gold"
                      : transparent
                        ? "text-white/85 hover:text-white hover:bg-white/10"
                        : "text-slate-700 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-300 dark:hover:text-white dark:hover:bg-slate-800")
                  }
                >
                  {item.name}
                  {active && (
                    <motion.span
                      layoutId="nav-active"
                      className={
                        "absolute inset-x-2 -bottom-0.5 h-0.5 rounded-full " +
                        (transparent ? "bg-white" : "bg-rydn-gold")
                      }
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              </li>
            )
          })}
          <li className="ml-1">
            <LanguageSwitcher transparent={transparent} />
          </li>
          <li>
            <ThemeToggle transparent={transparent} />
          </li>

          {isMed ? (
            <>
              {/* "Back to RooZ" switch, bypasses brand-aware Link */}
              <li>
                <RouterLink
                  to="/"
                  className={
                    "ml-1 inline-flex items-center gap-1.5 rounded-full px-3 py-2 text-sm font-semibold transition " +
                    (transparent
                      ? "text-white/85 hover:text-white hover:bg-white/10"
                      : "text-slate-700 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white")
                  }
                >
                  <ArrowLeftRight size={14} />
                  Switch brand
                </RouterLink>
              </li>
              {/* Primary Med CTA, emerald gradient instead of amber */}
              <li>
                <ButtonLink
                  href="mailto:med@rydn.ca?subject=RooZ Med: I'm interested"
                  variant="med"
                  className="ml-2 px-5 py-2.5 text-sm"
                >
                  <Mail size={16} />
                  Get started
                </ButtonLink>
              </li>
            </>
          ) : isNewBrand ? (
            <>
              {/* "Back to RooZ" switch, bypasses brand-aware Link */}
              <li>
                <RouterLink
                  to="/"
                  className={
                    "ml-1 inline-flex items-center gap-1.5 rounded-full px-3 py-2 text-sm font-semibold transition " +
                    (transparent
                      ? "text-white/85 hover:text-white hover:bg-white/10"
                      : "text-slate-700 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white")
                  }
                >
                  <ArrowLeftRight size={14} />
                  {newBrandSwitch}
                </RouterLink>
              </li>
              {/* Primary CTA, interest mailto in the brand's colour */}
              <li>
                <ButtonLink
                  href={newBrandMailto}
                  variant={newBrandVariant}
                  className="ml-2 px-5 py-2.5 text-sm"
                >
                  <Mail size={16} />
                  {newBrandContact}
                </ButtonLink>
              </li>
            </>
          ) : (
            <>
              {/* Secondary: Support */}
              <li>
                <Link
                  to="/donation"
                  className={
                    "ml-1 inline-flex items-center justify-center rounded-full px-4 py-2 text-sm font-semibold transition " +
                    (transparent
                      ? "text-white/85 hover:text-white hover:bg-white/10"
                      : "text-slate-700 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white")
                  }
                >
                  {t("nav.support")}
                </Link>
              </li>

              {/* PRIMARY: Book Now, gold, no pulse here (the hero and the
                  floating bar carry the pulse, so only one pulses at a time) */}
              <li>
                <Link
                  to={bookNowHref(onHome)}
                  onClick={handleBookNow}
                  className={buttonClasses("youth", "ml-2 px-5 py-2.5 text-sm shadow-md hover:shadow-xl")}
                >
                  <Calendar size={16} />
                  {t("nav.bookNow")}
                </Link>
              </li>
            </>
          )}
        </ul>

        {/* Mobile: language + theme + brand CTA (compact) + hamburger. On phones
            only the hamburger shows; language + theme live inside the menu. */}
        <div className="flex items-center gap-1 lg:hidden">
          <div className="hidden sm:flex items-center gap-1">
            <LanguageSwitcher transparent={transparent} />
            <ThemeToggle transparent={transparent} />
          </div>
          {isMed ? (
            <ButtonLink
              href="mailto:med@rydn.ca?subject=RooZ Med: I'm interested"
              variant="med"
              className="hidden sm:inline-flex px-4 py-2 text-xs"
            >
              <Mail size={14} />
              Start
            </ButtonLink>
          ) : isNewBrand ? (
            <ButtonLink
              href={newBrandMailto}
              variant={newBrandVariant}
              className="hidden sm:inline-flex px-4 py-2 text-xs"
            >
              <Mail size={14} />
              {newBrandContactShort}
            </ButtonLink>
          ) : (
            <Link
              to={bookNowHref(onHome)}
              onClick={handleBookNow}
              className={buttonClasses("youth", "hidden sm:inline-flex px-4 py-2 text-xs")}
            >
              <Calendar size={14} />
              {t("nav.bookNowShort")}
            </Link>
          )}
          <MenuToggle
            toggle={toggle}
            isOpen={nav}
            transparent={transparent}
            className={
              "z-50 p-2 rounded-lg transition " +
              (transparent
                ? "text-white hover:bg-white/10"
                : "text-slate-900 hover:bg-slate-100 dark:text-slate-100 dark:hover:bg-slate-800")
            }
          />
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {nav && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 lg:hidden"
            >
              <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={toggle} />
              <motion.ul
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="absolute top-0 right-0 left-0 mt-20 mx-4 rounded-2xl bg-white dark:bg-slate-900 p-4 shadow-xl border border-slate-200 dark:border-slate-700 flex flex-col gap-1 max-h-[80vh] overflow-y-auto"
              >
                {navigation.map(item => {
                  const active = cleanPath === item.path || (item.path === "/" && (cleanPath === "" || cleanPath === "/"))
                  return (
                    <li key={item.path}>
                      <button
                        onClick={() => {
                          navigate(item.path)
                          toggle()
                        }}
                        className={
                          "w-full text-left px-4 py-3 rounded-lg text-base font-semibold transition " +
                          (active
                            ? "bg-sky-50 text-sky-700 dark:bg-sky-950/40 dark:text-sky-300"
                            : "text-slate-800 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800")
                        }
                      >
                        {item.name}
                      </button>
                    </li>
                  )
                })}

                {/* Mobile primary CTA, brand-specific */}
                {isMed ? (
                  <>
                    <li className="pt-3 mt-2 border-t border-slate-200 dark:border-slate-700">
                      <ButtonLink
                        href="mailto:med@rydn.ca?subject=RooZ Med: I'm interested"
                        variant="med"
                        className="flex w-full px-4 py-3.5 text-base"
                        onClick={toggle}
                      >
                        <Mail size={18} />
                        Get started
                      </ButtonLink>
                    </li>
                    <li>
                      <RouterLink
                        to="/"
                        onClick={toggle}
                        className="flex items-center justify-center gap-2 w-full text-center rounded-lg bg-slate-100 px-4 py-3 text-base font-semibold text-slate-800 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700 transition"
                      >
                        <ArrowLeftRight size={16} />
                        Switch brand
                      </RouterLink>
                    </li>
                  </>
                ) : isNewBrand ? (
                  <>
                    <li className="pt-3 mt-2 border-t border-slate-200 dark:border-slate-700">
                      <ButtonLink
                        href={newBrandMailto}
                        variant={newBrandVariant}
                        className="flex w-full px-4 py-3.5 text-base"
                        onClick={toggle}
                      >
                        <Mail size={18} />
                        {newBrandContact}
                      </ButtonLink>
                    </li>
                    <li>
                      <RouterLink
                        to="/"
                        onClick={toggle}
                        className="flex items-center justify-center gap-2 w-full text-center rounded-lg bg-slate-100 px-4 py-3 text-base font-semibold text-slate-800 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700 transition"
                      >
                        <ArrowLeftRight size={16} />
                        {newBrandSwitch}
                      </RouterLink>
                    </li>
                  </>
                ) : (
                  <>
                    <li className="pt-3 mt-2 border-t border-slate-200 dark:border-slate-700">
                      <Link
                        to={bookNowHref(onHome)}
                        onClick={(e) => {
                          handleBookNow(e)
                          toggle()
                        }}
                        className={buttonClasses("youth", "flex w-full px-4 py-3.5 text-base")}
                      >
                        <Calendar size={18} />
                        {t("nav.bookNow")}
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/donation"
                        onClick={toggle}
                        className="block w-full text-center rounded-lg bg-slate-100 px-4 py-3 text-base font-semibold text-slate-800 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700 transition"
                      >
                        {t("nav.support")}
                      </Link>
                    </li>
                  </>
                )}

                <li className="pt-1 border-t border-slate-200 dark:border-slate-700">
                  <LanguageSwitcher variant="list" />
                </li>
                {/* Theme toggle is hidden from the phone header bar, so offer it here */}
                <li className="sm:hidden flex justify-center pt-1">
                  <ThemeToggle />
                </li>
              </motion.ul>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  )
}

/* Hamburger toggle */
const MenuToggle = ({
  toggle,
  isOpen,
  className,
}: {
  toggle: () => void
  isOpen: boolean
  transparent: boolean
  className: string
}) => (
  <motion.button
    className={className}
    onClick={toggle}
    animate={isOpen ? "open" : "closed"}
    title="Menu"
    aria-label={isOpen ? "Close menu" : "Open menu"}
    aria-expanded={isOpen}
  >
    <svg width="28" height="28" viewBox="0 0 23 23">
      <Path
        variants={{
          closed: { d: "M 2 2.5 L 20 2.5" },
          open: { d: "M 3 16.5 L 17 2.5" },
        }}
      />
      <Path
        d="M 2 9.423 L 20 9.423"
        variants={{ closed: { opacity: 1 }, open: { opacity: 0 } }}
        transition={{ duration: 0.1 }}
      />
      <Path
        variants={{
          closed: { d: "M 2 16.346 L 20 16.346" },
          open: { d: "M 3 2.5 L 17 16.346" },
        }}
      />
    </svg>
  </motion.button>
)

const Path = (props: ComponentProps<typeof motion.path>) => (
  <motion.path fill="transparent" strokeWidth="2.5" stroke="currentColor" strokeLinecap="round" {...props} />
)
