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
```

### Environment variables explained

- API_URL: External API endpoint used to fetch barber data

- API_KEY: API key required by the external service (sent via x-api-key header)

### Running the Application

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

### Data Storage

Bookings are stored in a JSON file on the server using a simple file-based solution (utils/storage.ts).
No database is used.

### Tech Stack

- Node.js
- Express
- TypeScript
- Axios (external API requests)
- dotenv (environment variables)
- uuid (ID generation)

# Frontend

A front end that styles pages, not hair.
