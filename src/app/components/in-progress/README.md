# In Progress Component

Eine Angular-Komponente, die eine Lottie-Animation für "In Progress" Zustände anzeigt.

## Features

- ✅ Standalone Angular-Komponente
- ✅ Konfigurierbare Größe (width/height)
- ✅ Loop und Autoplay Optionen
- ✅ Responsive Design
- ✅ Event-Handler für alle Lottie-Events
- ✅ TypeScript-Support

## Installation

Die benötigten Pakete sind bereits installiert:
- `ngx-lottie`
- `lottie-web`

## Verwendung

### Basis-Verwendung

```html
<app-in-progress></app-in-progress>
```

### Mit benutzerdefinierten Optionen

```html
<app-in-progress 
  width="300px" 
  height="300px"
  [loop]="true"
  [autoplay]="true">
</app-in-progress>
```

### In TypeScript-Komponente importieren

```typescript
import { InProgressComponent } from './components/in-progress/in-progress.component';

@Component({
  selector: 'app-my-component',
  standalone: true,
  imports: [InProgressComponent],
  template: `
    <app-in-progress width="150px" height="150px"></app-in-progress>
  `
})
export class MyComponent {}
```

## Input-Parameter

| Parameter | Typ | Standard | Beschreibung |
|-----------|-----|----------|--------------|
| `width` | string | '200px' | Breite der Animation |
| `height` | string | '200px' | Höhe der Animation |
| `loop` | boolean | true | Animation wiederholen |
| `autoplay` | boolean | true | Animation automatisch starten |

## Events

Die Komponente stellt alle Lottie-Events zur Verfügung:

- `animationCreated` - Animation wurde erstellt
- `configReady` - Konfiguration ist bereit
- `dataReady` - Daten sind geladen
- `DOMLoaded` - DOM ist geladen
- `destroy` - Animation wurde zerstört
- `loopComplete` - Ein Loop wurde abgeschlossen
- `complete` - Animation ist komplett abgeschlossen
- `segmentStart` - Segment wurde gestartet
- `enterFrame` - Wird bei jedem Frame aufgerufen
- `error` - Fehler beim Laden der Animation

## Animation-Datei

Die Komponente verwendet die Datei `/public/inprogress.json` als Lottie-Animation.

## Responsive Verhalten

Die Komponente ist responsive und passt sich automatisch an kleinere Bildschirme an:

- Tablets (≤768px): max-width/height: 150px
- Mobile (≤480px): max-width/height: 120px

## Beispiele

### Loading-Spinner

```html
<div class="loading-container">
  <app-in-progress width="100px" height="100px"></app-in-progress>
  <p>Laden...</p>
</div>
```

### Große Darstellung

```html
<app-in-progress 
  width="400px" 
  height="400px"
  [loop]="true">
</app-in-progress>
```

### Einmalige Wiedergabe

```html
<app-in-progress 
  [loop]="false"
  [autoplay]="true">
</app-in-progress>
```

## Styling

Die Komponente kann über CSS angepasst werden:

```css
app-in-progress {
  display: block;
  margin: 2rem auto;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.1);
  padding: 1rem;
}
```