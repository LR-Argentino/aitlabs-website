import { Injectable, computed, effect, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LanguageService, Language } from './language.service';
import { firstValueFrom } from 'rxjs';

// Type for translation JSON structure
type TranslationData = Record<string, string>;

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  private readonly translationCache = new Map<Language, TranslationData>();
  private readonly isInitialized = signal(false);
  private readonly currentTranslations = signal<TranslationData>({});

  constructor(
    private http: HttpClient,
    private languageService: LanguageService
  ) {
    // React to language changes and reload translations
    effect(() => {
      const currentLang = this.languageService.currentLanguage();
      this.loadTranslationsForLanguage(currentLang);
    });
  }

  /**
   * Initialize translations for the app startup
   * This should be called via APP_INITIALIZER
   */
  async initialize(): Promise<void> {
    const currentLang = this.languageService.currentLanguage();
    await this.loadTranslationsForLanguage(currentLang);
    this.isInitialized.set(true);
  }

  /**
   * Load translations for a specific language from JSON file
   */
  private async loadTranslationsForLanguage(language: Language): Promise<void> {
    // Check cache first
    if (this.translationCache.has(language)) {
      this.currentTranslations.set(this.translationCache.get(language)!);
      return;
    }

    // Load from JSON file
    try {
      const translationPath = `i18n/${language}.json`;
      const translations = await firstValueFrom(
        this.http.get<TranslationData>(translationPath)
      );

      // Validate loaded translations
      if (!translations || typeof translations !== 'object') {
        throw new Error(`Invalid translation data for language: ${language}`);
      }

      // Cache and set as current
      this.translationCache.set(language, translations);
      this.currentTranslations.set(translations);

      console.log(`Translations loaded for language: ${language} (${Object.keys(translations).length} keys)`);
    } catch (error) {
      console.error(`Failed to load translations for language: ${language}`, error);

      // Fallback: try loading English if we failed to load another language
      if (language !== 'en' && !this.translationCache.has('en')) {
        console.log('Attempting to load fallback English translations...');
        try {
          const fallbackTranslations = await firstValueFrom(
            this.http.get<TranslationData>('i18n/en.json')
          );
          this.translationCache.set('en', fallbackTranslations);
          this.currentTranslations.set(fallbackTranslations);
          console.log('Fallback English translations loaded successfully');
        } catch (fallbackError) {
          console.error('Failed to load fallback translations', fallbackError);
          // Set empty translations as last resort
          this.currentTranslations.set({});
        }
      } else if (this.translationCache.has('en')) {
        // Use cached English as fallback
        this.currentTranslations.set(this.translationCache.get('en')!);
      } else {
        // No fallback available
        this.currentTranslations.set({});
      }
    }
  }

  /**
   * Get translation for a key
   * Returns the key itself if translation is not found
   */
  translate(key: string): string {
    const translations = this.currentTranslations();

    // Return key if translations not loaded yet
    if (!this.isInitialized()) {
      return key;
    }

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

  /**
   * Get initialization status
   */
  initialized() {
    return this.isInitialized();
  }
}