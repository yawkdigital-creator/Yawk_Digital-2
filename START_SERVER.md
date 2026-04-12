# How to Start the Backend Server

## Quick Start

To start the backend server, run this command in your terminal:

```bash
npm run server
```

Or for development with auto-reload:

```bash
npm run dev:server
```

## Important Notes

1. **MongoDB must be running** - Make sure MongoDB is running on `localhost:27017` before starting the server.

2. **Server runs on port 5000** - The backend API will be available at `http://localhost:5000`

3. **Keep the server running** - The server needs to be running in a separate terminal window while you use the frontend.

## Starting Both Frontend and Backend

You need **two terminal windows**:

### Terminal 1 - Backend Server:
```bash
npm run server
```

### Terminal 2 - Frontend:
```bash
npm run dev
```

## Verify Server is Running

You can check if the server is running by visiting:
- `http://localhost:5000/api/health`

You should see: `{"status":"OK","message":"Server is running"}`

## Troubleshooting

If you see "Failed to fetch" error:
1. Make sure the backend server is running (`npm run server`)
2. Check that MongoDB is running
3. Verify the server is accessible at `http://localhost:5000/api/health`
