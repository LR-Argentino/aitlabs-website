import { Component, OnInit, AfterViewInit, Inject, PLATFORM_ID, ElementRef, ViewChild } from '@angular/core';
import { isPlatformBrowser, NgIf } from '@angular/common';

@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [NgIf],
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit, AfterViewInit {
  @ViewChild('calContainer') calContainer!: ElementRef;
  
  public showIframe = false;
  public showFallback = false;
  public calendarLoaded = false;
  private calendarLoadAttempted = false;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit(): void {
    // Initialize with both iframe and fallback hidden
    this.showIframe = false;
    this.showFallback = false;
  }

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      // Try to load Cal.com calendar
      this.loadCalendar();
      
      // Set a timeout to check if calendar loaded successfully
      setTimeout(() => {
        if (!this.calendarLoaded) {
          this.showFallbackMessage();
        }
      }, 5000); // 5 seconds timeout
    }
  }

  private loadCalendar(): void {
    if (this.calendarLoadAttempted) return;
    this.calendarLoadAttempted = true;
    
    try {
      // First attempt: Try to load using Cal.com embed script
      const script = document.createElement('script');
      script.src = 'https://cal.com/embed.js';
      script.async = true;
      
      // Handle script load success
      script.onload = () => {
        if (typeof (window as any).Cal !== 'undefined') {
          // Initialize Cal.com
          (window as any).Cal('inline', {
            elementOrSelector: '#my-cal-inline',
            calLink: 'argentino-luca/30min',
            layout: 'month_view',
            hideEventTypeDetails: false,
            theme: 'light'
          });
          
          // Check if calendar was actually rendered
          setTimeout(() => {
            const calElement = document.getElementById('my-cal-inline');
            if (calElement && calElement.children.length > 0) {
              this.calendarLoaded = true;
              this.showIframe = true;
              console.log('Cal.com calendar loaded successfully');
            } else {
              // If not rendered, try iframe approach
              this.tryIframeApproach();
            }
          }, 2000);
        } else {
          console.error('Cal.com script loaded but Cal is not defined');
          this.tryIframeApproach();
        }
      };
      
      // Handle script load error
      script.onerror = () => {
        console.error('Failed to load Cal.com script');
        this.tryIframeApproach();
      };
      
      // Append script to document
      document.head.appendChild(script);
      
    } catch (error) {
      console.error('Error loading Cal.com calendar:', error);
      this.tryIframeApproach();
    }
  }
  
  private tryIframeApproach(): void {
    try {
      // Create iframe element
      const iframe = document.createElement('iframe');
      iframe.src = 'https://cal.com/argentino-luca/30min?embed=true&layout=month_view&theme=light';
      iframe.width = '100%';
      iframe.height = '100%';
      iframe.style.border = 'none';
      iframe.style.borderRadius = '12px';
      iframe.allow = 'camera; microphone; autoplay; fullscreen; picture-in-picture';
      iframe.id = 'cal-iframe';
      
      // Handle iframe load
      iframe.onload = () => {
        // Check if iframe loaded with content or with an error page
        try {
          // If we can access iframe content, it's probably working
          const iframeContent = (iframe as any).contentWindow.document;
          this.calendarLoaded = true;
          this.showIframe = true;
          this.showFallback = false;
          console.log('Cal.com iframe loaded successfully');
        } catch (e) {
          // CORS error or other issue
          console.error('Iframe access error:', e);
          this.showFallbackMessage();
        }
      };
      
      // Handle iframe error
      iframe.onerror = () => {
        console.error('Failed to load Cal.com iframe');
        this.showFallbackMessage();
      };
      
      // Add iframe to container
      const container = document.getElementById('cal-iframe-container');
      if (container) {
        container.innerHTML = '';
        container.appendChild(iframe);
        
        // Set a timeout to check if iframe loaded with content
        setTimeout(() => {
          if (!this.calendarLoaded) {
            this.showFallbackMessage();
          }
        }, 3000);
      } else {
        this.showFallbackMessage();
      }
      
    } catch (error) {
      console.error('Error creating Cal.com iframe:', error);
      this.showFallbackMessage();
    }
  }

  private showFallbackMessage(): void {
    this.showIframe = false;
    this.showFallback = true;
  }

  public openCalInNewTab(): void {
    window.open('https://cal.com/argentino-luca/30min', '_blank');
  }
}