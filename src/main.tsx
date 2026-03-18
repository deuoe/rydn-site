import ReactDOM from "react-dom/client"
import { BrowserRouter, Routes, Route } from "react-router"
import BookWithAdvisor from "./BookWithAdvisor.tsx"
import App from "./App.tsx"
import "./index.css"
import BecomeAdvisor from "./BecomeAdvisor.tsx"
import Workshops from "./Workshops.tsx"
import Donation from "./Donation.tsx"
import Navbar from "./Navbar.tsx"
import AboutUs from "./AboutUs.tsx"

const root = document.getElementById("root")!

ReactDOM.createRoot(root).render(
  <BrowserRouter>
    <Routes>
      <Route element={<Navbar />}>
        <Route index element={<App />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/book-with-advisor" element={<BookWithAdvisor />} />
        <Route path="/become-advisor" element={<BecomeAdvisor />} />
        <Route path="/workshops" element={<Workshops />} />
        <Route path="/donation" element={<Donation />} />
      </Route>
    </Routes>
  </BrowserRouter>
)
