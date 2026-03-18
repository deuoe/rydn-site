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
import Appointlet from "@appointlet/appointlet.js"
import "@appointlet/appointlet.js/dist/appointlet.min.css"

function App() {
  const advisors = [
    {
      name: "Ilia Jafari",
      photo: leoUrl,
      description: "Ilia is a Bachelor of Commerce student",
      advisingTopics: ["Information Technology", "Soccer", "Business"],
      appointlet: new Appointlet("https://appt.link/ilia"),
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
      appointlet: new Appointlet("https://appt.link/sahar-"),
    },
    {
      name: "Sara Roozbahani",
      photo: saraUrl,
      description: "Sara is a Bachelor of Science student",
      advisingTopics: [
        "Pre-med advising",
        "Medical School Preparation",
        "MCAT",
        "Research experience",
        "Lab Involvement",
        "Psychology",
      ],
      appointlet: new Appointlet("https://appt.link/sara-roozbahani"),
    },
    {
      name: "Mandy",
      photo: mandyUrl,
      description: "Mandy is a Bachelor of Science student and business operator",
      advisingTopics: [
        "Psychology",
        "University applications",
        "Business",
        "Marketing",
        "Client Relations",
      ],
      appointlet: new Appointlet("https://appt.link/mandy"),
    },
    {
      name: "Sam Sina",
      photo: sinaUrl,
      description: "Add advisor 5 description here.",
      advisingTopics: ["Topic 1", "Topic 2", "Topic 3"],
      appointlet: new Appointlet("https://appt.link/sam-sina"),
    },
  ]

  return (
    <>
      <div
        className="w-full h-100 lg:h-150 xl:h-200 2xl:h-200 bg-fixed bg-center bg-no-repeat bg-cover relative flex items-center justify-center"
        style={{ backgroundImage: `url(${homeHero})` }}
      >
        <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white">
          <h2 className="text-4xl lg:text-6xl font-bold mb-4">RooZ Youth Development Network</h2>
          <p className="text-lg lg:text-2xl mb-8">
            Connect with experienced mentors, explore your passions, and unlock your potential.
            {/* Free mentorship and guidance to help the next generation discover their path */}
          </p>
          <Button className="text-white font-bold px-8 py-3 lg:px-12 lg:py-4 lg:text-xl hover:text-black">
            Get Started
          </Button>
        </div>
      </div>

      <Container>
        <div className="mt-8"></div>
        <Heading text="Our Advisors" />

        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {advisors.map((advisor, index) => (
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
                <br />
                <div className="flex flex-wrap gap-2 mt-2 justify-center">
                  {advisor.advisingTopics.map((topic, idx) => (
                    <>
                      <span key={idx} className="bg-[#4facfe] text-white p-1 rounded">
                        {topic}
                      </span>{" "}
                    </>
                  ))}
                </div>
              </p>
              <div className="mt-auto w-full">
                <Button
                  className="w-full"
                  onClick={async () => await advisor.appointlet.openModal()}
                >
                  Contact {advisor.name.split(" ")[0]}
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </>
  )
}

export default App
