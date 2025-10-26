import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '../../core/pipes/translate.pipe';

@Component({
  selector: 'app-our-services',
  standalone: true,
  imports: [CommonModule, TranslatePipe],
  templateUrl: './our-services.html',
  styleUrls: ['./our-services.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OurServicesComponent {
  services = [
    {
      id: 'ai-voice-assistant',
      title: 'AI Voice Assistant',
      description: 'Intelligent voice solutions that understand, respond, and automate customer interactions with natural conversation flows.',
      icon: '/voice-assistant.svg',
      gradient: 'from-gray-900 to-gray-800',
      buttonStyle: 'bg-primary-green text-primary-text hover:bg-primary-green/90',
      textColor: 'text-gray-300'
    },
    {
      id: 'ai-automations',
      title: 'AI Automations',
      description: 'Smart automation systems that streamline workflows, reduce manual tasks, and boost productivity by 95%.',
      icon: '/automations.svg',
      gradient: 'from-blue-900 to-blue-800',
      buttonStyle: 'bg-white/10 text-white border border-white/20 hover:bg-white/20',
      textColor: 'text-blue-100'
    },
    {
      id: 'ai-applications',
      title: 'AI Applications',
      description: 'Custom AI-powered applications tailored to your business needs, from web platforms to mobile solutions.',
      icon: '/app.svg',
      gradient: 'from-purple-900 to-purple-800',
      buttonStyle: 'bg-white/10 text-white border border-white/20 hover:bg-white/20',
      textColor: 'text-purple-100'
    },
    {
      id: 'idp',
      title: 'Intelligence Document Processing',
      description: 'Advanced AI systems that extract, analyze, and process documents automatically, turning paperwork into actionable insights.',
      icon: '/idp.svg',
      gradient: 'from-emerald-900 to-emerald-800',
      buttonStyle: 'bg-white/10 text-white border border-white/20 hover:bg-white/20',
      textColor: 'text-emerald-100'
    }
  ];

  onServiceClick(serviceId: string) {
    // Handle service click - could navigate to service detail page
    console.log(`Service clicked: ${serviceId}`);
    // Example: this.router.navigate(['/services', serviceId]);
  }
}
