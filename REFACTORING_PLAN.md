# 📋 Comprehensive Refactoring Plan for AIT LABS Website

**Generated**: 2025-10-26
**Angular Version**: 20
**Architecture**: Standalone Components

---

## 📊 Executive Summary

The Angular 20 application demonstrates good foundational architecture with standalone components and internationalization. However, analysis reveals significant opportunities for improvement across type safety, performance optimization, code organization, and testing coverage.

### Current State Assessment
- ✅ **Strengths**: Standalone components architecture, signal-based reactivity, dual-language i18n system
- ⚠️ **Critical Gaps**: Zero test coverage, no OnPush change detection, type safety issues
- 🔄 **Opportunities**: Performance optimization, code reuse, accessibility improvements

### Key Metrics
| Metric | Current | Target |
|--------|---------|--------|
| Test Coverage | 0% | 80%+ |
| OnPush Components | 0/15 (0%) | 15/15 (100%) |
| Type Safety Score | ~60% | 95%+ |
| Code Duplication | ~25% | <10% |

---

## 🔴 HIGH PRIORITY TASKS

### Task 1: Establish Test Coverage
**Priority**: Critical
**Complexity**: High
**Estimated Time**: 3-4 days
**Status**: 🔴 Not Started

#### Problem
All 18 spec files are placeholder stubs with zero actual test coverage. This creates significant risk for regressions and refactoring.

#### Affected Files
- `src/app/app.component.spec.ts`
- `src/app/core/services/language.service.spec.ts`
- `src/app/core/services/translation.service.spec.ts`
- `src/app/core/pipes/translate.pipe.spec.ts`
- All component spec files (15 files)

#### Action Items
1. **Core Services Tests** (Priority 1)
   - [ ] `LanguageService`: Test language detection, localStorage persistence, signal updates
   - [ ] `TranslationService`: Test translation loading, key lookups, fallback behavior
   - [ ] Mock HttpClient for translation file loading

2. **Pipe Tests** (Priority 2)
   - [ ] `TranslatePipe`: Test translation lookups, missing keys, language changes

3. **Component Tests** (Priority 3)
   - [ ] Header component: Language switching, navigation
   - [ ] Footer component: Links and translations
   - [ ] Hero component: Content rendering
   - [ ] Booking component: Form validation

4. **Integration Tests** (Priority 4)
   - [ ] Language switching end-to-end flow
   - [ ] Route navigation with translations
   - [ ] Form submission workflows

#### Example Test Pattern
```typescript
// language.service.spec.ts
describe('LanguageService', () => {
  let service: LanguageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    localStorage.clear();
    service = TestBed.inject(LanguageService);
  });

  it('should detect browser language', () => {
    spyOn(navigator, 'language').and.returnValue('de-DE');
    service.detectLanguage();
    expect(service.currentLanguage()).toBe('de');
  });

  it('should persist language to localStorage', () => {
    service.setLanguage('de');
    expect(localStorage.getItem('language')).toBe('de');
  });
});
```

---

### Task 2: Implement OnPush Change Detection Strategy
**Priority**: Critical
**Complexity**: Medium
**Estimated Time**: 1 day
**Status**: 🔴 Not Started

#### Problem
No components use `OnPush` change detection strategy, causing unnecessary re-renders and performance degradation.

#### Affected Files
All component files (15 components):
- `src/app/components/header/header.component.ts`
- `src/app/components/footer/footer.component.ts`
- `src/app/components/hero/hero.component.ts`
- `src/app/components/services-section/services-section.component.ts`
- `src/app/components/booking/booking.component.ts`
- `src/app/pages/home/home.component.ts`
- `src/app/pages/ai-voice-assistant/ai-voice-assistant.component.ts`
- `src/app/pages/ai-automations/ai-automations.component.ts`
- `src/app/pages/impressum/impressum.component.ts`
- `src/app/pages/dsg/dsg.component.ts`
- And 5 more components

#### Action Items
1. **Phase 1: Simple Components** (No complex state)
   - [ ] Footer component
   - [ ] Hero component
   - [ ] Services section component
   - [ ] Impressum/DSG pages

