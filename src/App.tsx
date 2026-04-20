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
import tinaUrl from "./assets/images/Tina.png"
import valentinaUrl from "./assets/images/Valentina.png"
import { Users, BookOpen, Compass } from "lucide-react"



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
      bookingLink: "https://outlook.office.com/book/RYDN1@rydn.ca/s/p_MxjUFix02viC9r-uO9Pg2"
     
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
      bookingLink: "https://outlook.office.com/book/RYDN1@rydn.ca/s/9b_p31eCcEyWYRkSozwUhw2?ismsaljsauthenabled",
     

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
   
    },
    {
      name: "Tina",
      photo: tinaUrl,
      description: "Tina is a Bachelor of Science student",
      advisingTopics: ["Pre-med advising", "Biomedical Sceince"]
   
    },
    {
      name: "Valentina",
      photo: valentinaUrl,
      description: "Valentina is a Bachelor of Science student",
      advisingTopics: ["Psychology", "French", "Biology", "Research", "Academic Academic Exchange"]
   
    }
  ]
  
  const getTagHeight = (count: number) => {
  if (count > 5) return "min-h-[120px]"
  if (count > 3) return "min-h-[90px]"
  return "min-h-[72px]"
}
  const shuffledAdvisors = shuffleArray(advisors);

  return (
    <>
      <div
        className="w-full min-h-[70vh] md:min-h-[80vh] lg:min-h-screen bg-center bg-no-repeat bg-cover relative flex items-center justify-center"
        style={{ backgroundImage: `url(${homeHero})` }}
      >
        <div className="absolute top-0 left-0 w-full h-full bg-black/50" />
        <div className="absolute top-1/2 left-1/2 w-[92%] max-w-5xl -translate-x-1/2 -translate-y-1/2 text-center text-white px-4">
  <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 leading-tight">
    RooZ Youth Development Network
  </h1>

  <p className="max-w-2xl mx-auto text-base md:text-xl lg:text-2xl text-white/90 leading-relaxed mb-10">
    Connect with experienced mentors, explore your passions, and unlock your potential
    through accessible guidance, mentorship, and educational support.
            {/* Free mentorship and guidance to help the next generation discover their path */}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
    <Button
      className="text-white font-bold px-8 py-3 lg:px-12 lg:py-4 lg:text-xl hover:text-black"
      onClick={() => {
        advisorsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }}
    >
      Get Started
    </Button>

    <Button
      className="bg-white text-slate-900 font-semibold px-8 py-3 lg:px-12 lg:py-4 lg:text-xl hover:bg-slate-100"
      onClick={() => {
        window.location.href = "/about-us"
      }}
    >
      Learn More
    </Button>
  </div>
</div>
</div>
      <Container>
  <motion.section
    className="mt-20 text-center"
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
    viewport={{ once: true }}
  >
    <p className="text-slate-700 max-w-3xl mx-auto leading-relaxed text-lg md:text-xl font-medium">
      RooZ Youth Development Network / Réseau de développement de la jeunesse RooZ is an incorporated nonprofit organization based in Canada, dedicated to supporting students through mentorship, workshops, and academic and career guidance.
    </p>
  </motion.section>
</Container>
<Container>
  <motion.section
    className="mt-20 rounded-3xl bg-gradient-to-br from-sky-100 via-white to-sky-50 px-8 py-16 md:px-12"
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
    viewport={{ once: true }}
  >
    <div className="text-center">
      <Heading text="What We Do" />
      <p className="mt-4 text-slate-600 max-w-2xl mx-auto leading-relaxed text-base md:text-lg">
        RooZ provides students with accessible mentorship, practical guidance,
        and educational support to help them navigate their academic and career paths.
      </p>
    </div>

    <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
  <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200 hover:shadow-lg hover:-translate-y-1 transition duration-300 text-center">
    <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-sky-100 text-sky-600">
      <Users size={28} />
    </div>
    <h3 className="text-xl font-semibold mb-3 text-slate-900">1-on-1 Mentorship</h3>
    <p className="text-slate-600 leading-relaxed">
      Students can connect directly with advisors who provide personalized guidance
      on academics, university applications, and career decisions.
    </p>
  </div>

  <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200 hover:shadow-lg hover:-translate-y-1 transition duration-300 text-center">
    <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-sky-100 text-sky-600">
      <BookOpen size={28} />
    </div>
    <h3 className="text-xl font-semibold mb-3 text-slate-900">Workshops</h3>
    <p className="text-slate-600 leading-relaxed">
      We organize interactive sessions focused on topics such as study strategies,
      career exploration, and navigating academic pathways.
    </p>
  </div>

  <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200 hover:shadow-lg hover:-translate-y-1 transition duration-300 text-center">
    <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-sky-100 text-sky-600">
      <Compass size={28} />
    </div>
    <h3 className="text-xl font-semibold mb-3 text-slate-900">Academic & Career Guidance</h3>
    <p className="text-slate-600 leading-relaxed">
      Our advisors help students explore different fields, understand requirements,
      and build a clear direction for their future.
    </p>
  </div>
</div>
  </motion.section>
</Container>
<Container>
  <motion.section
    className="mt-16 rounded-3xl bg-slate-50 px-8 py-16 md:px-12"
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
    viewport={{ once: true }}
  >
    <div className="text-center">
      <Heading text="Why RooZ" />
      <p className="mt-4 text-slate-600 max-w-2xl mx-auto leading-relaxed text-base md:text-lg">
        RooZ was created to make mentorship more accessible, practical, and community-driven for students
        who are exploring their academic and career futures.
      </p>
    </div>

    <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
  <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200 text-center hover:shadow-lg hover:-translate-y-1 transition duration-300">
    <p className="text-sm font-medium uppercase tracking-[0.2em] text-sky-600">
      Community
    </p>
    <h3 className="mt-3 text-4xl font-bold text-slate-900">25+</h3>
    <p className="mt-3 text-slate-600 leading-relaxed">
      Advisors and mentors forming a growing support network for students.
    </p>
  </div>

  <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200 text-center hover:shadow-lg hover:-translate-y-1 transition duration-300">
    <p className="text-sm font-medium uppercase tracking-[0.2em] text-sky-600">
      Guidance
    </p>
    <h3 className="mt-3 text-4xl font-bold text-slate-900">1-on-1</h3>
    <p className="mt-3 text-slate-600 leading-relaxed">
      Personalized mentorship that helps students make clearer academic and career decisions.
    </p>
  </div>

  <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200 text-center hover:shadow-lg hover:-translate-y-1 transition duration-300">
    <p className="text-sm font-medium uppercase tracking-[0.2em] text-sky-600">
      Growth
    </p>
    <h3 className="mt-3 text-4xl font-bold text-slate-900">Workshops</h3>
    <p className="mt-3 text-slate-600 leading-relaxed">
      Interactive sessions designed to build confidence, direction, and opportunity.
    </p>
  </div>
</div>
  </motion.section>
</Container>
      <div ref={advisorsRef}>
  <Container>
       <motion.div
  className="mt-20 text-center"
  initial={{ opacity: 0, y: 24 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6 }}
  viewport={{ once: true }}
>
  <Heading text="Our Advisors" />
  <p className="mt-4 text-slate-600 max-w-2xl mx-auto leading-relaxed text-base md:text-lg">
    Meet the advisors who support students through mentorship, academic guidance, and career exploration.
  </p>
</motion.div>

        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 items-stretch">
          {shuffledAdvisors.map((advisor, index) => (
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full p-6 bg-white rounded-3xl shadow-sm border border-slate-200 flex flex-col items-center hover:shadow-xl hover:-translate-y-1 transition duration-300 h-full"
              key={index}
            >
              <img
                className="w-40 h-40 rounded-full object-cover mb-5 shadow-sm"
                src={advisor.photo}
                alt={advisor.name}
              />
              <h3 className="text-xl font-semibold text-center mb-3 text-slate-900">
  {advisor.name}
</h3>
              <p className="mb-4 text-slate-600 text-center leading-relaxed">
  {advisor.description}
</p>
                <div
  className={`flex flex-wrap gap-2 mt-2 justify-center ${getTagHeight(
    advisor.advisingTopics.length
  )}`}
>
                  {advisor.advisingTopics.map((topic: string, idx: number) => (
                      <span
  key={idx}
  className="bg-sky-100 text-sky-700 px-3 py-1 rounded-full text-sm font-medium"
>
                        {topic}
                      </span>
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
