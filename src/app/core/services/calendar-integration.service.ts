import { Injectable, signal } from '@angular/core';
import { CalendarProvider, CalendarLoadResult } from '../models/booking.model';

// Type definition for Cal.com global object
interface CalComApi {
  (namespace: string, action: string, options?: Record<string, unknown>): void;
}

declare global {
  interface Window {
    Cal?: CalComApi;
  }
}

@Injectable({
  providedIn: 'root',
})
export class CalendarIntegrationService {
  private readonly calLink = 'argentino-luca/30min';
  private readonly calendlyLink = 'https://calendly.com/ait-labs/30min';
  private calScript: HTMLScriptElement | null = null;

  /**
   * Attempt to load Cal.com embed using iframe approach
   */
  async loadCalComEmbed(containerId: string): Promise<CalendarLoadResult> {
    const container = document.getElementById(containerId);
    if (!container) {
      throw new Error(`Container ${containerId} not found`);
    }

    try {
      // Create iframe for Cal.com
      const iframe = document.createElement('iframe');
      iframe.src = `https://app.cal.com/${this.calLink}`;
      iframe.width = '100%';
      iframe.height = '600px';
      iframe.style.border = 'none';
      iframe.style.borderRadius = '12px';
      iframe.style.minHeight = '600px';
      iframe.allow = 'camera; microphone; autoplay; fullscreen; picture-in-picture';
      iframe.id = 'cal-booking-iframe';
      iframe.title = 'Schedule a meeting with AIT LABS';

      // Clear container and add iframe
      container.innerHTML = '';
      container.appendChild(iframe);
      // Wait for iframe to load with proper promise handling
      return new Promise((resolve) => {
        let resolved = false;

        const resolveOnce = (result: CalendarLoadResult) => {
          if (!resolved) {
            resolved = true;
            resolve(result);
          }
        };

        // Success handler
        const onLoad = () => {
          resolveOnce({
            success: true,
            provider: 'calcom',
            container,
          });
        };

        // Error handler
        const onError = () => {
          resolveOnce({
            success: false,
            provider: 'calcom',
            container,
          });
        };

        // Set up event listeners
        iframe.addEventListener('load', onLoad);
        iframe.addEventListener('error', onError);

        // Timeout fallback - resolve as failure after 6 seconds
        setTimeout(() => {
          resolveOnce({
            success: false,
            provider: 'calcom',
            container,
          });
        }, 6000);
      });
    } catch (error) {
      return {
        success: false,
        provider: 'calcom',
        container,
      };
    }
  }

  /**
   * Load Calendly iframe as fallback
   */
  async loadCalendlyIframe(containerId: string): Promise<CalendarLoadResult> {
    const container = document.getElementById(containerId);
    if (!container) {
      throw new Error(`Container ${containerId} not found`);
    }

    try {
      const iframe = document.createElement('iframe');
      iframe.src = this.calendlyLink;
      iframe.width = '100%';
      iframe.height = '700px';
      iframe.style.border = 'none';
      iframe.style.borderRadius = '12px';
      iframe.style.minHeight = '700px';
      iframe.allow = 'camera; microphone; autoplay; fullscreen; picture-in-picture';
      iframe.id = 'calendly-booking-iframe';
      iframe.title = 'Schedule a meeting with AIT LABS';

      container.innerHTML = '';
      container.appendChild(iframe);

      // Return success immediately as Calendly is more reliable
      return {
        success: true,
        provider: 'calendly',
        container,
      };
    } catch (error) {
      return {
        success: false,
        provider: 'calendly',
        container,
      };
    }
  }
}
