import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '../../core/pipes/translate.pipe';
import { LucideAngularModule, AlertTriangle } from 'lucide-angular';

@Component({
  selector: 'app-info-banner',
  standalone: true,
  imports: [CommonModule, TranslatePipe, LucideAngularModule],
  templateUrl: './info-banner.component.html',
  styleUrl: './info-banner.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InfoBannerComponent {
  protected readonly AlertTriangleIcon = AlertTriangle;
}