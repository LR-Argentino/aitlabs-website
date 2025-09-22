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
  
  // Mobile menu signals
  protected readonly mobileMenuOpen = signal(false);
  protected readonly mobileServicesDropdownOpen = signal(false);
  protected readonly mobileCaseStudyDropdownOpen = signal(false);
  protected readonly mobileLanguageDropdownOpen = signal(false);

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
    this.mobileMenuOpen.set(false);
    this.mobileServicesDropdownOpen.set(false);
    this.mobileCaseStudyDropdownOpen.set(false);
    this.mobileLanguageDropdownOpen.set(false);
    
    // Allow body scroll when closing mobile menu
    document.body.classList.remove('mobile-menu-open');
  }

  // Mobile menu methods
  toggleMobileMenu() {
    this.mobileMenuOpen.set(!this.mobileMenuOpen());
    
    // Control body scrolling
    if (this.mobileMenuOpen()) {
      // Close desktop dropdowns when mobile menu opens
      this.servicesDropdownOpen.set(false);
      this.caseStudyDropdownOpen.set(false);
      this.projectsDropdownOpen.set(false);
      this.languageDropdownOpen.set(false);
      
      // Prevent body scroll
      document.body.classList.add('mobile-menu-open');
    } else {
      // Allow body scroll
      document.body.classList.remove('mobile-menu-open');
    }
  }

  toggleMobileServicesDropdown() {
    this.mobileServicesDropdownOpen.set(!this.mobileServicesDropdownOpen());
    this.mobileCaseStudyDropdownOpen.set(false);
    this.mobileLanguageDropdownOpen.set(false);
  }

  toggleMobileCaseStudyDropdown() {
    this.mobileCaseStudyDropdownOpen.set(!this.mobileCaseStudyDropdownOpen());
    this.mobileServicesDropdownOpen.set(false);
    this.mobileLanguageDropdownOpen.set(false);
  }

  toggleMobileLanguageDropdown() {
    this.mobileLanguageDropdownOpen.set(!this.mobileLanguageDropdownOpen());
    this.mobileServicesDropdownOpen.set(false);
    this.mobileCaseStudyDropdownOpen.set(false);
  }

  navigateToSection(sectionId: string) {
    // Close mobile menu first
    this.mobileMenuOpen.set(false);
    this.mobileServicesDropdownOpen.set(false);
    this.mobileCaseStudyDropdownOpen.set(false);
    this.mobileLanguageDropdownOpen.set(false);
    
    // Allow body scroll when navigating
    document.body.classList.remove('mobile-menu-open');

    // Navigate to section
    let targetElement: HTMLElement | null = null;
    
    switch (sectionId) {
      case 'hero':
        // Scroll to top for hero section
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      case 'about':
        targetElement = document.getElementById('about');
        break;
      case 'projects':
        targetElement = document.getElementById('projects');
        break;
      case 'testimonials':
        targetElement = document.getElementById('testimonials');
        break;
      case 'faq':
        targetElement = document.getElementById('faq');
        break;
      case 'blog':
        // If blog section exists, scroll to it, otherwise scroll to top
        targetElement = document.getElementById('blog');
        if (!targetElement) {
          window.scrollTo({ top: 0, behavior: 'smooth' });
          return;
        }
        break;
      default:
        targetElement = document.getElementById(sectionId);
    }

    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  }

  onContactClick() {
    // Close mobile menu if open
    this.mobileMenuOpen.set(false);
    this.mobileServicesDropdownOpen.set(false);
    this.mobileCaseStudyDropdownOpen.set(false);
    this.mobileLanguageDropdownOpen.set(false);
    
    // Allow body scroll when navigating to contact
    document.body.classList.remove('mobile-menu-open');
    
    // Scroll to footer contact form
    const footerElement = document.getElementById('contact-form');
    if (footerElement) {
      footerElement.scrollIntoView({ behavior: 'smooth' });
    }
  }
}