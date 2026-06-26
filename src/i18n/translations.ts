// All site translations live here. To add a new language, copy the `en` block,
// translate the strings, and add the new language to LANGUAGES below. Partial
// translations are fine — any missing keys silently fall back to English at
// runtime (see LanguageProvider's `t()`).

export type Lang =
  | "en"
  | "fr"
  | "es"
  | "fa"
  | "he"
  | "zh" // Simplified Chinese
  | "ko" // Korean
  | "ar" // Arabic (MSA)
  | "ur" // Urdu
  | "pa" // Punjabi (Gurmukhi script)

// Right-to-left languages. The LanguageProvider sets the html dir attribute
// based on this list. Punjabi (Gurmukhi) is LTR; only Shahmukhi would be RTL.
export const RTL_LANGS: Lang[] = ["fa", "he", "ar", "ur"]

export const LANGUAGES: { code: Lang; native: string; english: string }[] = [
  { code: "en", native: "English", english: "English" },
  { code: "fr", native: "Français", english: "French" },
  { code: "es", native: "Español", english: "Spanish" },
  { code: "fa", native: "فارسی", english: "Persian" },
  { code: "he", native: "עברית", english: "Hebrew" },
  { code: "zh", native: "简体中文", english: "Chinese (Simplified)" },
  { code: "ko", native: "한국어", english: "Korean" },
  { code: "ar", native: "العربية", english: "Arabic" },
  { code: "ur", native: "اُردُو", english: "Urdu" },
  { code: "pa", native: "ਪੰਜਾਬੀ", english: "Punjabi" },
]

type Dict = {
  nav: {
    home: string
    about: string
    ourTeam: string
    becomeAdvisor: string
    workshops: string
    stories: string
    blog: string
    support: string
    supportShort: string
    bookNow: string
    bookNowShort: string
  }
  hero: {
    eyebrow: string
    titleLine1: string
    titleLine2: string
    subhead: string
    ctaPrimary: string
    ctaSecondary: string
    trustNonprofit: string
    trustFree: string
    trustMultilingual: string
  }
  mission: {
    eyebrow: string
    line1: string
    line2: string
    line3: string
  }
  testimonials: {
    eyebrow: string
    title: string
    subtitle: string
  }
  programs: {
    eyebrow: string
    title: string
    subtitle: string
    p1Title: string
    p1Body: string
    p2Title: string
    p2Body: string
    p3Title: string
    p3Body: string
    p4Title: string
    p4Body: string
    p5Title: string
    p5Body: string
  }
  partners: {
    eyebrow: string
    title: string
  }
  instagram: {
    eyebrow: string
    title: string
    subtitle: string
    follow: string
  }
  faq: {
    eyebrow: string
    title: string
    subtitle: string
    q1: string; a1: string
    q2: string; a2: string
    q3: string; a3: string
    q4: string; a4: string
    q5: string; a5: string
    q6: string; a6: string
    cta: string
  }
  about: {
    eyebrow: string
    title: string
    lede: string
    storyTitle: string
    storyP1: string
    storyP2: string
    storyP3: string
    valuesTitle: string
    v1Title: string; v1Body: string
    v2Title: string; v2Body: string
    v3Title: string; v3Body: string
    v4Title: string; v4Body: string
    bilingualTitle: string
    bilingualBody: string
    ctaTitle: string
    ctaButton: string
  }
  stories: {
    eyebrow: string
    title: string
    lede: string
    impactTitle: string
    impactSubtitle: string
    journeysTitle: string
    journeysSubtitle: string
    readMore: string
    ctaTitle: string
    ctaButton: string
  }
  origin: {
    eyebrow: string
    title: string
    sparkTitle: string
    sparkBody: string
    foundedTitle: string
    foundedBody: string
    todayTitle: string
    todayBody: string
    quote: string
    quoteAttribution: string
  }
  notFound: {
    badge: string
    title: string
    body: string
    bookCta: string
    homeCta: string
  }
  filters: {
    all: string
    preMed: string
    sciences: string
    preLaw: string
    business: string
    arts: string
    language: string
    psychNeuro: string
    pharmacy: string
    sports: string
    it: string
    gameDev: string
  }
  iosInstall: {
    title: string
    step1: string
    step2: string
    dismiss: string
  }
  matchmaker: {
    cta: string
    ctaTagline: string
    title: string
    subtitle: string
    placeholder: string
    send: string
    thinking: string
    welcome: string
    reset: string
    error: string
    bookButton: string
    close: string
    poweredBy: string
    generalTitle: string
    generalSubtitle: string
    generalWelcome: string
    generalCta: string
  }
  language: {
    chooseLanguage: string
  }
}

// `Dict` is the source of truth (English must be complete). All other languages
// can fill in as much or as little as they want — missing keys fall back to
// English in the runtime `t()` helper.
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K]
}

