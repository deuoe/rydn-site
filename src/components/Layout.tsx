import { Outlet } from "react-router"
import Navbar from "./Navbar"
import Footer from "./Footer"
import FloatingBookNow from "./FloatingBookNow"

export default function Layout() {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
      <FloatingBookNow />
    </>
  )
}
