import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-ai-voice-assistant',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './ai-voice-assistant.component.html',
  styleUrl: './ai-voice-assistant.component.css'
})
export class AiVoiceAssistantComponent {
  
  // Use cases data
  useCases = [
    {
      title: 'Terminplanung & Kalenderintegration',
      description: 'Kunden vereinbaren telefonisch Termine, ohne dass ein Mitarbeiter eingreifen muss.',
      details: 'Der Assistent prüft Kalender, schlägt freie Slots vor und sendet Bestätigungen per E-Mail.',
      icon: 'calendar'
    },
    {
      title: 'Automatisierte Kommunikation',
      description: 'Erstellung und Versand von E-Mails, Erinnerungen oder Meeting-Links.',
      details: 'Follow-ups nach Gesprächen erfolgen automatisch – keine verpassten Nachfassaktionen mehr.',
      icon: 'mail'
    },
    {
      title: 'Kundenservice & Hotline',
      description: 'Der Assistent beantwortet FAQs rund um Produkte, Rechnungen oder Lieferstatus.',
      details: 'Komplexere Fälle werden erkannt und gezielt an einen Mitarbeiter weitergeleitet.',
      icon: 'support'
    },
    {
      title: 'Interne Assistenz',
      description: 'Mitarbeiter starten Meetings, fragen Projektdaten ab oder setzen Erinnerungen – alles per Sprache.',
      details: '',
      icon: 'team'
    },
    {
      title: 'Multilinguale Unterstützung',
      description: 'Der Assistent spricht mehrere Sprachen und Dialekte, ideal für international tätige Unternehmen.',
      details: '',
      icon: 'globe'
    }
  ];

  // Benefits data
  benefits = [
    {
      title: '24/7 Erreichbarkeit',
      description: 'Kunden erhalten jederzeit Antworten, ohne Wartezeiten.',
      icon: 'clock'
    },
    {
      title: 'Effizienzsteigerung',
      description: 'Routineaufgaben entfallen, Mitarbeiter können sich auf wertschöpfende Tätigkeiten konzentrieren.',
      icon: 'efficiency'
    },
    {
      title: 'Kostensenkung',
      description: 'Weniger manuelle Arbeit im Backoffice und Kundenservice.',
      icon: 'cost'
    },
    {
      title: 'Konsistente Qualität',
      description: 'Gleichbleibend hohe Servicequalität, unabhängig von Uhrzeit oder Mitarbeiter.',
      icon: 'quality'
    },
    {
      title: 'Skalierbarkeit',
      description: 'Egal ob 100 oder 10.000 Anfragen pro Woche – der Assistent wächst mit.',
      icon: 'scale'
    },
    {
      title: 'Wettbewerbsvorteil',
      description: 'Frühzeitiger Einsatz von KI-Technologien stärkt Ihre Innovationskraft.',
      icon: 'advantage'
    }
  ];

  // Statistics data
  statistics = [
    {
      value: '40%',
      description: 'Zeitersparnis bei Terminorganisation'
    },
    {
      value: '25-30%',
      description: 'Kostensenkung im Kundenservice'
    },
    {
      value: '60%',
      description: 'weniger manuelle Koordination'
    }
  ];

  // Technical features
  technicalFeatures = [
    {
      title: 'Speech-to-Text (ASR)',
      description: 'Sprache wird zuverlässig in Text umgewandelt.',
      icon: 'microphone'
    },
    {
      title: 'Natural Language Understanding (NLU)',
      description: 'Die KI versteht, welche Absicht (Intent) und welche Informationen (Entities) im Satz enthalten sind.',
      icon: 'brain'
    },
    {
      title: 'Task-Orchestration',
      description: 'Der Assistent setzt die Anfrage in konkrete Aktionen um, z. B. Terminbuchungen, E-Mail-Versand oder CRM-Einträge.',
      icon: 'workflow'
    }
  ];

  // Security features
  securityFeatures = [
    'End-to-End-Verschlüsselung bei Sprach- und Datenübertragung',
    'DSGVO-Konformität: Speicherung nur auf europäischen Servern oder On-Premises möglich',
    'Rollen- und Rechteverwaltung: Zugriff nur für autorisierte Nutzer',
    'Audit-Logs & Monitoring: Nachvollziehbarkeit aller Aktionen',
    'Fehler- und Fallback-Handling: Bei Unsicherheiten wird nachgefragt oder an einen Menschen eskaliert'
  ];

  scrollToSection(sectionId: string) {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

  navigateToContact() {
    // Navigate to contact or booking section
    this.scrollToSection('contact');
  }
}