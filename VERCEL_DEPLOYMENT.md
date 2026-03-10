# Vercel Deployment Guide

## Deploy to Vercel

Follow these steps to deploy your Aurevion AI frontend to Vercel:

### Step 1: Connect Your GitHub Repository
1. Go to [vercel.com](https://vercel.com)
2. Sign in with your GitHub account
3. Click "Import Project"
4. Select the repository: `Amarendra-hub/Aurevion-AI`

### Step 2: Configure Project Settings
1. **Framework Preset**: Select "Vite"
2. **Root Directory**: Set to `./frontend`
3. **Build Command**: `npm run build`
4. **Output Directory**: `dist`
5. **Install Command**: `npm install`

### Step 3: Set Environment Variables
Add these environment variables in Vercel dashboard:
- `VITE_API_URL`: Your backend API URL (e.g., `https://api.yourdomain.com`)

### Step 4: Deploy
1. Click "Deploy"
2. Wait for the build to complete
3. You'll get a preview URL within seconds

### Step 5: Custom Domain (Optional)
1. Go to Project Settings > Domains
2. Add your custom domain
3. Follow the DNS configuration instructions

## Quick Deployment via CLI

If you prefer deploying via command line:

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy from project root
vercel

# Deploy to production
vercel --prod
```

## Environment Variables
For production, update `VITE_API_URL` in Vercel to point to your backend API.

## Features
- ✅ Automatic deployments on git push
- ✅ Preview deployments for pull requests
- ✅ Zero-config deployment
- ✅ Auto-scaling and CDN included
- ✅ Free tier available

Your site will be deployed at: `https://aurevion-ai.vercel.app` (or custom domain)
