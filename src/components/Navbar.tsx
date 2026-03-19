import { useLocation, useNavigate } from "react-router-dom"
import { AnimatePresence, motion } from "framer-motion"
import { useState } from "react"
import logoUrl from "../assets/images/logo.jpeg"

export default function Navbar() {
  const navigate = useNavigate()
  const location = useLocation()
  const [nav, setNav] = useState(false)
  const toggle = () => setNav(!nav)

  const navigation = [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about-us" },
    { name: "Our Team", path: "/our-team" },
    { name: "Become an Advisor", path: "/become-advisor" },
    { name: "Workshops", path: "/workshops" },
    { name: "Donation", path: "/donation" },
  ]

  return (
    <nav
      // className="w-full py-8 px-4 bg-[#eaeaea] flex items-center justify-center"
      className="flex items-center justify-between lg:justify-center w-full mx-auto p-2 lg:pt-4"
    >
      <img className="w-44 select-none" src={logoUrl} alt="" />

      {/* Desktop Navbar */}
      <ul className="hidden lg:flex items-center">
        {navigation.map(nav => (
          <button
            className={
              "px-8 py-4 text-black rounded-md mr-4 lg:text-xl font-bold" +
              (location.pathname === nav.path
                ? " bg-[#4facfe] text-white"
                : " hover:bg-gray-200 hover:shadow-md transition duration-100 hover:cursor-pointer")
            }
            onClick={() => navigate(nav.path)}
          >
            {nav.name}
          </button>
        ))}
      </ul>

      {/* Hamburger Menu */}
      <MenuToggle className="lg:hidden pr-8 z-20" toggle={() => toggle()} isOpen={nav} />

      {/* Mobile Navbar */}
      <AnimatePresence mode="wait">
        {nav && (
          <motion.ul className="absolute lg:hidden top-0 left-0 h-screen w-screen flex flex-col items-center justify-center gap-8 bg-[#4facfe] z-10">
            {navigation.map(nav => (
              <motion.button
                className={
                  "px-8 py-4 text-black rounded-md mr-4 text-xl font-bold" +
                  (location.pathname === nav.path
                    ? " bg-white"
                    : " hover:bg-gray-200 hover:shadow-md transition duration-100 hover:cursor-pointer")
                }
                onClick={() => {
                  navigate(nav.path)
                  toggle()
                }}
              >
                {nav.name}
              </motion.button>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </nav>
  )
}

/**
 * Menu Toggle
 */
const MenuToggle = ({
  toggle,
  isOpen,
  className,
}: {
  toggle: () => void
  isOpen: boolean
  className: string
}) => (
  <motion.button
    className={className}
    onClick={toggle}
    animate={isOpen ? "open" : "closed"}
    title="Menu"
  >
    <svg width="36" height="36" viewBox="0 0 23 23">
      <Path
        variants={{
          closed: { d: "M 2 2.5 L 20 2.5" },
          open: { d: "M 3 16.5 L 17 2.5" },
        }}
      />
      <Path
        d="M 2 9.423 L 20 9.423"
        variants={{
          closed: { opacity: 1 },
          open: { opacity: 0 },
        }}
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

/**
 * Path Component
 */
const Path = (props: any) => (
  <motion.path fill="transparent" strokeWidth="3" stroke="black" strokeLinecap="round" {...props} />
)
