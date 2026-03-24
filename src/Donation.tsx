import Container from "./components/Container"
import Heading from "./components/Heading"
import Paragraph from "./components/Paragraph"

export default function Donation() {
  return (
    <Container>
      <Heading text="Support Our Mission" />

      <Paragraph>
        At RooZ Youth Development Network, we believe that every student deserves access to
        guidance, mentorship, and opportunity—regardless of their background. Many talented young
        people struggle not because they lack ability, but because they lack access to the right
        information, mentorship, and support. Our mission is to bridge that gap by connecting
        students with mentors who have already walked the paths they aspire to take.
        <br />
        <br />
        Your donation helps us:
        <ul>
          <li className="list-disc list-inside text-left ml-4 mb-2">
            Expand access to free mentorship and advising
          </li>
          <li className="list-disc list-inside text-left ml-4 mb-2">
            Organize educational workshops and mentorship programs{" "}
          </li>
          <li className="list-disc list-inside text-left ml-4 mb-2">
            Build resources to support students navigating university, careers, and personal
            development{" "}
          </li>
          <li className="list-disc list-inside text-left ml-4 mb-2">
            Reach students who otherwise would not have access to guidance Every contribution—big or
            small—helps us empower the next generation to make{" "}
          </li>
          <li className="list-disc list-inside text-left ml-4 mb-2">
            informed decisions and reach their full potential. Together, we can turn potential into
            opportunity.{" "}
          </li>
        </ul>
      </Paragraph>
    </Container>
  )
}
