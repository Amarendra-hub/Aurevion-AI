from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, Field
from typing import List, Optional
import os
import warnings

# Suppress the deprecation warning
warnings.filterwarnings("ignore", message=".*google.generativeai.*deprecated.*", category=FutureWarning)

import google.generativeai as genai

router = APIRouter()

# Configure Google Gemini API lazily
_gemini_configured = False
_valid_model_name = None

def configure_gemini():
    global _gemini_configured
    if not _gemini_configured:
        GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
        if not GEMINI_API_KEY:
            raise HTTPException(status_code=500, detail="Gemini API key not configured")
        genai.configure(api_key=GEMINI_API_KEY)  # type: ignore
        _gemini_configured = True


def discover_gemini_model():
    """Discover and cache a valid Gemini model name. Call once at startup."""
    global _valid_model_name
    if _valid_model_name:
        return _valid_model_name
    
    configure_gemini()
    models = genai.list_models()
    for m in models:
        name = getattr(m, 'name', None)
        methods = getattr(m, 'supported_generation_methods', [])
        if name and ('generateContent' in methods or 'generate_text' in methods):
            _valid_model_name = name
            print(f"[Gemini] Using model: {_valid_model_name}")
            return _valid_model_name
    # No suitable model found
    raise RuntimeError("No Gemini model with generateContent support found")


def get_gemini_model():
    """Get the cached Gemini model name. Must be called after startup."""
    if not _valid_model_name:
        raise HTTPException(status_code=500, detail="Gemini model not initialized. Call discover_gemini_model at startup.")
    return _valid_model_name

def extract_json_from_text(text):
    """Extract JSON from text that may contain markdown code blocks"""
    import re
    # Look for JSON in code blocks
    json_match = re.search(r'```(?:json)?\s*(\[.*?\])\s*```', text, re.DOTALL)
    if json_match:
        return json_match.group(1)
    # Look for JSON array directly
    array_match = re.search(r'\[.*\]', text, re.DOTALL)
    if array_match:
        return array_match.group(0)
    return text

# Pydantic models
class BrandNameRequest(BaseModel):
    description: str = Field(min_length=1)
    keywords: Optional[str] = None
    tone: str = "professional"

class BrandNameResponse(BaseModel):
    names: List[dict]

class LogoRequest(BaseModel):
    brand_name: str
    style: str = "modern"
    color_preference: str = "multicolor"

class LogoResponse(BaseModel):
    logos: List[dict]

class ContentRequest(BaseModel):
    content_type: str
    brand_name: str = Field(min_length=1)
    context: Optional[str] = None

class ContentResponse(BaseModel):
    content: List[dict]

# Brand Name Generation
@router.post("/brand-names", response_model=BrandNameResponse)
async def generate_brand_names(request: BrandNameRequest):
    """Generate creative brand names using Google Gemini"""
    try:
        prompt = f"""Generate 10 creative and unique brand names for the following:
        
Business Description: {request.description}
Keywords: {request.keywords or 'Not specified'}
Brand Tone: {request.tone}

Requirements:
- Names should be memorable and easy to pronounce
- Should reflect the business nature
- Mix of different styles (compound words, invented words, acronyms)
- Each name should be unique and not already trademarked

Return as a JSON array with format: [{{"name": "BrandName", "description": "why this name works"}}]
"""
        
        configure_gemini()
        model = genai.GenerativeModel(get_gemini_model())  # type: ignore
        response = model.generate_content(
            prompt,
            generation_config=genai.GenerationConfig(
                max_output_tokens=150,
                temperature=0.8,
                top_p=0.9,
            )
        )
        
        # Parse the actual response
        import json
        try:
            json_text = extract_json_from_text(response.text.strip())
            names = json.loads(json_text)
        except (json.JSONDecodeError, AttributeError):
            # Fallback to mock data if parsing fails
            names = [
                {"name": "TechFlow", "description": "Combines technology with smooth flow"},
                {"name": "CloudVise", "description": "Professional cloud-based solution"},
                {"name": "DataSync", "description": "Data synchronization focus"},
                {"name": "QuantumLeap", "description": "Innovation and advancement"},
                {"name": "NexusAI", "description": "Connected AI intelligence"},
                {"name": "VelocityHub", "description": "Speed and central connection"},
                {"name": "PrismData", "description": "Clear insights into data"},
                {"name": "ApexFlow", "description": "Top-tier workflow solution"},
                {"name": "EchoSync", "description": "Responsive and synchronized"},
                {"name": "VortexLabs", "description": "Cutting-edge innovation center"}
            ]
        
        return BrandNameResponse(names=names)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Logo Generation
@router.post("/logo", response_model=LogoResponse)
async def generate_logo(request: LogoRequest):
    """Generate AI logos using Stable Diffusion"""
    try:
        # Mock response for demo - in production, call Stable Diffusion API
        mock_logos = [
            {"url": "https://via.placeholder.com/300x300?text=Logo+1", "style": request.style},
            {"url": "https://via.placeholder.com/300x300?text=Logo+2", "style": request.style},
        ]
        
        return LogoResponse(logos=mock_logos)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Content Generation
@router.post("/content", response_model=ContentResponse)
async def generate_content(request: ContentRequest):
    """Generate marketing content using Google Gemini"""
    try:
        print(f"Content request: {request.dict()}")  # Debug logging
        content_type_prompts = {
            "product_description": "Create a compelling 2-3 sentence product description",
            "tagline": "Create a catchy and memorable brand tagline (5-10 words)",
            "social_media": "Create an engaging social media caption (50-100 characters)",
            "email_subject": "Create 5 compelling email subject lines",
            "ad_copy": "Create an engaging ad copy (2-3 sentences)"
        }
        
        prompt = f"""{content_type_prompts.get(request.content_type, "Generate marketing content")}
        
Brand Name: {request.brand_name}
Context: {request.context or 'General business context'}

Make it engaging, professional, and aligned with the brand tone.
"""
        
        configure_gemini()
        model = genai.GenerativeModel(get_gemini_model())  # type: ignore
        response = model.generate_content(prompt)
        
        # Use the actual response
        try:
            generated_content = response.text.strip()
        except AttributeError:
            generated_content = f"Generated {request.content_type.replace('_', ' ')} for {request.brand_name}"
        
        content = [{"text": generated_content}]
        
        return ContentResponse(content=content)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
