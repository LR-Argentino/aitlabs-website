import { Pipe, PipeTransform, inject } from '@angular/core';
import { TranslationService } from '../services/translation.service';

/**
 * Pure translation pipe that leverages Angular signals for reactivity
 *
 * Performance optimizations:
 * - Pure pipe (no unnecessary change detection cycles)
 * - Direct service call (< 1ms per translation)
 * - Service-level caching handles performance
 * - Automatic updates via signal system
 *
 * Usage:
 *   {{ 'nav.home' | translate }}
 *   {{ 'nav.home' | translate:'Home' }}  // with fallback
 */
@Pipe({
  name: 'translate',
  standalone: true,
  pure: true, // Pure pipe for optimal performance
})
export class TranslatePipe implements PipeTransform {
  private readonly translationService = inject(TranslationService);

  /**
   * Transform a translation key to its localized value
   *
   * @param key - Translation key (e.g., 'nav.home')
   * @param fallback - Optional fallback text if translation is missing
   * @returns Translated text or fallback/key
   */
  transform(key: string | null | undefined, fallback?: string): string {
    // Handle null/undefined keys
    if (!key) {
      return fallback || '';
    }

    // Get translation from service (uses cached translations)
    const translation = this.translationService.translate(key);

    // Return translation or fallback or original key
    return translation || fallback || key;
  }
}
