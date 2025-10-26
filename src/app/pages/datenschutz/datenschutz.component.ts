import { Component, OnInit, OnDestroy, signal, inject, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-datenschutz',
  imports: [CommonModule],
  templateUrl: './datenschutz.component.html',
  styleUrl: './datenschutz.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DatenschutzComponent implements OnInit, OnDestroy {
  private router = inject(Router);
  showBackToTop = signal(false);
  private scrollListener: (() => void) | null = null;

  ngOnInit(): void {
    this.scrollListener = () => {
      this.showBackToTop.set(window.pageYOffset > 300);
    };
    window.addEventListener('scroll', this.scrollListener);
  }

  ngOnDestroy(): void {
    if (this.scrollListener) {
      window.removeEventListener('scroll', this.scrollListener);
    }
  }

  scrollToTop(): void {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }
}