2. **Phase 2: Interactive Components** (With user interactions)
   - [ ] Header component (language switching)
   - [ ] Booking component (form handling)
   - [ ] Page components with dynamic content

3. **Phase 3: Testing & Validation**
   - [ ] Verify all components still function correctly
   - [ ] Test language switching doesn't break
   - [ ] Validate form interactions work properly

#### Implementation Pattern
```typescript
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-example',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './example.component.html',
  styleUrl: './example.component.css'
})
export class ExampleComponent {
  // Use signals for reactive state
  // Ensure all inputs use @Input() with proper change detection
}
```

#### Verification Checklist
- [ ] All components compile without errors
- [ ] Language switching works in all components
- [ ] Form inputs respond to user interaction
- [ ] Navigation functions properly
- [ ] No console errors during runtime

---

### Task 3: Fix Type Safety Issues
**Priority**: High
**Complexity**: Medium
**Estimated Time**: 1 day
**Status**: 🔴 Not Started

#### Problem
Extensive use of `any` types and missing interfaces reduces type safety and IntelliSense support.

#### Affected Files
1. **`src/app/core/services/translation.service.ts`**
   - Line 10: `translations: any = {};`
   - Missing interface for translation structure

2. **`src/app/core/pipes/translate.pipe.ts`**
   - Line 18: `transform(...): any`
   - Should return `string`

3. **Missing Model Files**
   - No interfaces for booking data
   - No interfaces for service offerings
   - No interfaces for navigation items

#### Action Items

##### Step 1: Create Translation Interfaces
**File**: `src/app/core/models/translation.model.ts` (NEW)

```typescript
export interface TranslationDictionary {
  [key: string]: string;
}

export interface TranslationFiles {
  en: TranslationDictionary;
  de: TranslationDictionary;
}

export type SupportedLanguage = 'en' | 'de';
```

##### Step 2: Update TranslationService
**File**: `src/app/core/services/translation.service.ts`

- [ ] Import `TranslationDictionary` interface
- [ ] Change `translations: any = {}` to `translations: TranslationDictionary = {}`
- [ ] Type the `loadTranslations()` method properly
- [ ] Add return type to `translate()` method: `string`

```typescript
private translations: TranslationDictionary = {};

translate(key: string): string {
  return this.translations[key] || key;
}
```

##### Step 3: Fix TranslatePipe
**File**: `src/app/core/pipes/translate.pipe.ts`

- [ ] Change `transform(...): any` to `transform(...): string`
- [ ] Add null/undefined checks

```typescript
transform(key: string): string {
  if (!key) return '';
  return this.translationService.translate(key);
}
```

##### Step 4: Create Additional Models
**File**: `src/app/core/models/booking.model.ts` (NEW)

```typescript
export interface BookingFormData {
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
}

export interface BookingResponse {
  success: boolean;
  message: string;
}
```

**File**: `src/app/core/models/navigation.model.ts` (NEW)

```typescript
export interface NavigationItem {
  labelKey: string;
  route: string;
  external?: boolean;
}
```

##### Step 5: Update LanguageService
**File**: `src/app/core/services/language.service.ts`

- [ ] Replace string literals with `SupportedLanguage` type
- [ ] Type localStorage interactions

```typescript
import { SupportedLanguage } from '../models/translation.model';

setLanguage(lang: SupportedLanguage): void {
  this.currentLanguage.set(lang);
  localStorage.setItem('language', lang);
}
```

#### Verification Checklist
- [ ] No `any` types in production code
- [ ] All service methods have explicit return types
- [ ] All function parameters have explicit types
- [ ] TypeScript compiler shows no errors
- [ ] IntelliSense works for all models

---

## 🟠 MEDIUM PRIORITY TASKS

### Task 4: Reduce Component Code Duplication
**Priority**: Medium
**Complexity**: Medium
**Estimated Time**: 1.5 days
**Status**: 🟡 Planned

#### Problem
Repeated patterns across components without proper abstraction. Most components inject the same services and repeat similar logic.

#### Affected Files
All component files with repeated patterns:
- Service injection (LanguageService, TranslationService)
- Translation method calls
- Navigation logic

