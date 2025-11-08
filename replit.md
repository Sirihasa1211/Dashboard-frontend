# Analytics Dashboard - Replit Agent Guide

## Overview

This is a full-stack analytics dashboard application built for invoice and vendor data visualization. The application provides an interactive analytics interface with charts, metrics, and a "Chat with Data" feature powered by AI. It's designed as a production-grade SaaS dashboard following modern design principles inspired by Linear and Vercel.

**Core Purpose**: Enable users to visualize invoice data, track vendor spending, monitor cash flow, and query data through natural language.

**Tech Stack**: 
- Frontend: React + TypeScript + Vite
- UI Framework: shadcn/ui + Radix UI + Tailwind CSS
- Backend: Express.js + Node.js
- Database: PostgreSQL (via Neon serverless)
- ORM: Drizzle ORM
- State Management: TanStack Query (React Query)
- Charts: Recharts

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Component Structure**: 
- Uses shadcn/ui component library with Radix UI primitives for accessible, composable components
- Components organized in `/client/src/components/` with UI primitives in `/ui` subdirectory
- Page-level components in `/client/src/pages/` (dashboard, chat, not-found)
- Custom analytics components (charts, tables, metric cards) at component root level

**Routing**: 
- Client-side routing using Wouter (lightweight alternative to React Router)
- Routes defined in `App.tsx`: root (dashboard), `/chat`, and 404 fallback

**Styling Approach**:
- Tailwind CSS with custom design tokens defined in CSS variables
- Theme system supporting light/dark modes via context provider
- Design follows "New York" style from shadcn/ui
- Custom spacing, typography, and color systems defined in `design_guidelines.md`
- HSL color system for theme-aware components

**State Management**:
- TanStack Query for server state management and data fetching
- React Context for theme state
- Local component state for UI interactions

**Data Visualization**:
- Recharts library for all chart components
- Chart types: Line charts (trends), Bar charts (vendor spend, cash outflow), Pie charts (category breakdown)
- Responsive charts using ResponsiveContainer

### Backend Architecture

**Server Framework**:
- Express.js server with TypeScript
- Development mode uses Vite middleware for HMR
- Production mode serves static built files

**API Structure**:
- RESTful API pattern with `/api` prefix
- Routes registered in `server/routes.ts`
- Currently uses in-memory storage abstraction (`MemStorage` class)
- Storage interface defined for CRUD operations on users (extensible for invoices, vendors, etc.)

**Request Handling**:
- JSON body parsing with raw body capture for verification
- Request/response logging middleware
- Error handling with appropriate status codes

**Development Setup**:
- Vite dev server integration for frontend hot reload
- Replit-specific plugins for error overlay and dev tools
- Custom logger with timestamp formatting

### Database Architecture

**ORM**: Drizzle ORM chosen for type-safety and lightweight PostgreSQL interaction

**Connection**:
- Neon serverless PostgreSQL via WebSocket connection
- Connection pooling for efficient resource usage
- Database URL from environment variable

**Schema Design** (Current):
- Users table with UUID primary keys, username, and password
- Schema uses Drizzle Zod for validation
- Schema exports TypeScript types for compile-time safety

**Migration System**:
- Drizzle Kit for schema migrations
- Migration files in `/migrations` directory
- `db:push` script for development schema updates

**Expected Schema Expansion**:
The JSON test data suggests the following normalized tables will be needed:
- **Invoices**: invoice ID, date, status, amounts, organization/department refs
- **Vendors**: vendor details, contact information
- **Line Items**: individual invoice line items
- **Payments**: payment records, amounts, dates
- **Departments/Organizations**: organizational hierarchy
- **Extracted Data**: AI-processed invoice data with confidence scores

### Design System

**Typography**:
- Primary font: Inter (sans-serif)
- Monospace: JetBrains Mono (for numbers, currency, invoice IDs)
- Type scale from 12px to 30px with semantic naming

**Layout System**:
- Sidebar (fixed 16rem) + Main content (flex-1) layout
- Responsive grid systems for dashboard metrics (1-4 columns)
- Consistent spacing using Tailwind units (2, 4, 6, 8, 12, 16)

**Color System**:
- CSS custom properties for theme colors
- Separate light/dark mode color definitions
- Semantic color names (primary, secondary, muted, destructive, etc.)
- Chart-specific color palette (chart-1 through chart-5)

**Component Variants**:
- Button variants: default, destructive, outline, secondary, ghost
- Size variants: sm, default, lg, icon
- Consistent border radius system (sm: 3px, md: 6px, lg: 9px)

## External Dependencies

### UI Component Library
- **shadcn/ui**: Headless component library built on Radix UI
- **Radix UI**: 20+ primitive components for accessibility and composition
- **class-variance-authority**: Type-safe component variants
- **tailwind-merge + clsx**: Class name utilities

### Data Visualization
- **Recharts**: Chart library for React
- **date-fns**: Date manipulation and formatting

### Database & ORM
- **Neon Serverless**: PostgreSQL database provider
- **Drizzle ORM**: TypeScript ORM for PostgreSQL
- **drizzle-zod**: Zod schema generation from Drizzle schemas

### Server Infrastructure
- **Express**: Web server framework
- **Vite**: Build tool and dev server
- **esbuild**: Production bundler for server code
- **ws**: WebSocket library for Neon connection

### Form & Validation
- **React Hook Form**: Form state management
- **Zod**: Schema validation
- **@hookform/resolvers**: Zod resolver for React Hook Form

### State & Data Fetching
- **TanStack Query**: Server state management and caching

### Development Tools
- **TypeScript**: Type safety across the stack
- **Replit Plugins**: Runtime error modal, cartographer, dev banner
- **tsx**: TypeScript execution for dev server

### AI Integration (Planned)
The chat interface suggests integration with:
- Vanna AI for natural language to SQL conversion
- Groq or other LLM for query interpretation
- Currently shows mock responses in UI

### Notes on Architecture Decisions

**Why Drizzle ORM**: Chosen for its lightweight nature, excellent TypeScript support, and straightforward migration system compared to heavier ORMs.

**Why Wouter**: Lightweight routing (1.2kb) suitable for simple SPA needs without React Router's complexity.

**Why shadcn/ui**: Not a package dependency but a copy-paste component system, allowing full customization and no version lock-in.

**Why Neon Serverless**: Serverless PostgreSQL with WebSocket support, ideal for edge deployments and development environments.

**Storage Abstraction**: `IStorage` interface allows swapping between in-memory (development) and database (production) implementations without changing business logic.

**Design System Approach**: CSS variables + Tailwind allows theme switching and maintains design consistency while keeping styles co-located with components.