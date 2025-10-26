import { Component, signal, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Testimonial {
  id: number;
  quote: string;
  name: string;
  position: string;
  company: string;
  avatar?: string;
}

@Component({
  selector: 'app-testimonials',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './testimonials.component.html',
  styleUrl: './testimonials.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TestimonialsComponent {
  protected readonly currentTestimonial = signal(0);

  protected readonly testimonials = signal<Testimonial[]>([
    {
      id: 1,
      quote:
        'Working with AIT LABS has been an absolute game-changer for our business. Their team perfectly blended creativity and technical expertise to deliver a stunning website and seamless user experience. We saw a 45% increase in customer engagement within just two months after the launch. Highly recommended!',
      name: 'Garry Wheeler',
      position: 'Chief Marketing Officer',
      company: 'NovaTech Solutions',
    },
    {
      id: 2,
      quote:
        'The AI automation solutions provided by AIT LABS saved us over 20 hours per week. Their attention to detail and understanding of our business needs was exceptional. The ROI was visible within the first month of implementation.',
      name: 'Sarah Johnson',
      position: 'Operations Director',
      company: 'TechFlow Industries',
    },
    {
      id: 3,
      quote:
        'From concept to deployment, AIT LABS exceeded our expectations. Their UI/UX design transformed our user experience completely, resulting in a 60% increase in user retention. Professional, reliable, and innovative.',
      name: 'Michael Chen',
      position: 'Product Manager',
      company: 'Digital Dynamics',
    },
  ]);

  nextTestimonial() {
    const current = this.currentTestimonial();
    const total = this.testimonials().length;
    this.currentTestimonial.set((current + 1) % total);
  }

  previousTestimonial() {
    const current = this.currentTestimonial();
    const total = this.testimonials().length;
    this.currentTestimonial.set(current === 0 ? total - 1 : current - 1);
  }

  getCurrentTestimonial() {
    return this.testimonials()[this.currentTestimonial()];
  }
}
