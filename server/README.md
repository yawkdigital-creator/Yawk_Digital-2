# Backend Server - MongoDB Integration

This backend server handles form submissions from the "Book a Strategy Call" form and stores them in MongoDB.

## Setup Instructions

### 1. Create Environment File

Create a `.env` file in the root directory with the following content:

```
MONGODB_URI=mongodb://localhost:27017/yawk_digital
PORT=5000
```

### 2. Start MongoDB

Make sure MongoDB is running on your local machine:

```bash
# If MongoDB is installed as a service, it should start automatically
# Otherwise, start it manually:
mongod
```

### 3. Start the Backend Server

```bash
npm run server
```

Or for development with auto-reload:

```bash
npm run dev:server
```

The server will start on `http://localhost:5000`

### 4. Start the Frontend

In a separate terminal:

```bash
npm run dev
```

## API Endpoints

### POST `/api/strategy-call/submit`
Submit a new strategy call form.

**Request Body:**
```json
{
  "fullName": "John Doe",
  "email": "john@example.com",
  "whatsapp": "03001234567",
  "ecommerceTimeline": "Now",
  "investmentReady": "Yes",
  "seenElyscents": "Yes",
  "category": "Perfume"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Strategy call request submitted successfully",
  "data": {
    "id": "...",
    "fullName": "John Doe",
    "email": "john@example.com",
    "submittedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

### GET `/api/strategy-call/submissions`
Get all form submissions (with pagination).

**Query Parameters:**
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 10)
- `status` (optional): Filter by status (new, contacted, scheduled, completed)

### GET `/api/strategy-call/submissions/:id`
Get a single submission by ID.

### PATCH `/api/strategy-call/submissions/:id/status`
Update submission status.

**Request Body:**
```json
{
  "status": "contacted"
}
```

## Database Schema

The `StrategyCall` model stores the following fields:

- `fullName` (String, required)
- `email` (String, required, validated)
- `whatsapp` (String, required)
- `ecommerceTimeline` (String, enum: ['Now', 'Later', 'Never'])
- `investmentReady` (String, enum: ['Yes', 'No'])
- `seenElyscents` (String, enum: ['Yes', 'No'])
- `category` (String, enum: ['Perfume', 'Beard Oil', 'Tech Gadgets'])
- `submittedAt` (Date, auto-generated)
- `status` (String, enum: ['new', 'contacted', 'scheduled', 'completed'], default: 'new')
- `createdAt` (Date, auto-generated)
- `updatedAt` (Date, auto-generated)

## Database Name

The database name is `yawk_digital` and the collection name is `strategycalls`.
