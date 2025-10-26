# Task 5: Optimize Translation Service Performance

**Priority**: Medium
**Complexity**: Medium
**Estimated Time**: 1 day
**Status**: 🟡 Planned

---

## Problem

Translation service loads all translations synchronously, potentially blocking initial render. No caching mechanism exists.

---

## Affected Files

- `src/app/core/services/translation.service.ts`

---

## Action Items

### Step 1: Implement Caching

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

### Step 2: Add Loading States

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

### Step 3: Preload Common Translations

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

### Step 4: Optimize TranslatePipe

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

---

## Performance Targets

- Translation loading: < 100ms
- Cache hit ratio: > 90%
- Memory usage: < 2MB for all translations
- Initial render time: Reduce by 20%

---

## Success Criteria

- [ ] Translation caching implemented
- [ ] Loading states added
- [ ] Preloading mechanism working
- [ ] Translation loading time < 100ms
- [ ] No performance regressions

---

## Dependencies

- Task 3: Type Safety (SupportedLanguage and TranslationDictionary types)

---

## Related Tasks

- Task 2: OnPush Change Detection (works well with signal-based translations)
- Task 6: Error Handling (loading states help with errors)
