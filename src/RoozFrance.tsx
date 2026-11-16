import { Link as RouterLink } from "react-router-dom"
import { Globe2, Mail, ArrowLeft } from "lucide-react"
import Container from "./components/Container"
import Heading from "./components/Heading"
import Paragraph from "./components/Paragraph"

/**
 * RooZ France — coming soon.
 *
 * France is RooZ's European home: a French youth association in formation.
 * It is NOT registered yet and no programs are open — this page says so
 * plainly. The aim is youth programs and European exchanges (including
 * Erasmus+ projects) once the association is formed; nothing here claims
 * funding, partnerships, or registration that doesn't exist yet.
 */
export default function RoozFrance() {
  return (
    <Container className="py-20">
      <div className="flex justify-center">
        <span className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-100 text-blue-600 dark:bg-blue-950/50 dark:text-blue-400">
          <Globe2 size={32} />
        </span>
      </div>
      <div className="mt-6">
        <Heading eyebrow="Coming soon" text="RooZ France" />
      </div>

      <div className="mt-8 space-y-6 text-center">
        <Paragraph>
          RooZ France is the French home of the RooZ ecosystem — a youth
          association in formation, bringing RooZ mentorship and programs to
          France and connecting young people across Europe.
        </Paragraph>
        <Paragraph>
          Our aim is to run youth programs and European exchanges — including
          Erasmus+ projects — once the association is up and running.
        </Paragraph>
      </div>

      {/* Status — plain language, no invented claims */}
      <div className="mx-auto mt-10 max-w-2xl rounded-3xl border border-blue-200 bg-blue-50 p-6 text-left dark:border-blue-900/60 dark:bg-blue-950/30 sm:p-8">
        <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">Where things stand</h3>
        <ul className="mt-4 space-y-2.5 text-slate-700 dark:text-slate-300 leading-relaxed">
          <li className="flex gap-2.5">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-600" />
            <span>We are forming a French nonprofit association (association loi 1901).</span>
          </li>
          <li className="flex gap-2.5">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-600" />
            <span>It is not registered yet, and no programs are open yet.</span>
          </li>
          <li className="flex gap-2.5">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-600" />
            <span>France is our first step in Europe — the wider European ambition follows from here.</span>
          </li>
        </ul>
      </div>

      {/* Interest capture + back to gateway */}
      <div className="mt-10 flex flex-col items-center gap-4">
        <a
          href="mailto:info@rydn.ca?subject=RooZ France — I'm interested&body=Hi RooZ team,%0D%0A%0D%0AI'd like to hear about RooZ France as it takes shape. I'm interested in:%0D%0A%0D%0A"
          className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 via-blue-500 to-blue-600 px-8 py-4 text-base font-bold text-white shadow-lg transition hover:shadow-xl"
        >
          <Mail size={18} />
          Stay in the loop on RooZ France
        </a>
        <RouterLink
          to="/"
          className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
        >
          <ArrowLeft size={16} />
          Back to RooZ
        </RouterLink>
      </div>
    </Container>
  )
}
