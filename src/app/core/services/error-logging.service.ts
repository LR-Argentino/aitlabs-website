import { Injectable } from '@angular/core';

/**
 * Error severity levels for structured logging
 */
export enum ErrorLevel {
  INFO = 'info',
  WARNING = 'warning',
  ERROR = 'error',
  CRITICAL = 'critical',
}

/**
 * Structured log entry format
 */
interface LogEntry {
  timestamp: string;
  level: ErrorLevel;
  message: string;
  error?: string;
  stack?: string;
}

/**
 * Centralized error logging service
 *
 * Provides structured logging with different severity levels.
 * All errors are logged to console with proper formatting.
 *
 * Usage:
 *   errorLogging.logError('Failed to load data', error);
 *   errorLogging.logWarning('Cache miss occurred');
 *   errorLogging.logInfo('Operation completed successfully');
 */
@Injectable({
  providedIn: 'root',
})
export class ErrorLoggingService {
  /**
   * Log an error with specified severity level
   *
   * @param message - Human-readable error description
   * @param error - Optional error object or message
   * @param level - Severity level (defaults to ERROR)
   */
  logError(message: string, error?: any, level: ErrorLevel = ErrorLevel.ERROR): void {
    const timestamp = new Date().toISOString();
    const logEntry: LogEntry = {
      timestamp,
      level,
      message,
      error: error?.message || error,
      stack: error?.stack,
    };

    // Log to console with appropriate level
    switch (level) {
      case ErrorLevel.INFO:
        console.info('[INFO]', logEntry);
        break;
      case ErrorLevel.WARNING:
        console.warn('[WARNING]', logEntry);
        break;
      case ErrorLevel.ERROR:
        console.error('[ERROR]', logEntry);
        break;
      case ErrorLevel.CRITICAL:
        console.error('[CRITICAL]', logEntry);
        break;
    }

    // TODO: Send to external logging service (Sentry, LogRocket, CloudWatch, etc.)
    // Example integration:
    // if (environment.production) {
    //   this.sendToExternalLogger(logEntry);
    // }
  }

  /**
   * Log an informational message
   *
   * @param message - Information message
   */
  logInfo(message: string): void {
    this.logError(message, null, ErrorLevel.INFO);
  }

  /**
   * Log a warning message
   *
   * @param message - Warning message
   * @param error - Optional error context
   */
  logWarning(message: string, error?: any): void {
    this.logError(message, error, ErrorLevel.WARNING);
  }
}
