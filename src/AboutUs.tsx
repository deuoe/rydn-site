import Container from "./components/Container"
import Heading from "./components/Heading"
import Paragraph from "./components/Paragraph"

export default function AboutUs() {
  return (
    <Container>
      <Heading text="About Us" />

      <Paragraph>
        RooZ Youth Development Network / Réseau de développement de la jeunesse RooZ
        is an incorporated nonprofit organization based in Canada.
      </Paragraph>

      <Paragraph>
        Our mission is to make mentorship more accessible for students by connecting
        them with advisors who can offer practical guidance on academics, career paths,
        university preparation, and personal growth.
      </Paragraph>

      <Paragraph>
        We support students who are exploring their future and looking for clarity,
        direction, and encouragement. Through one-on-one mentorship, educational
        workshops, and student-centered programming, we aim to help young people make
        informed decisions about their academic and professional journeys.
      </Paragraph>

      <Paragraph>
        RooZ was founded to create a supportive and community-driven space where
        students can learn from mentors who have firsthand experience in the paths
        they are considering. We believe that guidance should be approachable,
        relatable, and empowering.
      </Paragraph>

      <Paragraph>
        Our organization continues to grow through a network of advisors, volunteers,
        and collaborators who are committed to helping students build confidence,
        discover opportunities, and take meaningful steps toward their goals.
      </Paragraph>
    </Container>
  )
}