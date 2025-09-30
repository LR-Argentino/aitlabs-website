import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contact-form-fallback',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './contact-form-fallback.component.html',
  styleUrl: './contact-form-fallback.component.css'
})
export class ContactFormFallbackComponent {
  openEmailComposer() {
    const subject = 'Free AI Consultation Request';
    const body = `Hi AIT LABS team,%0A%0AI would like to schedule a free 30-minute consultation to discuss how AI can help my business.%0A%0APlease let me know your available times.%0A%0ABest regards`;
    window.open(`mailto:office@ait-labs.com?subject=${subject}&body=${body}`, '_blank');
  }

  openWhatsApp() {
    const message = 'Hi AIT LABS, I would like to schedule a free consultation about AI solutions for my business.';
    window.open(`https://wa.me/41123456789?text=${encodeURIComponent(message)}`, '_blank');
  }
}
