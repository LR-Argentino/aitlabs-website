import { Component, signal, OnInit, inject, ChangeDetectionStrategy } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { InfoBannerComponent } from './components/info-banner/info-banner.component';
import { LanguageService } from './core/services/language.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent, InfoBannerComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App implements OnInit {
  protected readonly title = signal('aitlabs-web');

  private languageService = inject(LanguageService);

  ngOnInit() {
    // Language service is already initialized in constructor
    // Just ensure it's available
    console.log('Current language:', this.languageService.currentLanguage());
  }
}
