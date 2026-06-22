import ReactDOM from "react-dom/client"
import BecomeAdvisor from "./BecomeAdvisor.tsx"
import Workshops from "./Workshops.tsx"
import Donation from "./Donation.tsx"
import AboutUs from "./AboutUs.tsx"
import Layout from "./components/Layout.tsx"
import { BrowserRouter, Routes, Route } from "react-router-dom"
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
import NotFound from "./NotFound"
import ScrollToTop from "./components/ScrollToTop"
import { LanguageProvider } from "./i18n/LanguageProvider"

// All site pages. The same tree is mounted at the root (English) and under
// each non-default language prefix (/fr, /es, /fa, /he) so every page is
// reachable in every language as its own URL.
const PAGES = [
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
  { path: "advisors/:slug", element: <AdvisorDetail /> },
] as const

const NON_DEFAULT_LANGS = ["fr", "es", "fa", "he"] as const

function renderPages(prefix: string) {
  return PAGES.map((p) =>
    "index" in p
      ? <Route key={`${prefix}-index`} index element={p.element} />
      : <Route key={`${prefix}-${p.path}`} path={p.path} element={p.element} />
  )
}

const root = document.getElementById("root")!

ReactDOM.createRoot(root).render(
  <BrowserRouter>
    <LanguageProvider>
      <ScrollToTop />
      <Routes>
        <Route element={<Layout />}>
          {/* English routes (no prefix — default language) */}
          {renderPages("en")}

          {/* Language-prefixed routes: /fr/..., /es/..., /fa/..., /he/... */}
          {NON_DEFAULT_LANGS.map((lang) => (
            <Route key={lang} path={lang}>
              {renderPages(lang)}
              <Route path="*" element={<NotFound />} />
            </Route>
          ))}

          {/* Default 404 for unknown English paths */}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </LanguageProvider>
  </BrowserRouter>
)