#### Action Items

##### Step 1: Create Base Component
**File**: `src/app/core/base/base.component.ts` (NEW)

```typescript
import { inject } from '@angular/core';
import { LanguageService } from '../services/language.service';
import { TranslationService } from '../services/translation.service';
import { Router } from '@angular/router';

export abstract class BaseComponent {
  protected readonly languageService = inject(LanguageService);
  protected readonly translationService = inject(TranslationService);
  protected readonly router = inject(Router);

  protected translate(key: string): string {
    return this.translationService.translate(key);
  }

  protected navigateTo(route: string): void {
    this.router.navigate([route]);
  }

  protected get currentLanguage() {
    return this.languageService.currentLanguage();
  }
}
```

##### Step 2: Extract Navigation Service
**File**: `src/app/core/services/navigation.service.ts` (NEW)

```typescript
import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { NavigationItem } from '../models/navigation.model';

@Injectable({ providedIn: 'root' })
export class NavigationService {
  private router = inject(Router);

  private navigationItems: NavigationItem[] = [
    { labelKey: 'nav.home', route: '/' },
    { labelKey: 'nav.aiVoiceAssistant', route: '/ai-voice-assistant' },
    { labelKey: 'nav.aiAutomations', route: '/ai-automations' },
    { labelKey: 'nav.contact', route: '/#booking' },
  ];

  getNavigationItems(): NavigationItem[] {
    return this.navigationItems;
  }

  navigateTo(route: string): Promise<boolean> {
    return this.router.navigate([route]);
  }

  isActiveRoute(route: string): boolean {
    return this.router.url === route;
  }
}
```

##### Step 3: Refactor Components to Use Base Class
- [ ] Header component
- [ ] Footer component
- [ ] Page components (home, ai-voice-assistant, ai-automations)

```typescript
export class HeaderComponent extends BaseComponent implements OnInit {
  // Remove duplicate service injections
  // Use inherited methods: translate(), navigateTo(), currentLanguage
}
```

##### Step 4: Create Shared Utilities
**File**: `src/app/core/utils/language.utils.ts` (NEW)

```typescript
export function getBrowserLanguage(): string {
  const lang = navigator.language || navigator.languages[0];
  return lang.split('-')[0];
}

export function isValidLanguage(lang: string): boolean {
  return ['en', 'de'].includes(lang);
}
```

#### Benefits
- Reduce code duplication by ~25%
- Centralize common logic
- Easier maintenance and testing
- Consistent behavior across components

---

### Task 5: Optimize Translation Service Performance
**Priority**: Medium
**Complexity**: Medium
**Estimated Time**: 1 day
**Status**: 🟡 Planned

#### Problem
Translation service loads all translations synchronously, potentially blocking initial render. No caching mechanism exists.

#### Affected Files
- `src/app/core/services/translation.service.ts`

#### Action Items

##### Step 1: Implement Caching
```typescript
private translationCache = new Map<SupportedLanguage, TranslationDictionary>();
private currentTranslations = signal<TranslationDictionary>({});

async loadTranslations(lang: SupportedLanguage): Promise<void> {
  // Check cache first
  if (this.translationCache.has(lang)) {
    this.currentTranslations.set(this.translationCache.get(lang)!);
    return;
  }

  try {
    const translations = await firstValueFrom(
      this.http.get<TranslationDictionary>(`/assets/i18n/${lang}.json`)
    );

    this.translationCache.set(lang, translations);
    this.currentTranslations.set(translations);
    this.translations = translations;
  } catch (error) {
    console.error(`Failed to load translations for ${lang}`, error);
    // Fallback to English
    if (lang !== 'en') {
      await this.loadTranslations('en');
    }
  }
}
```

##### Step 2: Add Loading States
```typescript
private isLoading = signal<boolean>(false);
private loadingError = signal<string | null>(null);

get loading() {
  return this.isLoading.asReadonly();
}

get error() {
  return this.loadingError.asReadonly();
}
```

