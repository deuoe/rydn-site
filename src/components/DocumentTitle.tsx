import { useEffect } from "react"
import { useLocation } from "react-router-dom"
import { brandFromPath, type Brand } from "../brand/brand"

const SITE_URL = "https://www.rydn.ca"

const META = {
  gateway: {
    title: "RooZ: Youth Mentorship & Study Medicine in Italy",
    description:
      "RooZ Youth Development Network (RYDN) is a Canadian nonprofit connecting students with free 1-on-1 mentors, workshops, and academic and career guidance.",
    image: `${SITE_URL}/android-chrome-512x512.png`,
  },
  youth: {
    title: "RYDN: Free Student Mentorship in Canada",
    description:
      "Connect with experienced mentors, explore your passions, and unlock your potential through free 1-on-1 guidance, workshops, and academic support.",
    image: `${SITE_URL}/android-chrome-512x512.png`,
  },
  med: {
    title: "RooZ Med: Study Medicine in Italy | IMAT Prep",
    description:
      "Study medicine in Italy with RooZ Med: IMAT prep and admissions guidance for Italian medical schools, from students who have been through it.",
    image: `${SITE_URL}/android-chrome-512x512.png`,
  },
  academy: {
    title: "RooZ Academy: Courses & Training | Coming Soon",
    description:
      "RooZ Academy is the education and training arm of RooZ, practical courses and training programs built from what we have learned advising students.",
    image: `${SITE_URL}/android-chrome-512x512.png`,
  },
  france: {
    title: "RooZ France: Jeunesse & Erasmus+ | Bientôt disponible",
    description:
      "RooZ France est le foyer français de l'écosystème RooZ, une association de jeunesse en cours de création, qui apporte le mentorat et les programmes RooZ en France.",
    image: `${SITE_URL}/android-chrome-512x512.png`,
  },
} as const satisfies Record<Brand | "gateway", { title: string; description: string; image: string }>

/** Upserts a meta tag by property (og:*) or name (twitter:*, description). */
function setMeta(key: string, value: string) {
  const attr = key.startsWith("og:") ? "property" : "name"
  let el = document.querySelector(`meta[${attr}="${key}"]`) as HTMLMetaElement | null
  if (!el) {
    el = document.createElement("meta")
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute("content", value)
}

/**
 * Keeps <title> and the share meta in sync with the route: gateway, Youth
 * (/youth/*, /<lang>/youth/*, legacy paths), Med (/med/*, /<lang>/med/*),
 * Academy (/academy/*) or France (/france/*). Mounted once next to
 * ScrollToTop so every route, including ones outside Layout, is covered.
 * All routes share the app icon until the designed OG cards can be deployed;
 * the per-route title and description still change with the route.
 */
export default function DocumentTitle() {
  const { pathname } = useLocation()

  useEffect(() => {
    const key = pathname === "/" ? "gateway" : brandFromPath(pathname)
    const meta = META[key]
    document.title = meta.title
    setMeta("description", meta.description)
    setMeta("og:title", meta.title)
    setMeta("og:description", meta.description)
    setMeta("og:image", meta.image)
    setMeta("og:image:width", "512")
    setMeta("og:image:height", "512")
    setMeta("og:url", `${SITE_URL}${pathname}`)
    setMeta("twitter:title", meta.title)
    setMeta("twitter:description", meta.description)
    setMeta("twitter:image", meta.image)
  }, [pathname])

  return null
}
