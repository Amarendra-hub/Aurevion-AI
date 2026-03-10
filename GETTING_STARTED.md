# Getting Started with Aurevion AI

Welcome to Aurevion AI! This guide will help you get the platform up and running locally.

## System Requirements

- **Node.js**: 16.0.0 or higher
- **npm**: 7.0.0 or higher  
- **Python**: 3.10.0 or higher
- **Git**: Latest version
- **4GB RAM** minimum
- **2GB free disk space**

## Step-by-Step Setup

### Step 1: Clone the Repository

```bash
git clone https://github.com/Amarendra-hub/Aurevion-AI.git
cd Aurevion-AI
```

### Step 2: Frontend Setup

#### 2.1 Navigate to Frontend Directory
```bash
cd frontend
```

#### 2.2 Install Dependencies
```bash
npm install
```

This will install all required packages including:
- React 18
- Vite
- Tailwind CSS
- Framer Motion
- Recharts
- React Query
- And more...

#### 2.3 Configure Environment
The `.env` file is already created with default values:
```bash
VITE_API_URL=http://localhost:8000/api
```

Change this to your backend URL if needed.

#### 2.4 Start Frontend Development Server
```bash
npm run dev
```

The frontend will start at `http://localhost:5173` (or another port if 5173 is busy).

You should see:
```
VITE v5.0.0  ready in XXX ms

➜  Local:   http://localhost:5173/
➜  press h to show help
```

### Step 3: Backend Setup

Open a new terminal while keeping frontend running.

#### 3.1 Navigate to Backend Directory
```bash
cd backend
```

#### 3.2 Create Virtual Environment
```bash
# On macOS/Linux
python3 -m venv venv
source venv/bin/activate

# On Windows
python -m venv venv
venv\Scripts\activate
```

You should see `(venv)` at the beginning of your terminal line.

#### 3.3 Install Python Dependencies
```bash
pip install -r requirements.txt
```

This installs:
- FastAPI
- Uvicorn
- Python-dotenv
- Google Generative AI
- Transformers (for sentiment analysis)
- And dependencies...

#### 3.4 Configure Environment Variables
The `.env` file is already set up. You can use it as-is for development with mock data, or add your API keys:

```bash
# .env file already exists with:
GMINI_API_KEY=your_google_gemini_api_key_here
HUGGINGFACE_API_KEY=your_huggingface_api_key_here_optional
DATABASE_URL=sqlite:///./aurevion.db
```

**Optional**: Add your actual API keys:

1. **Google Gemini API Key** (Required for Brand Names & Content)
   - Visit: https://makersuite.google.com/app/apikey
   - Create a new API key
   - Copy and paste to `GEMINI_API_KEY`

2. **HuggingFace API Key** (Optional for Sentiment Analysis)
   - Visit: https://huggingface.co/settings/tokens
   - Create new token
   - Copy to `HUGGINGFACE_API_KEY`

#### 3.5 Start Backend Server
```bash
python -m uvicorn app.main:app --reload
```

You should see:
```
INFO:     Uvicorn running on http://0.0.0.0:8000 (Press CTRL+C to quit)
INFO:     Started server process [XXXXX]
INFO:     Started reloader process
```

The backend is now running with:
- API: `http://localhost:8000`
- Docs: `http://localhost:8000/docs` (Swagger UI)
- Health Check: `http://localhost:8000/api/health`

## Verify Installation

### Check Frontend
1. Open `http://localhost:5173` in your browser
2. You should see the Aurevion AI landing page
3. Try navigating to different pages
4. Check browser console (F12) for any errors

### Check Backend
1. Open `http://localhost:8000/docs` in your browser
2. You should see the Swagger UI with all API endpoints
3. Try the health check: Click `/api/health` → "Try it out" → Execute
4. You should get: `{"status":"ok","message":"Aurevion AI API is running"}`

### Check Frontend-Backend Connection
1. On Landing page, click "Get Started"
2. Navigate to Dashboard
3. You should see the dashboard with stats
4. Check console (F12) for any API errors

## Using the Application

### Landing Page Features
- **Navbar**: Navigation and "Get Started" button
- **Hero Section**: Main headline and CTA
- **Features Section**: 4 main features displayed
- **How It Works**: Step-by-step guide
- **Call to Action**: Conversion button
- **Footer**: Links and social media

### Dashboard Navigation

From the Dashboard, you can access:

1. **Brand Name Generator** (`/dashboard/brand-name`)
   - Input: Business description, keywords, tone
   - Output: 10 creative brand names
   - Action: Copy any name to clipboard

2. **Logo Generator** (`/dashboard/logo`)
   - Input: Brand name, style, colors
   - Output: AI-generated logo concepts
   - Action: Download logos

