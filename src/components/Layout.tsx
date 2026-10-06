import Navbar from "./Navbar"
import Footer from "./Footer"
import FloatingBookNow from "./FloatingBookNow"
import FloatingChat from "./FloatingChat"
import PageTransition from "./PageTransition"
import IOSInstallBanner from "./IOSInstallBanner"
import AIMatchmaker from "./AIMatchmaker"
import { useBrand } from "../brand/brand"

/**
 * Shared layout chrome around every brand page. Navbar + Footer always render
 * so navigation stays consistent across Youth and Med. Youth-specific floaters
 * (the "Book an Advisor" button, the AI matchmaker trigger, the iOS install
 * nag) only appear on Youth routes — they don't make sense on Med, which has
 * its own CTAs tailored to IMAT prep and admissions.
 *
 * AIMatchmaker (the modal container itself) stays mounted globally so if a
 * Youth link opens it, the modal exists in the DOM. On Med it just sits dormant.
 */
export default function Layout() {
  const brand = useBrand()
  const isYouth = brand === "youth"
  return (
    <>
      <Navbar />
      <PageTransition />
      <Footer />
      {isYouth && <FloatingBookNow />}
      {isYouth && <FloatingChat />}
      {isYouth && <IOSInstallBanner />}
      {/* Singleton AI chat modal — opened via openAIChat() event from anywhere.
          Kept mounted on all brand pages so the modal container always exists. */}
      <AIMatchmaker />
    </>
  )
}
