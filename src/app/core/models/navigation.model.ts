/**
 * Navigation System Type Definitions
 *
 * This file provides type-safe interfaces for the navigation system.
 */

/**
 * Navigation item for menus and links
 */
export interface NavigationItem {
  labelKey: string;
  route: string;
  external?: boolean;
  sectionId?: string;
}

/**
 * Navigation target for section scrolling
 */
export interface NavigationTarget {
  sectionId: string;
  fallbackToTop?: boolean;
}

/**
 * Section ID mapping for navigation aliases
 */
export interface SectionMapping {
  [alias: string]: string;
}
