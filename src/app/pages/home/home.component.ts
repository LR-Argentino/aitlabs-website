import { Component, ChangeDetectionStrategy } from '@angular/core';
import { HeroComponent } from '../../shared/components/hero/hero.component';
import { StatsComponent } from '../../components/stats/stats.component';
import { AboutComponent } from '../../components/about/about.component';
import { OurServicesComponent } from '../../shared/components/our-services/our-services.component';
import { ProjectsComponent } from '../../components/projects/projects.component';
import { FaqComponent } from '../../components/faq/faq.component';
import { BookingComponent } from '../../shared/components/booking/booking.component';
import { CtaComponent } from '../../components/cta/cta.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HeroComponent,
    StatsComponent,
    AboutComponent,
    OurServicesComponent,
    ProjectsComponent,
    FaqComponent,
    BookingComponent,
    CtaComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {}
