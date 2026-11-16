import { Link as RouterLink } from "react-router-dom"
import { GraduationCap, Mail, ArrowLeft } from "lucide-react"
import Container from "./components/Container"
import Heading from "./components/Heading"
import Paragraph from "./components/Paragraph"

/**
 * RooZ Academy — coming soon.
 *
 * Academy is RooZ's education and training division: practical courses and
 * training programs built from what the team has learned advising students.
 * Nothing is open for enrolment yet, so this page says so plainly and
 * captures interest by email instead of inventing dates, prices, or a
 * course catalogue.
 */
export default function RoozAcademy() {
  return (
    <Container className="py-20">
      <div className="flex justify-center">
        <span className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-100 text-amber-600 dark:bg-amber-950/50 dark:text-amber-400">
          <GraduationCap size={32} />
        </span>
      </div>
      <div className="mt-6">
        <Heading eyebrow="Coming soon" text="RooZ Academy" />
      </div>

      <div className="mt-8 space-y-6 text-center">
        <Paragraph>
          RooZ Academy is the education and training arm of RooZ — practical
          courses and training programs, built from what we've learned
          advising students one-on-one and running workshops in Canada.
        </Paragraph>
        <Paragraph>
          We're designing the first programs now. No courses are open for
          enrolment yet, and we won't list a catalogue until it's real.
        </Paragraph>
      </div>

      {/* Status — plain language, no invented dates or prices */}
      <div className="mx-auto mt-10 max-w-2xl rounded-3xl border border-amber-200 bg-amber-50 p-6 text-left dark:border-amber-900/60 dark:bg-amber-950/30 sm:p-8">
        <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">Where things stand</h3>
        <ul className="mt-4 space-y-2.5 text-slate-700 dark:text-slate-300 leading-relaxed">
          <li className="flex gap-2.5">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500" />
            <span>Academy programs are in development.</span>
          </li>
          <li className="flex gap-2.5">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500" />
            <span>No courses, dates, or prices are published yet.</span>
          </li>
          <li className="flex gap-2.5">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500" />
            <span>When the first program opens, it will be announced here first.</span>
          </li>
        </ul>
      </div>

      {/* Interest capture + back to gateway */}
      <div className="mt-10 flex flex-col items-center gap-4">
        <a
          href="mailto:info@rydn.ca?subject=RooZ Academy — I'm interested&body=Hi RooZ team,%0D%0A%0D%0AI'd like to hear when RooZ Academy programs open. Here's what I'd like to learn:%0D%0A%0D%0A"
          className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-amber-400 via-amber-500 to-orange-500 px-8 py-4 text-base font-bold text-slate-900 shadow-lg transition hover:shadow-xl"
        >
          <Mail size={18} />
          Tell us what you'd like to learn
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