##### Step 3: Preload Common Translations
```typescript
// In app initialization
constructor() {
  this.preloadTranslations();
}

private preloadTranslations(): void {
  // Preload both languages in background
  ['en', 'de'].forEach(lang => {
    this.loadTranslations(lang as SupportedLanguage);
  });
}
```

##### Step 4: Optimize TranslatePipe
Make pipe pure and use computed signals:

```typescript
@Pipe({
  name: 'translate',
  standalone: true,
  pure: true // Change from impure
})
export class TranslatePipe implements PipeTransform {
  private translationService = inject(TranslationService);

  transform(key: string): string {
    return this.translationService.translate(key);
  }
}
```

#### Performance Targets
- Translation loading: < 100ms
- Cache hit ratio: > 90%
- Memory usage: < 2MB for all translations
- Initial render time: Reduce by 20%

---

### Task 6: Implement Comprehensive Error Handling
**Priority**: Medium
**Complexity**: Low
**Estimated Time**: 0.5 days
**Status**: 🟡 Planned

#### Problem
No error boundaries or fallback mechanisms for translation loading failures or service errors.

#### Affected Files
- `src/app/core/services/translation.service.ts`
- `src/app/core/services/language.service.ts`
- `src/app/core/pipes/translate.pipe.ts`

#### Action Items

##### Step 1: Create Error Logging Service
**File**: `src/app/core/services/error-logging.service.ts` (NEW)

```typescript
import { Injectable } from '@angular/core';

export enum ErrorLevel {
  INFO = 'info',
  WARNING = 'warning',
  ERROR = 'error',
  CRITICAL = 'critical'
}

@Injectable({ providedIn: 'root' })
export class ErrorLoggingService {
  logError(message: string, error?: any, level: ErrorLevel = ErrorLevel.ERROR): void {
    const timestamp = new Date().toISOString();
    const logEntry = {
      timestamp,
      level,
      message,
      error: error?.message || error,
      stack: error?.stack
    };

    // Log to console
    console[level](logEntry);

    // TODO: Send to external logging service (Sentry, LogRocket, etc.)
  }

  logInfo(message: string): void {
    this.logError(message, null, ErrorLevel.INFO);
  }

  logWarning(message: string, error?: any): void {
    this.logError(message, error, ErrorLevel.WARNING);
  }
}
```

##### Step 2: Add Error Handling to TranslationService
```typescript
private errorLogging = inject(ErrorLoggingService);

async loadTranslations(lang: SupportedLanguage): Promise<void> {
  this.isLoading.set(true);
  this.loadingError.set(null);

  try {
    const translations = await firstValueFrom(
      this.http.get<TranslationDictionary>(`/assets/i18n/${lang}.json`)
    );
    this.translationCache.set(lang, translations);
    this.currentTranslations.set(translations);
  } catch (error) {
    const errorMessage = `Failed to load translations for ${lang}`;
    this.errorLogging.logError(errorMessage, error);
    this.loadingError.set(errorMessage);

    // Fallback strategy
    if (lang !== 'en') {
      this.errorLogging.logWarning(`Falling back to English translations`);
      await this.loadTranslations('en');
    }
  } finally {
    this.isLoading.set(false);
  }
}

translate(key: string): string {
  if (!key) {
    this.errorLogging.logWarning('Translation key is empty');
    return '';
  }

  const translation = this.translations[key];

  if (!translation) {
    this.errorLogging.logWarning(`Missing translation key: ${key}`);
    return key; // Fallback to key
  }

  return translation;
}
```

##### Step 3: Add Error Handling to TranslatePipe
```typescript
transform(key: string): string {
  try {
    if (!key) return '';
    return this.translationService.translate(key);
  } catch (error) {
    console.error('Translation pipe error:', error);
    return key; // Fallback to key
  }
}
```

##### Step 4: Add Global Error Handler
**File**: `src/app/core/handlers/global-error.handler.ts` (NEW)

```typescript
import { ErrorHandler, Injectable, inject } from '@angular/core';
import { ErrorLoggingService } from '../services/error-logging.service';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  private errorLogging = inject(ErrorLoggingService);

  handleError(error: Error): void {
    this.errorLogging.logError('Unhandled error', error, ErrorLevel.CRITICAL);

    // Don't suppress errors in development
    if (!environment.production) {
      console.error(error);
    }
  }
}
```

