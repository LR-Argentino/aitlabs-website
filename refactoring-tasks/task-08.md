# Task 8: Accessibility Improvements

**Priority**: Low
**Complexity**: Low
**Estimated Time**: 1 day
**Status**: 🟢 Future

---

## Problem

Missing ARIA labels and semantic HTML in some components. Navigation accessibility needs improvement.

---

## Action Items

### Step 1: Audit Current Accessibility

- [ ] Run Lighthouse accessibility audit
- [ ] Run axe DevTools scan
- [ ] Test keyboard navigation
- [ ] Test screen reader compatibility

### Step 2: Header Component Improvements

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

### Step 3: Add Skip Navigation Link

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

### Step 4: Form Accessibility

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

### Step 5: Heading Hierarchy

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

### Step 6: Focus Management

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

---

## Accessibility Checklist

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

---

## Target Metrics

- Lighthouse Accessibility Score: > 95
- WCAG 2.1 AA Compliance: 100%
- Keyboard Navigation: Full support
- Screen Reader Compatibility: NVDA, JAWS, VoiceOver

---

## Success Criteria

- [ ] Lighthouse accessibility score > 95
- [ ] All WCAG 2.1 AA criteria met
- [ ] Full keyboard navigation support
- [ ] Screen reader compatible

---

## Dependencies

None (can be done independently)

---

## Related Tasks

- Task 1: Testing (accessibility tests should be added)
