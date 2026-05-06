import Navbar from "./Navbar"
import Footer from "./Footer"
import FloatingBookNow from "./FloatingBookNow"
import PageTransition from "./PageTransition"

export default function Layout() {
  return (
    <>
      <Navbar />
      <PageTransition />
      <Footer />
      <FloatingBookNow />
    </>
  )
}
