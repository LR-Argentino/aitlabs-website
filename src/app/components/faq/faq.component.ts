import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

interface FAQItem {
  id: number;
  question: string;
  answer: string;
  isOpen: boolean;
}

@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './faq.component.html',
  styleUrl: './faq.component.css'
})
export class FaqComponent {
  protected readonly faqItems = signal<FAQItem[]>([
    {
      id: 1,
      question: 'What services does AIT LABS offer?',
      answer: 'We offer comprehensive digital solutions including UI/UX Design, Web Development, Logo & Branding, and AI Automation services. Our team specializes in creating modern, scalable, and user-friendly digital experiences.',
      isOpen: false
    },
    {
      id: 2,
      question: 'How long does a typical project take?',
      answer: 'Project timelines vary depending on complexity and scope. A simple website might take 2-4 weeks, while complex web applications can take 2-6 months. We provide detailed timelines during our initial consultation.',
      isOpen: false
    },
    {
      id: 3,
      question: 'Do you provide ongoing support after project completion?',
      answer: 'Yes! We offer comprehensive post-launch support including maintenance, updates, bug fixes, and feature enhancements. We believe in long-term partnerships with our clients.',
      isOpen: false
    },
    {
      id: 4,
      question: 'What is your pricing structure?',
      answer: 'Our pricing is project-based and depends on the scope, complexity, and timeline. We provide transparent quotes after understanding your requirements. Contact us for a free consultation and quote.',
      isOpen: false
    },
    {
      id: 5,
      question: 'Can you help with AI automation for my business?',
      answer: 'Absolutely! We specialize in AI automation solutions that can save you 20+ hours per week. We analyze your current processes and implement custom automation systems to streamline your operations.',
      isOpen: false
    },
    {
      id: 6,
      question: 'Do you work with international clients?',
      answer: 'Yes, we work with clients globally. We have experience serving clients in over 10 countries and are comfortable working across different time zones and cultural contexts.',
      isOpen: false
    }
  ]);

  toggleFAQ(id: number) {
    this.faqItems.update(items => 
      items.map(item => ({
        ...item,
        isOpen: item.id === id ? !item.isOpen : false
      }))
    );
  }

  scrollToContact() {
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
      contactForm.scrollIntoView({ behavior: 'smooth' });
    }
  }
}