Register in `app.config.ts`:
```typescript
import { ErrorHandler } from '@angular/core';
import { GlobalErrorHandler } from './core/handlers/global-error.handler';

export const appConfig: ApplicationConfig = {
  providers: [
    // ...
    { provide: ErrorHandler, useClass: GlobalErrorHandler }
  ]
};
```

---

## 🟢 LOW PRIORITY TASKS

### Task 7: Reorganize Project Structure
**Priority**: Low
**Complexity**: Low
**Estimated Time**: 0.5 days
**Status**: 🟢 Future

#### Problem
Missing directories mentioned in CLAUDE.md (features/, layout/, shared/). Current flat component organization doesn't scale well.

#### Current Structure
```
src/app/
├── components/       # Mixed reusable and layout components
├── pages/           # Route-level pages
├── core/            # Services, pipes, guards
└── app.component.ts
```

#### Target Structure
```
src/app/
├── core/
│   ├── base/              # NEW: Base classes
│   ├── handlers/          # NEW: Error handlers, interceptors
│   ├── models/            # NEW: Interfaces and types
│   ├── services/          # Existing: Core services
│   ├── pipes/             # Existing: Global pipes
│   ├── guards/            # Future: Route guards
│   └── utils/             # NEW: Utility functions
├── shared/
│   ├── components/        # NEW: Reusable UI components
│   │   ├── hero/
│   │   ├── services-section/
│   │   └── booking/
│   └── directives/        # Future: Shared directives
├── features/
│   ├── ai-voice-assistant/    # NEW: Feature module
│   │   ├── components/
│   │   ├── services/
│   │   └── ai-voice-assistant.component.ts
│   └── ai-automations/        # NEW: Feature module
│       ├── components/
│       ├── services/
│       └── ai-automations.component.ts
├── layout/
│   ├── header/            # MOVE from components/
│   └── footer/            # MOVE from components/
└── pages/
    ├── home/              # Existing
    ├── impressum/         # Existing
    └── dsg/               # Existing
```

#### Migration Plan
1. **Phase 1: Create new directories**
   - [ ] `core/models/`
   - [ ] `core/base/`
   - [ ] `core/handlers/`
   - [ ] `core/utils/`
   - [ ] `shared/components/`
   - [ ] `layout/`
   - [ ] `features/`

2. **Phase 2: Move files**
   - [ ] Move header → `layout/header/`
   - [ ] Move footer → `layout/footer/`
   - [ ] Move hero → `shared/components/hero/`
   - [ ] Move services-section → `shared/components/services-section/`
   - [ ] Move booking → `shared/components/booking/`

3. **Phase 3: Update imports**
   - [ ] Update all import paths
   - [ ] Update `tsconfig.json` path mappings
   - [ ] Verify application still compiles and runs

---

### Task 8: Accessibility Improvements
**Priority**: Low
**Complexity**: Low
**Estimated Time**: 1 day
**Status**: 🟢 Future

#### Problem
Missing ARIA labels and semantic HTML in some components. Navigation accessibility needs improvement.

#### Action Items

##### Step 1: Audit Current Accessibility
- [ ] Run Lighthouse accessibility audit
- [ ] Run axe DevTools scan
- [ ] Test keyboard navigation
- [ ] Test screen reader compatibility

##### Step 2: Header Component Improvements
**File**: `src/app/components/header/header.component.html`

```html
<!-- Add ARIA labels -->
<nav role="navigation" aria-label="Main navigation">
  <ul>
    <li *ngFor="let item of navItems">
      <a [routerLink]="item.route"
         [attr.aria-current]="isActive(item.route) ? 'page' : null">
        {{ item.labelKey | translate }}
      </a>
    </li>
  </ul>
</nav>

<!-- Language switcher -->
<div role="group" aria-label="Language selection">
  <button (click)="setLanguage('en')"
          [attr.aria-pressed]="currentLanguage() === 'en'"
          [attr.aria-label]="'lang.english' | translate">
    EN
  </button>
  <button (click)="setLanguage('de')"
          [attr.aria-pressed]="currentLanguage() === 'de'"
          [attr.aria-label]="'lang.german' | translate">
    DE
  </button>
</div>
```

