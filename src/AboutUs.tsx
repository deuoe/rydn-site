import Button from "./components/Button"
import Container from "./components/Container"
import Heading from "./components/Heading"
import Paragraph from "./components/Paragraph"

export default function AboutUs() {
  return (
    <Container>
      <Heading text="About Us" />

      <Paragraph>
        Talent is everywhere, but guidance is not. RooZ Youth Development Network is a non-profit
        organization providing free student mentorship, academic guidance, and career support by
        connecting students with advisors who have already walked the paths they aspire to take.
        Through one-on-one mentorship and workshops, we help young people navigate university,
        careers, and personal growth with clarity and confidence.
      </Paragraph>
    </Container>
  )
}
