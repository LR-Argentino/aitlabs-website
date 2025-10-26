import { Pipe, PipeTransform, inject, computed, signal, effect } from '@angular/core';
import { TranslationService } from '../services/translation.service';
import { LanguageService } from '../services/language.service';

@Pipe({
  name: 'translate',
  standalone: true,
  pure: false, // Make it impure so it updates when language changes
})
export class TranslatePipe implements PipeTransform {
  private translationService = inject(TranslationService);
  private languageService = inject(LanguageService);

  // Cache for translations to avoid unnecessary recalculations
  private translationCache = new Map<string, string>();
  private currentLanguage = signal(this.languageService.currentLanguage());

  constructor() {
    // Update cache when language changes
    effect(() => {
      const newLang = this.languageService.currentLanguage();
      if (newLang !== this.currentLanguage()) {
        this.translationCache.clear();
        this.currentLanguage.set(newLang);
      }
    });
  }

  transform(key: string | null | undefined, fallback?: string): string {
    // Handle null/undefined keys
    if (!key) {
      return fallback || '';
    }

    // Check cache first
    const cacheKey = `${this.currentLanguage()}_${key}`;
    const cachedValue = this.translationCache.get(cacheKey);
    if (cachedValue !== undefined) {
      return cachedValue;
    }

    // Get translation
    const translation = this.translationService.translate(key);
    const result = translation || fallback || key;

    // Debug log for first few translations
    if (this.translationCache.size < 5) {
      console.log(`Translation: ${key} -> ${result} (lang: ${this.currentLanguage()})`);
    }

    // Cache the result
    this.translationCache.set(cacheKey, result);

    return result;
  }
}
