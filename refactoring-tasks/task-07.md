# Task 7: Reorganize Project Structure

**Priority**: Low
**Complexity**: Low
**Estimated Time**: 0.5 days
**Status**: ✅ Complete

---

## Problem

Missing directories mentioned in CLAUDE.md (features/, layout/, shared/). Current flat component organization doesn't scale well.

---

## Current Structure

```
src/app/
├── components/       # Mixed reusable and layout components
├── pages/           # Route-level pages
├── core/            # Services, pipes, guards
└── app.component.ts
```

---

## Target Structure

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

---

## Action Items

### Phase 1: Create new directories

- [x] `core/models/`
- [x] `core/base/`
- [x] `core/handlers/`
- [x] `core/utils/`
- [x] `shared/components/`
- [x] `layout/`
- [x] `features/`

### Phase 2: Move files

- [x] Move header → `layout/header/`
- [x] Move footer → `layout/footer/`
- [x] Move hero → `shared/components/hero/`
- [x] Move services-section → `shared/components/our-services/`
- [x] Move booking → `shared/components/booking/`
- [x] Move ai-voice-assistant → `features/ai-voice-assistant/`
- [x] Move ai-automations → `features/ai-automations/`

### Phase 3: Update imports

- [x] Update all import paths
- [x] Update `tsconfig.json` path mappings
- [x] Verify application still compiles and runs

---

## Success Criteria

- [x] All directories created and organized logically
- [x] Files moved to appropriate locations
- [x] All imports updated correctly
- [x] Application compiles without errors
- [x] CLAUDE.md reflects new structure

---

## Dependencies

- Task 3: Type Safety (models/ directory needed)
- Task 4: Code Duplication (base/ directory needed)
- Task 6: Error Handling (handlers/ directory needed)

---

## Related Tasks

- All tasks benefit from better organization
