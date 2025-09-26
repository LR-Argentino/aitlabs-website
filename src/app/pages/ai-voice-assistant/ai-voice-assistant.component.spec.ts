import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AiVoiceAssistantComponent } from './ai-voice-assistant.component';

describe('AiVoiceAssistantComponent', () => {
  let component: AiVoiceAssistantComponent;
  let fixture: ComponentFixture<AiVoiceAssistantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AiVoiceAssistantComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AiVoiceAssistantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have scroll methods', () => {
    expect(component.scrollToSection).toBeDefined();
    expect(component.scrollToContact).toBeDefined();
    expect(component.scrollToDemo).toBeDefined();
  });
});