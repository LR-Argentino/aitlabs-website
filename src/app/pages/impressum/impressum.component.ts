import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, FileText, Mail, Phone, MapPin, Building2 } from 'lucide-angular';
import { TranslatePipe } from '../../core/pipes/translate.pipe';

@Component({
  selector: 'app-impressum',
  standalone: true,
  imports: [CommonModule, LucideAngularModule, TranslatePipe],
  templateUrl: './impressum.component.html',
  styleUrl: './impressum.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ImpressumComponent {
  protected readonly FileTextIcon = FileText;
  protected readonly MailIcon = Mail;
  protected readonly PhoneIcon = Phone;
  protected readonly MapPinIcon = MapPin;
  protected readonly Building2Icon = Building2;
}
