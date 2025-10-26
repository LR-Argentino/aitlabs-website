import { Injectable, signal, computed } from '@angular/core';
import { SupportedLanguage, LanguageConfig } from '../models/translation.model';

// Alias for backward compatibility
export type Language = SupportedLanguage;

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  private readonly STORAGE_KEY = 'aitlabs-language';
  private readonly DEFAULT_LANGUAGE: SupportedLanguage = 'en';

  // Available languages
  readonly availableLanguages: LanguageConfig[] = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  ];

  // Current language signal
  private readonly _currentLanguage = signal<SupportedLanguage>(this.DEFAULT_LANGUAGE);

  // Public readonly computed for current language
  readonly currentLanguage = computed(() => this._currentLanguage());

  // Current language config
  readonly currentLanguageConfig = computed(
    () =>
      this.availableLanguages.find((lang) => lang.code === this.currentLanguage()) ||
      this.availableLanguages[0],
  );

  constructor() {
    this.initializeLanguage();
  }

  /**
   * Initialize language on service creation
   * Priority: localStorage > browser language > default
   */
  private initializeLanguage(): void {
    try {
      // 1. Check localStorage for saved preference
      const storedLanguage = localStorage.getItem(this.STORAGE_KEY) as SupportedLanguage | null;

      if (storedLanguage && this.isValidLanguage(storedLanguage)) {
        this._currentLanguage.set(storedLanguage);
        document.documentElement.lang = storedLanguage;
        return;
      }

      // 2. Detect from browser language
      const detectedLanguage = this.detectLanguageFromBrowser();
      this.setLanguage(detectedLanguage);
    } catch (error) {
      // Fallback to default language on any error
      console.error('Language initialization error:', error);
      this.setLanguage(this.DEFAULT_LANGUAGE);
    }
  }

  /**
   * Detect language from browser settings
   * Checks navigator.language for language code
   */
  private detectLanguageFromBrowser(): SupportedLanguage {
    try {
      // Get browser language (e.g., "de-DE", "en-US")
      const browserLang = navigator.language || (navigator as any).userLanguage;

      if (browserLang) {
        // Extract language code (e.g., "de" from "de-DE")
        const langCode = browserLang.toLowerCase().split('-')[0];

        // Check if detected language is supported
        if (this.isValidLanguage(langCode)) {
          return langCode as SupportedLanguage;
        }
      }
    } catch (error) {
      console.error('Browser language detection error:', error);
    }

    return this.DEFAULT_LANGUAGE;
  }

  private isValidLanguage(lang: string): lang is SupportedLanguage {
    return this.availableLanguages.some((l) => l.code === lang);
  }

  setLanguage(language: SupportedLanguage): void {
    if (!this.isValidLanguage(language)) {
      console.warn(`Invalid language: ${language}`);
      return;
    }

    this._currentLanguage.set(language);
    localStorage.setItem(this.STORAGE_KEY, language);

    // Update document language attribute
    document.documentElement.lang = language;

    console.log(`Language changed to: ${language}`);
  }

  toggleLanguage(): void {
    const current = this.currentLanguage();
    const newLanguage = current === 'en' ? 'de' : 'en';
    this.setLanguage(newLanguage);
  }

  // Get translation key helper (for future use with translation files)
  getTranslationKey(key: string): string {
    return `${this.currentLanguage()}.${key}`;
  }
}
