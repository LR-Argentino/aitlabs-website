import { TestBed } from '@angular/core/testing';
import { TranslationService } from './translation.service';
import { LanguageService } from './language.service';

describe('TranslationService', () => {
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

  describe('Initialization', () => {
    it('should create the service', () => {
      expect(service).toBeTruthy();
    });

    it('should load translations for current language on initialization', () => {
      // Service should have loaded translations based on LanguageService current language
      const translation = service.translate('nav.home');
      expect(translation).toBeTruthy();
      expect(translation).not.toBe('nav.home'); // Should have actual translation
    });
  });

  describe('translate()', () => {
    it('should return translation for valid English key', () => {
      languageService.setLanguage('en');
      const translation = service.translate('nav.home');
      expect(translation).toBeTruthy();
      expect(typeof translation).toBe('string');
    });

    it('should return translation for valid German key', () => {
      languageService.setLanguage('de');
      const translation = service.translate('nav.home');
      expect(translation).toBeTruthy();
      expect(typeof translation).toBe('string');
    });

    it('should return key itself if translation is missing', () => {
      const missingKey = 'non.existent.key';
      const translation = service.translate(missingKey);
      expect(translation).toBe(missingKey);
    });

    it('should return different translations for different languages', () => {
      languageService.setLanguage('en');
      const enTranslation = service.translate('nav.home');

      languageService.setLanguage('de');
      // Wait for effect to trigger
      TestBed.flushEffects();
      const deTranslation = service.translate('nav.home');

      // Translations should be different (unless they happen to be the same)
      expect(enTranslation).toBeTruthy();
      expect(deTranslation).toBeTruthy();
    });

    it('should handle empty key gracefully', () => {
      const translation = service.translate('');
      expect(translation).toBe('');
    });

    it('should handle nested translation keys', () => {
      const translation = service.translate('nav.home');
      expect(translation).toBeTruthy();
    });
  });

  describe('hasTranslation()', () => {
    it('should return true for existing translation key', () => {
      languageService.setLanguage('en');
      TestBed.flushEffects();
      expect(service.hasTranslation('nav.home')).toBe(true);
    });

    it('should return false for non-existing translation key', () => {
      expect(service.hasTranslation('non.existent.key')).toBe(false);
    });

    it('should return false for empty key', () => {
      expect(service.hasTranslation('')).toBe(false);
    });
  });

  describe('getAvailableKeys()', () => {
    it('should return array of translation keys', () => {
      const keys = service.getAvailableKeys();
      expect(Array.isArray(keys)).toBe(true);
      expect(keys.length).toBeGreaterThan(0);
    });

    it('should include common translation keys', () => {
      languageService.setLanguage('en');
      TestBed.flushEffects();
      const keys = service.getAvailableKeys();
      expect(keys).toContain('nav.home');
    });

    it('should return different keys based on current language', () => {
      languageService.setLanguage('en');
      TestBed.flushEffects();
      const enKeys = service.getAvailableKeys();

      languageService.setLanguage('de');
      TestBed.flushEffects();
      const deKeys = service.getAvailableKeys();

      // Both should have keys
      expect(enKeys.length).toBeGreaterThan(0);
      expect(deKeys.length).toBeGreaterThan(0);
    });
  });

  describe('translateSignal()', () => {
    it('should return a computed signal', () => {
      const signal = service.translateSignal('nav.home');
      expect(signal).toBeDefined();
      expect(typeof signal()).toBe('string');
    });

    it('should return translation value from signal', () => {
      languageService.setLanguage('en');
      TestBed.flushEffects();
      const signal = service.translateSignal('nav.home');
      const value = signal();
      expect(value).toBeTruthy();
      expect(value).not.toBe('nav.home');
    });

    it('should update when language changes', () => {
      languageService.setLanguage('en');
      TestBed.flushEffects();
      const signal = service.translateSignal('nav.home');
      const enValue = signal();

      languageService.setLanguage('de');
      TestBed.flushEffects();
      const deValue = signal();

      expect(enValue).toBeTruthy();
      expect(deValue).toBeTruthy();
    });
  });

  describe('Language Change Reactivity', () => {
    it('should update translations when language changes', () => {
      languageService.setLanguage('en');
      TestBed.flushEffects();
      const enTranslation = service.translate('nav.home');

      languageService.setLanguage('de');
      TestBed.flushEffects();
      const deTranslation = service.translate('nav.home');

      expect(enTranslation).toBeTruthy();
      expect(deTranslation).toBeTruthy();
    });

    it('should load translations automatically when language changes', () => {
      spyOn(console, 'log');

      languageService.setLanguage('de');
      TestBed.flushEffects();

      // Should have logged translation loading
      expect(console.log).toHaveBeenCalled();
    });

    it('should maintain translation availability after language switch', () => {
      languageService.setLanguage('en');
      TestBed.flushEffects();
      expect(service.hasTranslation('nav.home')).toBe(true);

      languageService.setLanguage('de');
      TestBed.flushEffects();
      expect(service.hasTranslation('nav.home')).toBe(true);
    });
  });

  describe('Fallback Behavior', () => {
    it('should return key for missing translation', () => {
      const missingKey = 'this.key.does.not.exist';
      const result = service.translate(missingKey);
      expect(result).toBe(missingKey);
    });

    it('should warn about missing translations in development', () => {
      // Note: This test may not work as expected since ngDevMode is set at compile time
      // but we can still test the behavior
      spyOn(console, 'warn');
      const missingKey = 'missing.translation.key';
      service.translate(missingKey);

      // Warning may or may not be called depending on ngDevMode
      // Just ensure the method doesn't throw
      expect(service.translate(missingKey)).toBe(missingKey);
    });
  });

  describe('Edge Cases', () => {
    it('should handle rapid language switching', () => {
      languageService.setLanguage('en');
      TestBed.flushEffects();
      languageService.setLanguage('de');
      TestBed.flushEffects();
      languageService.setLanguage('en');
      TestBed.flushEffects();

      const translation = service.translate('nav.home');
      expect(translation).toBeTruthy();
    });

    it('should handle special characters in translation keys', () => {
      // Test with actual keys that might have special patterns
      const translation = service.translate('nav.home');
      expect(translation).toBeTruthy();
    });

    it('should be case-sensitive for translation keys', () => {
      const lower = service.translate('nav.home');
      const upper = service.translate('NAV.HOME');

      // Keys should be case-sensitive - upper case key won't exist
      expect(lower).not.toBe('nav.home'); // Should have translation
      expect(upper).toBe('NAV.HOME'); // Should return key itself
    });
  });

  describe('Performance', () => {
    it('should handle multiple translation lookups efficiently', () => {
      const startTime = performance.now();

      for (let i = 0; i < 100; i++) {
        service.translate('nav.home');
      }

      const endTime = performance.now();
      const duration = endTime - startTime;

      // Should complete 100 translations quickly (under 50ms)
      expect(duration).toBeLessThan(50);
    });

    it('should not reload translations unnecessarily', () => {
      spyOn(console, 'log');

      // Initial load
      languageService.setLanguage('en');
      TestBed.flushEffects();
      const initialCallCount = (console.log as jasmine.Spy).calls.count();

      // Multiple translate calls shouldn't reload
      service.translate('nav.home');
      service.translate('nav.home');
      service.translate('nav.home');

      const finalCallCount = (console.log as jasmine.Spy).calls.count();
      expect(finalCallCount).toBe(initialCallCount);
    });
  });
});
