import { Injectable, computed, effect, signal } from '@angular/core';
import { LanguageService, Language } from './language.service';
import { TranslationDictionary, SupportedLanguage } from '../models/translation.model';
import { ErrorLoggingService } from './error-logging.service';

// Direct imports of translation files (bundled with app)
import enTranslations from '../../../assets/i18n/en.json';
import deTranslations from '../../../assets/i18n/de.json';

@Injectable({
  providedIn: 'root',
})
export class TranslationService {
  // Translation cache using Map for O(1) lookups
  private readonly translationCache = new Map<SupportedLanguage, TranslationDictionary>();

  // Loading state signals
  private readonly isLoading = signal<boolean>(false);
  private readonly loadingError = signal<string | null>(null);

  // Current translations signal (reactive)
  private readonly currentTranslations = signal<TranslationDictionary>(
    enTranslations as TranslationDictionary,
  );

  // Public readonly accessors for loading states
  readonly loading = computed(() => this.isLoading());
  readonly error = computed(() => this.loadingError());

  constructor(
    private languageService: LanguageService,
    private errorLogging: ErrorLoggingService,
  ) {
    // Preload all translations into cache
    this.preloadTranslations();

    // Initialize with current language
    this.loadTranslationsForLanguage(this.languageService.currentLanguage());

    // React to language changes
    effect(() => {
      const currentLang = this.languageService.currentLanguage();
      this.loadTranslationsForLanguage(currentLang);
    });
  }

  /**
   * Preload all supported language translations into cache
   * This ensures instant language switching and optimal cache hit ratio
   */
  private preloadTranslations(): void {
    try {
      // Pre-loaded translations (no HTTP needed, bundled with app)
      const translations: Record<SupportedLanguage, TranslationDictionary> = {
        en: enTranslations as TranslationDictionary,
        de: deTranslations as TranslationDictionary,
      };

      // Populate cache with all translations
      Object.entries(translations).forEach(([lang, dict]) => {
        this.translationCache.set(lang as SupportedLanguage, dict);
      });

      this.errorLogging.logInfo(
        `Translations preloaded: ${this.translationCache.size} languages (${Object.keys(enTranslations).length} keys)`,
      );
    } catch (error) {
      const errorMessage = 'Failed to preload translations';
      this.errorLogging.logError(errorMessage, error);
      this.loadingError.set(errorMessage);
    }
  }

  /**
   * Load translations for a specific language
   * Uses cache for O(1) retrieval with > 90% cache hit ratio
   */
  private loadTranslationsForLanguage(language: Language): void {
    this.isLoading.set(true);
    this.loadingError.set(null);

    try {
      // Check cache first (should always hit after preload)
      const translations = this.translationCache.get(language);

      if (translations) {
        this.currentTranslations.set(translations);
        this.errorLogging.logInfo(
          `Translations loaded for language: ${language} (${Object.keys(translations).length} keys) [CACHE HIT]`,
        );
      } else {
        // Fallback to English if language not found in cache
        const warningMessage = `Translation not found for language: ${language}, falling back to English [CACHE MISS]`;
        this.errorLogging.logWarning(warningMessage);

        const fallbackTranslations = this.translationCache.get('en');
        if (fallbackTranslations) {
          this.currentTranslations.set(fallbackTranslations);
        } else {
          // Last resort: use bundled English
          this.errorLogging.logWarning('Cache miss for English fallback, using bundled translations');
          this.currentTranslations.set(enTranslations as TranslationDictionary);
        }
        this.loadingError.set(`Translation not found for language: ${language}`);
      }
    } catch (error) {
      const errorMessage = `Error loading translations for ${language}`;
      this.errorLogging.logError(errorMessage, error);
      this.loadingError.set(`${errorMessage}: ${error}`);

      // Fallback to English on any error
      try {
        const fallbackTranslations = this.translationCache.get('en');
        if (fallbackTranslations) {
          this.currentTranslations.set(fallbackTranslations);
          this.errorLogging.logWarning('Successfully fell back to English translations');
        } else {
          // Last resort: use bundled English
          this.currentTranslations.set(enTranslations as TranslationDictionary);
          this.errorLogging.logWarning('Using bundled English as last resort fallback');
        }
      } catch (fallbackError) {
        this.errorLogging.logError('Critical: Failed to load fallback translations', fallbackError);
      }
    } finally {
      this.isLoading.set(false);
    }
  }

  /**
   * Get translation for a key
   * Returns the key itself if translation is not found
   */
  translate(key: string): string {
    // Handle empty or invalid keys
    if (!key || typeof key !== 'string') {
      this.errorLogging.logWarning('Translation key is empty or invalid', { key });
      return '';
    }

    try {
      const translations = this.currentTranslations();
      const translation = translations[key];

      // Warn about missing translations in development
      if (!translation && typeof ngDevMode !== 'undefined' && ngDevMode) {
        this.errorLogging.logWarning(`Missing translation key: ${key}`);
      }

      return translation || key;
    } catch (error) {
      this.errorLogging.logError(`Error translating key: ${key}`, error);
      return key; // Fallback to key on error
    }
  }

  /**
   * Get translation as computed signal
   * Automatically updates when language changes
   */
  translateSignal(key: string): ReturnType<typeof computed<string>> {
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
   * Get the current language's translation dictionary
   */
  getCurrentTranslations(): TranslationDictionary {
    return this.currentTranslations();
  }
}
