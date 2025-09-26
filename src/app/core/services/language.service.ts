import { Injectable, signal, computed } from '@angular/core';

export type Language = 'en' | 'de';

export interface LanguageConfig {
  code: Language;
  name: string;
  flag: string;
}

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private readonly STORAGE_KEY = 'aitlabs-language';
  private readonly DEFAULT_LANGUAGE: Language = 'en';
  
  // Available languages
  readonly availableLanguages: LanguageConfig[] = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'de', name: 'Deutsch', flag: '🇩🇪' }
  ];

  // Current language signal
  private readonly _currentLanguage = signal<Language>(this.DEFAULT_LANGUAGE);
  
  // Public readonly computed for current language
  readonly currentLanguage = computed(() => this._currentLanguage());
  
  // Current language config
  readonly currentLanguageConfig = computed(() => 
    this.availableLanguages.find(lang => lang.code === this.currentLanguage()) || this.availableLanguages[0]
  );

  constructor() {
    this.initializeLanguage();
  }

  private initializeLanguage(): void {
    // Check if language is already stored
    const storedLanguage = localStorage.getItem(this.STORAGE_KEY) as Language;
    
    if (storedLanguage && this.isValidLanguage(storedLanguage)) {
      this._currentLanguage.set(storedLanguage);
      return;
    }

    // Auto-detect language based on location/browser
    this.detectAndSetLanguage();
  }

  private async detectAndSetLanguage(): Promise<void> {
    try {
      // First try to detect by geolocation
      const locationLanguage = await this.detectLanguageByLocation();
      if (locationLanguage) {
        this.setLanguage(locationLanguage);
        return;
      }
    } catch (error) {
      console.log('Geolocation detection failed, falling back to browser language');
    }

    // Fallback to browser language
    const browserLanguage = this.detectLanguageByBrowser();
    this.setLanguage(browserLanguage);
  }

  private async detectLanguageByLocation(): Promise<Language | null> {
    return new Promise((resolve) => {
      if (!navigator.geolocation) {
        resolve(null);
        return;
      }

      const timeout = setTimeout(() => {
        resolve(null);
      }, 5000); // 5 second timeout

      navigator.geolocation.getCurrentPosition(
        async (position) => {
          clearTimeout(timeout);
          try {
            const { latitude, longitude } = position.coords;
            const country = await this.getCountryFromCoordinates(latitude, longitude);
            
            // German-speaking countries
            const germanCountries = ['DE', 'AT', 'CH'];
            if (germanCountries.includes(country)) {
              resolve('de');
            } else {
              resolve('en');
            }
          } catch (error) {
            console.error('Error getting country from coordinates:', error);
            resolve(null);
          }
        },
        (error) => {
          clearTimeout(timeout);
          console.error('Geolocation error:', error);
          resolve(null);
        },
        {
          timeout: 5000,
          enableHighAccuracy: false,
          maximumAge: 300000 // 5 minutes
        }
      );
    });
  }

  private async getCountryFromCoordinates(lat: number, lon: number): Promise<string> {
    // Using a free geocoding service (you might want to use a more reliable service in production)
    try {
      const response = await fetch(
        `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`
      );
      
      if (!response.ok) {
        throw new Error('Geocoding request failed');
      }
      
      const data = await response.json();
      return data.countryCode || 'US';
    } catch (error) {
      console.error('Geocoding error:', error);
      // Fallback: try to detect from timezone
      return this.detectCountryFromTimezone();
    }
  }

  private detectCountryFromTimezone(): string {
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    
    // Map common German-speaking timezones
    const germanTimezones = [
      'Europe/Berlin',
      'Europe/Vienna', 
      'Europe/Zurich',
      'Europe/Luxembourg'
    ];
    
    if (germanTimezones.includes(timezone)) {
      return 'DE'; // Return DE for any German-speaking timezone
    }
    
    return 'US'; // Default fallback
  }

  private detectLanguageByBrowser(): Language {
    const browserLang = navigator.language || (navigator as any).userLanguage;
    
    if (browserLang) {
      const langCode = browserLang.toLowerCase().split('-')[0];
      if (langCode === 'de') {
        return 'de';
      }
    }
    
    return this.DEFAULT_LANGUAGE;
  }

  private isValidLanguage(lang: string): lang is Language {
    return this.availableLanguages.some(l => l.code === lang);
  }

  setLanguage(language: Language): void {
    if (!this.isValidLanguage(language)) {
      console.warn(`Invalid language: ${language}`);
      return;
    }

    this._currentLanguage.set(language);
    localStorage.setItem(this.STORAGE_KEY, language);
    
    // Update document language attribute
    document.documentElement.lang = language;
    
    console.log(`Language changed to: ${language}`);
  }

  toggleLanguage(): void {
    const current = this.currentLanguage();
    const newLanguage = current === 'en' ? 'de' : 'en';
    this.setLanguage(newLanguage);
  }

  // Get translation key helper (for future use with translation files)
  getTranslationKey(key: string): string {
    return `${this.currentLanguage()}.${key}`;
  }
}