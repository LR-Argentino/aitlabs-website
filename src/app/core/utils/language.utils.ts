import { SupportedLanguage } from '../models/translation.model';

/**
 * Language utility functions for the i18n system
 *
 * These functions provide centralized logic for language detection and validation,
 * reducing code duplication across services and components.
 */

/**
 * List of supported language codes
 */
const SUPPORTED_LANGUAGES: SupportedLanguage[] = ['en', 'de'];

/**
 * Extract and validate browser language
 *
 * This function reads the browser's language preference and normalizes it
 * to a supported language code.
 *
 * @returns Browser language code or null if not detected
 *
 * @example
 * const browserLang = getBrowserLanguage(); // Returns 'de' for 'de-DE', 'en' for 'en-US'
 */
export function getBrowserLanguage(): SupportedLanguage | null {
  try {
    // Get browser language (e.g., "de-DE", "en-US")
    const browserLang = navigator.language || (navigator as any).userLanguage;

    if (!browserLang) {
      return null;
    }

    // Extract language code (e.g., "de" from "de-DE")
    const langCode = browserLang.toLowerCase().split('-')[0];

    // Validate and return if supported
    if (isValidLanguage(langCode)) {
      return langCode as SupportedLanguage;
    }

    return null;
  } catch (error) {
    console.error('Browser language detection error:', error);
    return null;
  }
}

/**
 * Validate if a language code is supported
 *
 * Type guard that checks if a string is a valid SupportedLanguage.
 *
 * @param lang - Language code to validate
 * @returns True if language is supported, false otherwise
 *
 * @example
 * if (isValidLanguage('en')) {
 *   // TypeScript knows lang is SupportedLanguage here
 * }
 */
export function isValidLanguage(lang: string): lang is SupportedLanguage {
  return SUPPORTED_LANGUAGES.includes(lang as SupportedLanguage);
}

/**
 * Get list of all supported languages
 *
 * @returns Array of supported language codes
 */
export function getSupportedLanguages(): readonly SupportedLanguage[] {
  return SUPPORTED_LANGUAGES;
}

/**
 * Get the default language
 *
 * @returns Default language code
 */
export function getDefaultLanguage(): SupportedLanguage {
  return 'en';
}
