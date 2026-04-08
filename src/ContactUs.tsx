import Container from "./components/Container"
import Heading from "./components/Heading"
import Paragraph from "./components/Paragraph"

export default function ContactUs() {
  return (
    <Container>
      <Heading text="Contact Us" />

      <Paragraph>
        We would be happy to hear from you. If you have questions about RooZ Youth
        Development Network, our mentorship opportunities, workshops, or partnership
        opportunities, please reach out to us.
      </Paragraph>

      <Paragraph>
        <strong>Email:</strong> info@rydn.ca
      </Paragraph>

      <Paragraph>
        <strong>Location:</strong> Richmond Hill, Ontario, Canada
      </Paragraph>
    </Container>
  )
}