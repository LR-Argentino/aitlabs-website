import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BaseComponent } from '../../core/base/base.component';

@Component({
  selector: 'app-ai-automations',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './ai-automations.component.html',
  styleUrl: './ai-automations.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AiAutomationsComponent extends BaseComponent {
  constructor() {
    super();
  }
  // Use cases data from the markdown content
  useCases = [
    {
      title: 'Automated Customer Communication',
      description: 'Emails are read, categorized, and answered automatically.',
      details: 'Chat messages and support tickets are prioritized and routed to the right team.',
      icon: 'mail',
    },
    {
      title: 'HR & Recruiting',
      description: 'Applications are automatically analyzed and sorted by defined criteria.',
      details: 'Candidates receive confirmations or invitations automatically – personalized.',
      icon: 'users',
    },
    {
      title: 'Finance & Back Office',
      description: 'Invoices are captured, validated, and transferred into ERP systems.',
      details: 'Expense reports are checked automatically, receipts validated.',
      icon: 'calculator',
    },
    {
      title: 'Monitoring & Alerts',
      description:
        'Systems monitor data streams, detect anomalies (fraud attempts, outliers, security risks), and trigger actions.',
      details: '',
      icon: 'shield',
    },
    {
      title: 'Workflow Automation',
      description:
        'Approval processes, contract sign-offs, employee onboarding – fully automated and documented.',
      details: '',
      icon: 'workflow',
    },
  ];

  // Benefits data
  benefits = [
    {
      title: 'Up to 70% Fewer Manual Tasks',
      description: 'In recurring processes through intelligent automation.',
      icon: 'efficiency',
    },
    {
      title: '24/7 Availability',
      description: 'Workflows run even at night and on weekends.',
      icon: 'clock',
    },
    {
      title: 'Error Reduction of up to 90%',
      description: 'Through standardized execution and AI validation.',
      icon: 'quality',
    },
    {
      title: 'Faster Response Times',
      description: 'Leading to happier customers and improved satisfaction.',
      icon: 'speed',
    },
    {
      title: 'Scalability',
      description: 'Automations grow with your business seamlessly.',
      icon: 'scale',
    },
    {
      title: 'ROI Within 6-12 Months',
      description: 'Many clients achieve payback within the first year.',
      icon: 'roi',
    },
  ];

  // Statistics data
  statistics = [
    {
      value: '70%',
      description: 'fewer manual tasks in recurring processes',
    },
    {
      value: '90%',
      description: 'error reduction through standardized execution',
    },
    {
      value: '24/7',
      description: 'availability - workflows never stop',
    },
  ];

  // How it works steps
  howItWorksSteps = [
    {
      title: 'Input Understanding',
      description: 'AI analyzes text, emails, documents, speech, or database entries.',
      icon: 'input',
    },
    {
      title: 'Decision Logic',
      description:
        'Based on AI models, RAG systems, or predefined rules, the system decides which action to take.',
      icon: 'brain',
    },
    {
      title: 'Execution',
      description:
        'Integration with existing systems (CRM, ERP, HR, Finance, Email, Slack, Teams, etc.) executes the tasks.',
      icon: 'execute',
    },
  ];

  // Security features
  securityFeatures = [
    'GDPR-compliant: Data processing in Europe or on-premises',
    'Encryption: All data is encrypted during transfer and storage',
    'Role & rights management: Only authorized employees gain access',
    'Audit logs: Every action is traceable and documented',
    'Fallback mechanisms: Unclear cases are escalated to human staff',
  ];

  // Real-world example data
  realWorldExample = {
    company: 'E-commerce Company',
    description: 'Implemented AI Automations for order and support processes',
    processes: [
      {
        title: 'Orders',
        description: 'Automatic payment validation, shipping label creation, and invoice dispatch.',
        icon: 'package',
      },
      {
        title: 'Support',
        description:
          'Emails with standard questions ("Where is my package?") are answered automatically.',
        icon: 'support',
      },
      {
        title: 'Returns',
        description:
          'Requests are detected, validated, and either approved automatically or escalated.',
        icon: 'return',
      },
    ],
    results: [
      {
        value: '40%',
        description: 'fewer support tickets for staff',
      },
      {
        value: '35%',
        description: 'shorter processing time per order',
      },
      {
        value: '+20%',
        description: 'customer satisfaction increase',
      },
    ],
  };

  // FAQ data
  faqs = [
    {
      question: 'Will AI replace all employees?',
      answer: 'No. AI automates routines – your staff focuses on complex, value-adding work.',
    },
    {
      question: 'What if the AI makes mistakes?',
      answer:
        'Automations include checkpoints and fallbacks. Uncertain cases are escalated to staff.',
    },
    {
      question: 'How long does implementation take?',
      answer:
        'Initial processes can often be automated in 2–4 weeks. More complex workflows follow step by step.',
    },
    {
      question: 'Can the system connect to my existing tools?',
      answer:
        'Yes. Through APIs, integrations & webhooks, we connect with Salesforce, HubSpot, SAP, Microsoft, Google Workspace, Slack, and many more.',
    },
  ];

  scrollToSection(sectionId: string) {
    super.navigateToSection(sectionId, false);
  }

  navigateToContact() {
    // Navigate to contact or booking section
    this.scrollToSection('contact');
  }
}
