import { Component, OnInit, AfterViewInit, Inject, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser, NgIf } from '@angular/common';
import { TranslatePipe } from '../../core/pipes/translate.pipe';
import { CalendarIntegrationService } from '../../core/services/calendar-integration.service';
import { ContactFormFallbackComponent } from './contact-form-fallback/contact-form-fallback.component';

@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [NgIf, TranslatePipe, ContactFormFallbackComponent],
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit, AfterViewInit {
  protected showCalendar = false;
  protected showFallback = false;
  protected calendarProvider: 'calcom' | 'calendly' | 'fallback' = 'calcom';

  private calendarService = inject(CalendarIntegrationService);

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit(): void {
    this.showCalendar = false;
    this.showFallback = false;
  }

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      setTimeout(() => {
        this.loadCalendar();
      }, 1000); // Increased timeout to ensure DOM is ready
    }
  }

  private async loadCalendar(): Promise<void> {
    try {
      // Try Cal.com first
      const result = await this.calendarService.loadCalComEmbed('cal-iframe-container');

      if (result.success) {
        this.calendarProvider = 'calcom';
        this.showCalendar = true;
        this.showFallback = false;
        return;
      }

      // Fallback to Calendly
      await this.loadCalendlyFallback();
    } catch (error) {
      this.showContactFormFallback();
    }
  }

  private async loadCalendlyFallback(): Promise<void> {
    try {
      const result = await this.calendarService.loadCalendlyIframe('cal-iframe-container');

      if (result.success) {
        console.log('BookingComponent: Calendly loaded successfully');
        this.calendarProvider = 'calendly';
        this.showCalendar = true;
        this.showFallback = false;
      } else {
        this.showContactFormFallback();
      }
    } catch (error) {
      this.showContactFormFallback();
    }
  }

  private showContactFormFallback(): void {
    this.calendarProvider = 'fallback';
    this.showCalendar = false;
    this.showFallback = true;
  }
}
