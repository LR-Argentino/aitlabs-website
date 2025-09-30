import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '../../core/pipes/translate.pipe';
import { NavigationService } from '../../core/services/navigation.service';
import { ContactFormComponent } from './contact-form/contact-form.component';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, TranslatePipe, ContactFormComponent],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  private navigationService = inject(NavigationService);

  navigateToSection(sectionId: string) {
    this.navigationService.navigateToSection(sectionId, false);
  }
}