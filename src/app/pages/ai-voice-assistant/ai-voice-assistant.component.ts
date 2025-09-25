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
      title: 'Scheduling & Calendar Integration',
      description: 'Customers book appointments over the phone without human intervention.',
      details: 'The assistant checks availability, proposes free slots, and sends confirmations.',
      icon: 'calendar'
    },
    {
      title: 'Automated Communication',
      description: 'Generates and sends emails, reminders, or meeting links.',
      details: 'Ensures follow-ups happen automatically – no more missed outreach.',
      icon: 'mail'
    },
    {
      title: 'Customer Support & Hotlines',
      description: 'Handles FAQs on invoices, delivery status, or product info.',
      details: 'Escalates complex cases directly to human staff.',
      icon: 'support'
    },
    {
      title: 'Internal Assistance',
      description: 'Employees launch meetings, query project data, or set reminders – all by voice.',
      details: '',
      icon: 'team'
    },
    {
      title: 'Multilingual Support',
      description: 'Speaks multiple languages and accents, ideal for international businesses.',
      details: '',
      icon: 'globe'
    }
  ];

  // Benefits data
  benefits = [
    {
      title: '24/7 Availability',
      description: 'Customers get answers anytime, without waiting.',
      icon: 'clock'
    },
    {
      title: 'Efficiency Gains',
      description: 'Routine tasks are automated, freeing employees for higher-value work.',
      icon: 'efficiency'
    },
    {
      title: 'Cost Reduction',
      description: 'Lower back-office and support expenses.',
      icon: 'cost'
    },
    {
      title: 'Consistent Quality',
      description: 'Reliable service regardless of time or workload.',
      icon: 'quality'
    },
    {
      title: 'Scalability',
      description: 'Handles 100 or 10,000 interactions per week seamlessly.',
      icon: 'scale'
    },
    {
      title: 'Competitive Edge',
      description: 'Early adoption of AI builds your innovation profile.',
      icon: 'advantage'
    }
  ];

  // Statistics data
  statistics = [
    {
      value: '40%',
      description: 'time savings on scheduling tasks'
    },
    {
      value: '25-30%',
      description: 'cost reduction in customer service'
    },
    {
      value: '60%',
      description: 'less manual coordination'
    }
  ];

  // Technical features
  technicalFeatures = [
    {
      title: 'Speech-to-Text (ASR)',
      description: 'Converts spoken words into text.',
      icon: 'microphone'
    },
    {
      title: 'Natural Language Understanding (NLU)',
      description: 'Detects intent and extracts key information.',
      icon: 'brain'
    },
    {
      title: 'Task Orchestration',
      description: 'Translates requests into actions such as booking meetings, sending emails, or updating a CRM.',
      icon: 'workflow'
    }
  ];

  // Security features
  securityFeatures = [
    'End-to-end encryption for all voice and data transmissions',
    'GDPR compliance: storage on European servers or on-premises',
    'Role-based access control to protect sensitive information',
    'Audit logs & monitoring for full transparency',
    'Error handling & fallbacks: if uncertain, the assistant asks clarifying questions or escalates to a human agent'
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
