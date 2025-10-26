import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { LanguageService } from '../services/language.service';
import { TranslationService } from '../services/translation.service';
import { NavigationService } from '../services/navigation.service';
import { SupportedLanguage } from '../models/translation.model';

/**
 * Base component class providing common functionality for all components
 *
 * Benefits:
 * - Reduces code duplication across components
 * - Provides consistent service injection pattern
 * - Centralizes common utility methods
 * - Simplifies component development
 *
 * Usage:
 * ```typescript
 * export class MyComponent extends BaseComponent {
 *   constructor() {
 *     super();
 *   }
 *
 *   myMethod() {
 *     const text = this.translate('my.key');
 *     this.navigateTo('/path');
 *   }
 * }
 * ```
 */
export abstract class BaseComponent {
  // Protected service injections available to all child components
  protected readonly languageService = inject(LanguageService);
  protected readonly translationService = inject(TranslationService);
  protected readonly navigationService = inject(NavigationService);
  protected readonly router = inject(Router);

  /**
   * Get translated text for a key
   * @param key - Translation key (e.g., 'nav.home')
   * @returns Translated text or key if translation not found
   */
  protected translate(key: string): string {
    return this.translationService.translate(key);
  }

  /**
   * Get current language code
   * @returns Current language code ('en' | 'de')
   */
  get currentLanguage(): SupportedLanguage {
    return this.languageService.currentLanguage();
  }

  /**
   * Navigate to a route
   * @param path - Route path (e.g., '/ai-voice-assistant')
   * @returns Promise that resolves when navigation completes
   */
  protected navigateTo(path: string): Promise<boolean> {
    return this.router.navigate([path]);
  }

  /**
   * Navigate to a section on the page
   * @param sectionId - Section ID to scroll to
   * @param requiresHomePage - Whether navigation requires being on home page first
   */
  protected navigateToSection(sectionId: string, requiresHomePage: boolean = false): void {
    this.navigationService.navigateToSection(sectionId, requiresHomePage);
  }

  /**
   * Scroll to top of page
   */
  protected scrollToTop(): void {
    this.navigationService.scrollToTop();
  }

  /**
   * Switch language
   * @param language - Language code to switch to ('en' | 'de')
   */
  protected switchLanguage(language: SupportedLanguage): void {
    this.languageService.setLanguage(language);
  }
}
