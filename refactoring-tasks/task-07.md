# Task 7: Reorganize Project Structure

**Priority**: Low
**Complexity**: Low
**Estimated Time**: 0.5 days
**Status**: 🟢 Future

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

- [ ] `core/models/`
- [ ] `core/base/`
- [ ] `core/handlers/`
- [ ] `core/utils/`
- [ ] `shared/components/`
- [ ] `layout/`
- [ ] `features/`

### Phase 2: Move files

- [ ] Move header → `layout/header/`
- [ ] Move footer → `layout/footer/`
- [ ] Move hero → `shared/components/hero/`
- [ ] Move services-section → `shared/components/services-section/`
- [ ] Move booking → `shared/components/booking/`

### Phase 3: Update imports

- [ ] Update all import paths
- [ ] Update `tsconfig.json` path mappings
- [ ] Verify application still compiles and runs

---

## Success Criteria

- [ ] All directories created and organized logically
- [ ] Files moved to appropriate locations
- [ ] All imports updated correctly
- [ ] Application compiles without errors
- [ ] CLAUDE.md reflects new structure

---

## Dependencies

- Task 3: Type Safety (models/ directory needed)
- Task 4: Code Duplication (base/ directory needed)
- Task 6: Error Handling (handlers/ directory needed)

---

## Related Tasks

- All tasks benefit from better organization
