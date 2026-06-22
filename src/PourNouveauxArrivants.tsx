import { motion } from "motion/react"
import { Sparkles, Globe2, Heart, ShieldCheck, MessageCircle, ArrowRight, Calendar, GraduationCap } from "lucide-react"
import Container from "./components/Container"
import { Link } from "./i18n/Link"
import SkeletonImage from "./components/SkeletonImage"
import { getAdvisorBySlug } from "./data/advisors"

/**
 * /pour-nouveaux-arrivants — French-language campaign page for newcomer
 * and francophone families. Mirrors /for-newcomers in structure but
 * speaks directly to French-speaking audiences (Quebec, francophone
 * Ontario, French-speaking newcomer families).
 *
 * Use cases:
 *   - Funder bilingual-mandate satisfaction (Canadian gov't, Trillium)
 *   - SEO target for French Canadian queries
 *   - Sharable destination for francophone outreach + partnerships
 */
export default function PourNouveauxArrivants() {
  const founder = getAdvisorBySlug("sam-sina")

  return (
    <>
      {/* ===================== HÉROS ===================== */}
      <section className="relative isolate -mt-20 pt-32 pb-20 overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-sky-900">
        <div className="grain -z-10" />
        <div className="absolute -top-20 -left-20 -z-10 h-96 w-96 rounded-full bg-amber-400/20 blur-3xl animate-float" />
        <div
          className="absolute -bottom-32 -right-32 -z-10 h-[28rem] w-[28rem] rounded-full bg-sky-500/30 blur-3xl animate-float"
          style={{ animationDelay: "2s" }}
        />

        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl"
          >
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur px-4 py-1.5 text-xs sm:text-sm font-semibold text-white border border-white/20">
              <Globe2 size={14} className="text-amber-300" />
              Pour les familles nouvellement arrivées
            </span>
            <h1 className="font-display mt-6 text-5xl sm:text-6xl md:text-7xl font-semibold text-white leading-[1.05]">
              Vous arrivez au Canada pour étudier&nbsp;?
              <br />
              <span className="text-amber-300">Nous sommes passés par là.</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg sm:text-xl text-white/85 leading-relaxed">
              RYDN met en relation les nouveaux arrivants et les étudiants internationaux avec des
              conseillers universitaires qui ont parcouru le même chemin — 2 à 3 ans avant vous.
              Gratuit, multilingue, et fondé par des personnes qui ont vécu ce parcours.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/#advisors"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-amber-400 via-amber-500 to-orange-500 hover:from-amber-500 hover:to-orange-600 text-slate-900 px-7 py-3.5 font-bold shadow-lg hover:shadow-xl transition"
              >
                <Calendar size={18} />
                Trouver un conseiller
              </Link>
              <Link
                to="/about-us"
                className="inline-flex items-center gap-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white px-6 py-3.5 font-semibold transition backdrop-blur"
              >
                Comment ça fonctionne
                <ArrowRight size={16} />
              </Link>
            </div>
          </motion.div>
        </Container>
      </section>

      {/* ===================== HISTOIRE DU FONDATEUR ===================== */}
      <section className="py-16">
        <Container>
          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-10 items-center">
            <div className="md:col-span-4">
              {founder?.photo && (
                <SkeletonImage
                  src={founder.photo}
                  alt={founder.name}
                  shape="rounded-3xl"
                  className="w-full h-full object-cover shadow-xl ring-4 ring-slate-100 aspect-square"
                />
              )}
            </div>
            <div className="md:col-span-8">
              <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-sky-600">
                Bâti par un nouvel arrivant, pour les nouveaux arrivants
              </p>
              <h2 className="mt-3 font-display text-3xl sm:text-4xl font-semibold text-slate-900 leading-tight">
                Sam est arrivé au Canada depuis l'Iran.
                <br />
                <span className="text-slate-400">RYDN existe grâce à cela.</span>
              </h2>
              <div className="mt-4 h-1 w-16 rounded-full bg-gradient-to-r from-sky-400 via-indigo-500 to-amber-400" />
              <p className="mt-6 text-base md:text-lg text-slate-700 leading-relaxed">
                Sam Sina, cofondateur de RYDN, a étudié à l'Université de Guilan en Iran avant de
                rejoindre George Brown Polytechnic puis l'Université York au Canada. Le parcours
                était déroutant, coûteux, et souvent solitaire. Il n'y avait personne à qui poser
                les « petites » questions qui n'étaient finalement pas si petites.
              </p>
              <p className="mt-4 text-base md:text-lg text-slate-700 leading-relaxed">
                RYDN existe pour que le prochain étudiant n'ait pas à le découvrir seul.
              </p>

              <Link
                to="/advisors/sam-sina"
                className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-sky-700 hover:text-sky-800"
              >
                Lire le parcours complet de Sam
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* ===================== POURQUOI NOUS ===================== */}
      <section className="py-16 bg-slate-50">
        <Container>
          <div className="max-w-5xl mx-auto">
            <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-sky-600 text-center">
              Conçu pour votre parcours
            </p>
            <h2 className="mt-3 font-display text-3xl sm:text-4xl md:text-5xl font-semibold text-slate-900 text-center">
              Pourquoi les familles choisissent RYDN
            </h2>
            <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-gradient-to-r from-sky-400 via-indigo-500 to-amber-400" />

            <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  Icon: Heart,
                  title: "Toujours 100 % gratuit",
                  body: "Pas d'abonnement, pas de frais cachés, pas de version premium. Gratuit pour chaque étudiant, quelle que soit son origine ou son revenu.",
                  color: "from-rose-400 to-pink-500",
                },
                {
                  Icon: Globe2,
                  title: "Soutien multilingue",
                  body: "Conseils et clavardage en français, anglais, espagnol, persan et hébreu. Parlez à quelqu'un qui comprend votre langue et votre contexte.",
                  color: "from-sky-400 to-indigo-500",
                },
                {
                  Icon: MessageCircle,
                  title: "De vrais étudiants, pas des consultants",
                  body: "Nos conseillers sont des étudiants universitaires actuels ou de récents diplômés. Ils ont passé le MCAT, fait des demandes d'admission, vécu des transferts. Pas des consultants payés qui lisent un script.",
                  color: "from-emerald-400 to-teal-500",
                },
                {
                  Icon: ShieldCheck,
                  title: "Organisme canadien sans but lucratif",
                  body: "RYDN est un organisme sans but lucratif enregistré, aligné sur quatre objectifs de développement durable de l'ONU. Pas de publicités. Pas de pistage. Pas de vente de données.",
                  color: "from-amber-400 to-orange-500",
                },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  viewport={{ once: true }}
                  className="rounded-3xl bg-white border border-slate-200 shadow-sm p-7"
                >
                  <div
                    className={`mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${item.color} text-white shadow-md`}
                  >
                    <item.Icon size={22} />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">{item.title}</h3>
                  <p className="mt-3 text-slate-600 leading-relaxed text-base">{item.body}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* ===================== COMMENT ÇA FONCTIONNE ===================== */}
      <section className="py-16">
        <Container>
          <div className="max-w-5xl mx-auto">
            <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-sky-600 text-center">
              Comment ça fonctionne
            </p>
            <h2 className="mt-3 font-display text-3xl sm:text-4xl md:text-5xl font-semibold text-slate-900 text-center">
              Trois étapes. Toujours gratuit.
            </h2>
            <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-gradient-to-r from-sky-400 via-indigo-500 to-amber-400" />

            <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  step: "01",
                  title: "Parcourez les conseillers",
                  body: "Recherchez par domaine, école ou langue. Trouvez quelqu'un dont le parcours correspond au vôtre.",
                  Icon: GraduationCap,
                },
                {
                  step: "02",
                  title: "Réservez une séance",
                  body: "Choisissez un horaire qui vous convient. Toutes les séances sont individuelles, en ligne et confidentielles.",
                  Icon: Calendar,
                },
                {
                  step: "03",
                  title: "Repartez avec un plan",
                  body: "Des conseils concrets de quelqu'un qui est passé par là. Les séances de suivi sont aussi toujours gratuites.",
                  Icon: ArrowRight,
                },
              ].map((s, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className="rounded-3xl bg-white border border-slate-200 shadow-sm p-7"
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-display text-4xl font-bold text-slate-200">{s.step}</span>
                    <s.Icon size={26} className="text-sky-600" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">{s.title}</h3>
                  <p className="mt-3 text-slate-600 leading-relaxed text-sm">{s.body}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* ===================== APPEL FINAL ===================== */}
      <section className="pb-24">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-slate-900 via-sky-900 to-indigo-900 p-10 md:p-14 text-center text-white max-w-4xl mx-auto"
          >
            <div className="absolute -top-16 -right-16 h-64 w-64 rounded-full bg-amber-400/20 blur-3xl" />
            <div className="absolute -bottom-20 -left-20 h-80 w-80 rounded-full bg-sky-400/20 blur-3xl" />

            <Sparkles size={36} className="mx-auto text-amber-300 relative" />
            <h2 className="font-display mt-6 text-3xl md:text-5xl font-semibold relative leading-tight">
              Votre prochaine étape commence par une seule séance gratuite.
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-white/85 leading-relaxed relative">
              Sans engagement. Sans frais. Juste une vraie conversation avec quelqu'un qui a vécu
              ce que vous traversez.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-3 relative">
              <Link
                to="/#advisors"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-amber-400 via-amber-500 to-orange-500 hover:from-amber-500 hover:to-orange-600 text-slate-900 px-7 py-3.5 font-bold shadow-lg hover:shadow-xl transition"
              >
                <Calendar size={18} />
                Trouver un conseiller
              </Link>
              <Link
                to="/governance"
                className="inline-flex items-center gap-2 rounded-full border border-white/40 px-6 py-3.5 font-semibold text-white hover:bg-white/10 transition"
              >
                Pourquoi nous faire confiance
                <ShieldCheck size={16} />
              </Link>
            </div>
          </motion.div>
        </Container>
      </section>
    </>
  )
}
