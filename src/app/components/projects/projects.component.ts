import { Component, ChangeDetectionStrategy } from '@angular/core';
import { InProgressComponent } from '../in-progress/in-progress.component';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [InProgressComponent],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectsComponent {
  onProjectClick(projectName: string) {
    // Handle project click - could navigate to project detail page
    console.log(`Clicked on project: ${projectName}`);
    // For now, just scroll to contact form
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
      contactForm.scrollIntoView({ behavior: 'smooth' });
    }
  }

  onContactClick() {
    // Scroll to contact form or CTA section
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
      contactForm.scrollIntoView({ behavior: 'smooth' });
    } else {
      // Fallback: scroll to CTA section
      const ctaSection = document.querySelector('app-cta');
      if (ctaSection) {
        ctaSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }

  onLearnMoreClick() {
    // Scroll to about section
    const aboutSection = document.querySelector('app-about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  }
}