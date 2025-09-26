import { Injectable, computed } from '@angular/core';
import { LanguageService, Language } from './language.service';

interface Translations {
  [key: string]: {
    en: string;
    de: string;
  };
}

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  private readonly translations: Translations = {
    // Header Navigation
    'nav.home': {
      en: 'Home',
      de: 'Startseite'
    },
    'nav.service': {
      en: 'Service',
      de: 'Service'
    },
    'nav.projects': {
      en: 'Our Projects',
      de: 'Unsere Projekte'
    },
    'nav.booking': {
      en: 'Book a Meeting',
      de: 'Termin buchen'
    },
    'nav.faq': {
      en: 'FAQ',
      de: 'FAQ'
    },
    'nav.about': {
      en: 'About Us',
      de: 'Über uns'
    },
    'nav.contact': {
      en: 'Contact Us',
      de: 'Kontakt'
    },

    // Language Dropdown
    'lang.english': {
      en: 'English',
      de: 'Englisch'
    },
    'lang.german': {
      en: 'German',
      de: 'Deutsch'
    },

    // Booking Section
    'booking.badge': {
      en: 'Book a Call',
      de: 'Anruf buchen'
    },
    'booking.title': {
      en: 'Book a free discovery call',
      de: 'Buchen Sie ein kostenloses Beratungsgespräch'
    },
    'booking.subtitle': {
      en: 'Choose a time that suits you and start your AI journey with us.',
      de: 'Wählen Sie eine passende Zeit und starten Sie Ihre KI-Reise mit uns.'
    },
    'booking.loading': {
      en: 'Loading calendar...',
      de: 'Kalender wird geladen...'
    },
    'booking.loading.subtitle': {
      en: 'Please wait while we prepare your booking experience',
      de: 'Bitte warten Sie, während wir Ihr Buchungserlebnis vorbereiten'
    },
    'booking.error.title': {
      en: 'Calendar temporarily unavailable',
      de: 'Kalender vorübergehend nicht verfügbar'
    },
    'booking.error.subtitle': {
      en: 'Please use one of the options below to schedule your consultation.',
      de: 'Bitte nutzen Sie eine der folgenden Optionen, um Ihre Beratung zu planen.'
    },
    'booking.error.open_calendar': {
      en: 'Open Calendar',
      de: 'Kalender öffnen'
    },
    'booking.error.send_email': {
      en: 'Send Email',
      de: 'E-Mail senden'
    },
    'booking.info.duration': {
      en: '30 Minutes',
      de: '30 Minuten'
    },
    'booking.info.duration_desc': {
      en: 'Free consultation',
      de: 'Kostenlose Beratung'
    },
    'booking.info.video_call': {
      en: 'Video Call',
      de: 'Videoanruf'
    },
    'booking.info.video_call_desc': {
      en: 'Google Meet',
      de: 'Google Meet'
    },
    'booking.info.flexible': {
      en: 'Flexible',
      de: 'Flexibel'
    },
    'booking.info.flexible_desc': {
      en: 'Your timezone',
      de: 'Ihre Zeitzone'
    },

    // Hero Section
    'hero.badge': {
      en: 'Bigger Strategy, Bigger Reach',
      de: 'Größere Strategie, Größere Reichweite'
    },
    'hero.title': {
      en: 'How to Get 20+ Hours Back Every Week Without Hiring More Staff',
      de: 'Wie Sie 20+ Stunden pro Woche zurückgewinnen, ohne mehr Personal einzustellen'
    },
    'hero.subtitle': {
      en: 'The Automation System That Turns Your Biggest Time-Wasters Into Your Biggest Advantages',
      de: 'Das Automatisierungssystem, das Ihre größten Zeitverschwender in Ihre größten Vorteile verwandelt'
    },
    'hero.cta.primary': {
      en: 'Book your AI Audit',
      de: 'Buchen Sie Ihr KI-Audit'
    },
    'hero.cta.secondary': {
      en: 'Learn More',
      de: 'Mehr erfahren'
    },



    // Services Section
    'services.badge': {
      en: 'Our Services',
      de: 'Unsere Services'
    },
    'services.title': {
      en: 'Transforming Ideas Into Digital Experiences',
      de: 'Ideen in digitale Erfahrungen verwandeln'
    },
    'services.subtitle': {
      en: 'We provide end-to-end AI technology solutions that help businesses grow, engage customers, and stay ahead in the digital era.',
      de: 'Wir bieten umfassende KI-Technologielösungen, die Unternehmen beim Wachstum helfen, Kunden einbinden und im digitalen Zeitalter die Nase vorn behalten.'
    },
    'services.voice_assistant.title': {
      en: 'AI Voice Assistant',
      de: 'KI-Sprachassistent'
    },
    'services.voice_assistant.description': {
      en: 'Intelligent voice solutions that understand, respond, and automate customer interactions with natural conversation flows.',
      de: 'Intelligente Sprachlösungen, die Kundeninteraktionen mit natürlichen Gesprächsabläufen verstehen, darauf reagieren und automatisieren.'
    },
    'services.automations.title': {
      en: 'AI Automations',
      de: 'KI-Automatisierungen'
    },
    'services.automations.description': {
      en: 'Smart automation systems that streamline workflows, reduce manual tasks, and boost productivity by 95%.',
      de: 'Intelligente Automatisierungssysteme, die Arbeitsabläufe optimieren, manuelle Aufgaben reduzieren und die Produktivität um 95% steigern.'
    },
    'services.applications.title': {
      en: 'AI Applications',
      de: 'KI-Anwendungen'
    },
    'services.applications.description': {
      en: 'Custom AI-powered applications tailored to your business needs, from web platforms to mobile solutions.',
      de: 'Maßgeschneiderte KI-gestützte Anwendungen, die auf Ihre Geschäftsanforderungen zugeschnitten sind, von Webplattformen bis hin zu mobilen Lösungen.'
    },
    'services.document_processing.title': {
      en: 'Intelligence Document Processing',
      de: 'Intelligente Dokumentenverarbeitung'
    },
    'services.document_processing.description': {
      en: 'Advanced AI systems that extract, analyze, and process documents automatically, turning paperwork into actionable insights.',
      de: 'Fortschrittliche KI-Systeme, die Dokumente automatisch extrahieren, analysieren und verarbeiten und Papierkram in umsetzbare Erkenntnisse verwandeln.'
    },
    'services.read_more': {
      en: 'Read More',
      de: 'Mehr lesen'
    },

    // Projects Section
    'projects.badge': {
      en: 'Our Work',
      de: 'Unsere Arbeit'
    },
    'projects.title': {
      en: 'Success Stories',
      de: 'Erfolgsgeschichten'
    },
    'projects.subtitle': {
      en: 'Discover how we have helped businesses transform with AI.',
      de: 'Entdecken Sie, wie wir Unternehmen bei der Transformation mit KI geholfen haben.'
    },

    // Testimonials Section
    'testimonials.badge': {
      en: 'Testimonials',
      de: 'Referenzen'
    },
    'testimonials.title': {
      en: 'What Our Clients Say',
      de: 'Was unsere Kunden sagen'
    },
    'testimonials.subtitle': {
      en: 'Hear from businesses that have transformed with our AI solutions.',
      de: 'Hören Sie von Unternehmen, die sich mit unseren KI-Lösungen transformiert haben.'
    },

    // About Section
    'about.badge': {
      en: 'About Us',
      de: 'Über uns'
    },
    'about.title_line1': {
      en: 'Pioneering the Future',
      de: 'Die Zukunft gestalten'
    },
    'about.title_line2': {
      en: 'of AI Innovation',
      de: 'der KI-Innovation'
    },
    'about.description': {
      en: 'At AIT LABS, we are dedicated to transforming businesses through cutting-edge artificial intelligence solutions. Our team of experts combines deep technical knowledge with innovative thinking to deliver AI systems that drive real results.',
      de: 'Bei AIT LABS sind wir darauf spezialisiert, Unternehmen durch modernste Lösungen der künstlichen Intelligenz zu transformieren. Unser Expertenteam kombiniert tiefes technisches Wissen mit innovativem Denken, um KI-Systeme zu liefern, die echte Ergebnisse erzielen.'
    },
    'about.feature1.title': {
      en: 'Innovative Solutions',
      de: 'Innovative Lösungen'
    },
    'about.feature1.description': {
      en: 'We develop custom AI solutions tailored to your specific business needs and challenges.',
      de: 'Wir entwickeln maßgeschneiderte KI-Lösungen, die auf Ihre spezifischen Geschäftsanforderungen und Herausforderungen zugeschnitten sind.'
    },
    'about.feature2.title': {
      en: 'Cutting-Edge Technology',
      de: 'Modernste Technologie'
    },
    'about.feature2.description': {
      en: 'Our team stays at the forefront of AI advancements to bring you the latest innovations.',
      de: 'Unser Team bleibt an der Spitze der KI-Entwicklungen, um Ihnen die neuesten Innovationen zu bringen.'
    },
    'about.feature3.title': {
      en: 'Customer-Centric Excellence',
      de: 'Kundenorientierte Exzellenz'
    },
    'about.feature3.description': {
      en: 'We prioritize your success with dedicated support and continuous optimization.',
      de: 'Wir priorisieren Ihren Erfolg mit engagiertem Support und kontinuierlicher Optimierung.'
    },
    'about.feature4.title': {
      en: 'Collaborative Partnership',
      de: 'Kollaborative Partnerschaft'
    },
    'about.feature4.description': {
      en: 'We work closely with your team to ensure seamless integration and maximum impact.',
      de: 'Wir arbeiten eng mit Ihrem Team zusammen, um eine nahtlose Integration und maximale Wirkung zu gewährleisten.'
    },

    // FAQ Section
    'faq.badge': {
      en: 'FAQ',
      de: 'FAQ'
    },
    'faq.title': {
      en: 'Frequently Asked Questions',
      de: 'Häufig gestellte Fragen'
    },
    'faq.subtitle': {
      en: 'Find answers to common questions about our AI solutions and services.',
      de: 'Finden Sie Antworten auf häufige Fragen zu unseren KI-Lösungen und Dienstleistungen.'
    },
    'faq.question1': {
      en: 'What types of AI solutions do you offer?',
      de: 'Welche Arten von KI-Lösungen bieten Sie an?'
    },
    'faq.answer1': {
      en: 'We offer a comprehensive range of AI solutions including voice assistants, automation systems, custom AI applications, and intelligent document processing. Each solution is tailored to meet your specific business needs and objectives.',
      de: 'Wir bieten eine umfassende Palette von KI-Lösungen an, einschließlich Sprachassistenten, Automatisierungssystemen, maßgeschneiderten KI-Anwendungen und intelligenter Dokumentenverarbeitung. Jede Lösung wird auf Ihre spezifischen Geschäftsanforderungen und Ziele zugeschnitten.'
    },
    'faq.question2': {
      en: 'How long does it take to implement an AI solution?',
      de: 'Wie lange dauert es, eine KI-Lösung zu implementieren?'
    },
    'faq.answer2': {
      en: 'Implementation timelines vary depending on the complexity and scope of the project. Simple automation solutions can be deployed in 2-4 weeks, while more complex custom applications may take 2-6 months. We provide detailed project timelines during our initial consultation.',
      de: 'Die Implementierungszeiten variieren je nach Komplexität und Umfang des Projekts. Einfache Automatisierungslösungen können in 2-4 Wochen bereitgestellt werden, während komplexere maßgeschneiderte Anwendungen 2-6 Monate dauern können. Wir stellen detaillierte Projektzeitpläne während unserer ersten Beratung zur Verfügung.'
    },
    'faq.question3': {
      en: 'Do you provide ongoing support and maintenance?',
      de: 'Bieten Sie laufenden Support und Wartung an?'
    },
    'faq.answer3': {
      en: 'Yes, we offer comprehensive support and maintenance packages to ensure your AI solutions continue to perform optimally. This includes regular updates, performance monitoring, troubleshooting, and feature enhancements as needed.',
      de: 'Ja, wir bieten umfassende Support- und Wartungspakete an, um sicherzustellen, dass Ihre KI-Lösungen weiterhin optimal funktionieren. Dies umfasst regelmäßige Updates, Leistungsüberwachung, Fehlerbehebung und Funktionserweiterungen nach Bedarf.'
    },
    'faq.question4': {
      en: 'Can your AI solutions integrate with existing systems?',
      de: 'Können Ihre KI-Lösungen in bestehende Systeme integriert werden?'
    },
    'faq.answer4': {
      en: 'Absolutely! Our AI solutions are designed to seamlessly integrate with your existing business systems and workflows. We work closely with your IT team to ensure smooth integration without disrupting your current operations.',
      de: 'Absolut! Unsere KI-Lösungen sind darauf ausgelegt, nahtlos in Ihre bestehenden Geschäftssysteme und Arbeitsabläufe zu integrieren. Wir arbeiten eng mit Ihrem IT-Team zusammen, um eine reibungslose Integration ohne Störung Ihrer aktuellen Abläufe zu gewährleisten.'
    },
    'faq.question5': {
      en: 'What industries do you serve?',
      de: 'Welche Branchen bedienen Sie?'
    },
    'faq.answer5': {
      en: 'We serve a wide range of industries including healthcare, finance, retail, manufacturing, logistics, and professional services. Our AI solutions are adaptable and can be customized for virtually any industry or business vertical.',
      de: 'Wir bedienen eine breite Palette von Branchen, einschließlich Gesundheitswesen, Finanzen, Einzelhandel, Fertigung, Logistik und professionelle Dienstleistungen. Unsere KI-Lösungen sind anpassbar und können für praktisch jede Branche oder jeden Geschäftsbereich angepasst werden.'
    },
    'faq.question6': {
      en: 'How do you ensure data security and privacy?',
      de: 'Wie gewährleisten Sie Datensicherheit und Datenschutz?'
    },
    'faq.answer6': {
      en: 'Data security and privacy are our top priorities. We implement enterprise-grade security measures, comply with industry standards like GDPR and CCPA, use encrypted data transmission, and follow best practices for data handling and storage.',
      de: 'Datensicherheit und Datenschutz haben für uns höchste Priorität. Wir implementieren Sicherheitsmaßnahmen auf Unternehmensebene, halten Industriestandards wie GDPR und CCPA ein, verwenden verschlüsselte Datenübertragung und befolgen bewährte Praktiken für Datenhandhabung und -speicherung.'
    },

    // Footer Section
    'footer.company_description': {
      en: 'Empowering businesses through innovative digital solutions and AI automation.',
      de: 'Unternehmen durch innovative digitale Lösungen und KI-Automatisierung stärken.'
    },
    'footer.services_title': {
      en: 'Services',
      de: 'Dienstleistungen'
    },
    'footer.service_voice_assistant': {
      en: 'AI Voice Assistant',
      de: 'KI-Sprachassistent'
    },
    'footer.service_automations': {
      en: 'AI Automations',
      de: 'KI-Automatisierungen'
    },
    'footer.service_agents': {
      en: 'AI Agents',
      de: 'KI-Agenten'
    },
    'footer.service_document_processing': {
      en: 'Intelligence Document Processing',
      de: 'Intelligente Dokumentenverarbeitung'
    },
    'footer.company_title': {
      en: 'Company',
      de: 'Unternehmen'
    },
    'footer.about_us': {
      en: 'About Us',
      de: 'Über uns'
    },
    'footer.contact_title': {
      en: 'Get In Touch',
      de: 'Kontakt aufnehmen'
    },
    'footer.email_label': {
      en: 'Email Address',
      de: 'E-Mail-Adresse'
    },
    'footer.email_placeholder': {
      en: 'your@email.com',
      de: 'ihre@email.com'
    },
    'footer.message_label': {
      en: 'Message',
      de: 'Nachricht'
    },
    'footer.message_placeholder': {
      en: 'Tell us about your project...',
      de: 'Erzählen Sie uns von Ihrem Projekt...'
    },
    'footer.send_button': {
      en: 'Send Message',
      de: 'Nachricht senden'
    },
    'footer.sending_button': {
      en: 'Sending...',
      de: 'Wird gesendet...'
    },
    'footer.send_aria': {
      en: 'Send message',
      de: 'Nachricht senden'
    },
    'footer.sending_aria': {
      en: 'Sending message, please wait',
      de: 'Nachricht wird gesendet, bitte warten'
    },
    'footer.copyright': {
      en: '© 2024 AIT LABS. All rights reserved.',
      de: '© 2024 AIT LABS. Alle Rechte vorbehalten.'
    },
    'footer.privacy_policy': {
      en: 'Privacy Policy',
      de: 'Datenschutzerklärung'
    },
    'footer.terms_service': {
      en: 'Terms of Service',
      de: 'Nutzungsbedingungen'
    },
    'footer.cookie_policy': {
      en: 'Cookie Policy',
      de: 'Cookie-Richtlinie'
    },
    'footer.privacy_aria': {
      en: 'View Privacy Policy',
      de: 'Datenschutzerklärung anzeigen'
    },
    'footer.terms_aria': {
      en: 'View Terms of Service',
      de: 'Nutzungsbedingungen anzeigen'
    },
    'footer.cookies_aria': {
      en: 'View Cookie Policy',
      de: 'Cookie-Richtlinie anzeigen'
    },

    // Common
    'common.loading': {
      en: 'Loading...',
      de: 'Wird geladen...'
    },
    'common.error': {
      en: 'An error occurred',
      de: 'Ein Fehler ist aufgetreten'
    },
    'common.retry': {
      en: 'Retry',
      de: 'Wiederholen'
    },
    'common.close': {
      en: 'Close',
      de: 'Schließen'
    },
    'common.save': {
      en: 'Save',
      de: 'Speichern'
    },
    'common.cancel': {
      en: 'Cancel',
      de: 'Abbrechen'
    },
    'common.continue': {
      en: 'Continue',
      de: 'Weiter'
    },
    'common.back': {
      en: 'Back',
      de: 'Zurück'
    },
    'common.next': {
      en: 'Next',
      de: 'Weiter'
    },
    'common.previous': {
      en: 'Previous',
      de: 'Vorherige'
    },
    'common.submit': {
      en: 'Submit',
      de: 'Absenden'
    },
    'common.send': {
      en: 'Send',
      de: 'Senden'
    },
    'common.email': {
      en: 'Email',
      de: 'E-Mail'
    },
    'common.phone': {
      en: 'Phone',
      de: 'Telefon'
    },
    'common.address': {
      en: 'Address',
      de: 'Adresse'
    },
    'common.name': {
      en: 'Name',
      de: 'Name'
    },
    'common.message': {
      en: 'Message',
      de: 'Nachricht'
    }
  };

  constructor(private languageService: LanguageService) {}

  // Get translation for a key
  translate(key: string): string {
    const translation = this.translations[key];
    if (!translation) {
      console.warn(`Translation missing for key: ${key}`);
      return key;
    }

    const currentLang = this.languageService.currentLanguage();
    return translation[currentLang] || translation.en || key;
  }

  // Get translation as computed signal
  translateSignal(key: string) {
    return computed(() => this.translate(key));
  }

  // Check if translation exists
  hasTranslation(key: string): boolean {
    return !!this.translations[key];
  }

  // Get all available translation keys
  getAvailableKeys(): string[] {
    return Object.keys(this.translations);
  }

  // Add new translation (for dynamic content)
  addTranslation(key: string, translations: { en: string; de: string }): void {
    this.translations[key] = translations;
  }
}