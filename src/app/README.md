# App structure

This project now uses an enterprise-style Angular folder structure:

- core/: application-wide singleton code such as services, guards, interceptors, models, and constants
- shared/: reusable UI building blocks such as components, directives, pipes, and layouts
- features/: feature-specific modules organized by domain, for example home
  - pages/: top-level route pages
  - components/: feature-local components
  - services/: feature services
  - models/: feature models/interfaces
  - utils/: feature-specific helpers
