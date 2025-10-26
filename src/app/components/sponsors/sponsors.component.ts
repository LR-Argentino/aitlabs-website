import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-sponsors',
  standalone: true,
  templateUrl: './sponsors.component.html',
  styleUrl: './sponsors.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SponsorsComponent {}
