# Task 3: Fix Type Safety Issues

**Priority**: High
**Complexity**: Medium
**Estimated Time**: 1 day
**Status**: 🟢 Complete
**Completed**: 2025-10-26

---

## Problem

Extensive use of `any` types and missing interfaces reduces type safety and IntelliSense support.

---

## Affected Files

### 1. `src/app/core/services/translation.service.ts`
- Line 10: `translations: any = {};`
- Missing interface for translation structure

### 2. `src/app/core/pipes/translate.pipe.ts`
- Line 18: `transform(...): any`
- Should return `string`

### 3. Missing Model Files
- No interfaces for booking data
- No interfaces for service offerings
- No interfaces for navigation items

---

## Action Items

### Step 1: Create Translation Interfaces

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

### Step 2: Update TranslationService

**File**: `src/app/core/services/translation.service.ts`

- [x] Import `TranslationDictionary` interface
- [x] Change `translations: any = {}` to `translations: TranslationDictionary = {}`
- [x] Type the `loadTranslations()` method properly
- [x] Add return type to `translate()` method: `string`

```typescript
private translations: TranslationDictionary = {};

translate(key: string): string {
  return this.translations[key] || key;
}
```

### Step 3: Fix TranslatePipe

**File**: `src/app/core/pipes/translate.pipe.ts`

- [x] Change `transform(...): any` to `transform(...): string`
- [x] Add null/undefined checks

```typescript
transform(key: string): string {
  if (!key) return '';
  return this.translationService.translate(key);
}
```

### Step 4: Create Additional Models

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

### Step 5: Update LanguageService

**File**: `src/app/core/services/language.service.ts`

- [x] Replace string literals with `SupportedLanguage` type
- [x] Type localStorage interactions

```typescript
import { SupportedLanguage } from '../models/translation.model';

setLanguage(lang: SupportedLanguage): void {
  this.currentLanguage.set(lang);
  localStorage.setItem('language', lang);
}
```

---

## Verification Checklist

- [x] No `any` types in production code
- [x] All service methods have explicit return types
- [x] All function parameters have explicit types
- [x] TypeScript compiler shows no errors
- [x] IntelliSense works for all models

---

## Success Criteria

- [x] Type safety score increases from ~60% to 95%+
- [x] Zero `any` types in production code
- [x] All models have proper interfaces
- [x] Full IntelliSense support throughout codebase

---

## Dependencies

None

---

## Related Tasks

- Task 4: Code Duplication (types help with abstraction)
- Task 6: Error Handling (typed errors are more useful)
