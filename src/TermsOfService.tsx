import Container from "./components/Container"
import Heading from "./components/Heading"
import Paragraph from "./components/Paragraph"

export default function TermsOfService() {
  return (
    <Container>
      <Heading text="Terms of Service" />

      <Paragraph>
        Welcome to RooZ Youth Development Network / Réseau de développement de la jeunesse RooZ.
        By using this website, you agree to use it only for lawful purposes and in a manner
        that does not interfere with the rights or use of the website by others.
      </Paragraph>

      <Paragraph>
        The information provided on this website is for general informational and educational
        purposes only. While we aim to keep information accurate and up to date, RooZ Youth
        Development Network does not guarantee the completeness, accuracy, or reliability of
        any content on this site.
      </Paragraph>

      <Paragraph>
        Users may not misuse this website, attempt to gain unauthorized access to its systems,
        or use any content in a way that harms the organization or its community.
      </Paragraph>

      <Paragraph>
        RooZ Youth Development Network may update or modify website content, services, or these
        terms at any time without prior notice.
      </Paragraph>

      <Paragraph>
        If you have any questions regarding these Terms of Service, please contact us at
        info@rydn.ca.
      </Paragraph>
    </Container>
  )
}