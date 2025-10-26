import { Component, ChangeDetectionStrategy } from '@angular/core';
import { InProgressComponent } from './in-progress.component';

@Component({
  selector: 'app-in-progress-demo',
  standalone: true,
  imports: [InProgressComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="demo-container bg-gray-100 p-8 rounded-lg">
      <h2 class="text-2xl font-bold mb-6 text-center text-gray-800">In Progress Animation Demo</h2>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <!-- Small Animation -->
        <div class="demo-item text-center">
          <h3 class="text-lg font-semibold mb-4 text-gray-700">Small (120px)</h3>
          <app-in-progress width="120px" height="120px" [loop]="true" [autoplay]="true">
          </app-in-progress>
        </div>

        <!-- Medium Animation -->
        <div class="demo-item text-center">
          <h3 class="text-lg font-semibold mb-4 text-gray-700">Medium (200px)</h3>
          <app-in-progress width="200px" height="200px" [loop]="true" [autoplay]="true">
          </app-in-progress>
        </div>

        <!-- Large Animation -->
        <div class="demo-item text-center">
          <h3 class="text-lg font-semibold mb-4 text-gray-700">Large (300px)</h3>
          <app-in-progress width="300px" height="300px" [loop]="true" [autoplay]="true">
          </app-in-progress>
        </div>
      </div>

      <div class="mt-8 text-center">
        <p class="text-gray-600">
          Diese Komponente kann überall in Ihrer Anwendung verwendet werden, wo Sie eine "In
          Progress" Animation benötigen.
        </p>
      </div>
    </div>
  `,
  styles: [
    `
      .demo-container {
        max-width: 1200px;
        margin: 2rem auto;
      }

      .demo-item {
        background: white;
        padding: 1.5rem;
        border-radius: 0.5rem;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      }

      .demo-item h3 {
        margin-bottom: 1rem;
      }
    `,
  ],
})
export class InProgressDemoComponent {}
