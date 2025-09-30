import {Component, OnDestroy, OnInit, inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import { NavigationService } from '../../core/services/navigation.service';
import {
    LucideAngularModule,
    Mic,
    Volume2,
    Bot,
    CalendarPlus,
    MailCheck,
    ShieldCheck,
    Check,
    Settings2,
    Cpu,
    Layers,
    Shield,
    GitBranch,
    ArrowUpRight,
    Lock,
    Brain,
    AudioWaveform,
    CalendarClock,
    Plug,
    FileText,
    Calendar
} from 'lucide-angular';

@Component({
    selector: 'app-ai-voice-assistant',
    standalone: true,
    imports: [CommonModule, LucideAngularModule],
    templateUrl: './ai-voice-assistant.component.html',
    styleUrl: './ai-voice-assistant.component.css'
})
export class AiVoiceAssistantComponent implements OnInit, OnDestroy {
    private navigationService = inject(NavigationService);

    protected readonly MicIcon = Mic;
    protected readonly Volume2Icon = Volume2;
    protected readonly BotIcon = Bot;
    protected readonly CalendarPlusIcon = CalendarPlus;
    protected readonly MailCheckIcon = MailCheck;
    protected readonly ShieldCheckIcon = ShieldCheck;
    protected readonly CheckIcon = Check;
    protected readonly CpuIcon = Cpu;
    protected readonly LayersIcon = Layers;
    protected readonly ShieldIcon = Shield;
    protected readonly GitBranchIcon = GitBranch;
    protected readonly ArrowUpRightIcon = ArrowUpRight;
    protected readonly LockIcon = Lock;
    protected readonly BrainIcon = Brain;
    protected readonly AudioWaveformIcon = AudioWaveform;
    protected readonly CalendarClockIcon = CalendarClock;
    protected readonly PlugIcon = Plug;
    protected readonly FileTextIcon = FileText;
    protected readonly CalendarIcon = Calendar;


    ngOnInit() {
        // Initialize Lucide icons when component loads
        this.initializeLucideIcons();
        // Set current year
        this.setCurrentYear();
    }

    ngOnDestroy() {
        // Cleanup if needed
    }

    private initializeLucideIcons() {
        // Wait for the DOM to be ready, then initialize Lucide icons
        setTimeout(() => {
            if (typeof (window as any).lucide !== 'undefined') {
                (window as any).lucide.createIcons({
                    attrs: {
                        stroke: 'currentColor',
                        'stroke-width': 1.5,
                        'aria-hidden': 'true'
                    }
                });
            }
        }, 100);
    }

    private setCurrentYear() {
        setTimeout(() => {
            const yearElement = document.getElementById('year');
            if (yearElement) {
                yearElement.textContent = new Date().getFullYear().toString();
            }
        }, 100);
    }

    scrollToSection(sectionId: string) {
        this.navigationService.navigateToSection(sectionId, false);
    }

    scrollToContact() {
        this.scrollToSection('contact');
    }

    scrollToDemo() {
        this.scrollToSection('demo');
    }


    protected readonly Settings2 = Settings2;
    protected readonly Cpu = Cpu;
  protected readonly File = File;
}
