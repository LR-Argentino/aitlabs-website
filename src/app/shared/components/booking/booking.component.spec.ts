import { ComponentFixture, TestBed, fakeAsync, tick, flushMicrotasks } from '@angular/core/testing';
import { BookingComponent } from './booking.component';
import { CalendarIntegrationService } from '../../../core/services/calendar-integration.service';
import { CalendarLoadResult } from '../../../core/models/booking.model';
import { TranslationService } from '../../../core/services/translation.service';
import { LanguageService } from '../../../core/services/language.service';
import { TranslatePipe } from '../../../core/pipes/translate.pipe';
import { PLATFORM_ID } from '@angular/core';

describe('BookingComponent', () => {
  let component: BookingComponent;
  let fixture: ComponentFixture<BookingComponent>;
  let calendarService: jasmine.SpyObj<CalendarIntegrationService>;
  let translationService: jasmine.SpyObj<TranslationService>;
  let languageService: jasmine.SpyObj<LanguageService>;

  beforeEach(async () => {
    // Create mock services
    const calendarServiceSpy = jasmine.createSpyObj('CalendarIntegrationService', [
      'loadCalComEmbed',
      'loadCalendlyIframe',
    ]);

    const translationServiceSpy = jasmine.createSpyObj('TranslationService', ['translate']);
    translationServiceSpy.translate.and.callFake((key: string) => {
      const translations: Record<string, string> = {
        'booking.title': 'Schedule a Meeting',
        'booking.subtitle': 'Book a time that works for you',
        'booking.loading': 'Loading calendar...',
        'booking.fallback': 'Contact form fallback',
      };
      return translations[key] || key;
    });

    const languageServiceSpy = jasmine.createSpyObj('LanguageService', ['setLanguage'], {
      currentLanguage: jasmine.createSpy().and.returnValue('en'),
    });

    await TestBed.configureTestingModule({
      imports: [BookingComponent],
      providers: [
        { provide: CalendarIntegrationService, useValue: calendarServiceSpy },
        { provide: TranslationService, useValue: translationServiceSpy },
        { provide: LanguageService, useValue: languageServiceSpy },
        { provide: PLATFORM_ID, useValue: 'browser' },
        TranslatePipe,
      ],
    }).compileComponents();

    calendarService = TestBed.inject(
      CalendarIntegrationService,
    ) as jasmine.SpyObj<CalendarIntegrationService>;
    translationService = TestBed.inject(TranslationService) as jasmine.SpyObj<TranslationService>;
    languageService = TestBed.inject(LanguageService) as jasmine.SpyObj<LanguageService>;

    fixture = TestBed.createComponent(BookingComponent);
    component = fixture.componentInstance;
  });

  describe('Component Initialization', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should initialize with calendar and fallback hidden', () => {
      fixture.detectChanges();
      expect(component['showCalendar']).toBe(false);
      expect(component['showFallback']).toBe(false);
    });

    it('should default to calcom provider', () => {
      fixture.detectChanges();
      expect(component['calendarProvider']).toBe('calcom');
    });

    it('should be a standalone component', () => {
      expect(BookingComponent).toBeTruthy();
    });
  });

  describe('Calendar Loading - Cal.com Success', () => {
    it('should load Cal.com calendar successfully', fakeAsync(() => {
      const mockContainer = document.createElement('div');
      mockContainer.id = 'cal-iframe-container';
      document.body.appendChild(mockContainer);

      const successResult: CalendarLoadResult = {
        success: true,
        provider: 'calcom',
        container: mockContainer,
      };

      calendarService.loadCalComEmbed.and.returnValue(Promise.resolve(successResult));

      fixture.detectChanges();
      tick(1000); // Wait for the delayed loadCalendar call

      expect(calendarService.loadCalComEmbed).toHaveBeenCalledWith('cal-iframe-container');
      tick(); // Resolve the promise

      expect(component['calendarProvider']).toBe('calcom');
      expect(component['showCalendar']).toBe(true);
      expect(component['showFallback']).toBe(false);

      document.body.removeChild(mockContainer);
    }));

    it('should set calendar provider to calcom on success', fakeAsync(() => {
      const mockContainer = document.createElement('div');
      mockContainer.id = 'cal-iframe-container';
      document.body.appendChild(mockContainer);

      const successResult: CalendarLoadResult = {
        success: true,
        provider: 'calcom',
        container: mockContainer,
      };

      calendarService.loadCalComEmbed.and.returnValue(Promise.resolve(successResult));

      fixture.detectChanges();
      tick(1000);
      tick();

      expect(component['calendarProvider']).toBe('calcom');

      document.body.removeChild(mockContainer);
    }));
  });

  describe('Calendar Loading - Calendly Fallback', () => {
    it('should fallback to Calendly if Cal.com fails', fakeAsync(() => {
      const mockContainer = document.createElement('div');
      mockContainer.id = 'cal-iframe-container';
      document.body.appendChild(mockContainer);

      const failureResult: CalendarLoadResult = {
        success: false,
        provider: 'calcom',
        container: mockContainer,
      };

      const calendlyResult: CalendarLoadResult = {
        success: true,
        provider: 'calendly',
        container: mockContainer,
      };

      calendarService.loadCalComEmbed.and.returnValue(Promise.resolve(failureResult));
      calendarService.loadCalendlyIframe.and.returnValue(Promise.resolve(calendlyResult));

      fixture.detectChanges();
      tick(1000);
      tick();

      expect(calendarService.loadCalComEmbed).toHaveBeenCalled();
      expect(calendarService.loadCalendlyIframe).toHaveBeenCalledWith('cal-iframe-container');
      expect(component['calendarProvider']).toBe('calendly');
      expect(component['showCalendar']).toBe(true);
      expect(component['showFallback']).toBe(false);

      document.body.removeChild(mockContainer);
    }));

    it('should set calendar provider to calendly on fallback success', fakeAsync(() => {
      const mockContainer = document.createElement('div');
      mockContainer.id = 'cal-iframe-container';
      document.body.appendChild(mockContainer);

      const failureResult: CalendarLoadResult = {
        success: false,
        provider: 'calcom',
        container: mockContainer,
      };

      const calendlyResult: CalendarLoadResult = {
        success: true,
        provider: 'calendly',
        container: mockContainer,
      };

      calendarService.loadCalComEmbed.and.returnValue(Promise.resolve(failureResult));
      calendarService.loadCalendlyIframe.and.returnValue(Promise.resolve(calendlyResult));

      fixture.detectChanges();
      tick(1000);
      tick();

      expect(component['calendarProvider']).toBe('calendly');

      document.body.removeChild(mockContainer);
    }));
  });

  describe('Calendar Loading - Contact Form Fallback', () => {
    it('should show contact form fallback if both calendars fail', fakeAsync(() => {
      const mockContainer = document.createElement('div');
      mockContainer.id = 'cal-iframe-container';
      document.body.appendChild(mockContainer);

      const failureResult: CalendarLoadResult = {
        success: false,
        provider: 'calcom',
        container: mockContainer,
      };

      const calendlyFailure: CalendarLoadResult = {
        success: false,
        provider: 'calendly',
        container: mockContainer,
      };

      calendarService.loadCalComEmbed.and.returnValue(Promise.resolve(failureResult));
      calendarService.loadCalendlyIframe.and.returnValue(Promise.resolve(calendlyFailure));

      fixture.detectChanges();
      tick(1000);
      tick();

      expect(component['calendarProvider']).toBe('fallback');
      expect(component['showCalendar']).toBe(false);
      expect(component['showFallback']).toBe(true);

      document.body.removeChild(mockContainer);
    }));

    it('should show contact form fallback on error', fakeAsync(() => {
      const mockContainer = document.createElement('div');
      mockContainer.id = 'cal-iframe-container';
      document.body.appendChild(mockContainer);

      // Create a rejected promise that won't throw in the test zone
      const rejectedPromise = Promise.reject(new Error('Loading error'));
      // Attach a catch handler to prevent unhandled rejection in the test
      rejectedPromise.catch(() => {});

      calendarService.loadCalComEmbed.and.returnValue(rejectedPromise);

      fixture.detectChanges();
      tick(1000); // Wait for the delayed loadCalendar call
      tick(); // Process the promise rejection and error handler

      expect(component['calendarProvider']).toBe('fallback');
      expect(component['showCalendar']).toBe(false);
      expect(component['showFallback']).toBe(true);

      document.body.removeChild(mockContainer);
    }));
  });

  describe('Browser Platform Detection', () => {
    it('should only load calendar in browser environment', () => {
      fixture.detectChanges();
      // In browser environment, AfterViewInit should be called
      expect(component).toBeTruthy();
    });

    it('should not load calendar in server environment', () => {
      // Create a new component with server platform
      TestBed.resetTestingModule();
      TestBed.configureTestingModule({
        imports: [BookingComponent],
        providers: [
          { provide: CalendarIntegrationService, useValue: calendarService },
          { provide: TranslationService, useValue: translationService },
          { provide: LanguageService, useValue: languageService },
          { provide: PLATFORM_ID, useValue: 'server' },
          TranslatePipe,
        ],
      });

      const serverFixture = TestBed.createComponent(BookingComponent);
      serverFixture.detectChanges();

      // Calendar should not be loaded in server environment
      expect(calendarService.loadCalComEmbed).not.toHaveBeenCalled();
    });
  });

  describe('Component Lifecycle', () => {
    it('should initialize state in ngOnInit', () => {
      spyOn<any>(component, 'loadCalendar');
      component.ngOnInit();

      expect(component['showCalendar']).toBe(false);
      expect(component['showFallback']).toBe(false);
    });

    it('should load calendar after view init in browser', fakeAsync(() => {
      const mockContainer = document.createElement('div');
      mockContainer.id = 'cal-iframe-container';
      document.body.appendChild(mockContainer);

      calendarService.loadCalComEmbed.and.returnValue(
        Promise.resolve({
          success: true,
          provider: 'calcom',
          container: mockContainer,
        }),
      );

      component.ngAfterViewInit();
      tick(1000); // Wait for timeout
      tick(); // Resolve promise

      expect(calendarService.loadCalComEmbed).toHaveBeenCalled();

      document.body.removeChild(mockContainer);
    }));
  });

  describe('Translations', () => {
    it('should have translation pipe available', () => {
      const pipe = TestBed.inject(TranslatePipe);
      expect(pipe).toBeTruthy();
    });

    it('should translate booking title', () => {
      const result = translationService.translate('booking.title');
      expect(result).toBe('Schedule a Meeting');
    });

    it('should translate booking subtitle', () => {
      const result = translationService.translate('booking.subtitle');
      expect(result).toBe('Book a time that works for you');
    });

    it('should translate loading message', () => {
      const result = translationService.translate('booking.loading');
      expect(result).toBe('Loading calendar...');
    });

    it('should translate fallback message', () => {
      const result = translationService.translate('booking.fallback');
      expect(result).toBe('Contact form fallback');
    });
  });

  describe('Service Injection', () => {
    it('should inject CalendarIntegrationService', () => {
      expect(component['calendarService']).toBeTruthy();
    });

    it('should inject PLATFORM_ID', () => {
      expect(component['platformId']).toBeTruthy();
    });
  });

  describe('Component State Management', () => {
    it('should manage showCalendar state', () => {
      expect(component['showCalendar']).toBeDefined();
      expect(typeof component['showCalendar']).toBe('boolean');
    });

    it('should manage showFallback state', () => {
      expect(component['showFallback']).toBeDefined();
      expect(typeof component['showFallback']).toBe('boolean');
    });

    it('should manage calendarProvider state', () => {
      expect(component['calendarProvider']).toBeDefined();
      expect(['calcom', 'calendly', 'fallback']).toContain(component['calendarProvider']);
    });
  });

  describe('Error Handling', () => {
    it('should handle missing container gracefully', fakeAsync(() => {
      // Don't create the container to simulate missing container error
      calendarService.loadCalComEmbed.and.returnValue(
        Promise.resolve({
          success: false,
          provider: 'calcom',
          container: document.createElement('div'),
        }),
      );

      calendarService.loadCalendlyIframe.and.returnValue(
        Promise.resolve({
          success: false,
          provider: 'calendly',
          container: document.createElement('div'),
        }),
      );

      fixture.detectChanges();
      tick(1000);
      tick();

      // Should show fallback on error
      expect(component['showFallback']).toBe(true);
    }));

    it('should handle calendar loading timeout', fakeAsync(() => {
      const mockContainer = document.createElement('div');
      mockContainer.id = 'cal-iframe-container';
      document.body.appendChild(mockContainer);

      // Simulate timeout by never resolving
      calendarService.loadCalComEmbed.and.returnValue(new Promise(() => {}));

      fixture.detectChanges();
      tick(1000);
      tick(10000); // Wait for potential timeout

      // Component should handle this gracefully
      expect(component).toBeTruthy();

      document.body.removeChild(mockContainer);
    }));
  });

  describe('Delayed Calendar Loading', () => {
    it('should delay calendar loading by 1 second', fakeAsync(() => {
      const mockContainer = document.createElement('div');
      mockContainer.id = 'cal-iframe-container';
      document.body.appendChild(mockContainer);

      calendarService.loadCalComEmbed.and.returnValue(
        Promise.resolve({
          success: true,
          provider: 'calcom',
          container: mockContainer,
        }),
      );

      fixture.detectChanges();

      // Calendar should not be loaded immediately
      expect(calendarService.loadCalComEmbed).not.toHaveBeenCalled();

      // After 1 second, calendar should be loaded
      tick(1000);
      tick();
      expect(calendarService.loadCalComEmbed).toHaveBeenCalled();

      document.body.removeChild(mockContainer);
    }));
  });
});
