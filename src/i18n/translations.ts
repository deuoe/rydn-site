// All site translations live here. To add a new language, copy the `en` block,
// translate the strings, and add the new language to LANGUAGES below.

export type Lang = "en" | "fr" | "es"

export const LANGUAGES: { code: Lang; native: string; english: string }[] = [
  { code: "en", native: "English", english: "English" },
  { code: "fr", native: "Français", english: "French" },
  { code: "es", native: "Español", english: "Spanish" },
]

type Dict = {
  nav: {
    home: string
    about: string
    ourTeam: string
    becomeAdvisor: string
    workshops: string
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
      support: "Support Us",
      supportShort: "Support",
      bookNow: "Book a Mentor",
      bookNowShort: "Book",
    },
    hero: {
      eyebrow: "Free mentorship for every student",
      titleLine1: "Mentorship that",
      titleLine2: "changes paths.",
      subhead:
        "RYDN connects students with experienced mentors who help them explore their passions, navigate university, and unlock their potential — at no cost.",
      ctaPrimary: "Find a Mentor",
      ctaSecondary: "Learn More",
      trustNonprofit: "Canadian nonprofit",
      trustFree: "100% free for students",
      trustMultilingual: "Multilingual support",
    },
    mission: {
      eyebrow: "Our mission",
      line1: "Talent is everywhere.",
      line2: "Guidance isn't.",
      line3: "RYDN exists to close that gap — through mentorship, workshops, and academic support.",
    },
    testimonials: {
      eyebrow: "What students say",
      title: "Real students. Real outcomes.",
      subtitle: "Stories from the students and parents we've worked with.",
    },
    programs: {
      eyebrow: "What we offer",
      title: "Everything a student needs, in one place.",
      subtitle: "From one-on-one mentorship to bilingual workshops, we meet students where they are.",
      p1Title: "1-on-1 Mentorship",
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
    faq: {
      eyebrow: "Common questions",
      title: "Everything you wanted to ask",
      subtitle: "If your question isn't answered here, just send us an email.",
      q1: "Is RYDN really free?",
      a1: "Yes — every session, workshop, and resource is 100% free. RYDN is an incorporated Canadian nonprofit, supported by donors and volunteer mentors.",
      q2: "Who can use RYDN?",
      a2: "Any student in Canada can book sessions, from high school through university. We also welcome international students considering Canadian universities.",
      q3: "How do I book a session with a mentor?",
      a3: "Browse our advisors on the home page, click 'Book' on the mentor whose background matches your goals, and pick a time. You'll receive a calendar invite by email.",
      q4: "What can mentors actually help with?",
      a4: "University applications, MCAT/LSAT/DAT prep, choosing programs, study strategies, career questions, and personal direction. If they can't help, they'll point you to someone who can.",
      q5: "I'd like to become an advisor. How does that work?",
      a5: "Apply through our Become an Advisor page. Most mentors give just an hour or two a month and choose the topics they advise on.",
      q6: "Can our school or organization partner with RYDN?",
      a6: "Yes. We run workshops in schools, libraries, and community organizations across Canada. Reach out via the Partner With Us page and we'll set up a call.",
      cta: "Email us your question",
    },
    about: {
      eyebrow: "About RYDN",
      title: "Built by students, for students.",
      lede: "RYDN — RooZ Youth Development Network — is a Canadian nonprofit closing the guidance gap that holds talented young people back.",
      storyTitle: "Our story",
      storyP1: "Talent is everywhere; guidance isn't. We saw smart, driven students struggling to choose the right path — not because they lacked ability, but because they didn't have someone who'd recently walked it themselves.",
      storyP2: "RYDN was founded to fix that. We connect students directly to mentors who are a step or two ahead — relatable, accessible, free.",
      storyP3: "Today we serve students across Canada, run workshops with schools and libraries, and we're growing every month.",
      valuesTitle: "What we stand for",
      v1Title: "Always free",
      v1Body: "Mentorship and guidance shouldn't depend on who you know. Every session is free.",
      v2Title: "Relatable mentors",
      v2Body: "Our advisors are a step or two ahead of you on the same path — not decades removed.",
      v3Title: "Practical first",
      v3Body: "Real strategies, real timelines, real next steps — not vague advice.",
      v4Title: "Community-driven",
      v4Body: "We're not a company. We're students supporting students.",
      bilingualTitle: "Multilingual, Canadian-rooted.",
      bilingualBody: "RYDN / Réseau de développement de la jeunesse RooZ operates in English and French, with Spanish support and more languages coming. Based in Richmond Hill, Ontario.",
      ctaTitle: "Ready to start?",
      ctaButton: "Find a mentor",
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
        "RYDN met en relation les étudiants avec des mentors expérimentés qui les aident à explorer leurs passions, à naviguer à l'université et à révéler leur potentiel — gratuitement.",
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
        "RYDN conecta a los estudiantes con mentores experimentados que los ayudan a explorar sus pasiones, navegar la universidad y desbloquear su potencial — sin costo alguno.",
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
    language: {
      chooseLanguage: "Elige tu idioma",
    },
  },
}
