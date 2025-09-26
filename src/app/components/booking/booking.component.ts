import { Component, OnInit, AfterViewInit, Inject, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser, NgIf } from '@angular/common';
import { TranslatePipe } from '../../core/pipes/translate.pipe';
import { TranslationService } from '../../core/services/translation.service';

@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [NgIf, TranslatePipe],
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit, AfterViewInit {
  public showIframe = false;
  public showFallback = false;
  public calendarLoaded = false;
  private calendarLoadAttempted = false;

  // Use a working Cal.com demo link or create a Calendly integration
  private readonly calLink = 'team/ait-labs/30min'; // Updated to a more standard format
  private readonly calUrl = `https://cal.com/${this.calLink}`;

  // Inject translation service
  private translationService = inject(TranslationService);

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit(): void {
    // Initialize with both iframe and fallback hidden
    this.showIframe = false;
    this.showFallback = false;
  }

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      // Try to load the Cal.com embed first
      setTimeout(() => {
        this.loadCalComEmbed();
      }, 500);
    }
  }

  private loadCalendar(): void {
    if (this.calendarLoadAttempted) return;
    this.calendarLoadAttempted = true;

    // Try iframe approach first (more reliable)
    this.tryIframeApproach();
  }

  private tryIframeApproach(): void {
    try {
      // Create iframe element with a working Cal.com embed
      const iframe = document.createElement('iframe');

      // Use Calendly as a more reliable alternative
      iframe.src = 'https://calendly.com/ait-labs/30min';
      iframe.width = '100%';
      iframe.height = '700px';
      iframe.style.border = 'none';
      iframe.style.borderRadius = '12px';
      iframe.style.minHeight = '700px';
      iframe.allow = 'camera; microphone; autoplay; fullscreen; picture-in-picture';
      iframe.id = 'booking-iframe';
      iframe.title = 'Schedule a meeting with AIT LABS';

      // Handle iframe load
      iframe.onload = () => {
        console.log('Booking calendar iframe loaded successfully');
        this.calendarLoaded = true;
        this.showIframe = true;
        this.showFallback = false;
      };

      // Handle iframe error
      iframe.onerror = () => {
        console.error('Failed to load booking calendar iframe');
        this.showFallbackMessage();
      };

      // Add iframe to container
      const container = document.getElementById('cal-iframe-container');
      if (container) {
        container.innerHTML = '';
        container.appendChild(iframe);

        // Set a shorter timeout since iframe loading is usually faster
        setTimeout(() => {
          if (!this.calendarLoaded) {
            // If Calendly doesn't work, try a simple contact form approach
            this.createContactForm();
          }
        }, 5000);
      } else {
        console.error('Calendar container not found');
        this.showFallbackMessage();
      }

    } catch (error) {
      console.error('Error creating booking calendar iframe:', error);
      this.showFallbackMessage();
    }
  }

  private loadCalComEmbed(): void {
    const container = document.getElementById('cal-iframe-container');
    if (container) {
      // Clear container and add Cal.com embed
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
          calLink: "argentino-luca/30min",
        });
        Cal.ns["30min"]("ui", {"theme":"light","hideEventTypeDetails":false,"layout":"month_view"});
      `;

      // Add script to document head
      document.head.appendChild(script);

      // Set timeout to check if Cal.com loaded successfully
      setTimeout(() => {
        const calElement = document.getElementById('my-cal-inline-30min');
        if (calElement && calElement.children.length === 0) {
          console.log('Cal.com embed failed to load, showing fallback');
          this.createContactForm();
        } else {
          console.log('Cal.com embed loaded successfully');
          this.calendarLoaded = true;
          this.showIframe = true;
          this.showFallback = false;
        }
      }, 5000);

    } else {
      console.error('Calendar container not found');
      this.createContactForm();
    }
  }

  private createContactForm(): void {
    const container = document.getElementById('cal-iframe-container');
    if (container) {
      container.innerHTML = `
        <div class="bg-white rounded-lg p-8 text-center">
          <div class="mb-6">
            <div class="w-16 h-16 bg-primary-green rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3a2 2 0 012-2h4a2 2 0 012 2v4m-6 4v10a2 2 0 002 2h4a2 2 0 002-2V11M9 7h6"></path>
              </svg>
            </div>
            <h3 class="text-2xl font-bold text-gray-900 mb-2">Schedule Your Free Consultation</h3>
            <p class="text-gray-600">Let's discuss how AI can transform your business</p>
          </div>

          <div class="space-y-4 mb-6">
            <div class="flex items-center justify-center space-x-2 text-gray-700">
              <svg class="w-5 h-5 text-primary-green" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd"></path>
              </svg>
              <span>30-minute free consultation</span>
            </div>
            <div class="flex items-center justify-center space-x-2 text-gray-700">
              <svg class="w-5 h-5 text-primary-green" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"></path>
              </svg>
              <span>Video call via Google Meet</span>
            </div>
            <div class="flex items-center justify-center space-x-2 text-gray-700">
              <svg class="w-5 h-5 text-primary-green" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd"></path>
              </svg>
              <span>Flexible scheduling in your timezone</span>
            </div>
          </div>

          <div class="flex flex-col sm:flex-row gap-3 justify-center">
            <button onclick="window.open('mailto:office@ait-labs.com?subject=Free AI Consultation Request&body=Hi AIT LABS team,%0A%0AI would like to schedule a free 30-minute consultation to discuss how AI can help my business.%0A%0APlease let me know your available times.%0A%0ABest regards', '_blank')"
                    class="inline-flex items-center px-6 py-3 bg-primary-green text-black font-semibold rounded-lg hover:bg-opacity-90 transition-colors">
              <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
              </svg>
              Schedule via Email
            </button>
            <button onclick="window.open('https://wa.me/41123456789?text=Hi%20AIT%20LABS%2C%20I%20would%20like%20to%20schedule%20a%20free%20consultation%20about%20AI%20solutions%20for%20my%20business.', '_blank')"
                    class="inline-flex items-center px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors">
              <svg class="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.688"/>
              </svg>
              WhatsApp
            </button>
          </div>
        </div>
      `;

      this.calendarLoaded = true;
      this.showIframe = true;
      this.showFallback = false;
    }
  }

  private showFallbackMessage(): void {
    this.showIframe = false;
    this.showFallback = true;
  }

  public openCalInNewTab(): void {
    // Open email instead since the Cal.com link doesn't work
    window.open('mailto:office@ait-labs.com?subject=Free AI Consultation Request&body=Hi AIT LABS team,%0A%0AI would like to schedule a free 30-minute consultation to discuss how AI can help my business.%0A%0APlease let me know your available times.%0A%0ABest regards', '_blank');
  }
}
