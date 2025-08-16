# Overview

This is a modern real estate website for Ebutine Properties, a Nigerian real estate company specializing in residential and commercial lands, luxury homes, and property management. The company targets both local Nigerian clients and diaspora investors worldwide. The website is built as a full-stack application with React frontend and Express backend, featuring property listings, contact forms, and inquiry management.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Framework**: React 18 with TypeScript using Vite as the build tool
- **Routing**: Wouter for client-side routing with page-based structure
- **UI Components**: Shadcn/ui component library built on Radix UI primitives
- **Styling**: Tailwind CSS with custom brand colors (ebutine-blue, ebutine-orange, ebutine-dark)
- **State Management**: TanStack Query (React Query) for server state management
- **Forms**: React Hook Form with Zod validation for type-safe form handling
- **SEO**: React Helmet for meta tags and structured data optimization

## Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **API Design**: RESTful API with proper error handling and request logging
- **Development**: Hot reloading with Vite middleware integration
- **Data Storage**: In-memory storage implementation with interface for future database integration

## Data Storage Solutions
- **ORM**: Drizzle ORM configured for PostgreSQL
- **Database**: PostgreSQL (configured but using in-memory storage for now)
- **Schema**: Shared schema definitions with Zod validation
- **Tables**: Users, properties, contacts, and property inquiries with proper relationships

## Authentication and Authorization
- **Current State**: Basic structure in place but not fully implemented
- **Session Management**: Connect-pg-simple configured for PostgreSQL session storage
- **User Model**: Basic user schema with username/password fields defined

## API Structure
- **Properties**: GET /api/properties (with filtering), GET /api/properties/:id
- **Contacts**: POST /api/contacts, GET /api/contacts
- **Property Inquiries**: Property-specific inquiry endpoints
- **Filtering**: Support for property type, location, price range, and featured status
- **Validation**: Zod schemas for request/response validation

## External Dependencies

### Core Dependencies
- **Neon Database**: @neondatabase/serverless for PostgreSQL serverless connection
- **Drizzle**: ORM with PostgreSQL dialect and migration support
- **TanStack Query**: Server state management and caching
- **Radix UI**: Comprehensive component primitives for accessibility
- **Tailwind CSS**: Utility-first CSS framework with custom configuration

### Development Tools
- **Vite**: Fast build tool with React plugin and runtime error overlay
- **TypeScript**: Type safety with strict configuration
- **ESBuild**: Production bundling for server code
- **PostCSS**: CSS processing with Autoprefixer

### Third-party Integrations
- **WhatsApp Business**: Direct messaging integration for customer communication
- **Google Analytics**: Configured for tracking (VITE_GA_MEASUREMENT_ID)
- **Font Loading**: Google Fonts integration for typography
- **Replit**: Development environment integration with error banner

### SEO and Analytics
- **Structured Data**: JSON-LD schema for real estate business
- **Meta Tags**: OpenGraph and Twitter card optimization
- **Google Fonts**: Inter font family for consistent typography
- **Performance**: Optimized loading with preconnect hints