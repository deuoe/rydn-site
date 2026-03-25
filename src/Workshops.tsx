import Container from "./components/Container"
import Heading from "./components/Heading"
import Paragraph from "./components/Paragraph"
const FORM_LINK =
  "https://docs.google.com/forms/d/e/1FAIpQLSfWg443BHU5V5UPaNJiSz40sVgpkl4VCeP8sTC9pWn8uLinNw/viewform?usp=dialog"

const workshops = [
  {
    title: "Top 6 Career Paths Explained by Students Living Them",
    subtitle: "Medicine, Business, Psychology, Pharmacy, Dental, Law",
    date: "April 25",
    type: "Online",
    link: FORM_LINK,
  },
  {
    title: "How to Choose the RIGHT Career for YOU (Regret Free!)",
    date: "May 12",
    type: "Online",
    link: FORM_LINK,
  },
  {
    title: "What You Should Be Doing RIGHT NOW as a High School Student",
    subtitle: "Hosted by a high school teacher (Grades 10–12)",
    date: "June 5",
    type: "Hybrid – Richmond Hill Central Library",
    link: FORM_LINK,
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
    link: FORM_LINK,
  },
  {
    title: "Top Mistakes Students Make When Choosing Their Future",
    date: "July 17",
    type: "Hybrid – Richmond Hill Central Library",
    link: FORM_LINK,
  },
  {
    title: "Ask Me Anything: Healthcare Careers",
    subtitle: "Insights from students actively in the field",
    date: "August 18",
    type: "Online",
    link: FORM_LINK,
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

            <a
  href={workshop.link}
  target="_blank"
  rel="noopener noreferrer"
  className="mt-4 block w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 text-center"
>
  Register
</a>
          </div>
        ))}
      </div>
      <div className="mt-16 text-center">
      <Heading text="Partner With Us" />

<Paragraph>
  RooZ also collaborates with high schools, academies, and educational institutions in Canada and internationally to provide workshops, mentorship sessions, and student guidance focused on Canadian university pathways and future career exploration.
</Paragraph>

<a
  href="mailto:info@rydn.ca?subject=Partnership Inquiry - RooZ&body=Hi RooZ Team,%0D%0A%0D%0AWe are interested in collaborating with RooZ.%0D%0A%0D%0ASchool/Organization Name:%0D%0ALocation:%0D%0ANumber of Students:%0D%0A%0D%0AThank you!"
  className="inline-block mt-4 px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800"
>
  Contact Us to Collaborate
</a>
</div>
    </Container>
  )
}