##### Step 3: Add Skip Navigation Link
**File**: `src/app/app.component.html`

```html
<a href="#main-content" class="skip-link">
  {{ 'common.skipToMainContent' | translate }}
</a>

<app-header></app-header>

<main id="main-content" role="main">
  <router-outlet></router-outlet>
</main>

<app-footer></app-footer>
```

##### Step 4: Form Accessibility
**File**: `src/app/components/booking/booking.component.html`

```html
<form [formGroup]="bookingForm" (ngSubmit)="onSubmit()" aria-label="Booking form">
  <div>
    <label for="name">{{ 'booking.name' | translate }}</label>
    <input id="name"
           type="text"
           formControlName="name"
           [attr.aria-invalid]="hasError('name')"
           [attr.aria-describedby]="hasError('name') ? 'name-error' : null">
    <span id="name-error" role="alert" *ngIf="hasError('name')">
      {{ 'booking.nameRequired' | translate }}
    </span>
  </div>

  <!-- Repeat for other fields -->

  <button type="submit"
          [disabled]="bookingForm.invalid"
          [attr.aria-disabled]="bookingForm.invalid">
    {{ 'booking.submit' | translate }}
  </button>
</form>
```

##### Step 5: Heading Hierarchy
Ensure proper heading levels (h1 → h2 → h3):

```html
<!-- Home page -->
<h1>{{ 'hero.title' | translate }}</h1>
<section>
  <h2>{{ 'services.title' | translate }}</h2>
  <article>
    <h3>{{ 'services.aiVoice.title' | translate }}</h3>
  </article>
</section>
```

##### Step 6: Focus Management
Add focus management for language switching:

```typescript
export class HeaderComponent {
  setLanguage(lang: SupportedLanguage): void {
    this.languageService.setLanguage(lang);
    // Announce change to screen readers
    this.announceLanguageChange(lang);
  }

  private announceLanguageChange(lang: string): void {
    const announcement = this.translate(`lang.${lang}Selected`);
    // Use live region to announce
    const liveRegion = document.getElementById('live-region');
    if (liveRegion) {
      liveRegion.textContent = announcement;
    }
  }
}
```

#### Accessibility Checklist
- [ ] All interactive elements have proper ARIA labels
- [ ] Form fields have associated labels
- [ ] Error messages are announced to screen readers
- [ ] Keyboard navigation works for all interactive elements
- [ ] Skip navigation link is available
- [ ] Color contrast meets WCAG AA standards (4.5:1)
- [ ] Focus indicators are visible
- [ ] Heading hierarchy is logical
- [ ] Images have alt text
- [ ] Language changes are announced

#### Target Metrics
- Lighthouse Accessibility Score: > 95
- WCAG 2.1 AA Compliance: 100%
- Keyboard Navigation: Full support
- Screen Reader Compatibility: NVDA, JAWS, VoiceOver

---

### Task 9: Bundle Size Optimization
**Priority**: Low
**Complexity**: Low
**Estimated Time**: 0.5 days
**Status**: 🟢 Future

#### Problem
Potential for bundle size optimization through better code splitting and lazy loading.

#### Action Items

##### Step 1: Analyze Current Bundle
```bash
npm run build -- --stats-json
npx webpack-bundle-analyzer dist/aitlabs-website/stats.json
```

##### Step 2: Implement Translation File Code Splitting
Instead of loading all translations upfront, split by route:

```typescript
// Route-specific translations
const routes: Routes = [
  {
    path: 'ai-voice-assistant',
    loadComponent: () => import('./pages/ai-voice-assistant/ai-voice-assistant.component'),
    resolve: {
      translations: () => inject(TranslationService).loadRouteTranslations('ai-voice-assistant')
    }
  }
];
```

##### Step 3: Lazy Load Heavy Components
Identify and lazy load components > 50KB:

```typescript
// Instead of direct import
import { HeavyChartComponent } from './heavy-chart.component';

// Use dynamic import
const HeavyChartComponent = await import('./heavy-chart.component');
```

