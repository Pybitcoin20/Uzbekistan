# Uzbekistan Heritage & Smart Travel - Backend Starter

This is a production-ready backend starter for the Uzbekistan Heritage platform. It is built with Node.js, Express, and TypeScript, integrating AI, spatial databases, and real-time caching.

## Tech Stack
- **Runtime**: Node.js + Express
- **Language**: TypeScript
- **Database**: PostgreSQL + PostGIS (Spatial queries)
- **Cache**: Redis (AI responses & Geo-results)
- **AI**: Google Gemini (Itineraries & Insights)
- **Payments**: Stripe (Booking & Commissions)
- **Validation**: Zod
- **Security**: Express Rate Limit

## Folder Structure
```
/server
  /middleware   # Security, Rate limiting, Validation
  /routes       # Modular API endpoints
  /services     # Business logic (Cache, Payment, AI)
  db.ts         # PostgreSQL connection pool
server.ts       # Main entry point & Vite middleware
```

## Setup Instructions

### 1. Prerequisites
- Node.js 18+
- PostgreSQL with PostGIS extension
- Redis server
- Stripe account (for API keys)

### 2. Database Setup
Run the schema provided in `/database/schema.sql` to initialize your PostgreSQL database with PostGIS support.

### 3. Environment Variables
Copy `.env.example` to `.env` and fill in your credentials:
- `DATABASE_URL`
- `REDIS_URL`
- `GEMINI_API_KEY`
- `STRIPE_SECRET_KEY`
- `STRIPE_WEBHOOK_SECRET`

### 4. Installation
```bash
npm install
```

### 5. Development
```bash
npm run dev
```

## API Endpoints

### Locations
- `GET /api/locations/nearby?lat=...&lng=...&radius=...`: Smart geo-search with caching.
- `GET /api/locations/plov-radar`: Real-time time-weighted plov rankings.

### AI Planner
- `POST /api/planner/generate`: AI-powered day-by-day itinerary generation.

### Payments
- `POST /api/payments/create-session`: Create Stripe Checkout session.
- `POST /api/payments/webhook`: Stripe webhook handler.
```
