import { Injectable, signal, computed, Signal } from '@angular/core';

export type DropdownId = string;

export interface DropdownConfig {
  id: DropdownId;
  closeDelay?: number; // Delay before closing (for hover)
}

@Injectable({
  providedIn: 'root',
})
export class DropdownManagerService {
  private readonly openDropdown = signal<DropdownId | null>(null);
  private closeTimeout: ReturnType<typeof setTimeout> | null = null;

  /**
   * Check if a specific dropdown is open
   */
  isOpen(dropdownId: DropdownId): Signal<boolean> {
    return computed(() => this.openDropdown() === dropdownId);
  }

  /**
   * Open a dropdown (automatically closes others)
   */
  open(dropdownId: DropdownId): void {
    this.clearCloseTimeout();
    this.openDropdown.set(dropdownId);
  }

  /**
   * Close a specific dropdown
   */
  close(dropdownId: DropdownId): void {
    if (this.openDropdown() === dropdownId) {
      this.openDropdown.set(null);
    }
  }

  /**
   * Close all dropdowns immediately
   */
  closeAll(): void {
    this.clearCloseTimeout();
    this.openDropdown.set(null);
  }

  /**
   * Toggle a dropdown (open if closed, close if open)
   */
  toggle(dropdownId: DropdownId): void {
    if (this.openDropdown() === dropdownId) {
      this.close(dropdownId);
    } else {
      this.open(dropdownId);
    }
  }

  /**
   * Schedule delayed close (useful for hover menus)
   */
  scheduleClose(delay: number = 300): void {
    this.clearCloseTimeout();
    this.closeTimeout = setTimeout(() => {
      this.closeAll();
    }, delay);
  }

  /**
   * Cancel scheduled close
   */
  cancelScheduledClose(): void {
    this.clearCloseTimeout();
  }

  private clearCloseTimeout(): void {
    if (this.closeTimeout) {
      clearTimeout(this.closeTimeout);
      this.closeTimeout = null;
    }
  }
}
