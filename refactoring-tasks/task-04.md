# Task 4: Reduce Component Code Duplication

**Priority**: Medium
**Complexity**: Medium
**Estimated Time**: 1.5 days
**Status**: 🟡 Planned

---

## Problem

Repeated patterns across components without proper abstraction. Most components inject the same services and repeat similar logic.

---

## Affected Files

All component files with repeated patterns:
- Service injection (LanguageService, TranslationService)
- Translation method calls
- Navigation logic

---

## Action Items

### Step 1: Create Base Component

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

### Step 2: Extract Navigation Service

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

### Step 3: Refactor Components to Use Base Class

- [ ] Header component
- [ ] Footer component
- [ ] Page components (home, ai-voice-assistant, ai-automations)

```typescript
export class HeaderComponent extends BaseComponent implements OnInit {
  // Remove duplicate service injections
  // Use inherited methods: translate(), navigateTo(), currentLanguage
}
```

### Step 4: Create Shared Utilities

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

---

## Benefits

- Reduce code duplication by ~25%
- Centralize common logic
- Easier maintenance and testing
- Consistent behavior across components

---

## Success Criteria

- [ ] Code duplication reduced from ~25% to <10%
- [ ] BaseComponent class implemented and tested
- [ ] NavigationService extracted and used
- [ ] Utility functions created and documented
- [ ] All components refactored successfully

---

## Dependencies

- Task 3: Type Safety (NavigationItem interface needed)

---

## Related Tasks

- Task 7: Project Structure (base classes go in core/base/)
