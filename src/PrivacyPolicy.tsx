import Container from "./components/Container"
import Heading from "./components/Heading"
import Paragraph from "./components/Paragraph"

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="max-w-3xl mx-auto mt-10 mb-3 font-display text-xl sm:text-2xl font-semibold text-slate-900">
      {children}
    </h3>
  )
}

export default function PrivacyPolicy() {
  return (
    <Container>
      <Heading text="Privacy Policy" />

      <Paragraph className="mt-6 text-center text-sm text-slate-500">
        Last updated: May 26, 2026
      </Paragraph>

      <Paragraph className="mt-6">
        RooZ Youth Development Network / Réseau de développement de la jeunesse RooZ
        ("RYDN", "we", "us", or "our") operates the website rydn.ca and the RYDN
        mobile application (collectively, the "Service"). This Privacy Policy
        explains how we collect, use, disclose, and protect your information when
        you use the Service.
      </Paragraph>

      <Paragraph>
        By using the Service, you agree to the practices described in this
        Privacy Policy. If you do not agree, please do not use the Service.
      </Paragraph>

      <SectionTitle>Information We Collect</SectionTitle>
      <Paragraph>
        We collect the following categories of information only when you choose
        to provide it:
      </Paragraph>
      <Paragraph>
        <strong>Information you provide directly:</strong> name, email address,
        school or institution, grade level or program, and any messages or
        questions you submit through contact forms, registration forms, advisor
        booking forms, or partnership inquiries.
      </Paragraph>
      <Paragraph>
        <strong>Information from your use of the Service:</strong> general
        analytics such as pages visited and approximate device type, used solely
        to improve the Service. We do not collect precise location data,
        contacts, photos, or microphone input.
      </Paragraph>
      <Paragraph>
        <strong>Chat / AI Matchmaker interactions:</strong> the text you submit
        to our AI advisor matchmaker is processed to return relevant
        recommendations. We do not store chat transcripts beyond what is needed
        to operate the feature.
      </Paragraph>

      <SectionTitle>How We Use Your Information</SectionTitle>
      <Paragraph>
        We use your information only to: (1) communicate with you, (2) provide
        the advising, mentorship, and workshop services you have requested,
        (3) respond to inquiries, (4) organize and improve our programs, and
        (5) comply with legal obligations applicable to a registered Canadian
        nonprofit.
      </Paragraph>

      <SectionTitle>Sharing and Disclosure</SectionTitle>
      <Paragraph>
        We do not sell, rent, or trade your personal information to third
        parties. We may share limited information with the following service
        providers strictly to operate the Service:
      </Paragraph>
      <Paragraph>
        <strong>Appointlet</strong> (advisor booking) — receives the name and
        email you submit when booking a session.
        <br />
        <strong>Cloudflare</strong> (hosting, AI worker for the matchmaker
        chatbot) — processes anonymized chat input.
        <br />
        <strong>GitHub Pages</strong> (website hosting) — receives standard
        server access logs.
        <br />
        <strong>Email providers</strong> — used solely to reply to your
        inquiries.
      </Paragraph>
      <Paragraph>
        We may also disclose information if required by law, court order, or to
        protect the rights, safety, and security of users or the public.
      </Paragraph>

      <SectionTitle>Children's Privacy</SectionTitle>
      <Paragraph>
        RYDN serves youth, including users under the age of 18. We take the
        privacy of young people seriously and comply with applicable children's
        privacy laws, including Canada's Personal Information Protection and
        Electronic Documents Act (PIPEDA) and, where applicable, the U.S.
        Children's Online Privacy Protection Act (COPPA).
      </Paragraph>
      <Paragraph>
        We do not knowingly collect more information than is necessary to
        provide our services. We do not display third-party advertising, do not
        use behavioral tracking, and do not share children's information with
        advertisers. If you are a parent or guardian and believe your child has
        provided us with information without your consent, please contact us at
        info@rydn.ca and we will delete it promptly.
      </Paragraph>

      <SectionTitle>Data Retention and Deletion</SectionTitle>
      <Paragraph>
        We retain personal information only for as long as needed to provide
        the Service or as required by law. You may request that we delete your
        personal information at any time by emailing info@rydn.ca with the
        subject line "Data Deletion Request." We will respond within 30 days
        and confirm when your data has been removed from our systems.
      </Paragraph>

      <SectionTitle>Your Rights</SectionTitle>
      <Paragraph>
        You have the right to access, correct, or delete the personal
        information we hold about you, and to withdraw consent to its
        processing at any time. Contact us at info@rydn.ca to exercise these
        rights.
      </Paragraph>

      <SectionTitle>Mobile App Permissions</SectionTitle>
      <Paragraph>
        The RYDN mobile app is a wrapper around our website and does not
        request access to your camera, microphone, contacts, photos, location,
        or other sensitive device features. If a future update introduces such
        a feature, the app will request your permission first and this Privacy
        Policy will be updated accordingly.
      </Paragraph>

      <SectionTitle>Security</SectionTitle>
      <Paragraph>
        We use industry-standard safeguards (HTTPS encryption, access controls,
        and limited data collection) to protect your information. However, no
        system is perfectly secure, and we cannot guarantee absolute security.
      </Paragraph>

      <SectionTitle>International Users</SectionTitle>
      <Paragraph>
        RYDN is based in Canada. If you access the Service from outside Canada,
        your information may be transferred to and processed in Canada, where
        privacy laws may differ from those in your country.
      </Paragraph>

      <SectionTitle>Changes to This Policy</SectionTitle>
      <Paragraph>
        We may update this Privacy Policy from time to time. When we do, we
        will revise the "Last updated" date at the top of this page. Material
        changes will be highlighted on our website or, where appropriate,
        communicated by email.
      </Paragraph>

      <SectionTitle>Contact Us</SectionTitle>
      <Paragraph className="mb-12">
        If you have questions about this Privacy Policy or how your information
        is handled, please contact us at <strong>info@rydn.ca</strong>.
      </Paragraph>
    </Container>
  )
}