3. **Content Generator** (`/dashboard/content`)
   - Input: Content type, brand name, context
   - Output: Marketing copy
   - Action: Copy content to clipboard

4. **Sentiment Analysis** (`/dashboard/sentiment`)
   - Input: Customer feedback/reviews
   - Output: Sentiment breakdown with charts
   - Shows: Positive/Neutral/Negative percentages

5. **Settings** (`/dashboard/settings`)
   - Account settings (coming soon)
   - Notification preferences
   - Security options
   - Theme selection

## Development Tips

### Working with the Frontend

1. **Live Reload**: Changes automatically reload in browser
2. **React DevTools**: Install browser extension for debugging
3. **Network Tab**: Check API calls in browser DevTools
4. **Component Structure**: Found in `frontend/src/components/`

### Working with the Backend

1. **Auto-reload**: Changes automatically reload server
2. **API Docs**: Always check `/docs` while developing
3. **Database**: SQLite file at `backend/aurevion.db`
4. **Logs**: Check terminal output for errors

### Debugging

**Frontend Issues**:
```
# Check console errors
F12 → Console tab

# Check network requests
F12 → Network tab → Refresh page

# Clear cache
Ctrl+Shift+R (hard refresh)
```

**Backend Issues**:
```
# Check terminal output for error stack

# Test API directly
curl http://localhost:8000/api/health

# Check database
sqlite3 backend/aurevion.db
```

## Common Issues & Solutions

### Port Already in Use

**Frontend (Port 5173)**:
```bash
# Find and kill process
lsof -ti:5173 | xargs kill -9
# Or specify different port
npm run dev -- --port 3000
```

**Backend (Port 8000)**:
```bash
# Find and kill process
lsof -ti:8000 | xargs kill -9
# Or specify different port
python -m uvicorn app.main:app --port 8001
```

### Module Not Found Errors

**Frontend**:
```bash
cd frontend
rm -rf node_modules package-lock.json
npm install
```

**Backend**:
```bash
cd backend
source venv/bin/activate
pip install -r requirements.txt --force-reinstall
```

### API Connection Issues

1. Verify backend is running: `http://localhost:8000/docs`
2. Check `VITE_API_URL` in `frontend/.env`
3. Check CORS settings in `backend/app/main.py`
4. Look at browser console for error messages

### Database Issues

```bash
# Reset SQLite database
rm backend/aurevion.db
# Restart backend to recreate
```

## Next Steps

1. **Explore the Code**
   - Frontend components: `frontend/src/components/`
   - Backend routes: `backend/app/routers/`
   - Styling: Global styles in `frontend/src/index.css`

2. **Customize the Design**
   - Update colors in `frontend/tailwind.config.js`
   - Modify components styling with Tailwind classes
   - Update animations in Framer Motion configs

3. **Add Your API Keys**
   - Get Google Gemini API key
   - Connect real AI services
   - Test with actual data

4. **Deploy**
   - See DEPLOYMENT.md for hosting guides
   - Options: Vercel, Railway, Heroku, AWS, Docker

5. **Contribute**
   - Check CONTRIBUTING.md for guidelines
   - Create feature branches
   - Submit pull requests

## Architecture Overview

```
┌─────────────────────────────────────────────────────────┐
│                    Frontend (React)                      │
│                    Port 5173/3000                         │
├─────────────────────────────────────────────────────────┤
│  Components → Pages → Services → API Calls               │
└──────────────────────┬──────────────────────────────────┘
                       │ Axios (HTTP)
                       │
┌──────────────────────▼──────────────────────────────────┐
│                    Backend (FastAPI)                     │
│                    Port 8000                             │
├─────────────────────────────────────────────────────────┤
│  Routes → Controllers → Services → External APIs        │
│  - Generate routes (brand names, logos, content)        │
│  - Analyze routes (sentiment)                           │
│  - Dashboard routes (stats, activity)                   │
└─────────────────────────────────────────────────────────┘
                       │
        ┌──────────────┼──────────────┐
        │              │              │
        ▼              ▼              ▼
    Google       HuggingFace    Database
    Gemini       Transformers   (SQLite)
```

## Getting Help

- **Documentation**: Check README.md and this file
- **API Docs**: Visit `http://localhost:8000/docs`
- **Issues**: GitHub Issues section
- **Email**: support@aurevion.ai

## What's Next?

- ✅ Local development environment is set up
- ⬜ Add authentication (JWT, OAuth)
- ⬜ Implement user profiles
- ⬜ Add image upload
- ⬜ Create team collaboration features
- ⬜ Deploy to production

---

**Happy coding! Start at port 5173 for the frontend. 🚀**
