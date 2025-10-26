import { Component, ChangeDetectionStrategy } from '@angular/core';
import { TranslatePipe } from '../../core/pipes/translate.pipe';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [TranslatePipe],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AboutComponent {
}