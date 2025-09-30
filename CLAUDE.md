# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

```bash
# Start development server
npm start           # Runs ng serve, opens http://localhost:4200

# Build
npm run build       # Production build (outputs to dist/)
npm run watch       # Development build with watch mode

# Testing
npm test            # Run unit tests with Karma
```

## Architecture Overview

### Standalone Components Architecture
This Angular 20 application uses the **standalone components** pattern (no NgModules). All components, pipes, and directives are standalone and use direct imports.

### Internationalization System
The app implements a **dual-language system** (English/German) with automatic language detection:

- **Language Detection Flow**: Geolocation → Browser Language → Default (English)
- **Core Services**:
  - `LanguageService` (`src/app/core/services/language.service.ts`): Manages current language state using signals, detects language by location/browser, persists to localStorage
  - `TranslationService` (`src/app/core/services/translation.service.ts`): In-memory translation dictionary with `translate(key)` method
  - `TranslatePipe` (`src/app/core/pipes/translate.pipe.ts`): Template pipe for translations, impure to react to language changes

**Translation Pattern**:
```typescript
// In templates
{{ 'nav.home' | translate }}

// In components
this.translationService.translate('nav.home')
```

All translation keys are stored in `TranslationService.translations` object with structure:
```typescript
'key': { en: 'English text', de: 'German text' }
```

### Signal-Based State Management
Angular signals are used throughout for reactive state:
- Language state in `LanguageService`
- Component state in individual components
- No external state management library

### Project Structure

```
src/app/
├── components/        # Reusable UI components (header, footer, hero, etc.)
├── pages/            # Route-level page components (home, ai-voice-assistant, ai-automations)
├── core/             # Core services, pipes, guards, interceptors
│   ├── services/     # Singleton services (language, translation)
│   ├── pipes/        # Global pipes (translate)
│   ├── guards/       # Route guards
│   ├── interceptors/ # HTTP interceptors
│   ├── models/       # Data models
│   └── utils/        # Utility functions
├── shared/           # Shared components and utilities
├── features/         # Feature-specific modules
└── layout/           # Layout components
```

### Routing
Routes use lazy loading with `loadComponent`:
```typescript
{
  path: 'ai-voice-assistant',
  loadComponent: () => import('./pages/ai-voice-assistant/ai-voice-assistant.component').then(m => m.AiVoiceAssistantComponent)
}
```

### Styling
- **Tailwind CSS** for utility-first styling
- Custom design tokens defined in `tailwind.config.js`:
  - Primary green: `#a4f58a`
  - Font family: Plus Jakarta Sans
  - Custom color palette for AIT LABS branding
- Global styles in `src/styles.css`
- Component-specific styles use Tailwind utilities

### TypeScript Configuration
Strict mode enabled with:
- `strict: true`
- `strictTemplates: true`
- `noImplicitReturns: true`
- `noFallthroughCasesInSwitch: true`

## Component Patterns

### Dependency Injection
Use `inject()` function pattern (modern Angular):
```typescript
private languageService = inject(LanguageService);
```

### Component Template Files
Components use separate template files (`.html`) rather than inline templates.

### Component Naming
- Component class: `HomeComponent`
- Selector: `app-home`
- Files: `home.component.ts`, `home.component.html`, `home.component.css`

## Translation Management

When adding new translatable text:

1. Add translation key to `TranslationService.translations` object
2. Provide both English and German translations
3. Use the pipe in templates: `{{ 'your.key' | translate }}`
4. Follow existing key naming conventions:
   - Navigation: `nav.*`
   - Common UI: `common.*`
   - Section-specific: `hero.*`, `services.*`, `footer.*`, etc.

## Code Quality Standards

### Prettier Configuration
```json
{
  "printWidth": 100,
  "singleQuote": true,
  "parser": "angular" // for HTML files
}
```

### File Organization
- Keep components focused and single-purpose
- Place shared utilities in `core/utils/`
- Place shared components in `shared/`
- Feature-specific code goes in `features/`