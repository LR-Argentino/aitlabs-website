# Task 6: Implement Comprehensive Error Handling

**Priority**: Medium
**Complexity**: Low
**Estimated Time**: 0.5 days
**Status**: 🟡 Planned

---

## Problem

No error boundaries or fallback mechanisms for translation loading failures or service errors.

---

## Affected Files

- `src/app/core/services/translation.service.ts`
- `src/app/core/services/language.service.ts`
- `src/app/core/pipes/translate.pipe.ts`

---

## Action Items

### Step 1: Create Error Logging Service

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

### Step 2: Add Error Handling to TranslationService

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

### Step 3: Add Error Handling to TranslatePipe

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

### Step 4: Add Global Error Handler

**File**: `src/app/core/handlers/global-error.handler.ts` (NEW)

```typescript
import { ErrorHandler, Injectable, inject } from '@angular/core';
import { ErrorLoggingService, ErrorLevel } from '../services/error-logging.service';

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

## Success Criteria

- [ ] ErrorLoggingService implemented
- [ ] All services have proper error handling
- [ ] GlobalErrorHandler registered
- [ ] Fallback strategies in place
- [ ] No unhandled errors in production

---

## Dependencies

- Task 5: Translation Service Optimization (loading states)

---

## Related Tasks

- Task 1: Testing (error cases should be tested)
- Task 5: Translation Service (error handling for loading)
