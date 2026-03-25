import { useRef, useState } from "react";
import { Routes, Route } from "react-router-dom"
import AboutUs from "./AboutUs"
import BecomeAdvisor from "./BecomeAdvisor"
import Workshops from "./Workshops"
import Donation from "./Donation"
import leoUrl from "./assets/images/Leo.png"
import saharUrl from "./assets/images/Sahar.jpeg"
import saraUrl from "./assets/images/Sara.png"
import mandyUrl from "./assets/images/Mandy.png"
import sinaUrl from "./assets/images/Sina.jpeg"
import homeHero from "./assets/images/home-hero.png"
import Heading from "./components/Heading"
import Container from "./components/Container"
import { motion } from "motion/react"
import Button from "./components/Button"
import sadafUrl from "./assets/images/Sadaf.png"
import heliaUrl from "./assets/images/Helia.png"
import iliyaUrl from "./assets/images/Iliya.png"
import saracUrl from "./assets/images/SaraC.png"
import jenniferUrl from "./assets/images/Jennifer.jpeg"



function shuffleArray(array: any[]) {
  return [...array].sort(() => Math.random() - 0.5);
}

function HomePage() {
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [selectedAdvisor, setSelectedAdvisor] = useState<{
  name: string
  bookingLink: string
} | null>(null)
  const advisorsRef = useRef<HTMLDivElement>(null);
  const advisors = [
    {
      name: "Ilia",
      photo: leoUrl,
      description: "Ilia is a Bachelor of Commerce student",
      advisingTopics: ["Information Technology", "Soccer", "Business"],
      bookingLink: "https://calendar.app.google/bpDQ4pKZajR14fgk6"
     
    },
    {
      name: "Sahar",
      photo: saharUrl,
      description: "Sahar is a Bachelor of Art student",
      advisingTopics: [
        "Psychology",
        "Political science",
        "LSAT preparation",
        "University applications",
      ],
      bookingLink: "https://calendar.app.google/nXtbKKMhDcfEd8of8"

    },
    {
      name: "Sara Roozbahani",
      photo: saraUrl,
      description: "Sara is a Bachelor of Science student",
      advisingTopics: [
        "Pre-med advising",
        "MCAT",
        "Research",
        "University applications",
        "Psychology",
        "Study strategies"
      ],
      bookingLink: "https://calendar.app.google/PhgjLmWXbqTu4vCk7"
     
    },
    {
      name: "Mandy",
      photo: mandyUrl,
      description: "Mandy is a Bachelor of Science student",
      advisingTopics: [
        "Psychology",
        "University applications",
      ],
     
    },
    {
      name: "Sam Sina",
      photo: sinaUrl,
      description: "Sam is a Bachelor of Science student",
      advisingTopics: ["Biomedical Sciences", "Research and Article", "Tutoring", "Pharmacy School"],
      bookingLink: "https://calendar.app.google/MjX3qXn5fRe5cT566",
     

    },
    {
      name: "Sadaf",
      photo: sadafUrl,
      description: "Sadaf is a Bacehlor of Science student",
      advisingTopics: ["Biomedical Science", "DAT Preparation", "Pre-dent Advising"]
   
    },
    {
      name: "Helia",
      photo: heliaUrl,
      description: "Helia is a Bacehlor of Science student",
      advisingTopics: ["Neuroscience", "MCAT Preparation", "Pre-med Advising"]
     
    },
    {
      name: "Iliya",
      photo: iliyaUrl,
      description: "Iliya is a Bacehlor of Science student",
      advisingTopics: ["Biomedical Science", "Pre-med Advising", "Personal training/fitness"],
      bookingLink: "https://calendar.app.google/uwVTj6JMZR5sX1M46"
    },
    {
      name: "Sara",
      photo: saracUrl,
      description: "Sara is a Bacehlor of Arts student",
      advisingTopics: ["History", "English", "Nutrition", "Fitness training"]
   
    },
    {
      name: "Jennifer",
      photo: jenniferUrl,
      description: "Jennifer is a Nursing student",
      advisingTopics: ["Nursing", "Studying strategies"]
   
    }
  ]
  
  const shuffledAdvisors = shuffleArray(advisors);

  return (
    <>
      <div
        className="w-full min-h-[70vh] md:min-h-[80vh] lg:min-h-screen bg-center bg-no-repeat bg-cover relative flex items-center justify-center"
        style={{ backgroundImage: `url(${homeHero})` }}
      >
        <div className="absolute top-0 left-0 w-full h-full bg-black/50" />
        <div className="absolute top-1/2 left-1/2 w-[90%] max-w-4xl -translate-x-1/2 -translate-y-1/2 text-center text-white px-4">
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4">RooZ Youth Development Network</h2>
          <p className="text-base md:text-xl lg:text-2xl mb-8">
            Connect with experienced mentors, explore your passions, and unlock your potential.
            {/* Free mentorship and guidance to help the next generation discover their path */}
          </p>
          <Button className="text-white font-bold px-8 py-3 lg:px-12 lg:py-4 lg:text-xl hover:text-black"
            onClick={() => {
    advisorsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }}
>
            Get Started
          </Button>
        </div>
      </div>

      <div ref={advisorsRef}>
  <Container>
        <div className="mt-8"></div>
        <Heading text="Our Advisors" />

        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {shuffledAdvisors.map((advisor, index) => (
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full p-4 bg-gray-100 rounded-lg shadow-md flex flex-col justify-content items-center"
              key={index}
            >
              <img
                className="w-48 h-48 rounded-full object-cover mb-4"
                src={advisor.photo}
                alt={advisor.name}
              />
              <h3 className="text-2xl font-xl text-center mb-4">{advisor.name}</h3>
              <p className="mb-4">
                {advisor.description}
                </p>
                <div className="flex flex-wrap gap-2 mt-2 justify-center">
                  {advisor.advisingTopics.map((topic: string, idx: number) => (
                    <>
                      <span key={idx} className="bg-[#4facfe] text-white p-1 rounded">
                        {topic}
                      </span>{" "}
                    </>
                  ))}
                </div>
              <div className="mt-auto w-full">
                <Button
                  className="w-full"
                  onClick={() => {
      if (advisor.bookingLink) {
        setSelectedAdvisor({
          name: advisor.name,
          bookingLink: advisor.bookingLink,
        })
      }
    }}
  >
    {advisor.bookingLink
      ? `Book with ${advisor.name.split(" ")[0]}`
      : "Booking coming soon"}
  </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
      </div>
      {selectedAdvisor && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
    <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl p-8 text-center">
      <button
        className="absolute top-4 right-4 bg-gray-100 hover:bg-gray-200 text-black px-3 py-1 rounded-lg"
        onClick={() => setSelectedAdvisor(null)}
      >
        Close
      </button>

      <h3 className="text-2xl font-bold mb-4">
        Book with {selectedAdvisor.name.split(" ")[0]}
      </h3>

      <p className="text-gray-600 mb-6">
        You’re about to open the booking calendar for {selectedAdvisor.name}.
        Click below to continue to scheduling.
        After selecting a time, you'll receive a confirmation email.
      </p>

      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Button
          className="px-6 py-3"
          onClick={() => {
  window.open(selectedAdvisor.bookingLink, "_blank", "noopener,noreferrer")
  setSelectedAdvisor(null)
  setShowConfirmation(true)
}}
        >
          Continue to Booking
        </Button>

        <Button
          className="px-6 py-3 bg-gray-200 text-black hover:bg-gray-300"
          onClick={() => setSelectedAdvisor(null)}
        >
          Cancel
        </Button>
      </div>
    </div>
  </div>
)}
{showConfirmation && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
    <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 text-center">
      
      <h3 className="text-2xl font-bold mb-4">
        🎉 You're all set!
      </h3>

      <p className="text-gray-600 mb-6">
        Thanks for booking with RooZ.  
        Please complete your booking in the new tab.  
        You will receive a confirmation email shortly.
      </p>

      <Button
        className="px-6 py-3"
        onClick={() => setShowConfirmation(false)}
      >
        Got it
      </Button>
    </div>
  </div>
)}
    </>
  )
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/about-us" element={<AboutUs />} />
      <Route path="/become-advisor" element={<BecomeAdvisor />} />
      <Route path="/workshops" element={<Workshops />} />
      <Route path="/donation" element={<Donation />} />
    </Routes>
  )
}
export default App
