import { useLocation, Outlet } from "react-router-dom"
import { motion, AnimatePresence } from "motion/react"

/**
 * Wraps the routed content in a fade + subtle vertical lift transition.
 * Old page fades out and shifts down ~6px; new page fades in from ~6px above.
 * Total transition is ~250ms, same on every device — modern & non-disorienting.
 *
 * Wrap the same way as Outlet — this component IS the Outlet host.
 */
export default function PageTransition() {
  const location = useLocation()

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -6 }}
        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
      >
        <Outlet />
      </motion.div>
    </AnimatePresence>
  )
}
