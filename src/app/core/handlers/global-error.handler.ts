import { ErrorHandler, Injectable, inject, isDevMode } from '@angular/core';
import { ErrorLoggingService, ErrorLevel } from '../services/error-logging.service';

/**
 * Global error handler for unhandled errors in the application
 *
 * Captures all unhandled errors and logs them through ErrorLoggingService.
 * In development mode, errors are also logged to console for debugging.
 *
 * Features:
 * - Structured error logging with CRITICAL level
 * - Development mode debugging support
 * - Integration with external logging services (via ErrorLoggingService)
 *
 * Registered in app.config.ts as Angular ErrorHandler provider
 */
@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  private readonly errorLogging = inject(ErrorLoggingService);

  /**
   * Handle unhandled errors
   *
   * @param error - The unhandled error
   */
  handleError(error: Error | any): void {
    // Extract error message
    const errorMessage = error?.message || 'Unhandled error occurred';
    const errorStack = error?.stack;

    // Log with CRITICAL level
    this.errorLogging.logError('Unhandled application error', error, ErrorLevel.CRITICAL);

    // In development mode, also log to console for easier debugging
    if (isDevMode()) {
      console.error('🔴 Global Error Handler - Unhandled Error:', {
        message: errorMessage,
        error,
        stack: errorStack,
        timestamp: new Date().toISOString(),
      });
    }

    // Don't suppress errors - let them propagate for debugging
    // In production, the error is logged but won't break the app
  }
}
