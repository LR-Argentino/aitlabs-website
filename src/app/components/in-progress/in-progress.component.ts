import { Component, Input } from '@angular/core';
import { LottieComponent, AnimationOptions } from 'ngx-lottie';

@Component({
  selector: 'app-in-progress',
  standalone: true,
  imports: [LottieComponent],
  templateUrl: './in-progress.component.html',
  styleUrls: ['./in-progress.component.css']
})
export class InProgressComponent {
  @Input() width: string = '200px';
  @Input() height: string = '200px';
  @Input() loop: boolean = true;
  @Input() autoplay: boolean = true;

  options: AnimationOptions = {
    path: '/inprogress.json',
    loop: this.loop,
    autoplay: this.autoplay
  };

  ngOnInit() {
    // Update options when inputs change
    this.options = {
      path: '/inprogress.json',
      loop: this.loop,
      autoplay: this.autoplay
    };
  }

  onAnimationCreated(animationItem: any): void {
    console.log('Lottie animation created:', animationItem);
  }

  onConfigReady(): void {
    console.log('Lottie animation config ready');
  }

  onDataReady(): void {
    console.log('Lottie animation data ready');
  }

  onDOMLoaded(): void {
    console.log('Lottie animation DOM loaded');
  }

  onDestroy(): void {
    console.log('Lottie animation destroyed');
  }

  onLoopComplete(): void {
    console.log('Lottie animation loop completed');
  }

  onComplete(): void {
    console.log('Lottie animation completed');
  }

  onSegmentStart(): void {
    console.log('Lottie animation segment started');
  }

  onEnterFrame(): void {
    // This fires on every frame, so we don't log it to avoid console spam
  }

  onError(error: any): void {
    console.error('Lottie animation error:', error);
  }
}