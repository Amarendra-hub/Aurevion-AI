# Aurevion AI - Premium AI SaaS Platform

A Generative AI–powered branding automation platform that helps startups and creators build brand identity using artificial intelligence.

## Features

- **Brand Name Generator**: Generate creative and unique brand names for your business
- **AI Logo Generator**: Create stunning logos using Stable Diffusion
- **Content Generator**: Generate marketing content powered by Google Gemini
- **Sentiment Analysis**: Analyze customer feedback and understand brand perception
- **Modern Dashboard**: Beautiful, intuitive UI inspired by Vercel, Linear, and Notion
- **Dark Glassmorphism Design**: Premium visual design with smooth animations

## Tech Stack

### Frontend
- React 18
- Vite
- Tailwind CSS
- Framer Motion (animations)
- Recharts (data visualization)
- React Query (state management)
- Lucide React (icons)

### Backend
- FastAPI (Python)
- Google Gemini API (brand names & content)
- Stable Diffusion (logo generation)
- HuggingFace Transformers (sentiment analysis)
- SQLAlchemy (ORM)

## Project Structure

```
Aurevion-AI/
├── frontend/              # React frontend application
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/         # Page components
│   │   ├── services/      # API service layer
│   │   ├── hooks/         # Custom React hooks
│   │   ├── styles/        # Global styles
│   │   ├── assets/        # Images and static files
│   │   ├── App.jsx        # Root component
│   │   ├── main.jsx       # Entry point
│   │   └── index.css      # Global styles
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── postcss.config.js
│
├── backend/              # FastAPI backend application
│   ├── app/
│   │   ├── routers/       # API route handlers
│   │   │   ├── generate.py  # Brand names, logos, content
│   │   │   └── analyze.py   # Sentiment analysis
│   │   ├── models/        # Database models
│   │   ├── services/      # Business logic
│   │   ├── schemas/       # Pydantic schemas
│   │   └── main.py        # FastAPI application
│   ├── requirements.txt
│   ├── .env.example
│   └── .gitignore
│
├── docker-compose.yml
├── .env.example
├── .gitignore
└── README.md
```

## Quick Start

### Prerequisites
- Node.js 16+ and npm
- Python 3.10+
- Git

### API Keys Required
- Google Gemini API key
- HuggingFace API key (optional, used for sentiment analysis)
- Stable Diffusion API key (optional, for advanced logo generation)

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The frontend will be available at `http://localhost:5173` or as displayed in terminal.

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Create a virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Create `.env` file:
```bash
cp .env.example .env
```

5. Add your API keys to `.env`:
```
GEMINI_API_KEY=your_google_gemini_api_key_here
HUGGINGFACE_API_KEY=your_huggingface_api_key_here
STABLE_DIFFUSION_API_KEY=your_stable_diffusion_api_key_here
```

6. Start the backend server:
```bash
python -m uvicorn app.main:app --reload
```

The backend API will be available at `http://localhost:8000`.

## API Documentation

Once the backend is running, interactive documentation is available at:
- Swagger UI: `http://localhost:8000/docs`
- ReDoc: `http://localhost:8000/redoc`

## Pages & Routes

### Public Pages
- `/` - Landing page with hero, features, how it works, and CTA
- `/about` - About Aurevion AI
- `/contact` - Contact form

### Dashboard Pages (Protected)
- `/dashboard` - Main dashboard with stats and quick actions
- `/dashboard/brand-name` - Brand name generator
- `/dashboard/logo` - Logo generator
- `/dashboard/content` - Content generator
- `/dashboard/sentiment` - Sentiment analysis
- `/dashboard/settings` - User settings

## Key Features

### Brand Name Generator
- Business description input
- Keywords support
- Brand tone selection (professional, playful, minimal, bold, elegant)
- Generates 10+ creative names
- Copy to clipboard functionality

### Logo Generator
- Brand name input
- Logo style selection (modern, minimal, gradient, 3D, abstract)
- Color preference options
- AI-generated logo concepts
- Download functionality

### Content Generator
- Multiple content types:
  - Product descriptions
  - Taglines
  - Social media captions
  - Email subjects
  - Ad copy
- Context-aware generation
- Copy functionality

### Sentiment Analysis
- Customer feedback input
- Positive/Neutral/Negative classification
- Confidence scores
- Visual charts (pie chart)
- Detailed analysis report

