# DeliverWing

> Autonomous Drone Delivery Management Platform

DeliverWing is a real-time drone delivery operations platform featuring interactive delivery maps, route optimization, fleet management, and weather-aware dispatch for autonomous aerial logistics.

## Features

- **Delivery Map** -- Real-time Mapbox-powered map with drone positions and delivery zones
- **Order Management** -- Create, track, and manage delivery orders through their lifecycle
- **Route Optimizer** -- AI-driven route planning for multi-stop drone deliveries
- **Customer Tracking** -- Live delivery tracking with ETA and status notifications
- **Weather Integration** -- Weather-aware dispatching to ensure safe flight conditions
- **Fleet Status** -- Monitor drone health, battery levels, and operational readiness

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Maps:** Mapbox GL JS
- **Database:** Supabase (PostgreSQL)
- **Charts:** Recharts
- **State Management:** Zustand
- **Animation:** Framer Motion
- **Icons:** Lucide React

## Getting Started

```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Add SUPABASE_URL, SUPABASE_ANON_KEY, and MAPBOX_TOKEN

# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
  app/
    page.tsx                # Main application with tabbed navigation
  components/
    DeliveryMap.tsx          # Mapbox delivery visualization
    OrderManagement.tsx      # Order CRUD and status tracking
    RouteOptimizer.tsx       # Route planning interface
    CustomerTracking.tsx     # Customer-facing tracking view
    WeatherPanel.tsx         # Weather conditions display
    FleetStatus.tsx          # Drone fleet monitoring
  lib/
    store.ts                 # Zustand state with drones and orders
```

## License

MIT
