import { Component } from '@angular/core';

@Component({
  selector: 'app-projects',
  standalone: true,
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css'
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
}