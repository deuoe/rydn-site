import Navbar from "./Navbar"
import Footer from "./Footer"
import FloatingBookNow from "./FloatingBookNow"
import FloatingChat from "./FloatingChat"
import PageTransition from "./PageTransition"
import IOSInstallBanner from "./IOSInstallBanner"
import AIMatchmaker from "./AIMatchmaker"

export default function Layout() {
  return (
    <>
      <Navbar />
      <PageTransition />
      <Footer />
      <FloatingBookNow />
      <FloatingChat />
      <IOSInstallBanner />
      {/* Singleton AI chat modal — opened via openAIChat() event from anywhere */}
      <AIMatchmaker />
    </>
  )
}
