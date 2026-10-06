import { useEffect } from "react"
import { useLocation } from "react-router-dom"
import { brandFromPath } from "../brand/brand"

const TITLES = {
  gateway: "RooZ — Youth Mentorship & Study Medicine in Italy",
  youth: "RYDN — Free Student Mentorship in Canada",
  med: "RooZ Med — Study Medicine in Italy | IMAT Prep",
} as const

/**
 * Keeps <title> in sync with the route: gateway, Youth (/youth/*, /<lang>/youth/*,
 * legacy paths) or Med (/med/*, /<lang>/med/*). Mounted once next to
 * ScrollToTop so every route, including ones outside Layout, is covered.
 */
export default function DocumentTitle() {
  const { pathname } = useLocation()

  useEffect(() => {
    document.title = pathname === "/" ? TITLES.gateway : TITLES[brandFromPath(pathname)]
  }, [pathname])

  return null
}
