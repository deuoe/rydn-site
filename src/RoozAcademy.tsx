import { Link as RouterLink } from "react-router-dom"
import { GraduationCap, ArrowLeft } from "lucide-react"
import Container from "./components/Container"
import Heading from "./components/Heading"
import Paragraph from "./components/Paragraph"
import EmailCaptureForm from "./components/EmailCaptureForm"

/**
 * RooZ Academy, coming soon.
 *
 * Academy is RooZ's education and training division: practical courses and
 * training programs built from what the team has learned advising students.
 * Nothing is open for enrolment yet, so this page says so plainly and
 * captures interest by email instead of inventing dates, prices, or a
 * course catalogue.
 */
const TIMELINE = [
  {
    step: "01",
    title: "Programs in development",
    body: "Academy programs are in development.",
  },
  {
    step: "02",
    title: "No catalogue yet",
    body: "No courses, dates, or prices are published yet.",
  },
  {
    step: "03",
    title: "Announced here first",
    body: "When the first program opens, it will be announced here first.",
  },
]

export default function RoozAcademy() {
  return (
    <div className="pattern-gold">
      <Container className="py-20">
        {/* Larger icon composition: gold ring, soft glow, orbiting dots */}
        <div className="relative flex justify-center">
          <div className="absolute h-28 w-28 rounded-full bg-rydn-gold/15 blur-2xl" aria-hidden />
          <span className="relative inline-flex h-20 w-20 items-center justify-center rounded-3xl bg-amber-100 text-amber-600 ring-2 ring-rydn-gold/50 shadow-lg dark:bg-amber-950/50 dark:text-amber-400">
            <GraduationCap size={40} />
          </span>
          <span className="absolute -top-1 right-[calc(50%-4.5rem)] h-3 w-3 rounded-full bg-rydn-gold" aria-hidden />
          <span className="absolute bottom-0 left-[calc(50%-5rem)] h-2 w-2 rounded-full bg-rydn-gold-light" aria-hidden />
        </div>
        <div className="mt-6">
          <Heading eyebrow="Coming soon" text="RooZ Academy" />
        </div>

        <div className="mt-8 space-y-6 text-center">
          <Paragraph>
            RooZ Academy is the education and training arm of RooZ, practical
            courses and training programs, built from what we've learned
            advising students one-on-one and running workshops in Canada.
          </Paragraph>
          <Paragraph>
            We're designing the first programs now. No courses are open for
            enrolment yet, and we won't list a catalogue until it's real.
          </Paragraph>
        </div>

        {/* Status as a visual timeline, not a bullet list */}
        <div className="mx-auto mt-14 max-w-4xl">
          <h3 className="text-center text-lg font-bold text-slate-900 dark:text-slate-100">Where things stand</h3>
          <div className="relative mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="hidden md:block absolute top-7 left-[16%] right-[16%] h-0.5 bg-gradient-to-r from-rydn-gold via-rydn-gold-light to-rydn-gold-dark" aria-hidden />
            {TIMELINE.map((s) => (
              <div
                key={s.step}
                className="relative rounded-3xl border border-amber-200 bg-amber-50 p-6 text-center dark:border-amber-900/60 dark:bg-amber-950/30"
              >
                <span className="relative mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-rydn-gold font-display text-lg font-bold text-rydn-navy-deep shadow-md">
                  {s.step}
                </span>
                <h4 className="mt-4 font-bold text-slate-900 dark:text-slate-100">{s.title}</h4>
                <p className="mt-2 text-sm text-slate-700 dark:text-slate-300 leading-relaxed">{s.body}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Interest capture + back to gateway. Real capture via Forminit,
            not a mailto link: the address is stored, nothing depends on the
            visitor having a mail client configured. */}
        <div className="mt-14 flex flex-col items-center gap-4">
          <p className="text-center text-sm text-slate-600 dark:text-slate-400">
            Leave your email and we will tell you when the first programs open.
          </p>
          <div className="w-full max-w-md">
            <EmailCaptureForm
              source="RooZ Academy interest"
              buttonLabel="Notify me"
              successMessage="Thanks! We'll let you know when the first programs open."
              inputClassName="flex-1 rounded-full border border-amber-300 dark:border-amber-900/60 bg-white dark:bg-slate-900 dark:text-slate-100 px-5 py-4 text-base placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500 disabled:opacity-60"
              buttonClassName="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-amber-400 via-amber-500 to-orange-500 px-6 py-4 text-base font-bold text-slate-900 shadow-lg transition hover:shadow-xl disabled:opacity-60 disabled:cursor-not-allowed"
            />
          </div>
          <RouterLink
            to="/"
            className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
          >
            <ArrowLeft size={16} />
            Back to RooZ
          </RouterLink>
        </div>
      </Container>
    </div>
  )
}
