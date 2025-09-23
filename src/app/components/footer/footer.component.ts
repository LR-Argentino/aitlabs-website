import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface ContactForm {
  email: string;
  message: string;
}

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
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

  navigateToSection(sectionId: string) {
    let targetElement: HTMLElement | null = null;
    
    switch (sectionId) {
      case 'hero':
        // Scroll to top for hero section
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      case 'about':
        targetElement = document.getElementById('about');
        break;
      case 'services':
        // Services navigation leads to about section where services are described
        targetElement = document.getElementById('about');
        break;
      case 'projects':
        targetElement = document.getElementById('projects');
        break;
      case 'case-studies':
        // Case studies navigation leads to projects section
        targetElement = document.getElementById('projects');
        break;
      case 'testimonials':
        targetElement = document.getElementById('testimonials');
        break;
      case 'faq':
        targetElement = document.getElementById('faq');
        break;
      case 'blog':
        // If blog section exists, scroll to it, otherwise scroll to top
        targetElement = document.getElementById('blog');
        if (!targetElement) {
          window.scrollTo({ top: 0, behavior: 'smooth' });
          return;
        }
        break;
      default:
        targetElement = document.getElementById(sectionId);
    }

    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  }
}