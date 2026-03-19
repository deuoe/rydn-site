import Container from "./components/Container"
import Heading from "./components/Heading"
import Paragraph from "./components/Paragraph"

export default function AboutUs() {
  return (
    <Container>
      <Heading text="About Us" />

      <Paragraph>
        Most students aren’t lacking ambition, they’re lacking direction.
They’re expected to make some of the biggest decisions of their lives, what to study, what career to pursue, what path to take, without ever speaking to someone who has actually been through it.
At RooZ Youth Development Network (RYDN), we believe guidance should be real, accessible, and personal. Instead of relying on endless online research, we connect students with individuals who have already walked the paths they’re considering, people who can share not just what worked, but what didn’t, and what the journey truly looks like.
Through free, one-on-one conversations, workshops, and a growing advisor network, we give students the opportunity to ask real questions, gain clarity, and make decisions with confidence. Because when you understand your path, everything changes, not just your choices, but your level of confidence, your direction, and ultimately, your fulfillment.
      </Paragraph>
    </Container>
  )
}
