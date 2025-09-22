import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  protected readonly servicesDropdownOpen = signal(false);
  protected readonly caseStudyDropdownOpen = signal(false);
  protected readonly projectsDropdownOpen = signal(false);
  protected readonly languageDropdownOpen = signal(false);

  toggleServicesDropdown() {
    this.servicesDropdownOpen.set(!this.servicesDropdownOpen());
    this.caseStudyDropdownOpen.set(false);
    this.projectsDropdownOpen.set(false);
    this.languageDropdownOpen.set(false);
  }

  toggleCaseStudyDropdown() {
    this.caseStudyDropdownOpen.set(!this.caseStudyDropdownOpen());
    this.servicesDropdownOpen.set(false);
    this.projectsDropdownOpen.set(false);
    this.languageDropdownOpen.set(false);
  }

  toggleProjectsDropdown() {
    this.projectsDropdownOpen.set(!this.projectsDropdownOpen());
    this.servicesDropdownOpen.set(false);
    this.caseStudyDropdownOpen.set(false);
    this.languageDropdownOpen.set(false);
  }

  toggleLanguageDropdown() {
    this.languageDropdownOpen.set(!this.languageDropdownOpen());
    this.servicesDropdownOpen.set(false);
    this.caseStudyDropdownOpen.set(false);
    this.projectsDropdownOpen.set(false);
  }

  closeAllDropdowns() {
    this.servicesDropdownOpen.set(false);
    this.caseStudyDropdownOpen.set(false);
    this.projectsDropdownOpen.set(false);
    this.languageDropdownOpen.set(false);
  }

  onContactClick() {
    // Scroll to footer contact form
    const footerElement = document.getElementById('contact-form');
    if (footerElement) {
      footerElement.scrollIntoView({ behavior: 'smooth' });
    }
  }
}