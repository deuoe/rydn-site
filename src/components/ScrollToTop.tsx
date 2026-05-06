import { useEffect } from "react"
import { useLocation } from "react-router-dom"

/**
 * Scrolls window to top whenever the route changes.
 *
 * Skips scrolling when the URL has a hash (e.g. /#advisors) so that
 * Book Now / anchor links still land on their target instead of jumping to
 * the top of the page first.
 *
 * Must be rendered inside <BrowserRouter>.
 */
export default function ScrollToTop() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) return // anchor links handle their own scroll
    window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior })
  }, [pathname, hash])

  return null
}
