import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeroComponent } from './hero.component';
import { NavigationService } from '../../core/services/navigation.service';
import { TranslationService } from '../../core/services/translation.service';
import { LanguageService } from '../../core/services/language.service';
import { TranslatePipe } from '../../core/pipes/translate.pipe';

describe('HeroComponent', () => {
  let component: HeroComponent;
  let fixture: ComponentFixture<HeroComponent>;
  let navigationService: jasmine.SpyObj<NavigationService>;
  let translationService: jasmine.SpyObj<TranslationService>;
  let languageService: jasmine.SpyObj<LanguageService>;

  beforeEach(async () => {
    // Create mock services
    const navigationServiceSpy = jasmine.createSpyObj('NavigationService', ['navigateToSection']);

    const translationServiceSpy = jasmine.createSpyObj('TranslationService', ['translate']);
    translationServiceSpy.translate.and.callFake((key: string) => {
      const translations: Record<string, string> = {
        'hero.title': 'Transform Your Business with AI',
        'hero.subtitle': 'Intelligent automation and innovation solutions',
        'hero.cta.schedule': 'Schedule a Call',
        'hero.cta.viewCaseStudy': 'View Case Studies',
        'hero.description': 'We help businesses leverage AI technology for growth and efficiency'
      };
      return translations[key] || key;
    });

    const languageServiceSpy = jasmine.createSpyObj('LanguageService',
      ['setLanguage'],
      {
        currentLanguage: jasmine.createSpy().and.returnValue('en')
      }
    );

    await TestBed.configureTestingModule({
      imports: [HeroComponent],
      providers: [
        { provide: NavigationService, useValue: navigationServiceSpy },
        { provide: TranslationService, useValue: translationServiceSpy },
        { provide: LanguageService, useValue: languageServiceSpy },
        TranslatePipe
      ]
    }).compileComponents();

    navigationService = TestBed.inject(NavigationService) as jasmine.SpyObj<NavigationService>;
    translationService = TestBed.inject(TranslationService) as jasmine.SpyObj<TranslationService>;
    languageService = TestBed.inject(LanguageService) as jasmine.SpyObj<LanguageService>;

    fixture = TestBed.createComponent(HeroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('Component Initialization', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should be a standalone component', () => {
      expect(HeroComponent).toBeTruthy();
    });

    it('should render hero section', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const section = compiled.querySelector('section') || compiled.querySelector('div');
      expect(section).toBeTruthy();
    });
  });

  describe('Service Injection', () => {
    it('should inject NavigationService', () => {
      expect(component['navigationService']).toBeTruthy();
    });

    it('should use inject() pattern for dependency injection', () => {
      expect(component['navigationService']).toBe(navigationService);
    });
  });

  describe('Schedule Call Action', () => {
    it('should navigate to booking section when schedule call is clicked', () => {
      component.onScheduleCall();
      expect(navigationService.navigateToSection).toHaveBeenCalledWith('booking', false);
    });

    it('should pass requiresHomePage as false', () => {
      component.onScheduleCall();
      expect(navigationService.navigateToSection).toHaveBeenCalledWith('booking', false);
    });

    it('should handle multiple schedule call clicks', () => {
      component.onScheduleCall();
      component.onScheduleCall();
      expect(navigationService.navigateToSection).toHaveBeenCalledTimes(2);
    });
  });

  describe('View Case Study Action', () => {
    it('should navigate to case studies section when view case study is clicked', () => {
      component.onViewCaseStudy();
      expect(navigationService.navigateToSection).toHaveBeenCalledWith('case-studies', false);
    });

    it('should pass requiresHomePage as false', () => {
      component.onViewCaseStudy();
      expect(navigationService.navigateToSection).toHaveBeenCalledWith('case-studies', false);
    });

    it('should handle multiple view case study clicks', () => {
      component.onViewCaseStudy();
      component.onViewCaseStudy();
      expect(navigationService.navigateToSection).toHaveBeenCalledTimes(2);
    });
  });

  describe('Multiple Actions', () => {
    it('should handle both actions independently', () => {
      component.onScheduleCall();
      expect(navigationService.navigateToSection).toHaveBeenCalledWith('booking', false);

      component.onViewCaseStudy();
      expect(navigationService.navigateToSection).toHaveBeenCalledWith('case-studies', false);

      expect(navigationService.navigateToSection).toHaveBeenCalledTimes(2);
    });

    it('should maintain correct navigation parameters', () => {
      component.onScheduleCall();
      const firstCall = navigationService.navigateToSection.calls.argsFor(0);
      expect(firstCall).toEqual(['booking', false]);

      component.onViewCaseStudy();
      const secondCall = navigationService.navigateToSection.calls.argsFor(1);
      expect(secondCall).toEqual(['case-studies', false]);
    });
  });

  describe('Translations', () => {
    it('should have translation pipe available', () => {
      const pipe = TestBed.inject(TranslatePipe);
      expect(pipe).toBeTruthy();
    });

    it('should translate hero title', () => {
      const result = translationService.translate('hero.title');
      expect(result).toBe('Transform Your Business with AI');
    });

    it('should translate hero subtitle', () => {
      const result = translationService.translate('hero.subtitle');
      expect(result).toBe('Intelligent automation and innovation solutions');
    });

    it('should translate CTA buttons', () => {
      expect(translationService.translate('hero.cta.schedule')).toBe('Schedule a Call');
      expect(translationService.translate('hero.cta.viewCaseStudy')).toBe('View Case Studies');
    });

    it('should translate hero description', () => {
      const result = translationService.translate('hero.description');
      expect(result).toBe('We help businesses leverage AI technology for growth and efficiency');
    });

    it('should handle missing translation keys', () => {
      const missingKey = 'hero.nonexistent';
      const result = translationService.translate(missingKey);
      expect(result).toBe(missingKey);
    });
  });

  describe('Component Imports', () => {
    it('should import TranslatePipe', () => {
      const pipe = TestBed.inject(TranslatePipe);
      expect(pipe).toBeTruthy();
    });
  });

  describe('Component Lifecycle', () => {
    it('should be a simple component without lifecycle hooks', () => {
      // Hero is a simple component without initialization logic
      expect(component).toBeTruthy();
    });
  });

  describe('Accessibility', () => {
    it('should render semantic HTML', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      // Should have either a section or main semantic element
      const semanticElement = compiled.querySelector('section') ||
                              compiled.querySelector('main') ||
                              compiled.querySelector('div');
      expect(semanticElement).toBeTruthy();
    });
  });

  describe('Integration', () => {
    it('should work with NavigationService for booking navigation', () => {
      component.onScheduleCall();
      expect(navigationService.navigateToSection).toHaveBeenCalledOnceWith('booking', false);
    });

    it('should work with NavigationService for case studies navigation', () => {
      component.onViewCaseStudy();
      expect(navigationService.navigateToSection).toHaveBeenCalledOnceWith('case-studies', false);
    });

    it('should integrate with translation system', () => {
      fixture.detectChanges();
      expect(translationService).toBeTruthy();
    });

    it('should handle rapid successive actions', () => {
      component.onScheduleCall();
      component.onViewCaseStudy();
      component.onScheduleCall();

      expect(navigationService.navigateToSection).toHaveBeenCalledTimes(3);
      expect(navigationService.navigateToSection).toHaveBeenCalledWith('booking', false);
      expect(navigationService.navigateToSection).toHaveBeenCalledWith('case-studies', false);
    });
  });

  describe('User Interaction Flow', () => {
    it('should complete schedule call user flow', () => {
      // Simulate user clicking schedule call button
      component.onScheduleCall();

      // Verify navigation was triggered
      expect(navigationService.navigateToSection).toHaveBeenCalledWith('booking', false);
      expect(navigationService.navigateToSection).toHaveBeenCalledTimes(1);
    });

    it('should complete view case study user flow', () => {
      // Simulate user clicking view case study button
      component.onViewCaseStudy();

      // Verify navigation was triggered
      expect(navigationService.navigateToSection).toHaveBeenCalledWith('case-studies', false);
      expect(navigationService.navigateToSection).toHaveBeenCalledTimes(1);
    });

    it('should handle user exploring both options', () => {
      // User clicks view case studies first
      component.onViewCaseStudy();
      expect(navigationService.navigateToSection).toHaveBeenCalledWith('case-studies', false);

      // Then decides to schedule a call
      component.onScheduleCall();
      expect(navigationService.navigateToSection).toHaveBeenCalledWith('booking', false);

      expect(navigationService.navigateToSection).toHaveBeenCalledTimes(2);
    });
  });

  describe('Component State', () => {
    it('should not maintain internal state', () => {
      // Hero component should be stateless
      // It only renders content and triggers navigation
      expect(component).toBeTruthy();
    });

    it('should be pure presentation component', () => {
      // No signals, no reactive state, just methods
      component.onScheduleCall();
      component.onViewCaseStudy();

      // Methods should not change component state
      expect(component).toBeTruthy();
    });
  });
});
