import { Component, ChangeDetectionStrategy } from '@angular/core';
import { TranslatePipe } from '../../core/pipes/translate.pipe';
import { BaseComponent } from '../../core/base/base.component';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [TranslatePipe],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroComponent extends BaseComponent {
  constructor() {
    super();
  }

  onScheduleCall() {
    super.navigateToSection('booking', false);
  }

  onViewCaseStudy() {
    super.navigateToSection('case-studies', false);
  }
}
