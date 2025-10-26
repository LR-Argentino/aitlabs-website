import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { HeaderComponent } from './header.component';
import { LanguageService } from '../../core/services/language.service';
import { TranslationService } from '../../core/services/translation.service';
import { NavigationService } from '../../core/services/navigation.service';
import { DropdownManagerService } from '../../core/services/dropdown-manager.service';
import { TranslatePipe } from '../../core/pipes/translate.pipe';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let languageService: jasmine.SpyObj<LanguageService>;
  let translationService: jasmine.SpyObj<TranslationService>;
  let navigationService: jasmine.SpyObj<NavigationService>;
  let dropdownManagerService: jasmine.SpyObj<DropdownManagerService>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    // Mock window.pageYOffset to ensure initial scroll position is 0
    Object.defineProperty(window, 'pageYOffset', { value: 0, writable: true, configurable: true });

    // Create mock services
    const languageServiceSpy = jasmine.createSpyObj('LanguageService',
      ['setLanguage'],
      {
        currentLanguage: jasmine.createSpy().and.returnValue('en'),
        currentLanguageConfig: jasmine.createSpy().and.returnValue({ code: 'en', name: 'English', flag: '🇺🇸' }),
        availableLanguages: [
          { code: 'en', name: 'English', flag: '🇺🇸' },
          { code: 'de', name: 'Deutsch', flag: '🇩🇪' }
        ]
      }
    );

    const translationServiceSpy = jasmine.createSpyObj('TranslationService', ['translate']);
    translationServiceSpy.translate.and.returnValue('Translated Text');

    const navigationServiceSpy = jasmine.createSpyObj('NavigationService', ['navigateToSection']);

    const dropdownManagerServiceSpy = jasmine.createSpyObj('DropdownManagerService',
      ['open', 'close', 'toggle', 'closeAll', 'scheduleClose', 'cancelScheduledClose', 'isOpen']
    );
    dropdownManagerServiceSpy.isOpen.and.returnValue(jasmine.createSpy().and.returnValue(false));

    const routerSpy = jasmine.createSpyObj('Router', ['navigate'], { url: '/' });

    await TestBed.configureTestingModule({
      imports: [HeaderComponent],
      providers: [
        { provide: LanguageService, useValue: languageServiceSpy },
        { provide: TranslationService, useValue: translationServiceSpy },
        { provide: NavigationService, useValue: navigationServiceSpy },
        { provide: DropdownManagerService, useValue: dropdownManagerServiceSpy },
        { provide: Router, useValue: routerSpy },
        TranslatePipe
      ]
    }).compileComponents();

    languageService = TestBed.inject(LanguageService) as jasmine.SpyObj<LanguageService>;
    translationService = TestBed.inject(TranslationService) as jasmine.SpyObj<TranslationService>;
    navigationService = TestBed.inject(NavigationService) as jasmine.SpyObj<NavigationService>;
    dropdownManagerService = TestBed.inject(DropdownManagerService) as jasmine.SpyObj<DropdownManagerService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('Component Initialization', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should initialize scroll state', () => {
      expect(component['isScrolled']()).toBe(false);
    });

    it('should check scroll position on init', () => {
      spyOn<any>(component, 'checkScrollPosition');
      component.ngOnInit();
      expect(component['checkScrollPosition']).toHaveBeenCalled();
    });

    it('should close all dropdowns on destroy', () => {
      component.ngOnDestroy();
      expect(dropdownManagerService.closeAll).toHaveBeenCalled();
    });
  });

  describe('Scroll Behavior', () => {
    it('should update scroll state when scrolled down', () => {
      Object.defineProperty(window, 'pageYOffset', { value: 20, writable: true, configurable: true });
      component.onWindowScroll();
      expect(component['isScrolled']()).toBe(true);
    });

    it('should not set scroll state when at top', () => {
      Object.defineProperty(window, 'pageYOffset', { value: 0, writable: true, configurable: true });
      component.onWindowScroll();
      expect(component['isScrolled']()).toBe(false);
    });

    it('should handle scroll threshold correctly', () => {
      // Just above threshold
      Object.defineProperty(window, 'pageYOffset', { value: 11, writable: true, configurable: true });
      component['checkScrollPosition']();
      expect(component['isScrolled']()).toBe(true);

      // Just below threshold
      Object.defineProperty(window, 'pageYOffset', { value: 9, writable: true, configurable: true });
      component['checkScrollPosition']();
      expect(component['isScrolled']()).toBe(false);
    });
  });

  describe('Language Switching', () => {
    it('should get current language', () => {
      const lang = component.currentLanguage;
      expect(languageService.currentLanguage).toHaveBeenCalled();
    });

    it('should get current language config', () => {
      const config = component.currentLanguageConfig;
      expect(languageService.currentLanguageConfig).toHaveBeenCalled();
    });

    it('should get available languages', () => {
      const languages = component.availableLanguages;
      expect(languages).toEqual([
        { code: 'en', name: 'English', flag: '🇺🇸' },
        { code: 'de', name: 'Deutsch', flag: '🇩🇪' }
      ]);
    });

    it('should switch language to German', () => {
      component.switchLanguage('de');
      expect(languageService.setLanguage).toHaveBeenCalledWith('de');
      expect(dropdownManagerService.closeAll).toHaveBeenCalled();
    });

    it('should switch language to English', () => {
      component.switchLanguage('en');
      expect(languageService.setLanguage).toHaveBeenCalledWith('en');
      expect(dropdownManagerService.closeAll).toHaveBeenCalled();
    });
  });

  describe('Mobile Language Dropdown', () => {
    it('should toggle mobile language dropdown', () => {
      const event = new Event('click');
      spyOn(event, 'preventDefault');
      spyOn(event, 'stopPropagation');

      component.toggleMobileLanguageDropdown(event);

      expect(event.preventDefault).toHaveBeenCalled();
      expect(event.stopPropagation).toHaveBeenCalled();
      expect(dropdownManagerService.toggle).toHaveBeenCalledWith('mobile-language');
    });

    it('should switch mobile language and close dropdown', () => {
      const event = new Event('click');
      spyOn(event, 'preventDefault');
      spyOn(event, 'stopPropagation');

      component.switchMobileLanguage('de', event);

      expect(event.preventDefault).toHaveBeenCalled();
      expect(event.stopPropagation).toHaveBeenCalled();
      expect(languageService.setLanguage).toHaveBeenCalledWith('de');
      expect(dropdownManagerService.close).toHaveBeenCalledWith('mobile-language');
    });
  });

  describe('Desktop Dropdown Interactions', () => {
    it('should open dropdown on mouse enter', () => {
      component.onDropdownEnter('desktop-services');
      expect(dropdownManagerService.cancelScheduledClose).toHaveBeenCalled();
      expect(dropdownManagerService.open).toHaveBeenCalledWith('desktop-services');
    });

    it('should schedule close on mouse leave', () => {
      component.onDropdownLeave();
      expect(dropdownManagerService.scheduleClose).toHaveBeenCalledWith(300);
    });

    it('should toggle dropdown', () => {
      component.toggleDropdown('desktop-services');
      expect(dropdownManagerService.toggle).toHaveBeenCalledWith('desktop-services');
    });
  });

  describe('Mobile Menu', () => {
    it('should toggle mobile menu', () => {
      const mockSignal = () => true;
      dropdownManagerService.isOpen.and.returnValue(mockSignal as any);
      component.toggleMobileMenu();
      expect(dropdownManagerService.toggle).toHaveBeenCalledWith('mobile-menu');
    });

    it('should add body class when mobile menu opens', () => {
      const mockSignal = () => true;
      dropdownManagerService.isOpen.and.returnValue(mockSignal as any);
      component.toggleMobileMenu();
      expect(document.body.classList.contains('mobile-menu-open')).toBe(true);
    });

    it('should remove body class when mobile menu closes', () => {
      document.body.classList.add('mobile-menu-open');
      const mockSignal = () => false;
      dropdownManagerService.isOpen.and.returnValue(mockSignal as any);
      component.toggleMobileMenu();
      expect(document.body.classList.contains('mobile-menu-open')).toBe(false);
    });

    it('should close all mobile dropdowns', () => {
      component.closeMobileMenu();
      expect(dropdownManagerService.close).toHaveBeenCalledWith('mobile-menu');
      expect(dropdownManagerService.close).toHaveBeenCalledWith('mobile-services');
      expect(dropdownManagerService.close).toHaveBeenCalledWith('mobile-case-study');
      expect(dropdownManagerService.close).toHaveBeenCalledWith('mobile-language');
      expect(document.body.classList.contains('mobile-menu-open')).toBe(false);
    });
  });

  describe('Navigation', () => {
    it('should navigate to section and close dropdowns', () => {
      component.navigateToSection('about');
      expect(dropdownManagerService.closeAll).toHaveBeenCalled();
      expect(navigationService.navigateToSection).toHaveBeenCalledWith('about', true);
    });

    it('should navigate to AI Voice Assistant', () => {
      router.navigate.and.returnValue(Promise.resolve(true));
      component.navigateToAiVoiceAssistant();
      expect(dropdownManagerService.closeAll).toHaveBeenCalled();
      expect(router.navigate).toHaveBeenCalledWith(['/ai-voice-assistant']);
    });

    it('should handle contact click', () => {
      spyOn(component, 'closeMobileMenu');
      component.onContactClick();
      expect(component.closeMobileMenu).toHaveBeenCalled();
      expect(navigationService.navigateToSection).toHaveBeenCalledWith('contact-form', false);
    });
  });

  describe('Translation', () => {
    it('should translate text', () => {
      const result = component.translate('nav.home');
      expect(translationService.translate).toHaveBeenCalledWith('nav.home');
      expect(result).toBe('Translated Text');
    });

    it('should handle multiple translation calls', () => {
      // Reset the spy to count only our explicit calls
      translationService.translate.calls.reset();

      component.translate('nav.home');
      component.translate('nav.services');
      expect(translationService.translate).toHaveBeenCalledTimes(2);
    });
  });

  describe('Document Click Handler', () => {
    it('should close mobile menu on outside click', () => {
      const mockSignal = () => true;
      dropdownManagerService.isOpen.and.returnValue(mockSignal as any);
      spyOn(component, 'closeMobileMenu');

      // Create a mock element with closest method
      const mockElement = document.createElement('div');
      const event = new MouseEvent('click');
      Object.defineProperty(event, 'target', { value: mockElement, enumerable: true, configurable: true });

      component.onDocumentClick(event);
      expect(component.closeMobileMenu).toHaveBeenCalled();
    });

    it('should not close mobile menu if menu is not open', () => {
      const mockSignal = () => false;
      dropdownManagerService.isOpen.and.returnValue(mockSignal as any);
      spyOn(component, 'closeMobileMenu');

      const event = new MouseEvent('click');
      component.onDocumentClick(event);
      expect(component.closeMobileMenu).not.toHaveBeenCalled();
    });
  });

  describe('Dropdown Constants', () => {
    it('should have all required dropdown IDs', () => {
      expect(component['DROPDOWNS'].SERVICES).toBe('desktop-services');
      expect(component['DROPDOWNS'].CASE_STUDY).toBe('desktop-case-study');
      expect(component['DROPDOWNS'].PROJECTS).toBe('desktop-projects');
      expect(component['DROPDOWNS'].LANGUAGE).toBe('desktop-language');
      expect(component['DROPDOWNS'].MOBILE_MENU).toBe('mobile-menu');
      expect(component['DROPDOWNS'].MOBILE_SERVICES).toBe('mobile-services');
      expect(component['DROPDOWNS'].MOBILE_CASE_STUDY).toBe('mobile-case-study');
      expect(component['DROPDOWNS'].MOBILE_LANGUAGE).toBe('mobile-language');
    });
  });
});