export const TRANSLATIONS: Record<Lang, DeepPartial<Dict>> & { en: Dict } = {
  en: {
    nav: {
      home: "Home",
      about: "About",
      ourTeam: "Our Team",
      becomeAdvisor: "Become an Advisor",
      workshops: "Workshops",
      stories: "Stories",
      blog: "Blog",
      support: "Support Us",
      supportShort: "Support",
      bookNow: "Book an Advisor",
      bookNowShort: "Book",
    },
    hero: {
      eyebrow: "Free advising for every student",
      titleLine1: "Advising that",
      titleLine2: "changes paths.",
      subhead:
        "Connecting students worldwide to Canada's top universities. Free 1-on-1 sessions with university students only 2–3 years ahead of you — before life-changing decisions.",
      ctaPrimary: "Find an Advisor",
      ctaSecondary: "Learn More",
      trustNonprofit: "Canadian nonprofit",
      trustFree: "100% free for students",
      trustMultilingual: "Multilingual support",
    },
    mission: {
      eyebrow: "Our mission",
      line1: "Talent is everywhere.",
      line2: "Guidance isn't.",
      line3: "RYDN exists to close that gap — through advising, workshops, and academic support.",
    },
    testimonials: {
      eyebrow: "What students say",
      title: "Real students. Real outcomes.",
      subtitle: "Stories from the students and parents we've worked with.",
    },
    programs: {
      eyebrow: "What we offer",
      title: "Everything a student needs, in one place.",
      subtitle: "From one-on-one advising to bilingual workshops, we meet students where they are.",
      p1Title: "1-on-1 Advising",
      p1Body: "Free sessions with advisors who've walked the path you're considering — academics, careers, life.",
      p2Title: "Workshops & Events",
      p2Body: "Interactive sessions on study skills, university prep, and career exploration. Online and in-person.",
      p3Title: "MCAT, LSAT & DAT prep",
      p3Body: "Real strategies from students who've recently taken — and crushed — the exams.",
      p4Title: "University applications",
      p4Body: "Help with essays, references, program choice, and the full Canadian admissions process.",
      p5Title: "School & community partnerships",
      p5Body: "We bring our programs into schools, libraries, and community centres across Canada.",
    },
    partners: {
      eyebrow: "Working with",
      title: "Trusted by schools and communities across Canada",
    },
    instagram: {
      eyebrow: "Follow along",
      title: "Latest from @rydn.ca",
      subtitle: "Behind-the-scenes from our workshops, advisor highlights, and student wins.",
      follow: "Follow on Instagram",
    },
    faq: {
      eyebrow: "Common questions",
      title: "Everything you wanted to ask",
      subtitle: "If your question isn't answered here, just send us an email.",
      q1: "Is RYDN really free?",
      a1: "Yes — every session, workshop, and resource is 100% free. RYDN is an incorporated Canadian nonprofit, supported by donors and volunteer advisors.",
      q2: "Who can use RYDN?",
      a2: "Any student in Canada can book sessions, from high school through university. We also welcome international students considering Canadian universities.",
      q3: "How do I book a session with an advisor?",
      a3: "Browse our advisors on the home page, click 'Book' on the advisor whose background matches your goals, and pick a time. You'll receive a calendar invite by email.",
      q4: "What can advisors actually help with?",
      a4: "University applications, MCAT/LSAT/DAT prep, choosing programs, study strategies, career questions, and personal direction. If they can't help, they'll point you to someone who can.",
      q5: "I'd like to become an advisor. How does that work?",
      a5: "Apply through our Become an Advisor page. Most advisors give just an hour or two a month and choose the topics they advise on.",
      q6: "Can our school or organization partner with RYDN?",
      a6: "Yes. We run workshops in schools, libraries, and community organizations across Canada. Reach out via the Partner With Us page and we'll set up a call.",
      cta: "Email us your question",
    },
    stories: {
      eyebrow: "Stories & impact",
      title: "Real students. Real journeys.",
      lede: "Behind every booking is a student making a real decision about their future. Here are some of theirs.",
      impactTitle: "Where we are right now",
      impactSubtitle: "RYDN is small but growing — built by students, for students.",
      journeysTitle: "Featured journeys",
      journeysSubtitle: "Six students. Six different paths. One thing in common — they didn't walk it alone.",
      readMore: "Read full story",
      ctaTitle: "Start your own story.",
      ctaButton: "Book an advisor",
    },
    origin: {
      eyebrow: "How RYDN started",
      title: "From one tutoring session to a movement.",
      sparkTitle: "The spark",
      sparkBody: "It started in the middle of a tutoring session. Out of nowhere, one of Sam's students paused and asked, \"Can I ask you some questions about university?\" He wanted to know about medical school — how it worked, how you got in. Sara was nearby, and as a pre-med student she pulled up a chair to help. Between us, we answered everything he needed to know about medicine. Then he asked the same kind of questions about engineering and aerospace — and we didn't have the answers. That's the moment Sara turned to Sam and said: imagine if every student could just sit down with someone who'd already walked the path they were curious about. Any field. Always free. That's the moment RYDN was born.",
      foundedTitle: "Making it real",
      foundedBody: "We officially founded RooZ Youth Development Network in March 2026. In the early days it was just the two of us, a shared calendar, and a handful of friends willing to advise. We started by reaching out to students we knew in fields we couldn't speak to — engineering, law, nursing, business, the sciences — and asked if they'd give one hour a month. Within weeks we had a small network. Today there are 25+ advisors, and growing.",
      todayTitle: "Where we are now",
      todayBody: "Today RYDN connects 25+ student advisors with students across Canada. We run free workshops, partner with schools and libraries, and operate in three languages — and we're just getting started.",
      quote: "It started with one student asking a question we couldn't answer. No student should have to ask it alone.",
      quoteAttribution: "Sara Roozbahani & Sam Sina, Founders",
    },
    about: {
      eyebrow: "About RYDN",
      title: "Built by students, for students.",
      lede: "RYDN — RooZ Youth Development Network — is a Canadian nonprofit closing the guidance gap that holds talented young people back.",
      storyTitle: "Our story",
      storyP1: "Talent is everywhere; guidance isn't. We saw smart, driven students struggling to choose the right path — not because they lacked ability, but because they didn't have someone who'd recently walked it themselves.",
      storyP2: "RYDN was founded to fix that. We connect students directly to advisors who are a step or two ahead — relatable, accessible, free.",
      storyP3: "Today we serve students across Canada, run workshops with schools and libraries, and we're growing every month.",
      valuesTitle: "What we stand for",
      v1Title: "Always free",
      v1Body: "Advising and guidance shouldn't depend on who you know. Every session is free.",
      v2Title: "Relatable advisors",
      v2Body: "Our advisors are a step or two ahead of you on the same path — not decades removed.",
      v3Title: "Practical first",
      v3Body: "Real strategies, real timelines, real next steps — not vague advice.",
      v4Title: "Community-driven",
      v4Body: "We're not a company. We're students supporting students.",
      bilingualTitle: "Multilingual, Canadian-rooted.",
      bilingualBody: "RYDN / Réseau de développement de la jeunesse RooZ operates in English and French, with Spanish support and more languages coming. Based in Richmond Hill, Ontario.",
      ctaTitle: "Ready to start?",
      ctaButton: "Find an advisor",
    },
    notFound: {
      badge: "404 — Page not found",
      title: "We can't find that page.",
      body: "Looks like the link is broken or the page has moved. While you're here — want to find an advisor instead?",
      bookCta: "Book an advisor",
      homeCta: "Back to home",
    },
    filters: {
      all: "All",
      preMed: "Pre-med",
      sciences: "Sciences",
      preLaw: "Pre-law",
      business: "Business",
      arts: "Arts",
      language: "Language",
      psychNeuro: "Psych & Neuro",
      pharmacy: "Pharmacy",
      sports: "Sports",
      it: "IT",
      gameDev: "Game Dev",
    },
    iosInstall: {
      title: "Install RYDN on your iPhone",
      step1: "Tap the Share icon below",
      step2: "Then choose \"Add to Home Screen\"",
      dismiss: "Got it",
    },
    matchmaker: {
      cta: "Find Your Match",
      ctaTagline: "Not sure who to pick? Let our AI helper match you to the right RYDN advisor in 30 seconds.",
      title: "Find Your Advisor",
      subtitle: "Tell me what you're exploring and I'll match you to a RYDN advisor.",
      placeholder: "Type your answer…",
      send: "Send",
      thinking: "Thinking…",
      welcome: "Hey 👋 I'm here to help you find the right RYDN advisor. What are you exploring right now — a subject, an exam, a career path?",
      reset: "Start over",
      error: "Something went wrong. Try again in a moment.",
      bookButton: "Book with",
      close: "Close",
      poweredBy: "Powered by Llama on Cloudflare AI",
      generalTitle: "Ask RYDN",
      generalSubtitle: "Quick answers about workshops, advising, donations.",
      generalWelcome: "Hey 👋 I can answer questions about RYDN — workshops, advising, donations, anything site-related. What can I help with?",
      generalCta: "Ask AI",
    },
    language: {
      chooseLanguage: "Choose your language",
    },
  },

  fr: {
    nav: {
      home: "Accueil",
      about: "À propos",
      ourTeam: "Notre équipe",
      becomeAdvisor: "Devenir conseiller",
      workshops: "Ateliers",
      stories: "Témoignages",
      blog: "Blogue",
      support: "Nous soutenir",
      supportShort: "Soutenir",
      bookNow: "Réserver un mentor",
      bookNowShort: "Réserver",
    },
    hero: {
      eyebrow: "Mentorat gratuit pour chaque étudiant",
      titleLine1: "Un mentorat qui",
      titleLine2: "change les parcours.",
      subhead:
        "Relier les étudiants du monde entier aux meilleures universités canadiennes. Séances individuelles gratuites avec des étudiants qui ont seulement 2 ou 3 ans d'avance — avant les décisions qui changent une vie.",
      ctaPrimary: "Trouver un mentor",
      ctaSecondary: "En savoir plus",
      trustNonprofit: "Organisme canadien sans but lucratif",
      trustFree: "100 % gratuit pour les étudiants",
      trustMultilingual: "Soutien multilingue",
    },
    mission: {
      eyebrow: "Notre mission",
      line1: "Le talent est partout.",
      line2: "L'orientation, non.",
      line3:
        "RYDN existe pour combler cet écart — par le mentorat, des ateliers et un soutien scolaire.",
    },
    testimonials: {
      eyebrow: "Ce qu'ils en disent",
      title: "De vrais étudiants. De vrais résultats.",
      subtitle: "Témoignages d'étudiants et de parents avec qui nous avons travaillé.",
    },
    programs: {
      eyebrow: "Ce que nous offrons",
      title: "Tout ce dont un étudiant a besoin, au même endroit.",
      subtitle: "Du mentorat individuel aux ateliers bilingues, nous rencontrons les étudiants là où ils sont.",
      p1Title: "Mentorat individuel",
      p1Body: "Des séances gratuites avec des conseillers qui ont déjà parcouru le chemin que vous envisagez.",
      p2Title: "Ateliers et événements",
      p2Body: "Sessions interactives sur les méthodes d'études, la préparation universitaire et l'exploration de carrière.",
      p3Title: "Préparation MCAT, LSAT, DAT",
      p3Body: "De vraies stratégies de la part d'étudiants qui ont récemment réussi ces examens.",
      p4Title: "Candidatures universitaires",
      p4Body: "Aide pour les essais, les références, le choix de programme et le processus d'admission canadien.",
      p5Title: "Partenariats scolaires et communautaires",
      p5Body: "Nous offrons nos programmes dans les écoles, bibliothèques et centres communautaires partout au Canada.",
    },
    partners: {
      eyebrow: "Nos collaborations",
      title: "La confiance d'écoles et de communautés à travers le Canada",
    },
    instagram: {
      eyebrow: "Suivez-nous",
      title: "Dernières publications @rydn.ca",
      subtitle: "Les coulisses de nos ateliers, des mentors mis en lumière, et les réussites étudiantes.",
      follow: "Suivre sur Instagram",
    },
    faq: {
      eyebrow: "Questions fréquentes",
      title: "Tout ce que vous vouliez savoir",
      subtitle: "Si votre question n'est pas ici, écrivez-nous simplement.",
      q1: "RYDN est-il vraiment gratuit ?",
      a1: "Oui — chaque séance, atelier et ressource est 100 % gratuit. RYDN est un organisme à but non lucratif canadien, soutenu par des donateurs et des mentors bénévoles.",
      q2: "Qui peut utiliser RYDN ?",
      a2: "Tout étudiant au Canada peut réserver une séance, du secondaire à l'université. Les étudiants internationaux qui envisagent des universités canadiennes sont aussi les bienvenus.",
      q3: "Comment réserver une séance avec un mentor ?",
      a3: "Parcourez nos conseillers sur la page d'accueil, cliquez sur « Réserver » sur le profil qui correspond à vos objectifs, et choisissez un horaire. Vous recevrez une invitation par courriel.",
      q4: "Avec quoi un mentor peut-il m'aider ?",
      a4: "Candidatures universitaires, préparation aux examens (MCAT, LSAT, DAT), choix de programme, méthodes d'études, questions de carrière et orientation personnelle.",
      q5: "Je voudrais devenir conseiller. Comment ça fonctionne ?",
      a5: "Postulez via la page « Devenir conseiller ». La plupart des mentors donnent une à deux heures par mois et choisissent leurs sujets.",
      q6: "Notre école peut-elle s'associer à RYDN ?",
      a6: "Oui. Nous organisons des ateliers dans des écoles, bibliothèques et organismes communautaires partout au Canada. Contactez-nous via la page Partenariats.",
      cta: "Posez-nous votre question",
    },
    stories: {
      eyebrow: "Témoignages et impact",
      title: "De vrais étudiants. De vrais parcours.",
      lede: "Derrière chaque réservation, un étudiant prend une vraie décision sur son avenir. Voici quelques-unes de leurs histoires.",
      impactTitle: "Où nous en sommes",
      impactSubtitle: "RYDN est petit mais grandit — conçu par et pour les étudiants.",
      journeysTitle: "Parcours en vedette",
      journeysSubtitle: "Six étudiants. Six chemins différents. Une chose en commun — ils ne les ont pas parcourus seuls.",
      readMore: "Lire l'histoire complète",
      ctaTitle: "Commencez votre propre histoire.",
      ctaButton: "Réserver un mentor",
    },
    origin: {
      eyebrow: "Comment RYDN a commencé",
      title: "D'une séance de tutorat à un mouvement.",
      sparkTitle: "L'étincelle",
      sparkBody: "Tout a commencé au milieu d'une séance de tutorat. Sans prévenir, un des étudiants de Sam s'est arrêté et a demandé : « Est-ce que je peux te poser des questions sur l'université ? » Il voulait savoir comment fonctionnait la médecine — le processus, l'admission. Sara, étudiante en pré-médecine, s'est rapprochée pour aider. Ensemble, nous avons répondu à toutes ses questions sur la médecine. Puis il a posé le même genre de questions sur l'ingénierie et l'aérospatiale — et nous n'avions pas les réponses. C'est le moment où Sara s'est tournée vers Sam et a dit : et si chaque étudiant pouvait simplement s'asseoir avec quelqu'un qui avait déjà parcouru le chemin qui l'intriguait ? N'importe quel domaine. Toujours gratuitement. C'est le moment où RYDN est né.",
      foundedTitle: "Le concrétiser",
      foundedBody: "Nous avons officiellement fondé le Réseau de développement de la jeunesse RooZ en mars 2026. Au début, c'était juste nous deux, un calendrier partagé et une poignée d'amis prêts à conseiller. Nous avons commencé par contacter des étudiants que nous connaissions dans des domaines que nous ne maîtrisions pas — ingénierie, droit, sciences infirmières, commerce, sciences — et leur avons demandé une heure par mois. En quelques semaines, nous avions un petit réseau. Aujourd'hui, plus de 25 conseillers, et ça grandit.",
      todayTitle: "Où nous en sommes maintenant",
      todayBody: "Aujourd'hui, RYDN met en relation plus de 25 conseillers étudiants avec des étudiants partout au Canada. Nous offrons des ateliers gratuits, nouons des partenariats avec des écoles et bibliothèques, et opérons en trois langues — et nous ne faisons que commencer.",
      quote: "Tout a commencé avec un étudiant qui nous a posé une question à laquelle nous ne pouvions pas répondre. Aucun étudiant ne devrait avoir à la poser seul.",
      quoteAttribution: "Sara Roozbahani et Sam Sina, fondateurs",
    },
    about: {
      eyebrow: "À propos de RYDN",
      title: "Conçu par des étudiants, pour les étudiants.",
      lede: "RYDN — Réseau de développement de la jeunesse RooZ — est un organisme canadien sans but lucratif qui comble le fossé d'orientation qui freine les jeunes talentueux.",
      storyTitle: "Notre histoire",
      storyP1: "Le talent est partout ; l'orientation, non. Nous voyions des étudiants brillants peiner à choisir leur voie — non par manque de capacité, mais parce qu'ils n'avaient personne ayant récemment vécu cette étape.",
      storyP2: "RYDN a été créé pour combler ce manque. Nous mettons en relation directe les étudiants avec des mentors qui ont un ou deux pas d'avance : relatables, accessibles, gratuits.",
      storyP3: "Aujourd'hui, nous accompagnons des étudiants partout au Canada, organisons des ateliers avec des écoles et bibliothèques, et nous grandissons chaque mois.",
      valuesTitle: "Ce que nous défendons",
      v1Title: "Toujours gratuit",
      v1Body: "Le mentorat ne devrait pas dépendre de votre réseau. Chaque séance est gratuite.",
      v2Title: "Des mentors relatables",
      v2Body: "Nos conseillers ont un ou deux pas d'avance — pas plusieurs décennies.",
      v3Title: "Pratique avant tout",
      v3Body: "De vraies stratégies, de vraies étapes — pas de conseils vagues.",
      v4Title: "Communautaire",
      v4Body: "Nous ne sommes pas une entreprise. Nous sommes des étudiants qui soutiennent d'autres étudiants.",
      bilingualTitle: "Multilingue, ancré au Canada.",
      bilingualBody: "RYDN / Réseau de développement de la jeunesse RooZ fonctionne en anglais et en français, avec un soutien en espagnol et d'autres langues à venir. Basé à Richmond Hill, Ontario.",
      ctaTitle: "Prêt à commencer ?",
      ctaButton: "Trouver un mentor",
    },
    notFound: {
      badge: "404 — Page introuvable",
      title: "Cette page est introuvable.",
      body: "Il semble que le lien soit cassé ou que la page ait été déplacée. Pendant que vous êtes là, et si vous trouviez plutôt un mentor ?",
      bookCta: "Trouver un mentor",
      homeCta: "Retour à l'accueil",
    },
    filters: {
      all: "Tout",
      preMed: "Pré-méd",
      sciences: "Sciences",
      preLaw: "Pré-droit",
      business: "Affaires",
      arts: "Arts",
      language: "Langues",
      psychNeuro: "Psycho & Neuro",
      pharmacy: "Pharmacie",
      sports: "Sport",
      it: "Informatique",
      gameDev: "Jeux vidéo",
    },
    iosInstall: {
      title: "Installer RYDN sur votre iPhone",
      step1: "Touchez l'icône Partager ci-dessous",
      step2: "Puis choisissez « Sur l'écran d'accueil »",
      dismiss: "Compris",
    },
    matchmaker: {
      cta: "Trouvez votre conseiller",
      ctaTagline: "Pas sûr de qui choisir ? Notre assistant IA vous orientera vers le bon conseiller en 30 secondes.",
      title: "Trouvez votre conseiller",
      subtitle: "Dites-moi ce qui vous intéresse, je vous propose un conseiller RYDN.",
      placeholder: "Tapez votre réponse…",
      send: "Envoyer",
      thinking: "Réflexion…",
      welcome: "Salut 👋 Je suis là pour t'aider à trouver le bon conseiller RYDN. Qu'est-ce qui t'intéresse en ce moment — une matière, un examen, un parcours professionnel ?",
      reset: "Recommencer",
      error: "Quelque chose s'est mal passé. Réessayez dans un instant.",
      bookButton: "Réserver avec",
      close: "Fermer",
      poweredBy: "Propulsé par Llama sur Cloudflare AI",
      generalTitle: "Posez vos questions",
      generalSubtitle: "Réponses rapides sur les ateliers, le conseil, les dons.",
      generalWelcome: "Salut 👋 Je peux répondre à vos questions sur RYDN — ateliers, conseil, dons, tout ce qui concerne le site. En quoi puis-je vous aider ?",
      generalCta: "Demander à l'IA",
    },
    language: {
      chooseLanguage: "Choisissez votre langue",
    },
  },

  es: {
    nav: {
      home: "Inicio",
      about: "Sobre nosotros",
      ourTeam: "Nuestro equipo",
      becomeAdvisor: "Hacerse asesor",
      workshops: "Talleres",
      stories: "Historias",
      blog: "Blog",
      support: "Apóyanos",
      supportShort: "Apoyar",
      bookNow: "Reservar un mentor",
      bookNowShort: "Reservar",
    },
    hero: {
      eyebrow: "Mentoría gratuita para cada estudiante",
      titleLine1: "Mentoría que",
      titleLine2: "cambia caminos.",
      subhead:
        "Conectando a estudiantes de todo el mundo con las mejores universidades de Canadá. Sesiones individuales gratuitas con estudiantes que solo te llevan 2 o 3 años de ventaja — antes de tomar decisiones que cambian la vida.",
      ctaPrimary: "Encontrar un mentor",
      ctaSecondary: "Saber más",
      trustNonprofit: "Organización canadiense sin fines de lucro",
      trustFree: "100 % gratuito para estudiantes",
      trustMultilingual: "Soporte multilingüe",
    },
    mission: {
      eyebrow: "Nuestra misión",
      line1: "El talento está en todas partes.",
      line2: "La orientación no.",
      line3:
        "RYDN existe para cerrar esa brecha — mediante mentoría, talleres y apoyo académico.",
    },
    testimonials: {
      eyebrow: "Lo que dicen",
      title: "Estudiantes reales. Resultados reales.",
      subtitle: "Historias de estudiantes y padres con los que hemos trabajado.",
    },
    programs: {
      eyebrow: "Lo que ofrecemos",
      title: "Todo lo que un estudiante necesita, en un solo lugar.",
      subtitle: "Desde mentoría individual hasta talleres bilingües, encontramos a los estudiantes donde están.",
      p1Title: "Mentoría 1 a 1",
      p1Body: "Sesiones gratuitas con asesores que han recorrido el camino que estás considerando.",
      p2Title: "Talleres y eventos",
      p2Body: "Sesiones interactivas sobre técnicas de estudio, preparación universitaria y exploración de carrera.",
      p3Title: "Preparación MCAT, LSAT, DAT",
      p3Body: "Estrategias reales de estudiantes que han aprobado estos exámenes recientemente.",
      p4Title: "Aplicaciones universitarias",
      p4Body: "Ayuda con ensayos, referencias, elección de programa y el proceso de admisión canadiense.",
      p5Title: "Alianzas escolares y comunitarias",
      p5Body: "Llevamos nuestros programas a escuelas, bibliotecas y centros comunitarios en todo Canadá.",
    },
    partners: {
      eyebrow: "Trabajamos con",
      title: "Confianza de escuelas y comunidades en todo Canadá",
    },
    instagram: {
      eyebrow: "Síguenos",
      title: "Lo último de @rydn.ca",
      subtitle: "Detrás de escena de nuestros talleres, mentores destacados y triunfos estudiantiles.",
      follow: "Seguir en Instagram",
    },
    faq: {
      eyebrow: "Preguntas frecuentes",
      title: "Todo lo que querías saber",
      subtitle: "Si tu pregunta no está aquí, simplemente escríbenos.",
      q1: "¿RYDN es realmente gratuito?",
      a1: "Sí — cada sesión, taller y recurso es 100 % gratuito. RYDN es una organización canadiense sin fines de lucro, sostenida por donantes y mentores voluntarios.",
      q2: "¿Quién puede usar RYDN?",
      a2: "Cualquier estudiante en Canadá puede reservar sesiones, desde la secundaria hasta la universidad. También damos la bienvenida a estudiantes internacionales interesados en universidades canadienses.",
      q3: "¿Cómo reservo una sesión con un mentor?",
      a3: "Explora nuestros asesores en la página principal, haz clic en 'Reservar' en el perfil que coincida con tus objetivos y elige un horario. Recibirás una invitación por correo.",
      q4: "¿En qué pueden ayudar los mentores?",
      a4: "Aplicaciones universitarias, preparación MCAT/LSAT/DAT, elección de programa, técnicas de estudio, preguntas de carrera y orientación personal.",
      q5: "Quiero ser asesor. ¿Cómo funciona?",
      a5: "Aplica desde la página 'Hacerse asesor'. La mayoría de los mentores dan solo una o dos horas al mes y eligen sus temas.",
      q6: "¿Nuestra escuela puede asociarse con RYDN?",
      a6: "Sí. Realizamos talleres en escuelas, bibliotecas y organizaciones comunitarias en todo Canadá. Contáctanos a través de la página Alianzas.",
      cta: "Envíanos tu pregunta",
    },
    stories: {
      eyebrow: "Historias e impacto",
      title: "Estudiantes reales. Caminos reales.",
      lede: "Detrás de cada reserva hay un estudiante tomando una decisión real sobre su futuro. Aquí algunos.",
      impactTitle: "Dónde estamos ahora",
      impactSubtitle: "RYDN es pequeño pero está creciendo — creado por estudiantes, para estudiantes.",
      journeysTitle: "Caminos destacados",
      journeysSubtitle: "Seis estudiantes. Seis caminos diferentes. Una cosa en común — no los recorrieron solos.",
      readMore: "Leer historia completa",
      ctaTitle: "Empieza tu propia historia.",
      ctaButton: "Reservar un mentor",
    },
    origin: {
      eyebrow: "Cómo empezó RYDN",
      title: "De una sesión de tutoría a un movimiento.",
      sparkTitle: "La chispa",
      sparkBody: "Empezó en medio de una sesión de tutoría. Sin previo aviso, uno de los estudiantes de Sam hizo una pausa y preguntó: « ¿Puedo hacerte algunas preguntas sobre la universidad? » Quería saber sobre la facultad de medicina — cómo funcionaba, cómo entrar. Sara, estudiante de pre-medicina, se acercó para ayudar. Entre los dos respondimos todo lo que necesitaba saber sobre medicina. Luego hizo el mismo tipo de preguntas sobre ingeniería y aeroespacial — y no teníamos las respuestas. Ese fue el momento en que Sara se volvió hacia Sam y dijo: imagina si cada estudiante pudiera simplemente sentarse con alguien que ya hubiera recorrido el camino que le intrigaba. Cualquier campo. Siempre gratis. Ese es el momento en que nació RYDN.",
      foundedTitle: "Hacerlo realidad",
      foundedBody: "Fundamos oficialmente RooZ Youth Development Network en marzo de 2026. Al principio éramos solo nosotros dos, un calendario compartido y un puñado de amigos dispuestos a asesorar. Empezamos contactando a estudiantes que conocíamos en campos en los que no podíamos hablar — ingeniería, derecho, enfermería, negocios, ciencias — y les pedimos una hora al mes. En semanas teníamos una pequeña red. Hoy son más de 25 asesores, y sigue creciendo.",
      todayTitle: "Dónde estamos hoy",
      todayBody: "Hoy RYDN conecta a más de 25 asesores estudiantiles con estudiantes en todo Canadá. Realizamos talleres gratuitos, nos asociamos con escuelas y bibliotecas, y operamos en tres idiomas — y apenas estamos comenzando.",
      quote: "Empezó con un estudiante que nos hizo una pregunta que no pudimos responder. Ningún estudiante debería tener que hacerla solo.",
      quoteAttribution: "Sara Roozbahani y Sam Sina, fundadores",
    },
    about: {
      eyebrow: "Sobre RYDN",
      title: "Creado por estudiantes, para estudiantes.",
      lede: "RYDN — RooZ Youth Development Network — es una organización canadiense sin fines de lucro que cierra la brecha de orientación que frena a los jóvenes talentosos.",
      storyTitle: "Nuestra historia",
      storyP1: "El talento está en todas partes; la orientación no. Vimos estudiantes brillantes luchando por elegir el camino correcto — no por falta de capacidad, sino porque no tenían a alguien que lo hubiera recorrido recientemente.",
      storyP2: "RYDN se fundó para resolver esto. Conectamos a los estudiantes directamente con mentores que están un paso o dos por delante — relatables, accesibles, gratuitos.",
      storyP3: "Hoy atendemos estudiantes en todo Canadá, organizamos talleres con escuelas y bibliotecas, y crecemos cada mes.",
      valuesTitle: "Lo que defendemos",
      v1Title: "Siempre gratis",
      v1Body: "La mentoría no debería depender de a quién conoces. Cada sesión es gratuita.",
      v2Title: "Mentores cercanos",
      v2Body: "Nuestros asesores están un paso o dos por delante en el mismo camino — no a décadas de distancia.",
      v3Title: "Práctica primero",
      v3Body: "Estrategias reales, plazos reales, próximos pasos reales — no consejos vagos.",
      v4Title: "Comunidad",
      v4Body: "No somos una empresa. Somos estudiantes apoyando a otros estudiantes.",
      bilingualTitle: "Multilingüe, raíces canadienses.",
      bilingualBody: "RYDN / Réseau de développement de la jeunesse RooZ opera en inglés y francés, con apoyo en español y más idiomas próximamente. Basado en Richmond Hill, Ontario.",
      ctaTitle: "¿Listo para empezar?",
      ctaButton: "Encontrar un mentor",
    },
    notFound: {
      badge: "404 — Página no encontrada",
      title: "No encontramos esa página.",
      body: "Parece que el enlace está roto o la página se movió. Mientras estás aquí — ¿quieres encontrar un mentor?",
      bookCta: "Reservar un mentor",
      homeCta: "Volver al inicio",
    },
    filters: {
      all: "Todos",
      preMed: "Pre-medicina",
      sciences: "Ciencias",
      preLaw: "Pre-derecho",
      business: "Negocios",
      arts: "Artes",
      language: "Idiomas",
      psychNeuro: "Psico & Neuro",
      pharmacy: "Farmacia",
      sports: "Deportes",
      it: "TI",
      gameDev: "Videojuegos",
    },
    iosInstall: {
      title: "Instala RYDN en tu iPhone",
      step1: "Toca el icono Compartir abajo",
      step2: "Luego elige « Añadir a inicio »",
      dismiss: "Entendido",
    },
    matchmaker: {
      cta: "Encuentra tu asesor",
      ctaTagline: "¿No sabes a quién elegir? Nuestro asistente IA te conecta con el asesor adecuado en 30 segundos.",
      title: "Encuentra tu asesor",
      subtitle: "Cuéntame qué estás explorando y te conecto con un asesor de RYDN.",
      placeholder: "Escribe tu respuesta…",
      send: "Enviar",
      thinking: "Pensando…",
      welcome: "Hola 👋 Estoy aquí para ayudarte a encontrar al asesor adecuado en RYDN. ¿Qué estás explorando ahora — una materia, un examen, una carrera?",
      reset: "Empezar de nuevo",
      error: "Algo salió mal. Inténtalo de nuevo en un momento.",
      bookButton: "Reservar con",
      close: "Cerrar",
      poweredBy: "Impulsado por Llama en Cloudflare AI",
      generalTitle: "Pregúntale a RYDN",
      generalSubtitle: "Respuestas rápidas sobre talleres, asesoramiento y donaciones.",
      generalWelcome: "Hola 👋 Puedo responder preguntas sobre RYDN — talleres, asesoramiento, donaciones, cualquier cosa del sitio. ¿En qué puedo ayudarte?",
      generalCta: "Preguntar a la IA",
    },
    language: {
      chooseLanguage: "Elige tu idioma",
    },
  },

  fa: {
    nav: {
      home: "خانه",
      about: "درباره ما",
      ourTeam: "تیم ما",
      becomeAdvisor: "مشاور شوید",
      workshops: "کارگاه‌ها",
      stories: "داستان‌ها",
      blog: "وبلاگ",
      support: "حمایت از ما",
      supportShort: "حمایت",
      bookNow: "رزرو با مشاور",
      bookNowShort: "رزرو",
    },
    hero: {
      eyebrow: "مشاوره رایگان برای هر دانشجو",
      titleLine1: "مشاوره‌ای که",
      titleLine2: "مسیرها را عوض می‌کند.",
      subhead:
        "ارتباط دانشجویان سراسر جهان با برترین دانشگاه‌های کانادا. جلسات مشاوره فردی رایگان با دانشجویانی که فقط ۲ تا ۳ سال جلوتر از شما هستند — پیش از تصمیم‌گیری‌های زندگی‌ساز.",
      ctaPrimary: "پیدا کردن مشاور",
      ctaSecondary: "بیشتر بدانید",
      trustNonprofit: "سازمان غیرانتفاعی کانادایی",
      trustFree: "۱۰۰٪ رایگان برای دانشجویان",
      trustMultilingual: "پشتیبانی چندزبانه",
    },
    mission: {
      eyebrow: "ماموریت ما",
      line1: "استعداد همه‌جا هست.",
      line2: "راهنمایی نیست.",
      line3: "RYDN برای پر کردن این شکاف ساخته شده است — با مشاوره، کارگاه‌ها و پشتیبانی تحصیلی.",
    },
    testimonials: {
      eyebrow: "نظر دانشجویان",
      title: "دانشجویان واقعی. نتایج واقعی.",
      subtitle: "داستان‌هایی از دانشجویان و خانواده‌هایی که با ما همکاری کرده‌اند.",
    },
    programs: {
      eyebrow: "خدمات ما",
      title: "هرچه دانشجو لازم دارد، یک‌جا.",
      subtitle: "از مشاوره فردی تا کارگاه‌های چندزبانه، در کنار دانشجویان هستیم.",
      p1Title: "مشاوره فردی",
      p1Body: "جلسات رایگان با مشاورانی که خودشان همان مسیر را رفته‌اند — تحصیلی، شغلی، زندگی.",
      p2Title: "کارگاه‌ها و رویدادها",
      p2Body: "جلسات تعاملی درباره روش‌های مطالعه، آمادگی برای دانشگاه و کشف مسیر شغلی. آنلاین و حضوری.",
      p3Title: "آمادگی MCAT، LSAT و DAT",
      p3Body: "راهبردهای واقعی از دانشجویانی که این آزمون‌ها را به‌تازگی پشت سر گذاشته‌اند.",
      p4Title: "درخواست‌های دانشگاهی",
      p4Body: "کمک با مقاله‌ها، توصیه‌نامه‌ها، انتخاب رشته و کل فرآیند پذیرش در کانادا.",
      p5Title: "همکاری با مدارس و جوامع",
      p5Body: "ما برنامه‌های خود را به مدارس، کتابخانه‌ها و مراکز اجتماعی در سراسر کانادا می‌بریم.",
    },
    partners: {
      eyebrow: "همکاری با",
      title: "مورد اعتماد مدارس و جوامع در سراسر کانادا",
    },
    instagram: {
      eyebrow: "ما را دنبال کنید",
      title: "آخرین پست‌های @rydn.ca",
      subtitle: "پشت صحنه کارگاه‌ها، معرفی مشاوران، و موفقیت‌های دانشجویان.",
      follow: "دنبال کردن در اینستاگرام",
    },
    faq: {
      eyebrow: "سوال‌های پرتکرار",
      title: "هر چیزی که می‌خواستید بپرسید",
      subtitle: "اگر سوال شما اینجا نیست، فقط برای ما ایمیل بفرستید.",
      q1: "آیا واقعاً RYDN رایگان است؟",
      a1: "بله — هر جلسه، کارگاه و منبع کاملاً رایگان است. RYDN یک سازمان غیرانتفاعی ثبت‌شده در کاناداست که با کمک حامیان مالی و مشاوران داوطلب اداره می‌شود.",
      q2: "چه کسانی می‌توانند از RYDN استفاده کنند؟",
      a2: "هر دانشجویی در کانادا، از دبیرستان تا دانشگاه، می‌تواند جلسه رزرو کند. به دانشجویان بین‌المللی که به دانشگاه‌های کانادا فکر می‌کنند نیز خوش‌آمد می‌گوییم.",
      q3: "چگونه با یک مشاور جلسه بگذارم؟",
      a3: "در صفحه اصلی مشاوران ما را ببینید، روی «رزرو» مشاوری که با هدف شما هم‌خوانی دارد کلیک کنید و زمان مناسب را انتخاب کنید. دعوت‌نامه از طریق ایمیل ارسال می‌شود.",
      q4: "مشاوران در چه زمینه‌هایی می‌توانند کمک کنند؟",
      a4: "درخواست‌های دانشگاهی، آمادگی برای MCAT/LSAT/DAT، انتخاب رشته، روش‌های مطالعه، سوال‌های شغلی، و راهنمایی‌های شخصی. اگر نتوانند کمک کنند، شما را به فردی معرفی می‌کنند که بتواند.",
      q5: "می‌خواهم مشاور شوم. چگونه؟",
      a5: "از طریق صفحه «مشاور شوید» اقدام کنید. بیشتر مشاوران ما فقط یک یا دو ساعت در ماه وقت می‌گذارند و موضوع‌های دلخواه خود را انتخاب می‌کنند.",
      q6: "آیا مدرسه یا سازمان ما می‌تواند با RYDN همکاری کند؟",
      a6: "بله. ما در مدارس، کتابخانه‌ها و سازمان‌های اجتماعی در سراسر کانادا کارگاه برگزار می‌کنیم. از طریق صفحه «همکاری با ما» با ما تماس بگیرید.",
      cta: "سوال خود را برای ما ایمیل کنید",
    },
    about: {
      eyebrow: "درباره RYDN",
      title: "ساخته‌شده توسط دانشجویان، برای دانشجویان.",
      lede: "RYDN — RooZ Youth Development Network — یک سازمان غیرانتفاعی کانادایی است که شکاف راهنمایی را پر می‌کند؛ شکافی که جلوی پیشرفت بسیاری از جوانان مستعد را می‌گیرد.",
      storyTitle: "داستان ما",
      storyP1: "استعداد همه‌جا هست؛ راهنمایی نیست. ما دانشجویان باهوش و پرانگیزه‌ای را دیدیم که در انتخاب مسیر درست به مشکل برمی‌خوردند — نه به‌خاطر کمبود توانایی، بلکه چون کسی را نداشتند که به‌تازگی همان مسیر را طی کرده باشد.",
      storyP2: "RYDN برای رفع همین مشکل ساخته شد. ما دانشجویان را مستقیماً به مشاورانی وصل می‌کنیم که یک یا دو قدم جلوترند — صمیمی، در دسترس، و رایگان.",
      storyP3: "امروز ما به دانشجویان سراسر کانادا خدمت می‌کنیم، با مدارس و کتابخانه‌ها کارگاه برگزار می‌کنیم، و هر ماه در حال رشد هستیم.",
      valuesTitle: "آنچه به آن باور داریم",
      v1Title: "همیشه رایگان",
      v1Body: "مشاوره و راهنمایی نباید وابسته به این باشد که چه کسی را می‌شناسید. هر جلسه رایگان است.",
      v2Title: "مشاوران صمیمی",
      v2Body: "مشاوران ما یک یا دو قدم جلوتر از شما در همان مسیرند — نه دهه‌ها فاصله دارند.",
      v3Title: "اول کاربردی",
      v3Body: "راهبردهای واقعی، زمان‌بندی واقعی، گام‌های بعدی واقعی — نه نصیحت‌های مبهم.",
      v4Title: "محور جامعه",
      v4Body: "ما یک شرکت نیستیم. ما دانشجویانی هستیم که از دانشجویان دیگر حمایت می‌کنند.",
      bilingualTitle: "چندزبانه، با ریشه در کانادا.",
      bilingualBody: "RYDN / Réseau de développement de la jeunesse RooZ به‌زبان‌های انگلیسی و فرانسه فعالیت می‌کند، با پشتیبانی از اسپانیایی و فارسی، و زبان‌های بیشتری در راه است. مستقر در ریچمند هیل، انتاریو.",
      ctaTitle: "آماده‌اید شروع کنید؟",
      ctaButton: "پیدا کردن مشاور",
    },
    stories: {
      eyebrow: "داستان‌ها و تأثیر",
      title: "دانشجویان واقعی. مسیرهای واقعی.",
      lede: "پشت هر رزرو، دانشجویی هست که درباره آینده‌اش تصمیم واقعی می‌گیرد. این‌ها بعضی از داستان‌های آن‌هاست.",
      impactTitle: "اکنون کجا هستیم",
      impactSubtitle: "RYDN کوچک است اما در حال رشد — ساخته‌شده توسط دانشجویان، برای دانشجویان.",
      journeysTitle: "مسیرهای ویژه",
      journeysSubtitle: "شش دانشجو. شش مسیر متفاوت. یک نقطه مشترک — هیچ‌کدام را تنها نپیمودند.",
      readMore: "خواندن داستان کامل",
      ctaTitle: "داستان خودتان را شروع کنید.",
      ctaButton: "رزرو با مشاور",
    },
    origin: {
      eyebrow: "RYDN چگونه شروع شد",
      title: "از یک جلسه تدریس تا یک حرکت.",
      sparkTitle: "جرقه",
      sparkBody: "همه‌چیز در میانه یک جلسه تدریس شروع شد. ناگهان یکی از شاگردان سم مکث کرد و پرسید: «می‌توانم چند سوال درباره دانشگاه بپرسم؟» او می‌خواست درباره دانشکده پزشکی بداند — اینکه چگونه کار می‌کند، چطور پذیرفته می‌شوند. سارا که آنجا بود، به‌عنوان دانشجوی پیش‌پزشکی صندلی‌اش را کشید و کنار ما نشست. با هم به همه سوال‌های او درباره پزشکی پاسخ دادیم. سپس همان نوع سوال را درباره مهندسی و هوافضا پرسید — و ما پاسخ نداشتیم. آن لحظه‌ای بود که سارا به سم گفت: تصور کن اگر هر دانشجویی می‌توانست با کسی بنشیند که قبلاً همان مسیر را رفته است. در هر رشته‌ای. همیشه رایگان. این لحظه‌ای بود که RYDN متولد شد.",
      foundedTitle: "تبدیل ایده به واقعیت",
      foundedBody: "ما RooZ Youth Development Network را به‌طور رسمی در مارس ۲۰۲۶ تأسیس کردیم. روزهای اول فقط ما دو نفر بودیم، یک تقویم مشترک، و چند دوست که حاضر بودند مشاوره دهند. شروع کردیم با تماس با دانشجویانی که می‌شناختیم در رشته‌هایی که خودمان نمی‌توانستیم در آن‌ها صحبت کنیم — مهندسی، حقوق، پرستاری، تجارت، علوم — و از آن‌ها خواستیم یک ساعت در ماه بدهند. ظرف چند هفته شبکه‌ای کوچک داشتیم. امروز بیش از ۲۵ مشاور داریم و در حال رشد هستیم.",
      todayTitle: "اکنون کجا هستیم",
      todayBody: "امروز RYDN بیش از ۲۵ مشاور دانشجویی را با دانشجویان سراسر کانادا مرتبط می‌کند. کارگاه‌های رایگان برگزار می‌کنیم، با مدارس و کتابخانه‌ها همکاری داریم، و در سه زبان فعالیت می‌کنیم — و این فقط آغاز کار است.",
      quote: "همه‌چیز با یک دانشجو شروع شد که سوالی پرسید و ما پاسخ نداشتیم. هیچ دانشجویی نباید تنها این سوال را بپرسد.",
      quoteAttribution: "سارا روزبهانی و سم سینا، بنیان‌گذاران",
    },
    notFound: {
      badge: "۴۰۴ — صفحه یافت نشد",
      title: "این صفحه را پیدا نمی‌کنیم.",
      body: "به نظر می‌رسد لینک خراب است یا صفحه جابه‌جا شده. حالا که اینجایید — مایلید یک منتور پیدا کنید؟",
      bookCta: "رزرو منتور",
      homeCta: "بازگشت به خانه",
    },
    filters: {
      all: "همه",
      preMed: "پیش‌پزشکی",
      sciences: "علوم",
      preLaw: "پیش‌حقوق",
      business: "تجارت",
      arts: "هنر",
      language: "زبان",
      psychNeuro: "روان‌شناسی و اعصاب",
      pharmacy: "داروسازی",
      sports: "ورزش",
      it: "فناوری اطلاعات",
      gameDev: "بازی‌سازی",
    },
    iosInstall: {
      title: "نصب RYDN روی آیفون شما",
      step1: "روی آیکون اشتراک‌گذاری در پایین بزنید",
      step2: "سپس «افزودن به صفحه اصلی» را انتخاب کنید",
      dismiss: "متوجه شدم",
    },
    matchmaker: {
      cta: "مشاور خود را پیدا کنید",
      ctaTagline: "نمی‌دانید کدام را انتخاب کنید؟ دستیار هوش مصنوعی ما در ۳۰ ثانیه شما را با مشاور مناسب RYDN آشنا می‌کند.",
      title: "پیدا کردن مشاور",
      subtitle: "بگویید چه چیزی را در نظر دارید تا با مشاور مناسب RYDN آشنا شوید.",
      placeholder: "پاسخ خود را تایپ کنید…",
      send: "ارسال",
      thinking: "در حال فکر کردن…",
      welcome: "سلام 👋 من اینجا هستم تا به شما کمک کنم مشاور مناسب RYDN را پیدا کنید. الان چه چیزی را در نظر دارید — یک درس، یک آزمون، یک مسیر شغلی؟",
      reset: "شروع دوباره",
      error: "مشکلی پیش آمد. لطفاً لحظه‌ای دیگر دوباره امتحان کنید.",
      bookButton: "رزرو با",
      close: "بستن",
      poweredBy: "با کمک Llama روی Cloudflare AI",
      generalTitle: "از RYDN بپرسید",
      generalSubtitle: "پاسخ‌های سریع درباره کارگاه‌ها، مشاوره و کمک‌های مالی.",
      generalWelcome: "سلام 👋 می‌توانم به سوالات شما درباره RYDN — کارگاه‌ها، مشاوره، کمک‌های مالی و هر چیزی مربوط به سایت — پاسخ دهم. چه کمکی از من برمی‌آید؟",
      generalCta: "از هوش مصنوعی بپرس",
    },
    language: {
      chooseLanguage: "زبان خود را انتخاب کنید",
    },
  },

  he: {
    nav: {
      home: "בית",
      about: "אודות",
      ourTeam: "הצוות שלנו",
      becomeAdvisor: "להיות יועץ",
      workshops: "סדנאות",
      stories: "סיפורים",
      blog: "בלוג",
      support: "תמכו בנו",
      supportShort: "תמיכה",
      bookNow: "הזמינו מנטור",
      bookNowShort: "הזמינו",
    },
    hero: {
      eyebrow: "ייעוץ חינם לכל סטודנט",
      titleLine1: "ייעוץ ש",
      titleLine2: "משנה דרכים.",
      subhead:
        "מחברים סטודנטים מכל העולם לאוניברסיטאות המובילות בקנדה. פגישות ייעוץ פרטיות וחינמיות עם סטודנטים שרק 2-3 שנים לפניכם — לפני החלטות גורליות.",
      ctaPrimary: "מצאו מנטור",
      ctaSecondary: "למידע נוסף",
      trustNonprofit: "עמותה קנדית",
      trustFree: "100% חינם לסטודנטים",
      trustMultilingual: "תמיכה רב-לשונית",
    },
    mission: {
      eyebrow: "המשימה שלנו",
      line1: "כישרון נמצא בכל מקום.",
      line2: "ייעוץ — לא תמיד.",
      line3: "RYDN קיים כדי לסגור את הפער הזה — דרך מנטורינג, סדנאות ותמיכה אקדמית.",
    },
    testimonials: {
      eyebrow: "מה הסטודנטים אומרים",
      title: "סטודנטים אמיתיים. תוצאות אמיתיות.",
      subtitle: "סיפורים מסטודנטים והורים שעבדנו איתם.",
    },
    programs: {
      eyebrow: "מה אנחנו מציעים",
      title: "כל מה שסטודנט צריך, במקום אחד.",
      subtitle:
        "ממנטורינג אחד-על-אחד ועד סדנאות דו-לשוניות, אנחנו פוגשים את הסטודנטים בנקודה שבה הם נמצאים.",
      p1Title: "מנטורינג אחד-על-אחד",
      p1Body: "פגישות חינם עם יועצים שכבר עברו את הדרך שאתם שוקלים — לימודים, קריירה, חיים.",
      p2Title: "סדנאות ואירועים",
      p2Body:
        "פגישות אינטראקטיביות בנושא טכניקות לימוד, הכנה לאוניברסיטה וחקר קריירה. מקוון ופרונטלי.",
      p3Title: "הכנה ל-MCAT, LSAT, DAT",
      p3Body: "אסטרטגיות אמיתיות מסטודנטים שעברו את המבחנים האלה לאחרונה.",
      p4Title: "מועמדויות לאוניברסיטה",
      p4Body:
        "עזרה עם חיבורים, המלצות, בחירת מסלול, ותהליך הקבלה הקנדי המלא.",
      p5Title: "שותפויות עם בתי ספר וקהילות",
      p5Body:
        "אנו מביאים את התוכניות שלנו לבתי ספר, ספריות ומרכזים קהילתיים ברחבי קנדה.",
    },
    partners: {
      eyebrow: "עובדים עם",
      title: "מהימנים על ידי בתי ספר וקהילות ברחבי קנדה",
    },
    instagram: {
      eyebrow: "עקבו אחרינו",
      title: "מהאינסטגרם של @rydn.ca",
      subtitle: "מאחורי הקלעים מהסדנאות שלנו, מנטורים מצטיינים, והצלחות סטודנטים.",
      follow: "עקבו באינסטגרם",
    },
    faq: {
      eyebrow: "שאלות נפוצות",
      title: "כל מה שרציתם לשאול",
      subtitle: "אם השאלה שלכם לא כאן, פשוט שלחו לנו אימייל.",
      q1: "האם RYDN באמת חינם?",
      a1:
        "כן — כל פגישה, סדנה ומשאב הם 100% חינם. RYDN היא עמותה קנדית רשומה, הנתמכת על ידי תורמים ומנטורים מתנדבים.",
      q2: "מי יכול להשתמש ב-RYDN?",
      a2:
        "כל סטודנט בקנדה יכול להזמין פגישות, מהתיכון ועד האוניברסיטה. אנו גם מקבלים בברכה סטודנטים בינלאומיים השוקלים אוניברסיטאות קנדיות.",
      q3: "איך מזמינים פגישה עם מנטור?",
      a3:
        "עיינו ביועצים שלנו בעמוד הבית, לחצו על 'הזמינו' אצל המנטור שמתאים למטרות שלכם, ובחרו זמן. תקבלו זימון ללוח השנה במייל.",
      q4: "במה מנטורים יכולים לעזור?",
      a4:
        "מועמדויות לאוניברסיטה, הכנה ל-MCAT/LSAT/DAT, בחירת מסלול לימודים, אסטרטגיות לימוד, שאלות קריירה והכוונה אישית.",
      q5: "אני רוצה להיות יועץ. איך זה עובד?",
      a5:
        "הגישו מועמדות דרך עמוד 'להיות יועץ'. רוב המנטורים נותנים רק שעה או שתיים בחודש ובוחרים את הנושאים שעליהם הם מייעצים.",
      q6: "האם בית הספר שלנו יכול להיות שותף עם RYDN?",
      a6:
        "כן. אנו מקיימים סדנאות בבתי ספר, ספריות וארגונים קהילתיים ברחבי קנדה. צרו קשר דרך עמוד 'שותפים איתנו'.",
      cta: "שלחו לנו את השאלה במייל",
    },
    stories: {
      eyebrow: "סיפורים והשפעה",
      title: "סטודנטים אמיתיים. מסעות אמיתיים.",
      lede:
        "מאחורי כל הזמנה יש סטודנט שמקבל החלטה אמיתית לגבי העתיד שלו. הנה כמה מהסיפורים שלהם.",
      impactTitle: "איפה אנחנו עכשיו",
      impactSubtitle: "RYDN קטן אבל גדל — נבנה על ידי סטודנטים, לסטודנטים.",
      journeysTitle: "מסעות מובילים",
      journeysSubtitle:
        "שישה סטודנטים. שש דרכים שונות. דבר אחד משותף — הם לא הלכו בהן לבד.",
      readMore: "קראו את הסיפור המלא",
      ctaTitle: "התחילו את הסיפור שלכם.",
      ctaButton: "הזמינו מנטור",
    },
    origin: {
      eyebrow: "איך RYDN התחיל",
      title: "מפגישת תגבור אחת לתנועה.",
      sparkTitle: "הניצוץ",
      sparkBody:
        "זה התחיל באמצע פגישת תגבור. בלי שום הקדמה, אחד מהסטודנטים של סם עצר ושאל: 'אפשר לשאול אותך כמה שאלות על האוניברסיטה?' הוא רצה לדעת על בית הספר לרפואה — איך זה עובד, איך נכנסים. שרה הייתה בקרבת מקום, וכסטודנטית לקראת רפואה היא התקרבה כדי לעזור. בינינו, ענינו על כל מה שהוא היה צריך לדעת על רפואה. אחר כך הוא שאל את אותו סוג שאלות על הנדסה ואווירונאוטיקה — ולא היו לנו תשובות. זה היה הרגע שבו שרה הסתכלה על סם ואמרה: דמיין אם כל סטודנט יכול היה פשוט לשבת עם מישהו שכבר עבר את הדרך שמסקרנת אותו. בכל תחום. תמיד בחינם. זה הרגע שבו RYDN נולד.",
      foundedTitle: "להפוך את זה למציאות",
      foundedBody:
        "ייסדנו רשמית את RooZ Youth Development Network במרץ 2026. בימים הראשונים זה היה רק שנינו, יומן משותף, וכמה חברים שהיו מוכנים לייעץ. התחלנו ביצירת קשר עם סטודנטים שהכרנו בתחומים שלא יכולנו לדבר עליהם — הנדסה, משפטים, סיעוד, עסקים, מדעים — וביקשנו מהם לתת שעה אחת בחודש. תוך שבועות הייתה לנו רשת קטנה. היום יש 25+ יועצים, וזה גדל.",
      todayTitle: "איפה אנחנו עכשיו",
      todayBody:
        "היום RYDN מחבר 25+ יועצי סטודנטים עם סטודנטים ברחבי קנדה. אנחנו מקיימים סדנאות חינם, שותפים עם בתי ספר וספריות, ופועלים בארבע שפות — וזה רק ההתחלה.",
      quote:
        "זה התחיל עם סטודנט אחד ששאל שאלה שלא יכולנו לענות עליה. אף סטודנט לא צריך לשאול אותה לבד.",
      quoteAttribution: "שרה רוזבהאני וסם סינה, מייסדים",
    },
    about: {
      eyebrow: "אודות RYDN",
      title: "נבנה על ידי סטודנטים, לסטודנטים.",
      lede:
        "RYDN — RooZ Youth Development Network — היא עמותה קנדית הסוגרת את פער הייעוץ שמעצור צעירים מוכשרים.",
      storyTitle: "הסיפור שלנו",
      storyP1:
        "כישרון נמצא בכל מקום; ייעוץ — לא. ראינו סטודנטים חכמים ומונעי מטרה נאבקים לבחור את הדרך הנכונה — לא בגלל חוסר יכולת, אלא כי לא היה להם מישהו שעבר אותה לאחרונה.",
      storyP2:
        "RYDN נוסד כדי לתקן את זה. אנחנו מחברים סטודנטים ישירות עם מנטורים שצעד או שניים לפניהם — נגישים, רלוונטיים, חינם.",
      storyP3:
        "היום אנחנו משרתים סטודנטים ברחבי קנדה, מקיימים סדנאות עם בתי ספר וספריות, וגדלים מדי חודש.",
      valuesTitle: "מה מנחה אותנו",
      v1Title: "תמיד חינם",
      v1Body: "מנטורינג לא צריך להיות תלוי במי שאתה מכיר. כל פגישה חינם.",
      v2Title: "מנטורים שאפשר להתחבר אליהם",
      v2Body:
        "היועצים שלנו צעד או שניים לפניכם באותה הדרך — לא עשרות שנים מאחור.",
      v3Title: "פרקטי קודם כל",
      v3Body:
        "אסטרטגיות אמיתיות, לוחות זמנים אמיתיים, צעדים הבאים אמיתיים — לא עצות מעורפלות.",
      v4Title: "קהילתי",
      v4Body: "אנחנו לא חברה. אנחנו סטודנטים שתומכים בסטודנטים.",
      bilingualTitle: "רב-לשוני, עם שורשים קנדיים.",
      bilingualBody:
        "RYDN פועל באנגלית, צרפתית, פרסית ועברית, עם תמיכה בספרדית. ממוקם בריצ'מונד היל, אונטריו, קנדה.",
      ctaTitle: "מוכנים להתחיל?",
      ctaButton: "מצאו מנטור",
    },
    notFound: {
      badge: "404 — דף לא נמצא",
      title: "לא הצלחנו למצוא את הדף הזה.",
      body: "נראה שהקישור שבור או שהדף הועבר. כל עוד אתם כאן — אולי תרצו למצוא מנטור?",
      bookCta: "הזמינו מנטור",
      homeCta: "חזרה לדף הבית",
    },
    filters: {
      all: "הכל",
      preMed: "טרום-רפואה",
      sciences: "מדעים",
      preLaw: "טרום-משפטים",
      business: "עסקים",
      arts: "אמנויות",
      language: "שפות",
      psychNeuro: "פסיכולוגיה ומוח",
      pharmacy: "רוקחות",
      sports: "ספורט",
      it: "מחשבים",
      gameDev: "פיתוח משחקים",
    },
    iosInstall: {
      title: "התקינו את RYDN באייפון שלכם",
      step1: "הקישו על סמל השיתוף למטה",
      step2: "ואז בחרו ב-\"הוסף למסך הבית\"",
      dismiss: "הבנתי",
    },
    matchmaker: {
      cta: "מצאו את היועץ שלכם",
      ctaTagline: "לא יודעים את מי לבחור? עוזר ה-AI שלנו יתאים לכם את היועץ הנכון מ-RYDN ב-30 שניות.",
      title: "מצאו את היועץ שלכם",
      subtitle: "ספרו לי מה אתם בודקים ואני אתאים לכם יועץ מ-RYDN.",
      placeholder: "הקלידו את התשובה…",
      send: "שלחו",
      thinking: "חושב…",
      welcome: "היי 👋 אני כאן לעזור לכם למצוא את היועץ המתאים מ-RYDN. מה אתם בודקים עכשיו — מקצוע, בחינה, מסלול קריירה?",
      reset: "התחל מחדש",
      error: "משהו השתבש. נסו שוב בעוד רגע.",
      bookButton: "הזמינו עם",
      close: "סגור",
      poweredBy: "מופעל על ידי Llama על Cloudflare AI",
      generalTitle: "שאלו את RYDN",
      generalSubtitle: "תשובות מהירות על סדנאות, ייעוץ ותרומות.",
      generalWelcome: "היי 👋 אני יכול לענות על שאלות לגבי RYDN — סדנאות, ייעוץ, תרומות, כל דבר באתר. במה אוכל לעזור?",
      generalCta: "שאלו את ה-AI",
    },
    language: {
      chooseLanguage: "בחרו את השפה שלכם",
    },
  },

  // =====================================================================
  // SIMPLIFIED CHINESE (zh) — full translation
  // =====================================================================
  zh: {
    nav: {
      home: "首页",
      about: "关于我们",
      ourTeam: "团队",
      becomeAdvisor: "成为顾问",
      workshops: "讲座活动",
      stories: "学生故事",
      blog: "博客",
      support: "支持我们",
      supportShort: "支持",
      bookNow: "预约顾问",
      bookNowShort: "预约",
    },
    hero: {
      eyebrow: "面向每位学生的免费指导",
      titleLine1: "改变方向的",
      titleLine2: "升学指导。",
      subhead:
        "连接全球学生与加拿大顶尖大学。在你做出人生重要选择之前，享受与比你早两到三年入学的大学生的免费一对一咨询。",
      ctaPrimary: "寻找顾问",
      ctaSecondary: "了解更多",
      trustNonprofit: "加拿大注册非营利组织",
      trustFree: "对学生100%免费",
      trustMultilingual: "多语种支持",
    },
    mission: {
      eyebrow: "我们的使命",
      line1: "人才无处不在。",
      line2: "指引却不是。",
      line3: "RYDN 通过咨询、讲座和学业支持，致力于填补这一空白。",
    },
    testimonials: {
      eyebrow: "学生的反馈",
      title: "真实的学生。真实的成果。",
      subtitle: "来自我们服务过的学生和家长的故事。",
    },
    programs: {
      eyebrow: "我们的服务",
      title: "学生所需的一切，一站搞定。",
      subtitle: "从一对一咨询到双语讲座，我们陪伴学生走到他们所在之处。",
      p1Title: "一对一咨询",
      p1Body: "与曾经走过你正在考虑之路的顾问免费交流——学业、职业、生活。",
      p2Title: "讲座与活动",
      p2Body: "围绕学习技巧、大学准备和职业探索的互动讲座。线上线下皆可。",
      p3Title: "MCAT、LSAT 与 DAT 备考",
      p3Body: "由近期参加并取得佳绩的学生分享真实可行的备考策略。",
      p4Title: "大学申请",
      p4Body: "协助你完成文书、推荐信、专业选择，以及加拿大整套申请流程。",
      p5Title: "学校与社区合作",
      p5Body: "我们走进加拿大各地的学校、图书馆和社区中心，将项目带到你身边。",
    },
    partners: {
      eyebrow: "合作伙伴",
      title: "受到加拿大各地学校和社区的信赖",
    },
    instagram: {
      eyebrow: "保持联系",
      title: "@rydn.ca 的最新动态",
      subtitle: "讲座幕后花絮、顾问介绍和学生喜讯。",
      follow: "在 Instagram 关注我们",
    },
    faq: {
      eyebrow: "常见问题",
      title: "你想问的，都在这里",
      subtitle: "如果这里没有你的问题，欢迎给我们发送电子邮件。",
      q1: "RYDN 真的是免费的吗？",
      a1: "是的——每一次咨询、讲座和资源都100%免费。RYDN 是加拿大注册的非营利组织，由捐赠者和志愿顾问支持。",
      q2: "谁可以使用 RYDN？",
      a2: "任何在加拿大求学的学生都可以预约咨询，从高中到大学不等。我们也欢迎正在考虑加拿大大学的国际学生。",
      q3: "我如何预约顾问？",
      a3: "在首页浏览我们的顾问，点击与你目标相符的顾问下方的「预约」按钮，并选择时间。你将通过电子邮件收到日历邀请。",
      q4: "顾问到底能帮我什么？",
      a4: "大学申请、MCAT/LSAT/DAT 备考、专业选择、学习策略、职业规划和个人方向。如果他们无法回答，会引荐合适的人选给你。",
      q5: "我想成为顾问。流程是怎样的？",
      a5: "通过「成为顾问」页面申请。大多数顾问每月只需贡献一两个小时，并可自主选择咨询主题。",
      q6: "我们的学校或机构可以与 RYDN 合作吗？",
      a6: "当然可以。我们在加拿大各地的学校、图书馆和社区机构举办讲座。请通过「合作」页面联系我们，我们会安排电话沟通。",
      cta: "通过电子邮件咨询",
    },
    stories: {
      eyebrow: "故事与影响",
      title: "真实的学生。真实的旅程。",
      lede: "每一次预约背后，都是一位学生在为自己的未来做出真实的选择。以下是他们中的一些故事。",
      impactTitle: "我们目前的现状",
      impactSubtitle: "RYDN 规模虽小，但正在成长——由学生为学生而建。",
      journeysTitle: "精选历程",
      journeysSubtitle: "六位学生。六条不同的道路。共同点是——他们都不是独自前行。",
      readMore: "阅读完整故事",
      ctaTitle: "开启你自己的故事。",
      ctaButton: "预约顾问",
    },
    origin: {
      eyebrow: "RYDN 的起源",
      title: "从一次辅导，到一场运动。",
      sparkTitle: "灵感的火花",
      sparkBody: "故事开始于一次辅导中途。Sam 的一位学生突然停下来问道：「我能问你一些关于大学的问题吗？」他想了解医学院——怎么运作、如何进入。Sara 正好在附近，作为预医学生，她拉过椅子帮忙解答。两人合力回答了他关于医学的所有疑问。接着他又问起工程和航空航天方面同样的问题——而我们答不上来。就在那一刻，Sara 转头对 Sam 说：试想一下，如果每位学生都能与已经走过他所好奇之路的人坐下来聊聊，会怎样？任何领域。永远免费。那一刻，RYDN 便诞生了。",
      foundedTitle: "让梦想成真",
      foundedBody: "我们于2026年3月正式创立 RooZ Youth Development Network。最初只有我们两人、一份共享日历和几位愿意提供咨询的朋友。我们开始联络我们认识的、但我们自己无法提供建议的领域的学生——工程、法律、护理、商业、理科——询问他们是否愿意每月贡献一小时。几周内，我们就建立了一个小型网络。如今已有25多位顾问，并在持续增长。",
      todayTitle: "我们现在的位置",
      todayBody: "如今，RYDN 连接了25多位学生顾问与加拿大各地的学生。我们举办免费讲座，与学校和图书馆合作，并以三种语言运营——而这仅仅是开始。",
      quote: "一切始于一位学生提出我们当时无法回答的问题。没有学生应该独自面对这样的问题。",
      quoteAttribution: "Sara Roozbahani 与 Sam Sina，创始人",
    },
    about: {
      eyebrow: "关于 RYDN",
      title: "由学生为学生而建。",
      lede: "RYDN——RooZ Youth Development Network——是一家加拿大非营利组织，致力于消除阻碍优秀年轻人前行的指引缺口。",
      storyTitle: "我们的故事",
      storyP1: "人才无处不在，但指引并非如此。我们看到聪明、有动力的学生在选择道路时感到挣扎——不是因为他们能力不足，而是因为他们身边缺少一位最近走过同样道路的人。",
      storyP2: "RYDN 的成立就是为了解决这个问题。我们将学生与比他们早一两步的顾问直接联系起来——亲切、易于接触、免费。",
      storyP3: "今天，我们服务于加拿大各地的学生，与学校和图书馆合作举办讲座，并且每个月都在成长。",
      valuesTitle: "我们的坚持",
      v1Title: "永远免费",
      v1Body: "升学和职业指导不应取决于你认识谁。每一次咨询都是免费的。",
      v2Title: "可亲近的顾问",
      v2Body: "我们的顾问只比你早一两步走在同一条路上——不是相隔几十年的过来人。",
      v3Title: "实用优先",
      v3Body: "真实策略、真实时间表、真实下一步——不空谈。",
      v4Title: "社区驱动",
      v4Body: "我们不是公司。我们是学生帮助学生。",
      bilingualTitle: "多语种，扎根加拿大。",
      bilingualBody: "RYDN / Réseau de développement de la jeunesse RooZ 以英语和法语运营，并提供西班牙语支持，更多语种正在加入。总部位于安大略省里士满希尔。",
      ctaTitle: "准备好开始了吗？",
      ctaButton: "寻找顾问",
    },
    notFound: {
      badge: "404 — 未找到页面",
      title: "我们找不到那个页面。",
      body: "看来链接已失效或页面已迁移。既然你来了——想不想找位顾问？",
      bookCta: "预约顾问",
      homeCta: "回到首页",
    },
    filters: {
      all: "全部",
      preMed: "预医",
      sciences: "理科",
      preLaw: "预法",
      business: "商科",
      arts: "文科",
      language: "语言",
      psychNeuro: "心理与神经",
      pharmacy: "药学",
      sports: "运动",
      it: "信息技术",
      gameDev: "游戏开发",
    },
    iosInstall: {
      title: "在你的 iPhone 上安装 RYDN",
      step1: "点击下方的分享图标",
      step2: "然后选择「添加到主屏幕」",
      dismiss: "知道了",
    },
    matchmaker: {
      cta: "找到匹配",
      ctaTagline: "不确定该选谁？让我们的 AI 助手在 30 秒内为你匹配合适的 RYDN 顾问。",
      title: "寻找你的顾问",
      subtitle: "告诉我你正在探索什么，我会为你匹配一位 RYDN 顾问。",
      placeholder: "输入你的答案……",
      send: "发送",
      thinking: "思考中……",
      welcome: "嗨 👋 我在这里帮你找到合适的 RYDN 顾问。你目前在探索什么——某个学科、考试，还是职业方向？",
      reset: "重新开始",
      error: "出现错误。请稍后再试。",
      bookButton: "预约",
      close: "关闭",
      poweredBy: "由 Cloudflare AI 上的 Llama 提供支持",
      generalTitle: "问问 RYDN",
      generalSubtitle: "关于讲座、咨询和捐款的快速解答。",
      generalWelcome: "嗨 👋 我可以回答关于 RYDN 的问题——讲座、咨询、捐款，与网站相关的任何事。我能帮你什么？",
      generalCta: "询问 AI",
    },
    language: {
      chooseLanguage: "选择你的语言",
    },
  },

  // =====================================================================
  // KOREAN (ko) — full translation. Uses the friendly-polite 해요체 register
  // common on Korean web/marketing content.
  // =====================================================================
  ko: {
    nav: {
      home: "홈",
      about: "소개",
      ourTeam: "팀 소개",
      becomeAdvisor: "어드바이저 되기",
      workshops: "워크숍",
      stories: "학생 이야기",
      blog: "블로그",
      support: "후원하기",
      supportShort: "후원",
      bookNow: "어드바이저 예약",
      bookNowShort: "예약",
    },
    hero: {
      eyebrow: "모든 학생을 위한 무료 진학 상담",
      titleLine1: "진로를",
      titleLine2: "바꾸는 상담.",
      subhead:
        "전 세계 학생들을 캐나다 최고의 대학들과 연결합니다. 인생을 바꿀 결정을 내리기 전에, 단 2~3년 앞선 대학생들과 무료 1대1 세션을 가져보세요.",
      ctaPrimary: "어드바이저 찾기",
      ctaSecondary: "자세히 보기",
      trustNonprofit: "캐나다 비영리 단체",
      trustFree: "학생에게 100% 무료",
      trustMultilingual: "다국어 지원",
    },
    mission: {
      eyebrow: "우리의 미션",
      line1: "재능은 어디에나 있어요.",
      line2: "그러나 안내자는 그렇지 않죠.",
      line3: "RYDN은 상담, 워크숍, 학업 지원을 통해 그 격차를 메우기 위해 존재합니다.",
    },
    testimonials: {
      eyebrow: "학생들의 후기",
      title: "진짜 학생들. 진짜 결과.",
      subtitle: "우리가 함께한 학생들과 학부모들의 이야기예요.",
    },
    programs: {
      eyebrow: "우리가 제공하는 것",
      title: "학생에게 필요한 모든 것, 한곳에서.",
      subtitle: "1대1 상담부터 이중언어 워크숍까지, 학생들이 있는 자리에서 함께합니다.",
      p1Title: "1대1 진학 상담",
      p1Body: "여러분이 고민하는 길을 이미 걸어본 어드바이저와의 무료 세션 — 학업, 진로, 인생.",
      p2Title: "워크숍 & 행사",
      p2Body: "학습법, 대학 준비, 진로 탐색에 관한 인터랙티브 세션. 온라인과 오프라인 모두.",
      p3Title: "MCAT, LSAT & DAT 준비",
      p3Body: "최근에 시험을 보고 합격한 학생들이 알려주는 실전 전략.",
      p4Title: "대학 지원",
      p4Body: "에세이, 추천서, 학과 선택, 캐나다 입시 전 과정 도움.",
      p5Title: "학교 & 지역사회 협력",
      p5Body: "캐나다 전역의 학교, 도서관, 커뮤니티 센터에 직접 찾아갑니다.",
    },
    partners: {
      eyebrow: "함께하는 곳",
      title: "캐나다 전역의 학교와 지역사회가 신뢰합니다",
    },
    instagram: {
      eyebrow: "함께 보기",
      title: "@rydn.ca의 최신 소식",
      subtitle: "워크숍 비하인드, 어드바이저 소개, 학생들의 성공담.",
      follow: "Instagram에서 팔로우",
    },
    faq: {
      eyebrow: "자주 묻는 질문",
      title: "궁금했던 모든 것",
      subtitle: "여기에 답이 없다면, 이메일로 보내주세요.",
      q1: "RYDN은 정말 무료인가요?",
      a1: "네 — 모든 세션, 워크숍, 자료가 100% 무료입니다. RYDN은 후원자와 자원봉사 어드바이저들이 함께하는 캐나다 비영리 단체입니다.",
      q2: "누가 RYDN을 이용할 수 있나요?",
      a2: "캐나다의 어떤 학생이든, 고등학생부터 대학생까지 세션을 예약할 수 있어요. 캐나다 대학을 고려하는 국제 학생들도 환영합니다.",
      q3: "어드바이저 세션은 어떻게 예약하나요?",
      a3: "홈에서 어드바이저들을 둘러보고, 본인의 목표와 잘 맞는 어드바이저의 ‘예약’ 버튼을 누른 뒤 시간을 선택하세요. 이메일로 캘린더 초대장을 받게 됩니다.",
      q4: "어드바이저는 어떤 부분에서 도와줄 수 있나요?",
      a4: "대학 지원, MCAT/LSAT/DAT 준비, 학과 선택, 학습 전략, 진로 고민, 개인적인 방향성까지. 도움을 줄 수 없다면 다른 어드바이저를 연결해드려요.",
      q5: "저도 어드바이저가 되고 싶어요. 어떻게 하나요?",
      a5: "‘어드바이저 되기’ 페이지에서 지원하세요. 대부분의 어드바이저는 한 달에 1~2시간만 시간을 내며, 본인이 다룰 주제를 직접 선택합니다.",
      q6: "저희 학교나 단체가 RYDN과 협력할 수 있을까요?",
      a6: "물론입니다. 우리는 캐나다 전역의 학교, 도서관, 커뮤니티 단체에서 워크숍을 진행합니다. ‘협력하기’ 페이지를 통해 연락 주시면 통화를 잡아드릴게요.",
      cta: "이메일로 질문 보내기",
    },
    stories: {
      eyebrow: "스토리 & 임팩트",
      title: "진짜 학생들. 진짜 여정.",
      lede: "모든 예약 뒤에는 자신의 미래에 대한 진지한 결정을 내리는 학생이 있어요. 그들의 이야기를 들어보세요.",
      impactTitle: "지금 우리가 있는 곳",
      impactSubtitle: "RYDN은 작지만 자라고 있어요 — 학생들이 학생들을 위해 만든 곳.",
      journeysTitle: "주목할 여정들",
      journeysSubtitle: "여섯 명의 학생. 여섯 개의 다른 길. 공통점 하나 — 혼자 걷지 않았다는 것.",
      readMore: "전체 이야기 보기",
      ctaTitle: "당신만의 이야기를 시작해 보세요.",
      ctaButton: "어드바이저 예약",
    },
    origin: {
      eyebrow: "RYDN은 어떻게 시작됐나",
      title: "한 번의 과외에서 시작된 움직임.",
      sparkTitle: "그 순간의 불씨",
      sparkBody: "한 과외 시간 중간에 시작됐어요. Sam의 학생 중 한 명이 갑자기 멈춰서 물었죠. “대학에 대해 몇 가지 물어봐도 될까요?” 그 학생은 의대에 대해 알고 싶어 했어요 — 어떻게 운영되는지, 어떻게 들어가는지. 마침 근처에 있던 Sara가 예비 의대생으로서 의자를 끌어와 함께 답해줬어요. 우리 둘이서 의학에 대해 그가 필요한 모든 것을 알려줬죠. 그러더니 그 학생이 공학과 항공우주에 대해 같은 종류의 질문을 했어요 — 그건 우리도 답할 수 없었어요. 그 순간 Sara가 Sam에게 돌아서며 말했어요: 모든 학생이 자기가 궁금해하는 길을 이미 걸어본 사람과 그냥 앉아서 이야기할 수 있다면 어떨까? 어떤 분야든. 언제나 무료로. 그 순간 RYDN이 태어났습니다.",
      foundedTitle: "현실로 만들기",
      foundedBody: "우리는 2026년 3월에 RooZ Youth Development Network를 공식적으로 설립했어요. 초기에는 우리 둘과 공유 캘린더, 그리고 기꺼이 조언해 줄 친구들 몇 명이 전부였어요. 우리는 우리가 잘 모르는 분야 — 공학, 법학, 간호학, 비즈니스, 과학 — 의 학생들에게 연락해 한 달에 한 시간만 내달라고 부탁했어요. 몇 주 만에 작은 네트워크가 생겼어요. 오늘날에는 25명 이상의 어드바이저가 있고, 계속 늘어나고 있어요.",
      todayTitle: "지금 우리의 위치",
      todayBody: "오늘날 RYDN은 25명 이상의 학생 어드바이저와 캐나다 전역의 학생들을 연결합니다. 무료 워크숍을 운영하고, 학교와 도서관과 협력하며, 세 가지 언어로 운영합니다 — 이제 시작일 뿐입니다.",
      quote: "한 학생이 우리가 답할 수 없는 질문을 한 데서 시작됐어요. 어떤 학생도 그 질문을 혼자 해야 해선 안 됩니다.",
      quoteAttribution: "Sara Roozbahani & Sam Sina, 공동 설립자",
    },
    about: {
      eyebrow: "RYDN 소개",
      title: "학생이 학생을 위해 만들었습니다.",
      lede: "RYDN — RooZ Youth Development Network — 은 재능 있는 청소년들의 발목을 잡는 안내 격차를 해소하는 캐나다 비영리 단체입니다.",
      storyTitle: "우리의 이야기",
      storyP1: "재능은 어디에나 있지만, 안내는 그렇지 않아요. 우리는 똑똑하고 의욕 있는 학생들이 길을 선택하는 데 어려움을 겪는 모습을 봐왔어요 — 능력이 부족해서가 아니라, 그 길을 최근에 걸어본 사람이 곁에 없어서.",
      storyP2: "RYDN은 그 문제를 해결하기 위해 설립되었어요. 우리는 학생들을 한두 걸음 앞서간 어드바이저와 직접 연결해요 — 친근하고, 접근하기 쉽고, 무료로.",
      storyP3: "오늘날 우리는 캐나다 전역의 학생들에게 서비스를 제공하고, 학교 및 도서관과 함께 워크숍을 진행하며, 매달 성장하고 있어요.",
      valuesTitle: "우리가 지향하는 것",
      v1Title: "언제나 무료",
      v1Body: "상담과 안내는 누구를 아느냐에 달려선 안 됩니다. 모든 세션은 무료예요.",
      v2Title: "친근한 어드바이저",
      v2Body: "우리 어드바이저들은 여러분보다 한두 걸음 앞서 같은 길을 걷고 있어요 — 수십 년 떨어진 분들이 아닙니다.",
      v3Title: "실용 우선",
      v3Body: "실제 전략, 실제 일정, 실제 다음 단계 — 막연한 조언이 아니에요.",
      v4Title: "커뮤니티 기반",
      v4Body: "우리는 회사가 아닙니다. 학생이 학생을 돕는 모임입니다.",
      bilingualTitle: "다국어, 캐나다에 뿌리내린.",
      bilingualBody: "RYDN / Réseau de développement de la jeunesse RooZ는 영어와 프랑스어로 운영되며, 스페인어를 지원하고, 더 많은 언어가 추가될 예정입니다. 온타리오주 리치먼드힐에 본부를 두고 있습니다.",
      ctaTitle: "시작할 준비 되셨나요?",
      ctaButton: "어드바이저 찾기",
    },
    notFound: {
      badge: "404 — 페이지를 찾을 수 없음",
      title: "해당 페이지를 찾을 수 없어요.",
      body: "링크가 끊겼거나 페이지가 이동된 것 같아요. 이왕 오셨으니 — 어드바이저를 찾아보시는 건 어떨까요?",
      bookCta: "어드바이저 예약",
      homeCta: "홈으로 돌아가기",
    },
    filters: {
      all: "전체",
      preMed: "의대 준비",
      sciences: "이공계",
      preLaw: "법대 준비",
      business: "비즈니스",
      arts: "인문/예술",
      language: "어학",
      psychNeuro: "심리/신경",
      pharmacy: "약학",
      sports: "스포츠",
      it: "IT",
      gameDev: "게임 개발",
    },
    iosInstall: {
      title: "iPhone에 RYDN 설치하기",
      step1: "하단의 공유 아이콘을 누르세요",
      step2: "그런 다음 ‘홈 화면에 추가’를 선택하세요",
      dismiss: "알겠어요",
    },
    matchmaker: {
      cta: "내게 맞는 어드바이저 찾기",
      ctaTagline: "누구를 골라야 할지 모르겠나요? 우리의 AI 도우미가 30초 만에 적합한 RYDN 어드바이저를 찾아드려요.",
      title: "어드바이저 찾기",
      subtitle: "무엇을 탐색 중인지 알려주시면, 적합한 RYDN 어드바이저를 매칭해드려요.",
      placeholder: "답을 입력하세요…",
      send: "보내기",
      thinking: "생각 중…",
      welcome: "안녕하세요 👋 RYDN 어드바이저를 찾는 걸 도와드릴게요. 지금 무엇을 탐색 중이신가요 — 과목, 시험, 또는 진로?",
      reset: "다시 시작",
      error: "문제가 발생했어요. 잠시 후 다시 시도해 주세요.",
      bookButton: "예약하기",
      close: "닫기",
      poweredBy: "Cloudflare AI의 Llama 기반",
      generalTitle: "RYDN에게 물어보기",
      generalSubtitle: "워크숍, 상담, 후원에 관한 빠른 답변.",
      generalWelcome: "안녕하세요 👋 RYDN에 관한 질문에 답해드릴 수 있어요 — 워크숍, 상담, 후원, 사이트 관련 무엇이든요. 어떤 도움이 필요하세요?",
      generalCta: "AI에게 묻기",
    },
    language: {
      chooseLanguage: "언어를 선택하세요",
    },
  },

  // =====================================================================
  // ARABIC (ar) — partial. Modern Standard Arabic. The rest falls back
  // to English until a native speaker contributes the remaining strings.
  // =====================================================================
  ar: {
    nav: {
      home: "الرئيسية",
      about: "من نحن",
      ourTeam: "فريقنا",
      becomeAdvisor: "كن مرشدًا",
      workshops: "ورش العمل",
      stories: "قصص الطلاب",
      blog: "المدونة",
      support: "ادعمنا",
      supportShort: "ادعم",
      bookNow: "احجز مرشدًا",
      bookNowShort: "احجز",
    },
    hero: {
      eyebrow: "إرشاد مجاني لكل طالب",
      titleLine1: "إرشاد",
      titleLine2: "يغيّر المسارات.",
      subhead:
        "نربط الطلاب حول العالم بأفضل الجامعات الكندية. جلسات فردية مجانية مع طلاب جامعيين يسبقونك بسنتين أو ثلاث فقط — قبل القرارات التي تغيّر حياتك.",
      ctaPrimary: "ابحث عن مرشد",
      ctaSecondary: "اعرف المزيد",
      trustNonprofit: "منظمة كندية غير ربحية",
      trustFree: "مجاني 100% للطلاب",
      trustMultilingual: "دعم متعدد اللغات",
    },
    language: {
      chooseLanguage: "اختر لغتك",
    },
  },

  // =====================================================================
  // URDU (ur) — partial. Nastaliq script, RTL. The rest falls back to English.
  // =====================================================================
  ur: {
    nav: {
      home: "ہوم",
      about: "ہمارے بارے میں",
      ourTeam: "ہماری ٹیم",
      becomeAdvisor: "مشیر بنیں",
      workshops: "ورکشاپس",
      stories: "طلباء کی کہانیاں",
      blog: "بلاگ",
      support: "ہماری مدد کریں",
      supportShort: "مدد",
      bookNow: "مشیر بُک کریں",
      bookNowShort: "بُک",
    },
    hero: {
      eyebrow: "ہر طالبعلم کے لیے مفت مشاورت",
      titleLine1: "ایسی مشاورت جو",
      titleLine2: "راستے بدل دے۔",
      subhead:
        "دنیا بھر کے طلباء کو کینیڈا کی بہترین یونیورسٹیوں سے جوڑنا۔ صرف 2–3 سال آگے کے یونیورسٹی طلباء کے ساتھ مفت ون آن ون سیشنز — زندگی بدلنے والے فیصلوں سے پہلے۔",
      ctaPrimary: "مشیر تلاش کریں",
      ctaSecondary: "مزید جانیں",
      trustNonprofit: "کینیڈین غیر منافع بخش ادارہ",
      trustFree: "طلباء کے لیے 100% مفت",
      trustMultilingual: "کثیر لسانی معاونت",
    },
    language: {
      chooseLanguage: "اپنی زبان منتخب کریں",
    },
  },

  // =====================================================================
  // PUNJABI (pa) — partial. Gurmukhi script, LTR. The rest falls back to English.
  // =====================================================================
  pa: {
    nav: {
      home: "ਮੁੱਖ ਪੰਨਾ",
      about: "ਸਾਡੇ ਬਾਰੇ",
      ourTeam: "ਸਾਡੀ ਟੀਮ",
      becomeAdvisor: "ਸਲਾਹਕਾਰ ਬਣੋ",
      workshops: "ਵਰਕਸ਼ਾਪਸ",
      stories: "ਵਿਦਿਆਰਥੀਆਂ ਦੀਆਂ ਕਹਾਣੀਆਂ",
      blog: "ਬਲੌਗ",
      support: "ਸਾਡੀ ਸਹਾਇਤਾ ਕਰੋ",
      supportShort: "ਸਹਾਇਤਾ",
      bookNow: "ਸਲਾਹਕਾਰ ਬੁੱਕ ਕਰੋ",
      bookNowShort: "ਬੁੱਕ",
    },
    hero: {
      eyebrow: "ਹਰ ਵਿਦਿਆਰਥੀ ਲਈ ਮੁਫ਼ਤ ਸਲਾਹ",
      titleLine1: "ਉਹ ਸਲਾਹ ਜੋ",
      titleLine2: "ਰਾਹ ਬਦਲੇ।",
      subhead:
        "ਦੁਨੀਆ ਭਰ ਦੇ ਵਿਦਿਆਰਥੀਆਂ ਨੂੰ ਕੈਨੇਡਾ ਦੀਆਂ ਪ੍ਰਮੁੱਖ ਯੂਨੀਵਰਸਿਟੀਆਂ ਨਾਲ ਜੋੜਨਾ। ਜੀਵਨ ਬਦਲਣ ਵਾਲੇ ਫੈਸਲੇ ਲੈਣ ਤੋਂ ਪਹਿਲਾਂ, ਤੁਹਾਡੇ ਤੋਂ ਸਿਰਫ਼ 2–3 ਸਾਲ ਅੱਗੇ ਦੇ ਯੂਨੀਵਰਸਿਟੀ ਵਿਦਿਆਰਥੀਆਂ ਨਾਲ ਮੁਫ਼ਤ ਇੱਕ-ਨਾਲ-ਇੱਕ ਸੈਸ਼ਨ।",
      ctaPrimary: "ਸਲਾਹਕਾਰ ਲੱਭੋ",
      ctaSecondary: "ਹੋਰ ਜਾਣੋ",
      trustNonprofit: "ਕੈਨੇਡੀਅਨ ਗ਼ੈਰ-ਮੁਨਾਫ਼ਾ ਸੰਸਥਾ",
      trustFree: "ਵਿਦਿਆਰਥੀਆਂ ਲਈ 100% ਮੁਫ਼ਤ",
      trustMultilingual: "ਬਹੁ-ਭਾਸ਼ਾਈ ਸਹਾਇਤਾ",
    },
    language: {
      chooseLanguage: "ਆਪਣੀ ਭਾਸ਼ਾ ਚੁਣੋ",
    },
  },
}
