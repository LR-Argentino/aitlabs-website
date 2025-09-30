import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslatePipe } from '../../../core/pipes/translate.pipe';

interface ContactForm {
  email: string;
  message: string;
}

@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [CommonModule, FormsModule, TranslatePipe],
  templateUrl: './contact-form.component.html',
  styleUrl: './contact-form.component.css'
})
export class ContactFormComponent {
  protected readonly contactForm = signal<ContactForm>({
    email: '',
    message: ''
  });

  protected readonly isSubmitting = signal(false);
  protected readonly submitMessage = signal('');

  onSubmit() {
    const form = this.contactForm();

    if (!form.email || !form.message) {
      this.submitMessage.set('Please fill in all fields.');
      return;
    }

    if (!this.isValidEmail(form.email)) {
      this.submitMessage.set('Please enter a valid email address.');
      return;
    }

    this.isSubmitting.set(true);
    this.submitMessage.set('');

    // Simulate form submission
    setTimeout(() => {
      this.submitMessage.set('Thank you for your message! We\'ll get back to you soon.');
      this.contactForm.set({ email: '', message: '' });
      this.isSubmitting.set(false);

      // Clear success message after 5 seconds
      setTimeout(() => {
        this.submitMessage.set('');
      }, 5000);
    }, 1000);
  }

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  updateEmail(email: string) {
    this.contactForm.set({
      ...this.contactForm(),
      email
    });
  }

  updateMessage(message: string) {
    this.contactForm.set({
      ...this.contactForm(),
      message
    });
  }
}
