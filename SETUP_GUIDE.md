# QuillCraft Setup and Development Guide

## Quick Start

### 1. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env file and add your API keys:
# GEMINI_API_KEY=your_actual_gemini_api_key
# OPENROUTER_API_KEY=your_actual_openrouter_api_key

# Start the backend server
npm run dev
```

The backend will start on `http://localhost:3001`

### 2. Frontend Setup

```bash
# Navigate to frontend directory (in a new terminal)
cd frontend

# Install dependencies (if not already done)
npm install

# Start the frontend development server
npm run dev
```

The frontend will start on `http://localhost:3000`

### 3. Testing the Integration

1. Open your browser to `http://localhost:3000`
2. Navigate to the Paraphrasing Tool
3. Enter some text and click "Paraphrase"
4. The frontend should now call the backend API

### API Endpoints Available

- **Health Check**: `GET http://localhost:3001/api/health`
- **Paraphrase**: `POST http://localhost:3001/api/paraphrase`
- **Models**: `GET http://localhost:3001/api/models`

### Testing the Backend Directly

You can test the backend API directly using curl or a tool like Postman:

```bash
# Health check
curl http://localhost:3001/api/health

# Paraphrase request
curl -X POST http://localhost:3001/api/paraphrase \
  -H "Content-Type: application/json" \
  -d '{
    "text": "This is a test sentence for paraphrasing.",
    "mode": "standard",
    "language": "en-us",
    "synonymStrength": 50,
    "model": "normal"
  }'
```

### Troubleshooting

**Frontend shows "Backend server is not running" error:**

- Make sure the backend server is running on port 3001
- Check if you have the correct API keys in the .env file
- Verify no firewall is blocking port 3001

**Backend fails to start:**

- Check if you have Node.js v18+ installed
- Verify all dependencies are installed with `npm install`
- Check if port 3001 is available

**API key errors:**

- Make sure you have valid API keys for Gemini and OpenRouter
- Check that the .env file is properly configured
- Restart the backend server after updating .env

### Development Workflow

1. Keep both frontend (port 3000) and backend (port 3001) running
2. Frontend automatically proxies API calls to the backend
3. Both have hot reload enabled for development
4. Check browser console and terminal logs for any errors

### Production Deployment Notes

- Update `API_BASE_URL` in `frontend/lib/api-client.ts` for production
- Set proper CORS origin in backend configuration
- Use environment variables for API keys in production
- Consider rate limiting and authentication for production use
