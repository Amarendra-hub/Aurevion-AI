from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import os

# Load environment variables
load_dotenv()

# Initialize FastAPI app
app = FastAPI(
    title="Aurevion AI API",
    description="Premium AI SaaS platform for branding automation",
    version="1.0.0"
)

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins for development
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Import routers
from app.routers import generate, analyze, auth

# Include routers
app.include_router(auth.router)
app.include_router(generate.router, prefix="/api/generate", tags=["generate"])
app.include_router(analyze.router, prefix="/api/analyze", tags=["analyze"])

@app.get("/api/health")
async def health_check():
    """Health check endpoint"""
    return {"status": "ok", "message": "Aurevion AI API is running"}

@app.get("/api/dashboard/stats")
async def get_dashboard_stats():
    """Get dashboard statistics"""
    return {
        "brand_names_count": 42,
        "logos_count": 15,
        "content_count": 87,
        "sentiment_count": 23
    }

@app.get("/api/dashboard/activity")
async def get_recent_activity():
    """Get recent activity"""
    return [
        {
            "id": 1,
            "type": "brand_name",
            "title": "Generated 5 brand names",
            "description": "TechFlow, CloudVise, DataSync, QuantumLeap, NexusAI",
            "created_at": "2024-03-10T10:30:00Z"
        },
        {
            "id": 2,
            "type": "logo",
            "title": "Created logo design",
            "description": "Modern gradient logo for SaaS company",
            "created_at": "2024-03-10T09:15:00Z"
        },
        {
            "id": 3,
            "type": "content",
            "title": "Generated marketing copy",
            "description": "Product description and social media caption",
            "created_at": "2024-03-10T08:45:00Z"
        }
    ]

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
