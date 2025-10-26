import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-cta',
  standalone: true,
  templateUrl: './cta.component.html',
  styleUrl: './cta.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CtaComponent {
  onGetStarted() {
    // Scroll to contact form
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
      contactForm.scrollIntoView({ behavior: 'smooth' });
    }
  }

  onContactUs() {
    // Scroll to contact form
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
      contactForm.scrollIntoView({ behavior: 'smooth' });
    }
  }
}