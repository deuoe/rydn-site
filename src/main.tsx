import ReactDOM from "react-dom/client"
import BecomeAdvisor from "./BecomeAdvisor.tsx"
import Workshops from "./Workshops.tsx"
import Donation from "./Donation.tsx"
import AboutUs from "./AboutUs.tsx"
import Layout from "./components/Layout.tsx"
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom"
import App from "./App"
import "./index.css"
import OurTeam from "./OurTeam"
import PartnerWithUs from "./PartnerWithUs"
import Verification from "./Verification"
import PrivacyPolicy from "./PrivacyPolicy"
import TermsOfService from "./TermsOfService"
import ContactUs from "./ContactUs"
import Stories from "./Stories"
import Governance from "./Governance"
import AdvisorDetail from "./AdvisorDetail"
import Press from "./Press"
import Blog from "./Blog"
import BlogPost from "./BlogPost"
import ForNewcomers from "./ForNewcomers"
import PourNouveauxArrivants from "./PourNouveauxArrivants"
import ForEducators from "./ForEducators"
import NotFound from "./NotFound"
import Gateway from "./Gateway"
import RoozMed from "./RoozMed"
import ScrollToTop from "./components/ScrollToTop"
import UpdatePrompt from "./components/UpdatePrompt"
import { LanguageProvider } from "./i18n/LanguageProvider"
import { ThemeProvider } from "./theme/ThemeProvider"

// Youth pages — the current RYDN site. Mounted at /youth/* and
// /<lang>/youth/* for every supported language. Add new Youth pages here.
const YOUTH_PAGES = [
  { index: true, element: <App /> },
  { path: "about-us", element: <AboutUs /> },
  { path: "become-advisor", element: <BecomeAdvisor /> },
  { path: "workshops", element: <Workshops /> },
  { path: "donation", element: <Donation /> },
  { path: "our-team", element: <OurTeam /> },
  { path: "partner-with-us", element: <PartnerWithUs /> },
  { path: "verification", element: <Verification /> },
  { path: "privacy-policy", element: <PrivacyPolicy /> },
  { path: "terms-of-service", element: <TermsOfService /> },
  { path: "contact-us", element: <ContactUs /> },
  { path: "stories", element: <Stories /> },
  { path: "governance", element: <Governance /> },
  { path: "press", element: <Press /> },
  { path: "blog", element: <Blog /> },
  { path: "blog/:slug", element: <BlogPost /> },
  { path: "advisors/:slug", element: <AdvisorDetail /> },
  { path: "for-newcomers", element: <ForNewcomers /> },
  { path: "pour-nouveaux-arrivants", element: <PourNouveauxArrivants /> },
  { path: "for-educators", element: <ForEducators /> },
] as const

// Med pages. Currently just the landing page. More pages (pricing, about,
// team, question-bank app, etc.) will be added here in future phases.
const MED_PAGES = [
  { index: true, element: <RoozMed /> },
] as const

const NON_DEFAULT_LANGS = ["fr", "es", "fa", "he", "zh", "ko", "ar", "ur", "pa"] as const

function renderPages(pages: typeof YOUTH_PAGES | typeof MED_PAGES, prefix: string) {
  return pages.map((p) =>
    "index" in p
      ? <Route key={`${prefix}-index`} index element={p.element} />
      : <Route key={`${prefix}-${p.path}`} path={p.path} element={p.element} />
  )
}

/**
 * LegacyRedirect — catches any pre-migration URL (/about-us, /our-team, etc.)
 * and sends the visitor to the equivalent /youth/* URL. Preserves language
 * prefix and any search/hash the user had. Uses location.pathname to grab the
 * full current URL (including :slug params), so a single component covers
 * every legacy route.
 *
 * Why we need this: before the gateway migration everything lived at the root.
 * External links, bookmarks, old search engine results, and shared URLs out in
 * the wild all point to the old shape. These 301-style client-side redirects
 * keep them working without the user ever seeing a 404.
 */
function LegacyRedirect() {
  const { pathname, search, hash } = useLocation()
  const parts = pathname.split("/").filter(Boolean)
  const first = parts[0]
  if (first && (NON_DEFAULT_LANGS as readonly string[]).includes(first)) {
    const rest = parts.slice(1).join("/")
    return <Navigate to={`/${first}/youth/${rest}${search}${hash}`} replace />
  }
  return <Navigate to={`/youth${pathname}${search}${hash}`} replace />
}

/** Render legacy redirect routes for all known Youth paths at a given lang
 *  level (either the root or a language-prefixed root). This is what makes
 *  the old URLs (e.g. /about-us) still work after the /youth migration. */
function renderLegacyYouthRedirects(keyPrefix: string) {
  return YOUTH_PAGES.filter((p) => "path" in p).map((p) => (
    <Route
      key={`legacy-${keyPrefix}-${(p as { path: string }).path}`}
      path={(p as { path: string }).path}
      element={<LegacyRedirect />}
    />
  ))
}

const root = document.getElementById("root")!

ReactDOM.createRoot(root).render(
  <BrowserRouter>
    <ThemeProvider>
      <LanguageProvider>
        <ScrollToTop />
        <UpdatePrompt />
        <Routes>
          {/* ===== GATEWAY — the two-tile picker. Only at the exact root path.
              Lives outside Layout so there's no Navbar/Footer around it. */}
          <Route index element={<Gateway />} />

          {/* ===== EVERYTHING ELSE — wrapped in Layout (Navbar + Footer + Floaters) */}
          <Route element={<Layout />}>
            {/* English Youth: /youth and /youth/<page> */}
            <Route path="youth">
              {renderPages(YOUTH_PAGES, "en-youth")}
            </Route>

            {/* English Med: /med and /med/<future-page> */}
            <Route path="med">
              {renderPages(MED_PAGES, "en-med")}
            </Route>

            {/* Legacy English root redirects: /about-us → /youth/about-us etc.
                These keep old inbound links working. */}
            {renderLegacyYouthRedirects("root")}

            {/* Language-prefixed routes: /<lang>/{youth|med} */}
            {NON_DEFAULT_LANGS.map((lang) => (
              <Route key={lang} path={lang}>
                {/* Bare /<lang> redirects to /<lang>/youth. Non-English users
                    don't see the gateway in v1 — they go straight to Youth. */}
                <Route index element={<Navigate to={`/${lang}/youth`} replace />} />
                <Route path="youth">
                  {renderPages(YOUTH_PAGES, `${lang}-youth`)}
                </Route>
                <Route path="med">
                  {renderPages(MED_PAGES, `${lang}-med`)}
                </Route>
                {/* Legacy per-language redirects: /fr/about-us → /fr/youth/about-us */}
                {renderLegacyYouthRedirects(lang)}
                <Route path="*" element={<NotFound />} />
              </Route>
            ))}

            {/* Default 404 for unknown paths */}
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </LanguageProvider>
    </ThemeProvider>
  </BrowserRouter>
)
