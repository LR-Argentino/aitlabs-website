---
description: Repository Information Overview
alwaysApply: true
---

# AitlabsWeb Information

## Summary
AitlabsWeb is an Angular-based web application project. It was generated using Angular CLI version 20.3.2 and follows modern Angular development practices with standalone components.

## Structure
- **src/**: Contains the application source code
  - **app/**: Angular components, services, and application logic
  - **main.ts**: Application entry point
- **public/**: Static assets and resources
- **tests/**: Test files and configurations
- **.github/workflows/**: CI/CD configuration files
- **.zencoder/**: Zencoder configuration files

## Language & Runtime
**Language**: TypeScript
**Version**: TypeScript 5.9.2
**Target**: ES2022
**Build System**: Angular CLI
**Package Manager**: npm

## Dependencies
**Main Dependencies**:
- Angular 20.3.0 (@angular/core, @angular/common, @angular/router, etc.)
- RxJS 7.8.0
- Lottie Web 5.13.0
- ngx-lottie 20.0.0
- Zone.js 0.15.0

**Development Dependencies**:
- Angular CLI 20.3.2
- Jasmine 5.9.0 and Karma 6.4.0 for testing
- TailwindCSS 3.4.17
- PostCSS 8.5.6
- Autoprefixer 10.4.21

## Build & Installation
```bash
# Install dependencies
npm install

# Start development server
npm start
# or
ng serve

# Build for production
npm run build
# or
ng build
```

## Testing
**Framework**: Jasmine with Karma
**Test Location**: src/**/*.ts
**Configuration**: tsconfig.spec.json, angular.json (test section)
**Run Command**:
```bash
npm test
# or
ng test
```

## UI Framework
**CSS Framework**: TailwindCSS 3.4.17
**Configuration**: tailwind.config.js
**Custom Theme**:
- Custom color palette with primary-green, secondary-green, etc.
- Custom font family (Plus Jakarta Sans)
- Custom letter spacing