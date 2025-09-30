import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';

export interface NavigationTarget {
  sectionId: string;
  fallbackToTop?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  private router = inject(Router);

  /**
   * Navigate to a section on the current page or home page
   * @param sectionId - The ID of the target section
   * @param requiresHomePage - Whether navigation requires being on home page first
   */
  navigateToSection(sectionId: string, requiresHomePage: boolean = false): void {
    if (requiresHomePage && this.router.url !== '/') {
      // Navigate to home page first, then scroll
      this.router.navigate(['/']).then(() => {
        setTimeout(() => this.scrollToSection(sectionId), 100);
      });
      return;
    }

    this.scrollToSection(sectionId);
  }

  /**
   * Scroll to a section by ID with smooth behavior
   * @param sectionId - The ID of the target section
   */
  private scrollToSection(sectionId: string): void {
    const targetElement = this.resolveSectionElement(sectionId);

    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  }

  /**
   * Resolve section ID to actual DOM element
   * Handles special cases and aliases
   */
  private resolveSectionElement(sectionId: string): HTMLElement | null {
    // Special case: hero section scrolls to top
    if (sectionId === 'hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return null;
    }

    // Map aliases to actual section IDs
    const sectionMap: Record<string, string> = {
      'services': 'about',        // Services -> About section
      'case-studies': 'projects', // Case studies -> Projects section
      'blog': 'blog',             // Blog (fallback to top if not found)
      'booking': 'booking'        // Booking section
    };

    const targetId = sectionMap[sectionId] || sectionId;
    const element = document.getElementById(targetId);

    // Fallback to top for missing optional sections
    if (!element && (sectionId === 'blog' || sectionId === 'booking')) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return null;
    }

    return element;
  }

  /**
   * Scroll to top of page
   */
  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
