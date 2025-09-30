import { Injectable, signal } from '@angular/core';

export type CalendarProvider = 'calcom' | 'calendly' | 'contact-form';

export interface CalendarLoadResult {
  success: boolean;
  provider: CalendarProvider;
  container: HTMLElement;
}

@Injectable({
  providedIn: 'root'
})
export class CalendarIntegrationService {
  private readonly calLink = 'argentino-luca/30min';
  private readonly calendlyLink = 'https://calendly.com/ait-labs/30min';

  /**
   * Attempt to load Cal.com embed
   */
  async loadCalComEmbed(containerId: string): Promise<CalendarLoadResult> {
    const container = document.getElementById(containerId);
    if (!container) {
      throw new Error(`Container ${containerId} not found`);
    }

    return new Promise((resolve) => {
      // Clear container
      container.innerHTML = `
        <div style="width:100%;height:600px;overflow:scroll" id="my-cal-inline-30min"></div>
      `;

      // Add Cal.com embed script
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.innerHTML = `
        (function (C, A, L) {
          let p = function (a, ar) { a.q.push(ar); };
          let d = C.document;
          C.Cal = C.Cal || function () {
            let cal = C.Cal;
            let ar = arguments;
            if (!cal.loaded) {
              cal.ns = {};
              cal.q = cal.q || [];
              d.head.appendChild(d.createElement("script")).src = A;
              cal.loaded = true;
            }
            if (ar[0] === L) {
              const api = function () { p(api, arguments); };
              const namespace = ar[1];
              api.q = api.q || [];
              if(typeof namespace === "string"){
                cal.ns[namespace] = cal.ns[namespace] || api;
                p(cal.ns[namespace], ar);
                p(cal, ["initNamespace", namespace]);
              } else p(cal, ar);
              return;
            }
            p(cal, ar);
          };
        })(window, "https://app.cal.com/embed/embed.js", "init");

        Cal("init", "30min", {origin:"https://app.cal.com"});
        Cal.ns["30min"]("inline", {
          elementOrSelector:"#my-cal-inline-30min",
          config: {"layout":"month_view","theme":"light"},
          calLink: "${this.calLink}",
        });
        Cal.ns["30min"]("ui", {"theme":"light","hideEventTypeDetails":false,"layout":"month_view"});
      `;

      document.head.appendChild(script);

      // Check if loaded after timeout
      setTimeout(() => {
        const calElement = document.getElementById('my-cal-inline-30min');
        const success = !!(calElement && calElement.children.length > 0);

        resolve({
          success,
          provider: 'calcom',
          container
        });
      }, 5000);
    });
  }

  /**
   * Load Calendly iframe as fallback
   */
  loadCalendlyIframe(containerId: string): CalendarLoadResult {
    const container = document.getElementById(containerId);
    if (!container) {
      throw new Error(`Container ${containerId} not found`);
    }

    const iframe = document.createElement('iframe');
    iframe.src = this.calendlyLink;
    iframe.width = '100%';
    iframe.height = '700px';
    iframe.style.border = 'none';
    iframe.style.borderRadius = '12px';
    iframe.style.minHeight = '700px';
    iframe.allow = 'camera; microphone; autoplay; fullscreen; picture-in-picture';
    iframe.id = 'booking-iframe';
    iframe.title = 'Schedule a meeting with AIT LABS';

    container.innerHTML = '';
    container.appendChild(iframe);

    return {
      success: true,
      provider: 'calendly',
      container
    };
  }
}
