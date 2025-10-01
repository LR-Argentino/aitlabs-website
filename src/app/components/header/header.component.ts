import { Component, signal, OnInit, OnDestroy, HostListener, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { LanguageService } from '../../core/services/language.service';
import { TranslationService } from '../../core/services/translation.service';
import { NavigationService } from '../../core/services/navigation.service';
import { DropdownManagerService } from '../../core/services/dropdown-manager.service';
import { TranslatePipe } from '../../core/pipes/translate.pipe';
import { LucideAngularModule, ChevronDown, Menu, Calendar } from 'lucide-angular';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, TranslatePipe, LucideAngularModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit, OnDestroy {
  // Dropdown IDs (constants for type safety)
  protected readonly DROPDOWNS = {
    SERVICES: 'desktop-services',
    CASE_STUDY: 'desktop-case-study',
    PROJECTS: 'desktop-projects',
    LANGUAGE: 'desktop-language',
    MOBILE_MENU: 'mobile-menu',
    MOBILE_SERVICES: 'mobile-services',
    MOBILE_CASE_STUDY: 'mobile-case-study',
    MOBILE_LANGUAGE: 'mobile-language'
  } as const;

  // Scroll state signal
  protected readonly isScrolled = signal(false);

  // Icon references
  protected readonly ChevronDownIcon = ChevronDown;
  protected readonly MenuIcon = Menu;
  protected readonly CalendarIcon = Calendar;

  // Inject services
  private languageService = inject(LanguageService);
  private translationService = inject(TranslationService);
  private navigationService = inject(NavigationService);
  protected dropdownManager = inject(DropdownManagerService);

  constructor(private router: Router) {}

  ngOnInit() {
    // Initial scroll check
    this.checkScrollPosition();
  }

  ngOnDestroy() {
    this.dropdownManager.closeAll();
  }

  @HostListener('window:scroll')
  onWindowScroll() {
    this.checkScrollPosition();
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event) {
    if (!this.dropdownManager.isOpen(this.DROPDOWNS.MOBILE_MENU)()) {
      return;
    }

    const target = event.target as HTMLElement;
    const headerElement = target.closest('header');

    if (!headerElement) {
      this.closeMobileMenu();
    }
  }

  private checkScrollPosition() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    this.isScrolled.set(scrollTop > 10);
  }

  // Desktop dropdown hover methods
  onDropdownEnter(dropdownType: string) {
    this.dropdownManager.cancelScheduledClose();
    this.dropdownManager.open(dropdownType);
  }

  onDropdownLeave() {
    this.dropdownManager.scheduleClose(300);
  }

  // Desktop dropdown toggle methods
  toggleDropdown(dropdownType: string) {
    this.dropdownManager.toggle(dropdownType);
  }

  // Mobile menu methods
  toggleMobileMenu() {
    this.dropdownManager.toggle(this.DROPDOWNS.MOBILE_MENU);

    // Control body scrolling
    if (this.dropdownManager.isOpen(this.DROPDOWNS.MOBILE_MENU)()) {
      document.body.classList.add('mobile-menu-open');
    } else {
      document.body.classList.remove('mobile-menu-open');
    }
  }

  closeMobileMenu() {
    this.dropdownManager.close(this.DROPDOWNS.MOBILE_MENU);
    this.dropdownManager.close(this.DROPDOWNS.MOBILE_SERVICES);
    this.dropdownManager.close(this.DROPDOWNS.MOBILE_CASE_STUDY);
    this.dropdownManager.close(this.DROPDOWNS.MOBILE_LANGUAGE);
    document.body.classList.remove('mobile-menu-open');
  }

  // Navigation methods
  navigateToSection(sectionId: string) {
    this.dropdownManager.closeAll();
    this.navigationService.navigateToSection(sectionId, true); // Requires home page
  }

  navigateToAiVoiceAssistant() {
    this.dropdownManager.closeAll();
    this.router.navigate(['/ai-voice-assistant']);
  }

  onContactClick() {
    this.closeMobileMenu();
    this.navigationService.navigateToSection('contact-form', false);
  }

  // Language methods
  get currentLanguage() {
    return this.languageService.currentLanguage();
  }

  get currentLanguageConfig() {
    return this.languageService.currentLanguageConfig();
  }

  get availableLanguages() {
    return this.languageService.availableLanguages;
  }

  switchLanguage(languageCode: 'en' | 'de') {
    this.languageService.setLanguage(languageCode);
    this.dropdownManager.closeAll();
  }

  // Mobile language dropdown methods
  toggleMobileLanguageDropdown(event: Event) {
    event.preventDefault();
    event.stopPropagation();
    this.dropdownManager.toggle(this.DROPDOWNS.MOBILE_LANGUAGE);
  }

  switchMobileLanguage(languageCode: 'en' | 'de', event: Event) {
    event.preventDefault();
    event.stopPropagation();
    this.languageService.setLanguage(languageCode);
    this.dropdownManager.close(this.DROPDOWNS.MOBILE_LANGUAGE);
  }

  // Translation helper
  translate(key: string): string {
    return this.translationService.translate(key);
  }
}
