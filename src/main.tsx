import ReactDOM from "react-dom/client"
import BecomeAdvisor from "./BecomeAdvisor.tsx"
import Workshops from "./Workshops.tsx"
import Donation from "./Donation.tsx"
import AboutUs from "./AboutUs.tsx"
import Layout from "./components/Layout.tsx"
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import "./index.css";

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
