/**
 * Booking System Type Definitions
 *
 * This file provides type-safe interfaces for the booking/calendar integration system.
 */

/**
 * Supported calendar providers
 */
export type CalendarProvider = 'calcom' | 'calendly' | 'fallback' | 'contact-form';

/**
 * Result of a calendar loading operation
 */
export interface CalendarLoadResult {
  success: boolean;
  provider: CalendarProvider;
  container: HTMLElement;
}

/**
 * Booking form data for contact form fallback
 */
export interface BookingFormData {
  name: string;
  email: string;
  phone?: string;
  service?: string;
  message: string;
}

/**
 * Response from booking/contact form submission
 */
export interface BookingResponse {
  success: boolean;
  message: string;
  errorCode?: string;
}
