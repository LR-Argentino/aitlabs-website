import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { TranslatePipe } from '../../core/pipes/translate.pipe';
import { NavigationService } from '../../core/services/navigation.service';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [TranslatePipe],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroComponent {
  private navigationService = inject(NavigationService);

  onScheduleCall() {
    this.navigationService.navigateToSection('booking', false);
  }

  onViewCaseStudy() {
    this.navigationService.navigateToSection('case-studies', false);
  }
}
