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
export default function RoozFrance() {
  return (
    <Container className="py-20">
      <div className="flex justify-center">
        <span className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-100 text-blue-600 dark:bg-blue-950/50 dark:text-blue-400">
          <Globe2 size={32} />
        </span>
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

      {/* Status, plain language, no invented claims */}
      <div className="mx-auto mt-10 max-w-2xl rounded-3xl border border-blue-200 bg-blue-50 p-6 text-left dark:border-blue-900/60 dark:bg-blue-950/30 sm:p-8">
        <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">Où en sommes-nous</h3>
        <ul className="mt-4 space-y-2.5 text-slate-700 dark:text-slate-300 leading-relaxed">
          <li className="flex gap-2.5">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-600" />
            <span>Nous créons une association française à but non lucratif (association loi 1901).</span>
          </li>
          <li className="flex gap-2.5">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-600" />
            <span>Elle n'est pas encore enregistrée et aucun programme n'est ouvert pour le moment.</span>
          </li>
          <li className="flex gap-2.5">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-600" />
            <span>La France est notre premier pas en Europe, l'ambition européenne suivra.</span>
          </li>
        </ul>
      </div>

      {/* Interest capture + back to gateway. Real capture via Forminit,
          not a mailto link: the address is stored, nothing depends on the
          visitor having a mail client configured. */}
      <div className="mt-10 flex flex-col items-center gap-4">
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
  )
}
