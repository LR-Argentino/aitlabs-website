import { Component } from '@angular/core';
import { TranslatePipe } from '../../core/pipes/translate.pipe';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [TranslatePipe],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.css'
})
export class HeroComponent {
  onScheduleCall() {
    // Scroll to contact form
    const contactForm = document.getElementById('booking');
    if (contactForm) {
      contactForm.scrollIntoView({ behavior: 'smooth' });
    }
  }

  onViewCaseStudy() {
    // Scroll to case studies section
    const caseStudySection = document.getElementById('case-studies');
    if (caseStudySection) {
      caseStudySection.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
