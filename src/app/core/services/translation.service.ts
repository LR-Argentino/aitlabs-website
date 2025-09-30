import { Injectable, computed, effect, signal } from '@angular/core';
import { LanguageService, Language } from './language.service';

// Direct imports of translation files (bundled with app)
import enTranslations from '../../../assets/i18n/en.json';
import deTranslations from '../../../assets/i18n/de.json';

// Type for translation JSON structure
type TranslationData = Record<string, string>;

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  // Pre-loaded translations (no HTTP needed, bundled with app)
  private readonly translations: Record<Language, TranslationData> = {
    en: enTranslations as TranslationData,
    de: deTranslations as TranslationData
  };

  private readonly currentTranslations = signal<TranslationData>(enTranslations as TranslationData);

  constructor(private languageService: LanguageService) {
    // Initialize with current language
    this.loadTranslationsForLanguage(this.languageService.currentLanguage());

    // React to language changes
    effect(() => {
      const currentLang = this.languageService.currentLanguage();
      this.loadTranslationsForLanguage(currentLang);
    });
  }

  /**
   * Load translations for a specific language
   * Since translations are pre-loaded via imports, this is synchronous
   */
  private loadTranslationsForLanguage(language: Language): void {
    const translations = this.translations[language];

    if (translations) {
      this.currentTranslations.set(translations);
      console.log(`Translations loaded for language: ${language} (${Object.keys(translations).length} keys)`);
    } else {
      // Fallback to English if language not found
      console.warn(`Translation not found for language: ${language}, falling back to English`);
      this.currentTranslations.set(this.translations.en);
    }
  }

  /**
   * Get translation for a key
   * Returns the key itself if translation is not found
   */
  translate(key: string): string {
    const translations = this.currentTranslations();
    const translation = translations[key];

    // Warn about missing translations in development
    if (!translation && typeof ngDevMode !== 'undefined' && ngDevMode) {
      console.warn(`Translation missing for key: ${key}`);
    }

    return translation || key;
  }

  /**
   * Get translation as computed signal
   * Automatically updates when language changes
   */
  translateSignal(key: string) {
    return computed(() => this.translate(key));
  }

  /**
   * Check if translation exists for a key
   */
  hasTranslation(key: string): boolean {
    return !!this.currentTranslations()[key];
  }

  /**
   * Get all available translation keys
   */
  getAvailableKeys(): string[] {
    return Object.keys(this.currentTranslations());
  }
}