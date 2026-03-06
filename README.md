# Power Flow Yoga - Class Booking Platform

A full-featured fitness class booking website built with React, Express, and PostgreSQL.

## Features

- **Home Page**: Hero section with class overview and next available session CTA
- **Schedule**: View all upcoming classes with availability tracking
- **Booking System**: Reserve spots with tap-friendly mobile forms
- **My Bookings**: Look up bookings by email and cancel if needed
- **Contact Page**: Studio information, hours, and contact details
- **Mobile-First Design**: Optimized for phone screens with bottom navigation

## Tech Stack

- **Frontend**: React (Vite), React Router, Bootstrap 5
- **Backend**: Express.js
- **Database**: PostgreSQL with Prisma ORM
- **Styling**: Bootstrap 5 with custom mobile-first CSS

## Getting Started

### Prerequisites

- Node.js (v18+)
- PostgreSQL (locally on port 5432)

### Setup Instructions

1. **Install dependencies** (if not already installed):
   ```bash
   npm install
   ```

2. **Set up the database**:
   ```bash
   npx prisma db push
   ```

3. **Seed initial sessions**:
   ```bash
   node prisma/seed.js
   ```
   This creates the class type and 4 weeks of upcoming sessions.

4. **Start the development servers**:
   ```bash
   npm run dev
   ```
   This starts:
   - Vite dev server on http://localhost:5173 (frontend)
   - Express API on http://localhost:3001 (backend)

5. **Access the application**:
   - Open http://localhost:5173 in your browser

## API Endpoints

### Class Information
- `GET /api/class` - Get class type info and next session

### Sessions
- `GET /api/sessions` - Get all upcoming sessions
- `GET /api/sessions/:id` - Get specific session details

### Bookings
- `POST /api/bookings` - Create a booking
  - Body: `{ sessionId, customerName, email, phone }`
- `GET /api/bookings?email=...` - Get bookings by email
- `DELETE /api/bookings/:id` - Cancel a booking

### Health
- `GET /api/health` - Health check endpoint

## Database Schema

```
ClassType: Core class information (name, description, duration, level, location)
Session: Scheduled class instances with capacity tracking
Booking: Customer reservations linked to sessions
```

## Development

### Restarting servers

After making changes:
- **Backend changes**: `touch /tmp/restart-express` (auto-reloads Express)
- **Frontend changes**: Vite auto-reloads (usually no action needed)
- **Manual restart**: `touch /tmp/restart-vite`

### Database changes

1. Modify `prisma/schema.prisma`
2. Run `npx prisma db push`
3. Restart Express: `touch /tmp/restart-express`

## Production Build

```bash
npm run build
npm start
```

The built frontend is served from `dist/` by the Express server.

## Mobile Features

- Sticky bottom navigation for quick access
- Touch-friendly buttons (min 44px height)
- Single-column layouts on small screens
- Optimized form inputs for mobile typing
- Responsive typography and spacing

## License

MIT