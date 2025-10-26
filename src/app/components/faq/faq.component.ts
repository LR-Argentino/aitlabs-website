import { Component, signal, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '../../core/pipes/translate.pipe';

interface FAQItem {
  id: number;
  questionKey: string;
  answerKey: string;
  isOpen: boolean;
}

@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [CommonModule, TranslatePipe],
  templateUrl: './faq.component.html',
  styleUrl: './faq.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FaqComponent {
  protected readonly faqItems = signal<FAQItem[]>([
    {
      id: 1,
      questionKey: 'faq.question1',
      answerKey: 'faq.answer1',
      isOpen: false,
    },
    {
      id: 2,
      questionKey: 'faq.question2',
      answerKey: 'faq.answer2',
      isOpen: false,
    },
    {
      id: 3,
      questionKey: 'faq.question3',
      answerKey: 'faq.answer3',
      isOpen: false,
    },
    {
      id: 4,
      questionKey: 'faq.question4',
      answerKey: 'faq.answer4',
      isOpen: false,
    },
    {
      id: 5,
      questionKey: 'faq.question5',
      answerKey: 'faq.answer5',
      isOpen: false,
    },
    {
      id: 6,
      questionKey: 'faq.question6',
      answerKey: 'faq.answer6',
      isOpen: false,
    },
  ]);

  toggleFAQ(id: number) {
    this.faqItems.update((items) =>
      items.map((item) => ({
        ...item,
        isOpen: item.id === id ? !item.isOpen : false,
      })),
    );
  }

  scrollToContact() {
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
      contactForm.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
