# Vercel Setup Guide - Complete Instructions

## The NetworkError Issue: What's Happening

When you see "NetworkError" on the signin page in your Vercel deployment, it means the frontend cannot reach the backend API. This happens because the `VITE_API_URL` environment variable is not set in Vercel.

## Step-by-Step Solution

### Step 1: Deploy Your Backend (Choose One Option)

#### **Option A: Deploy to Railway (Recommended - Free Tier Available)**

1. Go to [https://railway.app](https://railway.app)
2. Click "Create New Project"
3. Select "Deploy from GitHub repo"
4. Connect your GitHub account and select `Amarendra-hub/Aurevion-AI`
5. Configure:
   - Select the repo
   - In the next step, Railway will detect it needs Python
6. Set Environment Variables in Railway:
   - `DEBUG=False`
   - `GEMINI_API_KEY=your_key`
   - `HUGGINGFACE_API_KEY=your_key`
   - `STABLE_DIFFUSION_API_KEY=your_key` (optional)
   - `DATABASE_URL=sqlite:///./aurevion.db`
7. Railway will deploy automatically and give you a URL like: `https://yourdomain.railway.app`
8. Note this backend URL for Step 2

#### **Option B: Deploy to Render**

1. Go to [https://render.com](https://render.com)
2. Click "New" → "Web Service"
3. Connect your GitHub repo
4. Configure:
   - Name: `aurevion-api`
   - Environment: `Python`
   - Build command: `pip install -r backend/requirements.txt`
   - Start command: `cd backend && python -m uvicorn app.main:app --host 0.0.0.0 --port 8000`
5. Set all environment variables (same as above)
6. Deploy and note the URL

#### **Option C: Use Heroku (Free tier has limitations)**

1. Go to [https://www.heroku.com](https://www.heroku.com)
2. Create a new app
3. Connect to GitHub
4. Deploy the backend
5. Add environment variables in Heroku dashboard

### Step 2: Set Environment Variable in Vercel

1. Go to your Vercel project dashboard: [https://vercel.com/dashboard](https://vercel.com/dashboard)
2. Select your `Aurevion-AI` project
3. Go to **Settings** → **Environment Variables**
4. Add a new variable:
   - **Name**: `VITE_API_URL`
   - **Value**: `https://your-backend-url.com/api` (replace with your actual backend URL from Step 1)
   - **Environments**: Select the appropriate environment (usually Production)
5. Click "Save"

**Example:**
If your Railway backend URL is `https://aurevion-api.railway.app`, then set:
```
VITE_API_URL=https://aurevion-api.railway.app/api
```

### Step 3: Redeploy Frontend on Vercel

1. In your Vercel project dashboard
2. Go to **Deployments**
3. Click the three dots (...) on the latest deployment
4. Select **Redeploy**
5. Wait for the deployment to complete
6. Visit your Vercel URL and test the signin page

## Quick Debugging

### Check if Backend is Running

Test your backend URL:
```bash
curl https://your-backend-url.com/api/health
```

You should get:
```json
{"status":"ok","message":"Aurevion AI API is running"}
```

### Check Vercel Environment Variables

Run this in your terminal:
```bash
vercel env list
```

You should see `VITE_API_URL` listed.

### Enable Debug Logging

Add this to your browser console (F12):
```javascript
localStorage.setItem('debugMode', 'true')
```

Then check the Console tab for API request details.

## Troubleshooting

### Still Getting NetworkError?

1. **Verify backend URL is correct**
   - Copy the `VITE_API_URL` value from Vercel
   - Paste it in browser: `https://your-value/health`
   - You should see JSON response

2. **Check for CORS issues**
   - Backend needs `CORS_ORIGINS` to include your Vercel URL
   - Example: `CORS_ORIGINS=https://your-app.vercel.app`

3. **Wait for DNS propagation**
   - After setting environment variables, wait 2-3 minutes before retesting

4. **Clear browser cache**
   - Do a hard refresh (Ctrl+Shift+R or Cmd+Shift+R)
   - Or completely clear cache for the domain

5. **Check Vercel logs**
   - In Vercel dashboard, go to Deployments
   - Click on the failed deployment
   - Check "Build Logs" and "Runtime Logs"

## Local Testing

To test your configuration locally:

1. Create a `.env` file in the `frontend` directory:
```bash
VITE_API_URL=https://your-backend-url.com/api
```

2. Build the production bundle:
```bash
cd frontend
npm run build
```

3. Preview the build:
```bash
npm run preview
```

4. This simulates the production environment and will use your `VITE_API_URL`

## Summary

| Step | Action | Example |
|------|--------|---------|
| 1 | Deploy backend to Railway/Render | `https://aurevion-api.railway.app` |
| 2 | Copy backend URL | Note the URL from Step 1 |
| 3 | Add to Vercel env vars | `VITE_API_URL=https://aurevion-api.railway.app/api` |
| 4 | Redeploy on Vercel | Click Redeploy in Vercel dashboard |
| 5 | Test signin page | Should work without errors |

## Need Help?

1. Check the [Deployment documentation](./DEPLOYMENT.md)
2. Review [Vercel environment variables docs](https://vercel.com/docs/projects/environment-variables)
3. Review [Railway deployment docs](https://docs.railway.app)
