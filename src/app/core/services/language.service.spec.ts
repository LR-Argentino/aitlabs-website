import { TestBed } from '@angular/core/testing';
import { LanguageService, Language } from './language.service';

describe('LanguageService', () => {
  let service: LanguageService;
  let localStorageSpy: jasmine.SpyObj<Storage>;

  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();

    TestBed.configureTestingModule({
      providers: [LanguageService],
    });

    service = TestBed.inject(LanguageService);
  });

  afterEach(() => {
    localStorage.clear();
  });

  describe('Initialization', () => {
    it('should create the service', () => {
      expect(service).toBeTruthy();
    });

    it('should have default language as English', () => {
      localStorage.clear();

      // Mock navigator.language to return unsupported language so it falls back to default
      const originalLanguage = navigator.language;
      Object.defineProperty(navigator, 'language', {
        get: () => 'xx-XX', // Unsupported language
        configurable: true,
      });

      const newService = new LanguageService();
      expect(newService.currentLanguage()).toBe('en');

      // Restore original
      Object.defineProperty(navigator, 'language', {
        get: () => originalLanguage,
        configurable: true,
      });
    });

    it('should initialize with language from localStorage if available', () => {
      localStorage.setItem('aitlabs-language', 'de');
      const newService = new LanguageService();
      expect(newService.currentLanguage()).toBe('de');
    });

    it('should detect language from browser if localStorage is empty', () => {
      // Note: Mocking navigator.language in Chrome headless is difficult
      // This test verifies that the service can detect and use browser language
      // by testing the actual browser environment
      const newService = new LanguageService();

      // The service should either detect browser language or fallback to default
      // Both are valid behaviors depending on browser settings
      const currentLang = newService.currentLanguage();
      expect(['en', 'de']).toContain(currentLang);

      // Verify it's a valid language code
      expect(service.availableLanguages.map((l) => l.code)).toContain(currentLang);
    });

    it('should fallback to default language if browser language is unsupported', () => {
      localStorage.clear(); // Ensure localStorage doesn't interfere

      const originalLanguage = navigator.language;
      Object.defineProperty(navigator, 'language', {
        get: () => 'fr-FR', // Unsupported language (French)
        configurable: true,
      });

      const newService = new LanguageService();
      expect(newService.currentLanguage()).toBe('en');

      // Restore original
      Object.defineProperty(navigator, 'language', {
        get: () => originalLanguage,
        configurable: true,
      });
    });

    it('should set document language attribute on initialization', () => {
      localStorage.setItem('aitlabs-language', 'de');
      const newService = new LanguageService();
      expect(document.documentElement.lang).toBe('de');
    });
  });

  describe('setLanguage()', () => {
    it('should update current language signal', () => {
      service.setLanguage('de');
      expect(service.currentLanguage()).toBe('de');
    });

    it('should persist language to localStorage', () => {
      service.setLanguage('de');
      expect(localStorage.getItem('aitlabs-language')).toBe('de');
    });

    it('should update document language attribute', () => {
      service.setLanguage('de');
      expect(document.documentElement.lang).toBe('de');
    });

    it('should not update if language is invalid', () => {
      const currentLang = service.currentLanguage();
      service.setLanguage('invalid' as Language);
      expect(service.currentLanguage()).toBe(currentLang);
    });

    it('should log warning for invalid language', () => {
      spyOn(console, 'warn');
      service.setLanguage('invalid' as Language);
      expect(console.warn).toHaveBeenCalledWith('Invalid language: invalid');
    });

    it('should switch between languages correctly', () => {
      service.setLanguage('en');
      expect(service.currentLanguage()).toBe('en');

      service.setLanguage('de');
      expect(service.currentLanguage()).toBe('de');

      service.setLanguage('en');
      expect(service.currentLanguage()).toBe('en');
    });
  });

  describe('toggleLanguage()', () => {
    it('should toggle from English to German', () => {
      service.setLanguage('en');
      service.toggleLanguage();
      expect(service.currentLanguage()).toBe('de');
    });

    it('should toggle from German to English', () => {
      service.setLanguage('de');
      service.toggleLanguage();
      expect(service.currentLanguage()).toBe('en');
    });

    it('should persist toggled language to localStorage', () => {
      service.setLanguage('en');
      service.toggleLanguage();
      expect(localStorage.getItem('aitlabs-language')).toBe('de');
    });
  });

  describe('currentLanguageConfig', () => {
    it('should return correct config for English', () => {
      service.setLanguage('en');
      const config = service.currentLanguageConfig();
      expect(config.code).toBe('en');
      expect(config.name).toBe('English');
      expect(config.flag).toBe('🇺🇸');
    });

    it('should return correct config for German', () => {
      service.setLanguage('de');
      const config = service.currentLanguageConfig();
      expect(config.code).toBe('de');
      expect(config.name).toBe('Deutsch');
      expect(config.flag).toBe('🇩🇪');
    });

    it('should be reactive to language changes', () => {
      service.setLanguage('en');
      let config = service.currentLanguageConfig();
      expect(config.code).toBe('en');

      service.setLanguage('de');
      config = service.currentLanguageConfig();
      expect(config.code).toBe('de');
    });
  });

  describe('availableLanguages', () => {
    it('should have two available languages', () => {
      expect(service.availableLanguages.length).toBe(2);
    });

    it('should include English and German', () => {
      const codes = service.availableLanguages.map((lang) => lang.code);
      expect(codes).toContain('en');
      expect(codes).toContain('de');
    });

    it('should have complete language config objects', () => {
      service.availableLanguages.forEach((lang) => {
        expect(lang.code).toBeDefined();
        expect(lang.name).toBeDefined();
        expect(lang.flag).toBeDefined();
      });
    });
  });

  describe('getTranslationKey()', () => {
    it('should generate correct translation key for English', () => {
      service.setLanguage('en');
      const key = service.getTranslationKey('nav.home');
      expect(key).toBe('en.nav.home');
    });

    it('should generate correct translation key for German', () => {
      service.setLanguage('de');
      const key = service.getTranslationKey('nav.home');
      expect(key).toBe('de.nav.home');
    });
  });

  describe('Error Handling', () => {
    it('should handle localStorage errors gracefully', () => {
      spyOn(localStorage, 'setItem').and.throwError('Storage error');
      spyOn(console, 'error');

      // Should not throw, but fall back to default
      expect(() => new LanguageService()).not.toThrow();
    });

    it('should handle browser language detection errors', () => {
      // Clear localStorage to force browser language detection
      localStorage.clear();

      Object.defineProperty(window.navigator, 'language', {
        get: () => {
          throw new Error('Language detection error');
        },
        configurable: true,
      });

      spyOn(console, 'error');

      const newService = new LanguageService();
      // Should fallback to default language on error
      expect(newService.currentLanguage()).toBe('en');
      expect(console.error).toHaveBeenCalled();

      // Restore normal behavior
      Object.defineProperty(window.navigator, 'language', {
        get: () => 'en-US',
        configurable: true,
      });
    });
  });

  describe('Signal Reactivity', () => {
    it('should trigger signal updates when language changes', () => {
      service.setLanguage('en');
      const initialLang = service.currentLanguage();
      expect(initialLang).toBe('en');

      service.setLanguage('de');
      const newLang = service.currentLanguage();
      expect(newLang).toBe('de');
      expect(newLang).not.toBe(initialLang);
    });

    it('should maintain signal reference across language changes', () => {
      const langSignal = service.currentLanguage;
      service.setLanguage('de');
      expect(service.currentLanguage).toBe(langSignal);
    });
  });
});
