import { Component, ChangeDetectionStrategy } from '@angular/core';
import { BaseComponent } from '../../core/base/base.component';

@Component({
  selector: 'app-cta',
  standalone: true,
  templateUrl: './cta.component.html',
  styleUrl: './cta.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CtaComponent extends BaseComponent {
  constructor() {
    super();
  }

  onGetStarted() {
    super.navigateToSection('contact-form', false);
  }

  onContactUs() {
    super.navigateToSection('contact-form', false);
  }
}
