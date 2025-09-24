import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

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

  // Timeout reference for delayed closing
  private closeTimeout: any = null;
  private currentActiveDropdown: string | null = null;

  constructor(private router: Router) {}

  // Simplified hover methods for desktop dropdowns
  onDropdownEnter(dropdownType: string) {
    // Clear any existing timeout
    if (this.closeTimeout) {
      clearTimeout(this.closeTimeout);
      this.closeTimeout = null;
    }

    // Set the active dropdown
    this.currentActiveDropdown = dropdownType;

    // Close all dropdowns first
    this.servicesDropdownOpen.set(false);
    this.caseStudyDropdownOpen.set(false);
    this.projectsDropdownOpen.set(false);
    this.languageDropdownOpen.set(false);

    // Open the requested dropdown
    switch (dropdownType) {
      case 'services':
        this.servicesDropdownOpen.set(true);
        break;
      case 'casestudy':
        this.caseStudyDropdownOpen.set(true);
        break;
      case 'projects':
        this.projectsDropdownOpen.set(true);
        break;
      case 'language':
        this.languageDropdownOpen.set(true);
        break;
    }
  }

  // Delayed close method with longer timeout
  onDropdownLeave() {
    this.closeTimeout = setTimeout(() => {
      this.closeAllDropdowns();
      this.currentActiveDropdown = null;
    }, 300); // Increased to 300ms for more stability
  }

  // Keep individual hover methods for backward compatibility
  onServicesHover() {
    this.onDropdownEnter('services');
  }

  onCaseStudyHover() {
    this.onDropdownEnter('casestudy');
  }

  onProjectsHover() {
    this.onDropdownEnter('projects');
  }

  onLanguageHover() {
    this.onDropdownEnter('language');
  }

  // Keep toggle methods for mobile compatibility
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
    // Clear any pending timeout
    if (this.closeTimeout) {
      clearTimeout(this.closeTimeout);
      this.closeTimeout = null;
    }

    // Reset active dropdown
    this.currentActiveDropdown = null;

    // Close all desktop dropdowns
    this.servicesDropdownOpen.set(false);
    this.caseStudyDropdownOpen.set(false);
    this.projectsDropdownOpen.set(false);
    this.languageDropdownOpen.set(false);

    // Close all mobile dropdowns
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
    // Close all dropdowns first
    this.closeAllDropdowns();

    // Check if we're on the home page
    if (this.router.url !== '/') {
      // Navigate to home page first, then scroll to section
      this.router.navigate(['/']).then(() => {
        setTimeout(() => this.scrollToSection(sectionId), 100);
      });
      return;
    }

    this.scrollToSection(sectionId);
  }

  private scrollToSection(sectionId: string) {
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
      case 'services':
        // Services navigation leads to about section where services are described
        targetElement = document.getElementById('about');
        break;
      case 'projects':
        targetElement = document.getElementById('projects');
        break;
      case 'case-studies':
        // Case studies navigation leads to projects section
        targetElement = document.getElementById('projects');
        break;
      case 'testimonials':
        targetElement = document.getElementById('testimonials');
        break;
      case 'faq':
        targetElement = document.getElementById('faq');
        break;
      case 'booking':
        // If blog section exists, scroll to it, otherwise scroll to top
        targetElement = document.getElementById('booking');
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

  navigateToAiVoiceAssistant() {
    this.closeAllDropdowns();
    this.router.navigate(['/ai-voice-assistant']);
  }

  closeMobileMenu() {
    this.mobileMenuOpen.set(false);
    this.mobileServicesDropdownOpen.set(false);
    this.mobileCaseStudyDropdownOpen.set(false);
    this.mobileLanguageDropdownOpen.set(false);
    document.body.classList.remove('mobile-menu-open');
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