##### Step 4: Optimize Third-Party Dependencies
Review and optimize package.json:

```bash
npx depcheck  # Find unused dependencies
npx bundlephobia analyze  # Analyze dependency sizes
```

##### Step 5: Enable Production Optimizations
**File**: `angular.json`

```json
{
  "configurations": {
    "production": {
      "optimization": true,
      "outputHashing": "all",
      "sourceMap": false,
      "namedChunks": false,
      "extractLicenses": true,
      "vendorChunk": false,
      "buildOptimizer": true,
      "budgets": [
        {
          "type": "initial",
          "maximumWarning": "500kb",
          "maximumError": "1mb"
        },
        {
          "type": "anyComponentStyle",
          "maximumWarning": "2kb",
          "maximumError": "4kb"
        }
      ]
    }
  }
}
```

#### Target Metrics
- Initial bundle size: < 500KB
- Total bundle size: < 1MB
- First Contentful Paint: < 1.5s
- Time to Interactive: < 3s
- Lighthouse Performance Score: > 90

---

## 📅 Implementation Roadmap

### Week 1: Foundation & Critical Fixes
**Goal**: Establish solid foundation with tests and performance improvements

#### Day 1-2: OnPush Change Detection
- Implement OnPush strategy for all components
- Test each component after migration
- Fix any issues with change detection
- **Deliverable**: All 15 components using OnPush

#### Day 3: Type Safety
- Create model interfaces in `core/models/`
- Fix all `any` types in services and pipes
- Update method signatures with proper types
- **Deliverable**: Zero `any` types in production code

#### Day 4: Translation Service Optimization
- Implement caching mechanism
- Add async loading with error handling
- Optimize TranslatePipe performance
- **Deliverable**: Translation loading < 100ms

#### Day 5: Test Infrastructure
- Set up testing utilities and mocks
- Write tests for LanguageService
- Write tests for TranslationService
- **Deliverable**: Core services at 80%+ coverage

---

### Week 2: Testing & Code Quality
**Goal**: Achieve comprehensive test coverage and reduce code duplication

#### Day 1: Component Testing (Part 1)
- Write tests for Header component
- Write tests for Footer component
- Write tests for TranslatePipe
- **Deliverable**: Layout components tested

#### Day 2: Component Testing (Part 2)
- Write tests for Hero component
- Write tests for Booking component
- Write tests for Services section
- **Deliverable**: Shared components tested

#### Day 3: Reduce Code Duplication
- Create BaseComponent class
- Extract NavigationService
- Refactor components to use base class
- Create shared utilities
- **Deliverable**: Code duplication < 10%

#### Day 4: Error Handling
- Create ErrorLoggingService
- Add error handling to all services
- Implement GlobalErrorHandler
- Add loading and error states
- **Deliverable**: Comprehensive error handling

#### Day 5: Integration Testing
- Write language switching integration tests
- Write navigation integration tests
- Write form submission tests
- **Deliverable**: Critical user flows tested

---

### Week 3: Polish & Future-Proofing
**Goal**: Improve maintainability, accessibility, and prepare for future scaling

#### Day 1: Project Structure
- Create new directory structure
- Move files to appropriate locations
- Update all import paths
- Update tsconfig path mappings
- **Deliverable**: Clean, scalable folder structure

#### Day 2: Accessibility Improvements
- Run accessibility audits
- Add ARIA labels to all interactive elements
- Implement skip navigation
- Fix form accessibility
- **Deliverable**: WCAG 2.1 AA compliant

#### Day 3: Bundle Optimization
- Analyze bundle sizes
- Implement code splitting strategies
- Optimize third-party dependencies
- **Deliverable**: Bundle size < 500KB

#### Day 4: Documentation & E2E Tests
- Update CLAUDE.md with new patterns
- Document all new utilities and services
- Write E2E tests for critical paths
- **Deliverable**: Complete documentation

#### Day 5: Final Review & Cleanup
- Code review of all changes
- Performance testing
- Run full test suite
- Deploy to staging
- **Deliverable**: Production-ready refactored application

---

