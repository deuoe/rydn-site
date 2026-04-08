import Container from "./components/Container"
import Heading from "./components/Heading"
import Paragraph from "./components/Paragraph"

export default function PrivacyPolicy() {
  return (
    <Container>
      <Heading text="Privacy Policy" />

      <Paragraph>
        RooZ Youth Development Network / Réseau de développement de la jeunesse RooZ
        is committed to protecting the privacy of visitors to our website.
      </Paragraph>

      <Paragraph>
        We may collect personal information that you voluntarily provide to us,
        such as your name, email address, school information, or other details
        submitted through contact forms, registration forms, or partnership inquiries.
      </Paragraph>

      <Paragraph>
        This information is used only to communicate with you, provide our services,
        respond to inquiries, organize workshops or mentorship activities, and improve
        our programs.
      </Paragraph>

      <Paragraph>
        We do not sell, rent, or trade your personal information to third parties.
      </Paragraph>

      <Paragraph>
        Our website may use third-party tools or services, such as email providers,
        analytics tools, or booking systems, to help us operate effectively.
      </Paragraph>

      <Paragraph>
        If you have any questions about this Privacy Policy or how your information
        is handled, please contact us at info@rydn.ca.
      </Paragraph>
    </Container>
  )
}