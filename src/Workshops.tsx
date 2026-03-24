import Container from "./components/Container"
import Heading from "./components/Heading"
import Paragraph from "./components/Paragraph"
import { Link } from "react-router-dom"

const workshops = [
  {
    title: "Top 6 Career Paths Explained by Students Living Them",
    subtitle: "Medicine, Business, Psychology, Pharmacy, Dental, Law",
    date: "April 25",
    type: "Online",
  },
  {
    title: "How to Choose the RIGHT Career for YOU (Regret Free!)",
    date: "May 12",
    type: "Online",
  },
  {
    title: "What You Should Be Doing RIGHT NOW as a High School Student",
    subtitle: "Hosted by a high school teacher (Grades 10–12)",
    date: "June 5",
    type: "Hybrid – Richmond Hill Central Library",
  },
  {
    title: "How to Build a Strong Resume Before University",
    date: "June 26",
    type: "Online",
  },
  {
    title: "What Nobody Tells You About University (Reality vs Expectations)",
    date: "July 1",
    type: "Online",
  },
  {
    title: "Top Mistakes Students Make When Choosing Their Future",
    date: "July 17",
    type: "Hybrid – Richmond Hill Central Library",
  },
  {
    title: "Ask Me Anything: Healthcare Careers",
    subtitle: "Insights from students actively in the field",
    date: "August 18",
    type: "Online",
  },
];

export default function Workshops() {
  return (
    <Container>
      <Heading text="Workshops" />

      <Paragraph>
        Join our interactive workshops designed to help students explore academic
        pathways, career opportunities, and personal growth.
      </Paragraph>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {workshops.map((workshop, index) => (
          <div
            key={index}
            className="p-6 bg-white rounded-xl shadow-md hover:shadow-xl transition"
          >
            <h3 className="text-xl font-bold mb-2">{workshop.title}</h3>

            {workshop.subtitle && (
              <p className="text-gray-600 text-sm mb-2">
                {workshop.subtitle}
              </p>
            )}

            <p className="text-gray-700 font-medium">📅 {workshop.date}</p>
            <p className="text-gray-500">📍 {workshop.type}</p>

            <button className="mt-4 w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800">
              Register
            </button>
          </div>
        ))}
      </div>
      <Heading text="Partner With Us" />

<Paragraph>
  RooZ also collaborates with high schools, academies, and educational institutions in Canada and internationally to provide workshops, mentorship sessions, and student guidance focused on Canadian university pathways and future career exploration.
</Paragraph>

<Link to="/partner-with-us">
  <button className="mt-4 px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800">
    Contact Us to Collaborate
  </button>
</Link>
    </Container>
  )
}