### Dashboard Stats
- Brand Names Generated
- Logos Created
- Content Pieces
- Sentiment Analyses Performed
- Recent Activity feed

## Design System

### Color Palette
- **Primary**: Indigo (#6366F1)
- **Accent**: Cyan (#22D3EE)
- **Background**: #0F172A
- **Card**: #1E293B
- **Text**: #E2E8F0
- **Muted**: #64748B

### Design Patterns
- Glass morphism with backdrop blur
- Rounded corners (12-16px)
- Smooth transitions (200-300ms)
- Hover effects with scale transforms
- Gradient text for headings
- Border subtle borders with opacity

### Typography
- Font Family: System stack (-apple-system, BlinkMacSystemFont, etc.)
- Headings: Bold, 2-5xl sizes
- Body: Regular, anti-aliased
- Mono: Code snippets

### Responsive Design
- Mobile-first approach
- Breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px)
- Flexible grid layouts
- Touch-friendly buttons (44px minimum)

## Performance Optimizations

- ✅ Code splitting with Vite
- ✅ Lazy loading components with React
- ✅ Image optimization
- ✅ API response caching with React Query
- ✅ Minimal dependencies
- ✅ CSS optimization with Tailwind
- ✅ Gzip compression ready

## Security Considerations

- CORS properly configured
- API endpoints validate input
- Environment variables for secrets
- Password hashing with bcrypt
- HTTPS ready for production
- XSS protection with React sanitization
- CSRF token support in forms

## Building for Production

### Frontend Build
```bash
cd frontend
npm run build
npm run preview
```

### Backend Production
```bash
cd backend
pip install -r requirements.txt
python -m uvicorn app.main:app --host 0.0.0.0 --port 8000
```

## Environment Variables

### Frontend (.env in frontend/)
```
VITE_API_URL=http://localhost:8000/api
```

### Backend (.env in backend/)
```
# API Keys
GEMINI_API_KEY=your_key_here
N8N_WEBHOOK_URL=https://your-n8n-instance/webhook/your-production-webhook-id
HUGGINGFACE_API_KEY=your_key_here
STABLE_DIFFUSION_API_KEY=your_key_here

# Database
DATABASE_URL=sqlite:///./aurevion.db

# Server
HOST=0.0.0.0
PORT=8000
DEBUG=True

# CORS
CORS_ORIGINS=["http://localhost:3000", "http://localhost:5173"]
```

When `N8N_WEBHOOK_URL` is set, the Content Generator sends its request to that n8n webhook instead of Gemini. Configure the n8n workflow to accept JSON with `chatInput`, `content_type`, `brand_name`, and `context`, then respond with JSON containing an `output`, `text`, `response`, or `content` value. In Docker Compose, set `N8N_WEBHOOK_URL` in the project `.env` file; for a deployed backend, set it as a backend environment variable. Keep this URL out of frontend environment variables.

## Testing

```bash
# Frontend tests (when test setup is added)
cd frontend
npm run test

# Backend tests (when test setup is added)
cd backend
pytest
```

## Deployment

### Vercel (Frontend)
1. Push code to GitHub
2. Connect repository to Vercel
3. Deploy automatically on push

### Heroku/Railway/Render (Backend)
1. Create account on hosting platform
2. Connect GitHub repository
3. Set environment variables
4. Deploy

## Troubleshooting

### Frontend Issues
- **Port already in use**: Change port in vite.config.js
- **API not connecting**: Check backend is running on port 8000
- **Styling not applied**: Run `npm install` to ensure Tailwind is installed

### Backend Issues
- **ModuleNotFoundError**: Run `pip install -r requirements.txt`
- **API Key errors**: Verify .env file is in backend directory
- **Port conflicts**: Change PORT in .env file

## License
MIT License - see LICENSE file for details

## Roadmap

- [ ] User Authentication (OAuth, JWT)
- [ ] Save/manage generated assets
- [ ] Team collaboration
- [ ] Advanced analytics dashboard
- [ ] Mobile app (React Native)
- [ ] Figma plugin integration
- [ ] AI image enhancement
- [ ] Bulk generation API
- [ ] Custom templates
- [ ] Export to multiple formats

## Contributing

We welcome contributions! Please:
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Support

For issues, questions, or feedback:
- 📧 Email: support@aurevion.ai
- 💬 Discord: (coming soon)
- 📖 Docs: (coming soon)

---

**Built with ❤️ by Amarendra Hub**

*Transform your brand with AI-powered intelligence*
