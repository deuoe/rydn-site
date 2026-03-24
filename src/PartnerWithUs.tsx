import Container from "./components/Container"
import Heading from "./components/Heading"
import Paragraph from "./components/Paragraph"

export default function PartnerWithUs() {
  return (
    <Container>
      <Heading text="Partner With Us" />

      <Paragraph>
        RooZ Youth Development Network collaborates with high schools,
        academies, and educational institutions in Canada and internationally
        to support students in exploring academic pathways, career opportunities,
        and Canadian university options.
      </Paragraph>

      <Paragraph>
        We offer interactive workshops, mentorship sessions, student panels,
        and tailored programming designed to help students gain clarity,
        confidence, and direction as they plan their future.
      </Paragraph>
    </Container>
  )
}