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
    language: {
      chooseLanguage: "Elige tu idioma",
    },
  },
}
