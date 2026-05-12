// All site translations live here. To add a new language, copy the `en` block,
// translate the strings, and add the new language to LANGUAGES below.

export type Lang = "en" | "fr" | "es" | "fa" | "he"

// Right-to-left languages. The LanguageProvider sets the html dir attribute
// based on this list.
export const RTL_LANGS: Lang[] = ["fa", "he"]

export const LANGUAGES: { code: Lang; native: string; english: string }[] = [
  { code: "en", native: "English", english: "English" },
  { code: "fr", native: "Français", english: "French" },
  { code: "es", native: "Español", english: "Spanish" },
  { code: "fa", native: "فارسی", english: "Persian" },
  { code: "he", native: "עברית", english: "Hebrew" },
]

type Dict = {
  nav: {
    home: string
    about: string
    ourTeam: string
    becomeAdvisor: string
    workshops: string
    stories: string
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
  }
  language: {
    chooseLanguage: string
  }
}

export const TRANSLATIONS: Record<Lang, Dict> = {
  en: {
    nav: {
      home: "Home",
      about: "About",
      ourTeam: "Our Team",
      becomeAdvisor: "Become an Advisor",
      workshops: "Workshops",
      stories: "Stories",
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
        "Free 1-on-1 advising sessions with university students already on the path you're considering. Talk to someone only 2–3 years ahead of you — before making life-changing decisions.",
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
      poweredBy: "Powered by Claude AI",
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
        "Des séances de conseil gratuites en tête-à-tête avec des étudiants déjà sur la voie qui vous intéresse. Parlez à quelqu'un seulement 2 ou 3 ans plus avancé que vous — avant de prendre des décisions qui changent une vie.",
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
      poweredBy: "Propulsé par Claude AI",
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
        "Sesiones de asesoramiento gratuitas e individuales con estudiantes universitarios que ya están en el camino que estás considerando. Habla con alguien que solo está 2 o 3 años por delante de ti — antes de tomar decisiones que cambian la vida.",
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
      poweredBy: "Impulsado por Claude AI",
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
        "جلسات مشاوره فردی رایگان با دانشجویان دانشگاه که هم‌اکنون در مسیری هستند که شما در نظر دارید. با کسی صحبت کنید که تنها ۲ تا ۳ سال جلوتر از شماست — پیش از تصمیم‌گیری‌هایی که زندگی شما را تغییر می‌دهند.",
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
      poweredBy: "با کمک Claude AI",
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
        "פגישות ייעוץ פרטיות וחינמיות עם סטודנטים אוניברסיטאיים שכבר נמצאים בדרך שאתם שוקלים. דברו עם מישהו שרק 2-3 שנים לפניכם — לפני שתקבלו החלטות גורליות.",
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
      poweredBy: "מופעל על ידי Claude AI",
    },
    language: {
      chooseLanguage: "בחרו את השפה שלכם",
    },
  },
}
