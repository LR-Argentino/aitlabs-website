import { Component } from '@angular/core';
import { HeroComponent } from '../../components/hero/hero.component';
import { StatsComponent } from '../../components/stats/stats.component';
import { AboutComponent } from '../../components/about/about.component';
import { OurServicesComponent } from '../../components/our-services/our-services';
import { ProjectsComponent } from '../../components/projects/projects.component';
import { FaqComponent } from '../../components/faq/faq.component';
import { BookingComponent } from '../../components/booking/booking.component';
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
    CtaComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
}