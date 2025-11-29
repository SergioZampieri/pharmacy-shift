# Pharmacy Shifts - Tandil, Argentina

> A modern, mobile-first web application to help residents of Tandil find pharmacies currently on 24-hour duty shifts.

**Live Demo:** [Coming Soon]
**Tech Stack:** Next.js 16 · React 19 · TypeScript · Tailwind CSS 4 · Zustand · TanStack Query · MapLibre GL

---

## About

Pharmacies operate on rotating 24-hour duty shifts. This app helps people in Tandil quickly find which pharmacies are currently open and which will be on duty next.

**Why this project?**
- 🏥 The existing city app has poor UI and is difficult to use, especially on mobile
- ⚡ People often need this information urgently and on-the-go
- 📚 Perfect opportunity to learn Next.js 16, React 19, and Tailwind CSS 4
- ❤️ Contribute a useful public service to my community

---

## Features

### Current Implementation

- **Interactive Map** - MapLibre GL integration with custom pharmacy markers
- **Real-time Data** - Automatic updates at shift changes (8:00 AM daily)
- **Smart Polling** - Efficient API refetching (5min normal, 10sec near shift change)
- **Pharmacy Details** - Modal with contact info, social links, and navigation
- **Mobile Deep Linking** - One-tap navigation to Google Maps, WhatsApp calling
- **Dark Mode** - System-aware theme with manual toggle, persisted to localStorage
- **Shift Filtering** - View current shift, next shift, or all pharmacies
- **Zero Cost Maps** - Uses free MapLibre GL (no API keys required)

### Coming Soon

- Filter controls UI
- Mobile hamburger menu
- Error boundaries
- Language selection (Especially spanish!)
- API route caching
- Enhanced loading states

---

## Tech Stack

### Core Framework
- **Next.js 16** - App Router with React Server Components
- **React 19** - Latest features with React Compiler optimizations
- **TypeScript** - Full type safety with strict mode

### State Management & Data Fetching
- **Zustand** - Lightweight state management (map, filters, preferences, UI)
- **TanStack Query** - Server state management with automatic refetching
- **Zod** - Runtime schema validation

### Styling & UI
- **Tailwind CSS 4** - Utility-first CSS with inline `@theme` directive
- **MapLibre GL** - Free, open-source mapping (no API keys!)

### Developer Experience
- **ESLint 9** - Flat config with Next.js, TypeScript, and Prettier rules
- **Prettier 3** - Code formatting with import sorting

---

## Getting Started

### Prerequisites

- Node.js 24.x or higher
- npm 10.x or higher

### Installation

```bash
# Clone the repository
git clone https://github.com/sergioZampieri/pharmacy-shift.git
cd pharmacy-shift

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm start            # Start production server
npm run type-check   # Run TypeScript type checking
npm run lint         # Run ESLint
npm run lint:fix     # Fix ESLint issues automatically
npm run format       # Format code with Prettier
npm run format:check # Check code formatting
```

---

## Project Structure

```
pharmacy-shift/
├── src/
│   ├── app/                      # Next.js App Router
│   │   ├── api/turno/           # API proxy route (CORS workaround)
│   │   ├── layout.tsx           # Root layout
│   │   ├── page.tsx             # Home page
│   │   └── globals.css          # Global styles + Tailwind config
│   ├── components/              # React components
│   │   ├── map/                 # Map components (PharmacyMap, markers)
│   │   ├── pharmacy/            # Pharmacy UI (detail card)
│   │   ├── icons/               # Icon components
│   │   ├── ui/                  # UI components (theme toggle)
│   │   └── providers/           # React context providers
│   ├── stores/                  # Zustand state management
│   │   ├── map-store.ts         # Map state (selected pharmacy, center, zoom)
│   │   ├── filter-store.ts      # Pharmacy filters
│   │   ├── preferences-store.ts # User preferences (theme, etc.)
│   │   └── ui-store.ts          # UI state (modals, mobile nav)
│   ├── hooks/                   # Custom React hooks
│   │   ├── use-pharmacy-shifts.ts # TanStack Query hook
│   │   └── use-theme.ts         # Theme management
│   ├── services/                # API service layer
│   │   └── pharmacy-api.ts      # Fetch functions
│   └── lib/                     # Utilities and schemas
│       ├── schemas/             # Zod validation schemas
│       ├── navigation.ts        # Mobile deep linking
│       └── format-time.ts       # Time formatting utilities
├── package.json
├── tsconfig.json
├── tailwind.config.ts
└── next.config.ts
```

---

## Architecture Highlights

### State Management Pattern

Separates server state from client state for optimal performance:

- **Server State** (TanStack Query) - API data, caching, automatic refetching
- **Client State** (Zustand) - UI state, map position, filters, user preferences

### API Integration

- **CORS Workaround** - Next.js API route proxies requests to external API
- **Double Validation** - Zod schemas validate data on both server and client
- **Smart Caching** - TanStack Query handles client-side caching with configurable intervals

### Mobile-First Design

- **Deep Linking** - Direct navigation to Google Maps and WhatsApp (no API keys)
- **Responsive Layout** - Tailwind breakpoints for mobile, tablet, desktop
- **Touch-Optimized** - Large tap targets, smooth map interactions

### Performance Optimizations

- **React Compiler** - Automatic memoization and optimization
- **Dynamic Refetch Interval** - Adapts polling frequency based on shift timing
- **Lazy Loading** - Components and routes load on demand
- **Type Safety** - TypeScript prevents runtime errors

---

## Data Flow

```
User → PharmacyMap Component
  ↓
  usePharmacyShifts() Hook (TanStack Query)
  ↓
  fetchPharmacyShifts() Service
  ↓
  /api/turno API Route (CORS Proxy)
  ↓
  External API (farmaciasdeturnotandil.com.ar)
  ↓
  Zod Schema Validation
  ↓
  Zustand Stores (map, filter state)
  ↓
  Re-render with filtered pharmacy markers
```

---

## Key Technical Decisions

### Why MapLibre GL over Google Maps?
- **Zero cost** - No API keys, no billing, no rate limits
- **Open source** - Full control and customization
- **Modern rendering** - WebGL-based for smooth performance
- **Deep linking** - Still uses Google Maps for navigation (no API needed)

### Why Zustand over Redux?
- **Minimal boilerplate** - Simple, intuitive API
- **TypeScript-first** - Excellent type inference
- **Selective re-renders** - Efficient performance
- **Perfect for this scale** - No need for Redux complexity

### Why TanStack Query?
- **Time-based refetching** - Critical for shift changes at 8 AM daily
- **Background polling** - Detects early shift changes automatically
- **Caching built-in** - Reduces unnecessary API calls
- **Loading/error states** - Simplifies UI state management

---

## Testing

Currently manual testing. Future plans:
- Unit tests with Vitest
- Component tests with React Testing Library
- E2E tests with Playwright

---

## Acknowledgments

- **External API** - [farmaciasdeturnotandil.com.ar](https://farmaciasdeturnotandil.com.ar) for pharmacy shift data
- **OpenFreeMap** - Free map tiles
- **MapLibre GL** - Open-source mapping library
- **Community** - Built to serve the residents of Tandil, Argentina

---

**Built with ❤️ for Tandil, Argentina**
