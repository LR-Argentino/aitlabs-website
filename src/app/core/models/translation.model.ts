/**
 * Translation System Type Definitions
 *
 * This file provides type-safe interfaces for the i18n translation system.
 */

/**
 * Supported languages in the application
 */
export type SupportedLanguage = 'en' | 'de';

/**
 * Translation dictionary structure - maps translation keys to their values
 * Example: { "nav.home": "Home", "nav.about": "About" }
 */
export interface TranslationDictionary {
  [key: string]: string;
}

/**
 * Complete translation files structure for all supported languages
 */
export interface TranslationFiles {
  en: TranslationDictionary;
  de: TranslationDictionary;
}

/**
 * Language configuration with display information
 */
export interface LanguageConfig {
  code: SupportedLanguage;
  name: string;
  flag: string;
}
