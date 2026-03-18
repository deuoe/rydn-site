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

function App() {
  const advisors = [
    {
      name: "Ilia Jafari",
      photo: leoUrl,
      description: "Ilia is a Bachelor of Commerce student and provides advising in",
      advisingTopics: ["Information Technology", "Soccer", "Business"],
    },
    {
      name: "Sahar",
      photo: saharUrl,
      description: "Sahar is a Bachelor of Art student and provides advising in",
      advisingTopics: [
        "Psychology",
        "Political science",
        "LSAT preparation",
        "University applications",
      ],
    },
    {
      name: "Sara",
      photo: saraUrl,
      description: "Sara is a Bachelor of Science student and provides advising in",
      advisingTopics: [
        "Pre-med advising and medical school preparation",
        "MCAT",
        "Research experience and getting involved in labs",
        "Psychology",
      ],
    },
    {
      name: "Mandy",
      photo: mandyUrl,
      description:
        "Mandy is a Bachelor of Science student and business operator and provides advising in",
      advisingTopics: [
        "Psychology",
        "University applications",
        "Business",
        "Marketing and client relations",
      ],
    },
    {
      name: "Sam Sina",
      photo: sinaUrl,
      description: "Add advisor 5 description here.",
      advisingTopics: ["Topic 1", "Topic 2", "Topic 3"],
    },
  ]

  return (
    <>
      <div
        className="w-full h-[600px] bg-fixed bg-center bg-no-repeat bg-cover relative flex items-center justify-center"
        style={{ backgroundImage: `url(${homeHero})` }}
      >
        <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white">
          <h2 className="text-6xl font-bold mb-4">RooZ Youth Development Network</h2>
          <p className="text-2xl mb-8">
            Connect with experienced mentors, explore your passions, and unlock your potential.
            {/* Free mentorship and guidance to help the next generation discover their path */}
          </p>
          <Button className="text-white font-bold text-xl hover:text-black">Get Started</Button>
        </div>
      </div>

      <Container>
        <Heading text="Our Advisors" />

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {advisors.map((advisor, index) => (
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-4 bg-gray-100 rounded-lg shadow-md w-64 flex flex-col justify-content items-center"
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
                {advisor.advisingTopics.join(", ")}
              </p>
              <div className="mt-auto w-full">
                <Button className="w-full">Contact {advisor.name.split(" ")[0]}</Button>
              </div>
            </motion.div>
          ))}
        </div>

        <footer className="major">
          <ul className="actions special">
            <li>
              <a href="book.html" className="button primary">
                View All Advisors
              </a>
            </li>
          </ul>
        </footer>

        <footer>
          <section>
            <h2>RooZ Youth Develpment Network</h2>
            <p>
              Sed lorem ipsum dolor sit amet et nullam consequat feugiat consequat magna adipiscing
              tempus etiam dolore veroeros. eget dapibus mauris. Cras aliquet, nisl ut viverra
              sollicitudin, ligula erat egestas velit, vitae tincidunt odio.
            </p>
            <ul className="actions">
              <li>
                <a href="generic.html" className="button">
                  Learn More
                </a>
              </li>
            </ul>
          </section>
          <section>
            <h2>Contact Us</h2>
            <dl className="alt">
              <dt>Phone</dt>
              <dd>(647) 498-3938</dd>
              <dt>Email</dt>
              <dd>
                <a href="#">info@rydn.ca</a>
              </dd>
            </dl>

            <h2>Follow Us</h2>
            <p>Stay connected with RooZ Youth Development Network.</p>

            <ul className="icons">
              <li>
                <a href="#" className="icon brands fa-twitter alt">
                  <span className="label">Twitter</span>
                </a>
              </li>
              <li>
                <a href="#" className="icon brands fa-facebook-f alt">
                  <span className="label">Facebook</span>
                </a>
              </li>
              <li>
                <a
                  href="https://instagram.com/rydn.ca"
                  className="icon brands fa-instagram alt"
                  target="_blank"
                >
                  <span className="label">Instagram</span>
                </a>
              </li>
            </ul>
          </section>
          <p className="copyright">
            &copy; 2026 RooZ Youth Development Network. All rights reserved.
          </p>
        </footer>
      </Container>
    </>
  )
}

export default App
