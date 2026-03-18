import ReactDOM from "react-dom/client"
import { BrowserRouter, Routes, Route } from "react-router"
import App from "./App.tsx"
import "./index.css"
import BecomeAdvisor from "./BecomeAdvisor.tsx"
import Workshops from "./Workshops.tsx"
import Donation from "./Donation.tsx"
import AboutUs from "./AboutUs.tsx"
import Layout from "./components/Layout.tsx"

const root = document.getElementById("root")!

ReactDOM.createRoot(root).render(
  <BrowserRouter>
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<App />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/become-advisor" element={<BecomeAdvisor />} />
        <Route path="/workshops" element={<Workshops />} />
        <Route path="/donation" element={<Donation />} />
      </Route>
    </Routes>
  </BrowserRouter>
)
