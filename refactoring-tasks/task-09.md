# Task 9: Bundle Size Optimization

**Priority**: Low
**Complexity**: Low
**Estimated Time**: 0.5 days
**Status**: 🟢 Future

---

## Problem

Potential for bundle size optimization through better code splitting and lazy loading.

---

## Action Items

### Step 1: Analyze Current Bundle

```bash
npm run build -- --stats-json
npx webpack-bundle-analyzer dist/aitlabs-website/stats.json
```

### Step 2: Implement Translation File Code Splitting

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

### Step 3: Lazy Load Heavy Components

Identify and lazy load components > 50KB:

```typescript
// Instead of direct import
import { HeavyChartComponent } from './heavy-chart.component';

// Use dynamic import
const HeavyChartComponent = await import('./heavy-chart.component');
```

### Step 4: Optimize Third-Party Dependencies

Review and optimize package.json:

```bash
npx depcheck  # Find unused dependencies
npx bundlephobia analyze  # Analyze dependency sizes
```

### Step 5: Enable Production Optimizations

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

---

## Target Metrics

- Initial bundle size: < 500KB
- Total bundle size: < 1MB
- First Contentful Paint: < 1.5s
- Time to Interactive: < 3s
- Lighthouse Performance Score: > 90

---

## Success Criteria

- [ ] Bundle analysis completed
- [ ] Initial bundle size < 500KB
- [ ] Code splitting implemented
- [ ] Lighthouse performance score > 90
- [ ] No performance regressions

---

## Dependencies

- Task 5: Translation Service Optimization (helps with code splitting)

---

## Related Tasks

- Task 2: OnPush Change Detection (improves runtime performance)
- Task 5: Translation Service (loading optimization)
