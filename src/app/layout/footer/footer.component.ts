import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '../../core/pipes/translate.pipe';
import { ContactFormComponent } from './contact-form/contact-form.component';
import { BaseComponent } from '../../core/base/base.component';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, TranslatePipe, ContactFormComponent],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent extends BaseComponent {
  constructor() {
    super();
  }

  override navigateToSection(sectionId: string) {
    super.navigateToSection(sectionId, false);
  }
}
