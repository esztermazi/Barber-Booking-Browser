# Barber Booking Browser

# Backend

A backend that trims data, not hair.

This project is a **Node.js + Express + TypeScript** backend API for a barber booking application.

The API provides:

- fetching barbers from an external API,
- computing available time slots,
- creating, listing, and deleting bookings.

---

## Requirements

- **Node.js**: v18 or newer (recommended)
- **npm** or **yarn**

---

## Installation

1. Clone the repository:

```bash
git clone https://github.com/esztermazi/Barber-Booking-Browser-Backend.git
cd Barber-Booking-Browser-Backend
```

2. Install dependencies:

```bash
npm install
```

### Environment Variables (.env)

Create a `.env` file in the project root with the following content:

```env
API_URL=https://example.com/barbers
API_KEY=your_api_key_here
INTERNAL_API_KEY=your_internal_api_key_here
```

### Environment variables explained

- API_URL: External API endpoint used to fetch barber data

- API_KEY: API key required by the external service (sent via x-api-key header)

- INTERNAL_API_KEY: Internal API key used to protect backend routes.

## Running the Application

### Development mode

Starts the server with automatic restart using nodemon:

```bash
npm run dev
```

### Production mode

```bash
npm run build
npm run start
```

## API Documentation (Swagger)

The API is documented using **Swagger (OpenAPI)**.

After starting the backend, the Swagger UI is available at:

http://localhost:4000/api-docs

The OpenAPI specification file is located at:

swagger/openapi.yaml

## Data Storage

Bookings are stored in a JSON file on the server using a simple file-based solution (utils/storage.ts).
No database is used.

## Tech Stack

- Node.js
- Express
- TypeScript
- Axios (external API requests)
- dotenv (environment variables)
- uuid (ID generation)

# Frontend

A front end that styles pages, not hair.

This project is the **frontend application** for the Barber Booking Browser system, built with **Next.js**, **React**, and **TypeScript**.

It provides a user interface for:

- browsing barbers,
- viewing available time slots,
- creating and managing bookings.

The frontend communicates with the backend API to fetch barber data and manage bookings.

---

## Requirements

- **Node.js**: v18 or newer (recommended)
- **npm**

---

## Installation

1. Navigate to the frontend directory:

```bash
cd frontend
```

2. Install dependencies:

```bash
npm install
```

### Environment Variables

3. Create a .env.local file in the frontend directory.

```env
NEXT_PUBLIC_API_URL=http://localhost:4000
NEXT_PUBLIC_INTERNAL_API_KEY=your_internal_api_key_here
```

### Environment variables explained

- NEXT_PUBLIC_API_URL: Base URL of the backend API.

- NEXT_PUBLIC_INTERNAL_API_KEY: Internal API key sent by the frontend to authenticate requests to the backend. This value must match the backend’s INTERNAL_API_KEY.

## Running the Application

### Development mode

Starts the Next.js development server with hot reload:

```bash
npm run dev
```

The app will be available at:

http://localhost:3000

### Production mode

Next.js requires a build step before running in production.

Build the application:

```bash
npm run build
```

Start the production server:

```bash
npm run start
```

## Tech Stack

- Next.js
- React
- TypeScript
- Tailwind CSS
- shadcn/ui
- Zod
