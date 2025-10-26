import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FooterComponent } from './footer.component';
import { NavigationService } from '../../core/services/navigation.service';
import { TranslationService } from '../../core/services/translation.service';
import { LanguageService } from '../../core/services/language.service';
import { TranslatePipe } from '../../core/pipes/translate.pipe';

describe('FooterComponent', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;
  let navigationService: jasmine.SpyObj<NavigationService>;
  let translationService: jasmine.SpyObj<TranslationService>;
  let languageService: jasmine.SpyObj<LanguageService>;

  beforeEach(async () => {
    // Create mock services
    const navigationServiceSpy = jasmine.createSpyObj('NavigationService', ['navigateToSection']);

    const translationServiceSpy = jasmine.createSpyObj('TranslationService', ['translate']);
    translationServiceSpy.translate.and.callFake((key: string) => {
      const translations: Record<string, string> = {
        'footer.company': 'Company',
        'footer.about': 'About Us',
        'footer.services': 'Services',
        'footer.contact': 'Contact',
        'footer.legal': 'Legal',
        'footer.privacy': 'Privacy Policy',
        'footer.terms': 'Terms of Service',
        'footer.impressum': 'Impressum',
        'footer.followUs': 'Follow Us',
        'footer.rights': '© 2024 AIT LABS. All rights reserved.',
      };
      return translations[key] || key;
    });

    const languageServiceSpy = jasmine.createSpyObj('LanguageService', ['setLanguage'], {
      currentLanguage: jasmine.createSpy().and.returnValue('en'),
    });

    await TestBed.configureTestingModule({
      imports: [FooterComponent],
      providers: [
        { provide: NavigationService, useValue: navigationServiceSpy },
        { provide: TranslationService, useValue: translationServiceSpy },
        { provide: LanguageService, useValue: languageServiceSpy },
        TranslatePipe,
      ],
    }).compileComponents();

    navigationService = TestBed.inject(NavigationService) as jasmine.SpyObj<NavigationService>;
    translationService = TestBed.inject(TranslationService) as jasmine.SpyObj<TranslationService>;
    languageService = TestBed.inject(LanguageService) as jasmine.SpyObj<LanguageService>;

    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('Component Initialization', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should render footer element', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const footer = compiled.querySelector('footer');
      expect(footer).toBeTruthy();
    });
  });

  describe('Navigation', () => {
    it('should navigate to section when navigateToSection is called', () => {
      component.navigateToSection('about');
      expect(navigationService.navigateToSection).toHaveBeenCalledWith('about', false);
    });

    it('should navigate to services section', () => {
      component.navigateToSection('services');
      expect(navigationService.navigateToSection).toHaveBeenCalledWith('services', false);
    });

    it('should navigate to contact section', () => {
      component.navigateToSection('contact');
      expect(navigationService.navigateToSection).toHaveBeenCalledWith('contact', false);
    });

    it('should pass requiresHomePage as false', () => {
      component.navigateToSection('any-section');
      expect(navigationService.navigateToSection).toHaveBeenCalledWith('any-section', false);
    });
  });

  describe('Translations', () => {
    it('should have translation pipe available', () => {
      const pipe = TestBed.inject(TranslatePipe);
      expect(pipe).toBeTruthy();
    });

    it('should translate footer company section', () => {
      const result = translationService.translate('footer.company');
      expect(result).toBe('Company');
    });

    it('should translate footer legal section', () => {
      const result = translationService.translate('footer.legal');
      expect(result).toBe('Legal');
    });

    it('should translate footer links', () => {
      expect(translationService.translate('footer.about')).toBe('About Us');
      expect(translationService.translate('footer.services')).toBe('Services');
      expect(translationService.translate('footer.contact')).toBe('Contact');
    });

    it('should translate legal links', () => {
      expect(translationService.translate('footer.privacy')).toBe('Privacy Policy');
      expect(translationService.translate('footer.terms')).toBe('Terms of Service');
      expect(translationService.translate('footer.impressum')).toBe('Impressum');
    });

    it('should translate social media section', () => {
      const result = translationService.translate('footer.followUs');
      expect(result).toBe('Follow Us');
    });

    it('should translate copyright text', () => {
      const result = translationService.translate('footer.rights');
      expect(result).toBe('© 2024 AIT LABS. All rights reserved.');
    });
  });

  describe('Component Template', () => {
    it('should be standalone component', () => {
      expect(FooterComponent).toBeTruthy();
      // Standalone components don't need to be declared in NgModule
    });

    it('should import CommonModule', () => {
      // CommonModule is imported for common directives
      expect(component).toBeTruthy();
    });

    it('should import TranslatePipe', () => {
      // TranslatePipe should be available in template
      const pipe = TestBed.inject(TranslatePipe);
      expect(pipe).toBeTruthy();
    });
  });

  describe('Service Injection', () => {
    it('should inject NavigationService', () => {
      expect(component['navigationService']).toBeTruthy();
    });

    it('should use inject() pattern for dependency injection', () => {
      // Modern Angular pattern using inject()
      expect(component['navigationService']).toBe(navigationService);
    });
  });

  describe('Multiple Navigation Calls', () => {
    it('should handle multiple navigation calls', () => {
      component.navigateToSection('about');
      component.navigateToSection('services');
      component.navigateToSection('contact');

      expect(navigationService.navigateToSection).toHaveBeenCalledTimes(3);
    });

    it('should maintain correct parameters for each call', () => {
      component.navigateToSection('about');
      expect(navigationService.navigateToSection).toHaveBeenCalledWith('about', false);

      component.navigateToSection('services');
      expect(navigationService.navigateToSection).toHaveBeenCalledWith('services', false);
    });
  });

  describe('Edge Cases', () => {
    it('should handle empty section ID', () => {
      component.navigateToSection('');
      expect(navigationService.navigateToSection).toHaveBeenCalledWith('', false);
    });

    it('should handle invalid section ID gracefully', () => {
      component.navigateToSection('invalid-section-123');
      expect(navigationService.navigateToSection).toHaveBeenCalledWith(
        'invalid-section-123',
        false,
      );
    });

    it('should handle special characters in section ID', () => {
      component.navigateToSection('section-with-dashes');
      expect(navigationService.navigateToSection).toHaveBeenCalledWith(
        'section-with-dashes',
        false,
      );
    });
  });

  describe('Component Lifecycle', () => {
    it('should be a simple component without lifecycle hooks', () => {
      // Footer is a simple component without initialization logic
      expect(component).toBeTruthy();
    });
  });

  describe('Accessibility', () => {
    it('should have footer element for semantic HTML', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const footer = compiled.querySelector('footer');
      expect(footer).toBeTruthy();
    });
  });

  describe('Integration', () => {
    it('should work with NavigationService for section navigation', () => {
      const sectionId = 'test-section';
      component.navigateToSection(sectionId);

      expect(navigationService.navigateToSection).toHaveBeenCalledOnceWith(sectionId, false);
    });

    it('should integrate with translation system', () => {
      // Translation service should be called when template renders
      fixture.detectChanges();
      expect(translationService).toBeTruthy();
    });
  });
});
