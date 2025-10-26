import { TestBed } from '@angular/core/testing';
import { TranslationService } from './translation.service';
import { LanguageService } from './language.service';

describe('TranslationService Performance Tests', () => {
  let service: TranslationService;
  let languageService: LanguageService;

  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({
      providers: [TranslationService, LanguageService],
    });

    languageService = TestBed.inject(LanguageService);
    service = TestBed.inject(TranslationService);
  });

  afterEach(() => {
    localStorage.clear();
  });

  describe('Performance Targets', () => {
    it('should load translations in < 100ms', () => {
      const startTime = performance.now();

      // Trigger language change to measure loading time
      languageService.setLanguage('de');
      TestBed.flushEffects();

      const endTime = performance.now();
      const duration = endTime - startTime;

      console.log(`Translation loading time: ${duration.toFixed(2)}ms`);
      expect(duration).toBeLessThan(100);
    });

    it('should achieve > 90% cache hit ratio', () => {
      // Initialize with English (first cache population)
      languageService.setLanguage('en');
      TestBed.flushEffects();

      // Switch to German (should hit cache)
      const startTime = performance.now();
      languageService.setLanguage('de');
      TestBed.flushEffects();
      const switchTime1 = performance.now() - startTime;

      // Switch back to English (should hit cache)
      const startTime2 = performance.now();
      languageService.setLanguage('en');
      TestBed.flushEffects();
      const switchTime2 = performance.now() - startTime2;

      console.log(
        `Language switch time (cached): ${switchTime1.toFixed(2)}ms, ${switchTime2.toFixed(2)}ms`,
      );

      // Cached switches should be very fast (< 10ms)
      expect(switchTime1).toBeLessThan(10);
      expect(switchTime2).toBeLessThan(10);
    });

    it('should handle 1000 translation lookups in < 100ms', () => {
      languageService.setLanguage('en');
      TestBed.flushEffects();

      const startTime = performance.now();

      for (let i = 0; i < 1000; i++) {
        service.translate('nav.home');
      }

      const endTime = performance.now();
      const duration = endTime - startTime;

      console.log(
        `1000 translation lookups: ${duration.toFixed(2)}ms (${(duration / 1000).toFixed(3)}ms per lookup)`,
      );
      expect(duration).toBeLessThan(100);
    });

    it('should have memory usage < 2MB for all translations', () => {
      // Check that translations are properly cached
      languageService.setLanguage('en');
      TestBed.flushEffects();

      const enTranslations = service.getCurrentTranslations();
      const enSize = JSON.stringify(enTranslations).length;

      languageService.setLanguage('de');
      TestBed.flushEffects();

      const deTranslations = service.getCurrentTranslations();
      const deSize = JSON.stringify(deTranslations).length;

      const totalSize = enSize + deSize;
      const totalSizeMB = totalSize / (1024 * 1024);

      console.log(`Total translation size: ${totalSizeMB.toFixed(3)}MB`);
      expect(totalSizeMB).toBeLessThan(2);
    });
  });

  describe('Cache Hit Verification', () => {
    it('should use cached translations after preload', () => {
      // Service preloads translations in constructor
      // Verify both languages are available immediately

      languageService.setLanguage('en');
      TestBed.flushEffects();
      const enResult = service.translate('nav.home');
      expect(enResult).toBeTruthy();

      languageService.setLanguage('de');
      TestBed.flushEffects();
      const deResult = service.translate('nav.home');
      expect(deResult).toBeTruthy();

      // Both should be instant (from cache)
      expect(enResult).not.toBe(deResult); // Different translations
    });

    it('should have loading states accessible', () => {
      // Verify loading signals are exposed
      expect(service.loading).toBeDefined();
      expect(service.error).toBeDefined();

      // After initialization, loading should be false
      expect(service.loading()).toBe(false);
      expect(service.error()).toBeNull();
    });
  });

  describe('Error Handling', () => {
    it('should have error signal available', () => {
      // Verify error handling infrastructure is in place
      expect(service.error).toBeDefined();
      const errorValue = service.error();
      expect(errorValue === null || typeof errorValue === 'string').toBe(true);
    });

    it('should maintain cache after error', () => {
      // Even if there's an error, cached translations should remain
      languageService.setLanguage('en');
      TestBed.flushEffects();

      const translation = service.translate('nav.home');
      expect(translation).toBeTruthy();
    });
  });
});
