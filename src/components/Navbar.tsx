import { Link, useLocation, useNavigate } from "react-router-dom"
import { AnimatePresence, motion } from "motion/react"
import { useEffect, useState, type ComponentProps } from "react"
import { Calendar } from "lucide-react"
import logoUrl from "../assets/images/logo.jpeg"
import LanguageSwitcher from "./LanguageSwitcher"
import { useTranslation } from "../i18n/useTranslation"

/**
 * Take the user to the advisors section. From the home page, scroll smoothly.
 * From any other page, navigate to /#advisors and let HomePage scroll on mount.
 */
function bookNowHref(onHome: boolean) {
  return onHome ? "#advisors" : "/#advisors"
}

export default function Navbar() {
  const navigate = useNavigate()
  const location = useLocation()
  const { t } = useTranslation()
  const [nav, setNav] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const toggle = () => setNav(!nav)

  const onHome = location.pathname === "/"
  const transparent = onHome && !scrolled

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    setNav(false)
  }, [location.pathname])

  const navigation = [
    { name: t("nav.home"), path: "/" },
    { name: t("nav.about"), path: "/about-us" },
    { name: t("nav.ourTeam"), path: "/our-team" },
    { name: t("nav.becomeAdvisor"), path: "/become-advisor" },
    { name: t("nav.workshops"), path: "/workshops" },
  ]

  const handleBookNow = (e: React.MouseEvent) => {
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
        "sticky top-0 z-40 w-full transition-all duration-300 " +
        (transparent
          ? "bg-transparent border-b border-transparent"
          : "bg-white/80 backdrop-blur-md border-b border-slate-200/70 shadow-sm")
      }
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 lg:px-8 py-3">
        {/* Logo */}
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

        {/* Desktop Navbar */}
        <ul className="hidden lg:flex items-center gap-1">
          {navigation.map(item => {
            const active = location.pathname === item.path
            return (
              <li key={item.path}>
                <button
                  onClick={() => navigate(item.path)}
                  className={
                    "relative px-3 py-2 rounded-lg text-sm font-semibold transition " +
                    (active
                      ? transparent
                        ? "text-white"
                        : "text-sky-700"
                      : transparent
                        ? "text-white/85 hover:text-white hover:bg-white/10"
                        : "text-slate-700 hover:text-slate-900 hover:bg-slate-100")
                  }
                >
                  {item.name}
                  {active && (
                    <motion.span
                      layoutId="nav-active"
                      className={
                        "absolute inset-x-2 -bottom-0.5 h-0.5 rounded-full " +
                        (transparent ? "bg-white" : "bg-sky-600")
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

          {/* Secondary: Support */}
          <li>
            <Link
              to="/donation"
              className={
                "ml-1 inline-flex items-center justify-center rounded-full px-4 py-2 text-sm font-semibold transition " +
                (transparent
                  ? "text-white/85 hover:text-white hover:bg-white/10"
                  : "text-slate-700 hover:bg-slate-100 hover:text-slate-900")
              }
            >
              {t("nav.support")}
            </Link>
          </li>

          {/* PRIMARY: Book Now — bright amber gradient + glow pulse */}
          <li>
            <Link
              to={bookNowHref(onHome)}
              onClick={handleBookNow}
              className="ml-2 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-amber-400 via-amber-500 to-orange-500 hover:from-amber-500 hover:via-amber-500 hover:to-orange-600 text-slate-900 px-5 py-2.5 text-sm font-bold shadow-md hover:shadow-xl transition focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2 animate-glow-pulse"
            >
              <Calendar size={16} />
              {t("nav.bookNow")}
            </Link>
          </li>
        </ul>

        {/* Mobile: language + Book Now (compact) + hamburger */}
        <div className="flex items-center gap-1 lg:hidden">
          <LanguageSwitcher transparent={transparent} />
          <Link
            to={bookNowHref(onHome)}
            onClick={handleBookNow}
            className="hidden sm:inline-flex items-center justify-center gap-1.5 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 text-slate-900 px-4 py-2 text-xs font-bold shadow-md transition hover:shadow-lg animate-glow-pulse"
          >
            <Calendar size={14} />
            {t("nav.bookNowShort")}
          </Link>
          <MenuToggle
            toggle={toggle}
            isOpen={nav}
            transparent={transparent}
            className={
              "z-50 p-2 rounded-lg transition " +
              (transparent ? "text-white hover:bg-white/10" : "text-slate-900 hover:bg-slate-100")
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
                className="absolute top-0 right-0 left-0 mt-20 mx-4 rounded-2xl bg-white p-4 shadow-xl border border-slate-200 flex flex-col gap-1 max-h-[80vh] overflow-y-auto"
              >
                {navigation.map(item => {
                  const active = location.pathname === item.path
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
                            ? "bg-sky-50 text-sky-700"
                            : "text-slate-800 hover:bg-slate-100")
                        }
                      >
                        {item.name}
                      </button>
                    </li>
                  )
                })}

                {/* Mobile primary CTA */}
                <li className="pt-3 mt-2 border-t border-slate-200">
                  <Link
                    to={bookNowHref(onHome)}
                    onClick={(e) => {
                      handleBookNow(e)
                      toggle()
                    }}
                    className="flex items-center justify-center gap-2 w-full text-center rounded-full bg-gradient-to-r from-amber-400 via-amber-500 to-orange-500 px-4 py-3.5 text-base font-bold text-slate-900 shadow-md hover:shadow-lg transition"
                  >
                    <Calendar size={18} />
                    {t("nav.bookNow")}
                  </Link>
                </li>
                <li>
                  <Link
                    to="/donation"
                    onClick={toggle}
                    className="block w-full text-center rounded-lg bg-slate-100 px-4 py-3 text-base font-semibold text-slate-800 hover:bg-slate-200 transition"
                  >
                    {t("nav.support")}
                  </Link>
                </li>

                <li className="pt-1 border-t border-slate-200">
                  <LanguageSwitcher variant="list" />
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