## 🎯 Success Criteria

### Code Quality Metrics
- ✅ Test coverage > 80% for all core services
- ✅ Test coverage > 70% for all components
- ✅ Zero `any` types in production code
- ✅ All components use OnPush change detection
- ✅ TypeScript strict mode with zero errors
- ✅ ESLint with zero warnings
- ✅ Code duplication < 10%

### Performance Metrics
- ✅ Translation loading time < 100ms
- ✅ Initial bundle size < 500KB
- ✅ First Contentful Paint < 1.5s
- ✅ Time to Interactive < 3s
- ✅ Lighthouse Performance Score > 90

### Accessibility Metrics
- ✅ Lighthouse Accessibility Score > 95
- ✅ WCAG 2.1 AA Compliance: 100%
- ✅ Keyboard navigation fully functional
- ✅ Screen reader compatible (NVDA, JAWS, VoiceOver)
- ✅ Color contrast ratios meet standards

### Maintainability Metrics
- ✅ All components follow single responsibility principle
- ✅ Clear separation of concerns (services, components, models)
- ✅ Comprehensive documentation
- ✅ Consistent code patterns across codebase
- ✅ Easy onboarding for new developers

---

## 📈 Progress Tracking

### Weekly Check-ins
- **End of Week 1**: Review foundation tasks, adjust timeline if needed
- **End of Week 2**: Review test coverage and code quality metrics
- **End of Week 3**: Final review and production readiness assessment

### Metrics Dashboard
Track these metrics weekly:

| Metric | Baseline | Week 1 | Week 2 | Week 3 | Target |
|--------|----------|--------|--------|--------|--------|
| Test Coverage | 0% | TBD | TBD | TBD | 80% |
| OnPush Components | 0/15 | TBD | TBD | TBD | 15/15 |
| Type Safety | 60% | TBD | TBD | TBD | 95% |
| Bundle Size | TBD | TBD | TBD | TBD | <500KB |
| Lighthouse Score | TBD | TBD | TBD | TBD | >90 |

---

## 🔧 Tools & Resources

### Testing
- **Jasmine**: Unit testing framework (already configured)
- **Karma**: Test runner (already configured)
- **Angular Testing Library**: Component testing utilities
- **Cypress or Playwright**: E2E testing (to be added)

### Code Quality
- **ESLint**: Linting (consider adding)
- **Prettier**: Code formatting (already configured)
- **SonarQube**: Code quality analysis (optional)
- **Husky**: Git hooks for pre-commit checks (optional)

### Performance
- **Lighthouse**: Performance auditing
- **webpack-bundle-analyzer**: Bundle size analysis
- **Chrome DevTools**: Performance profiling
- **Angular DevTools**: Change detection profiling

### Accessibility
- **axe DevTools**: Accessibility testing
- **WAVE**: Web accessibility evaluation
- **NVDA/JAWS**: Screen reader testing
- **Lighthouse**: Accessibility auditing

---

## 📝 Notes & Considerations

### Breaking Changes
This refactoring plan should be implemented incrementally to avoid breaking changes:
1. Each task should be completed in a separate branch
2. Comprehensive testing after each major change
3. Gradual rollout to production
4. Rollback strategy for each deployment

### Risk Mitigation
- **Testing**: Comprehensive test coverage before refactoring complex components
- **Code Review**: All changes should be reviewed by at least one team member
- **Staging Environment**: Test all changes in staging before production
- **Monitoring**: Set up error monitoring (Sentry, LogRocket) before major refactoring

### Future Enhancements
After completing this refactoring plan, consider:
- Implement state management (NgRx or similar) for complex features
- Add server-side rendering (SSR) for better SEO
- Implement progressive web app (PWA) features
- Add advanced analytics and tracking
- Implement automated visual regression testing

---

## 📞 Support & Questions

If you have questions or need clarification on any task:
1. Review the specific task section in this document
2. Check the Angular documentation: https://angular.dev
3. Consult CLAUDE.md for project-specific patterns
4. Ask team members or create a discussion thread

---

**Document Version**: 1.0
**Last Updated**: 2025-10-26
**Status**: Ready for Implementation
