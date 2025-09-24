import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'ai-voice-assistant',
    loadComponent: () => import('./pages/ai-voice-assistant/ai-voice-assistant.component').then(m => m.AiVoiceAssistantComponent)
  },
  {
    path: '**',
    redirectTo: ''
  }
];
