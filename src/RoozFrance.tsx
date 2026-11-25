import { Link as RouterLink } from "react-router-dom"
import { Globe2, ArrowLeft } from "lucide-react"
import Container from "./components/Container"
import Heading from "./components/Heading"
import Paragraph from "./components/Paragraph"
import EmailCaptureForm from "./components/EmailCaptureForm"

/**
 * RooZ France, bientôt disponible.
 *
 * La France est le foyer européen de RooZ : une association de jeunesse en
 * cours de création. Elle n'est PAS encore enregistrée et aucun programme
 * n'est ouvert, cette page le dit clairement. L'objectif est d'organiser des
 * programmes pour les jeunes et des échanges européens (notamment des projets
 * Erasmus+) une fois l'association créée ; rien ici ne prétend à un
 * financement, un partenariat ou un enregistrement qui n'existe pas encore.
 *
 * Brand name stays "RooZ France", the page content itself is in French.
 */
const TIMELINE = [
  {
    step: "01",
    title: "Association en création",
    body: "Nous créons une association française à but non lucratif (association loi 1901).",
  },
  {
    step: "02",
    title: "Pas encore enregistrée",
    body: "Elle n'est pas encore enregistrée et aucun programme n'est ouvert pour le moment.",
  },
  {
    step: "03",
    title: "Premiers pas en Europe",
    body: "La France est notre premier pas en Europe, l'ambition européenne suivra.",
  },
]

export default function RoozFrance() {
  return (
    <div className="pattern-blue">
      <Container className="py-20">
        {/* Larger icon composition: blue ring, soft glow, orbiting dots */}
        <div className="relative flex justify-center">
          <div className="absolute h-28 w-28 rounded-full bg-blue-500/15 blur-2xl" aria-hidden />
          <span className="relative inline-flex h-20 w-20 items-center justify-center rounded-3xl bg-blue-100 text-blue-600 ring-2 ring-blue-500/40 shadow-lg dark:bg-blue-950/50 dark:text-blue-400">
            <Globe2 size={40} />
          </span>
          <span className="absolute -top-1 right-[calc(50%-4.5rem)] h-3 w-3 rounded-full bg-blue-500" aria-hidden />
          <span className="absolute bottom-0 left-[calc(50%-5rem)] h-2 w-2 rounded-full bg-blue-300" aria-hidden />
        </div>
        <div className="mt-6">
          <Heading eyebrow="Bientôt disponible" text="RooZ France" />
        </div>

        <div className="mt-8 space-y-6 text-center">
          <Paragraph>
            RooZ France est le foyer français de l'écosystème RooZ, une association de jeunesse en cours de création, qui apporte le mentorat et les programmes RooZ en France et relie les jeunes à travers l'Europe.
          </Paragraph>
          <Paragraph>
            Notre objectif : organiser des programmes pour les jeunes et des échanges européens, notamment des projets Erasmus+, une fois l'association créée.
          </Paragraph>
        </div>

        {/* Status as a visual timeline, not a bullet list */}
        <div className="mx-auto mt-14 max-w-4xl">
          <h3 className="text-center text-lg font-bold text-slate-900 dark:text-slate-100">Où en sommes-nous</h3>
          <div className="relative mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="hidden md:block absolute top-7 left-[16%] right-[16%] h-0.5 bg-gradient-to-r from-blue-600 via-blue-400 to-blue-600" aria-hidden />
            {TIMELINE.map((s) => (
              <div
                key={s.step}
                className="relative rounded-3xl border border-blue-200 bg-blue-50 p-6 text-center dark:border-blue-900/60 dark:bg-blue-950/30"
              >
                <span className="relative mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-blue-600 font-display text-lg font-bold text-white shadow-md">
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
            Laissez votre courriel pour suivre l'actualité de RooZ France.
          </p>
          <div className="w-full max-w-md">
            <EmailCaptureForm
              source="RooZ France interest"
              placeholder="vous@exemple.com"
              buttonLabel="S'abonner"
              successMessage="Merci ! Nous vous préviendrons dès que l'association sera lancée."
              inputClassName="flex-1 rounded-full border border-blue-300 dark:border-blue-900/60 bg-white dark:bg-slate-900 dark:text-slate-100 px-5 py-4 text-base placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-60"
              buttonClassName="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-blue-600 via-blue-500 to-blue-600 px-6 py-4 text-base font-bold text-white shadow-lg transition hover:shadow-xl disabled:opacity-60 disabled:cursor-not-allowed"
            />
          </div>
          <RouterLink
            to="/"
            className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
          >
            <ArrowLeft size={16} />
            Retour à RooZ
          </RouterLink>
        </div>
      </Container>
    </div>
  )
}
