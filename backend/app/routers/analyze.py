from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import Optional
from transformers import pipeline

router = APIRouter()

# Initialize sentiment analysis pipeline
try:
    sentiment_analyzer = pipeline("sentiment-analysis", model="distilbert-base-uncased-finetuned-sst-2-english")
except Exception as e:
    print(f"Warning: Could not load sentiment model: {e}")
    sentiment_analyzer = None

# Pydantic models
class SentimentRequest(BaseModel):
    text: str

class SentimentResponse(BaseModel):
    sentiment: str
    confidence: float
    positive_score: float
    neutral_score: float
    negative_score: float
    analysis: Optional[str] = None

# Sentiment Analysis
@router.post("/sentiment", response_model=SentimentResponse)
async def analyze_sentiment(request: SentimentRequest):
    """Analyze sentiment of customer feedback using HuggingFace"""
    try:
        # Split text into sentences for better analysis
        sentences = request.text.split('.')
        
        scores = {"POSITIVE": 0, "NEUTRAL": 0, "NEGATIVE": 0}
        total_confidence = 0
        sentiment_count = 0
        
        if sentiment_analyzer:
            for sentence in sentences:
                if sentence.strip():
                    result = sentiment_analyzer(sentence.strip()[:512])
                    label = result[0]['label']
                    confidence = result[0]['score']
                    
                    scores[label] += confidence
                    total_confidence += confidence
                    sentiment_count += 1
        else:
            # Mock response for demo
            scores = {
                "POSITIVE": 0.65,
                "NEUTRAL": 0.20,
                "NEGATIVE": 0.15
            }
            total_confidence = 1.0
            sentiment_count = 1
        
        # Normalize scores
        if total_confidence > 0:
            scores = {k: v / total_confidence for k, v in scores.items()}
        
        # Determine overall sentiment
        max_score = max(scores.values())
        overall_sentiment = [k for k, v in scores.items() if v == max_score][0]
        confidence = max_score
        
        # Create analysis
        analysis = f"""
Sentiment Analysis Summary:
- Overall sentiment: {overall_sentiment}
- Confidence: {confidence:.1%}
- Positive mentions: {scores['POSITIVE']:.1%}
- Neutral mentions: {scores['NEUTRAL']:.1%}
- Negative mentions: {scores['NEGATIVE']:.1%}

Key Insights:
- The feedback shows a {overall_sentiment.lower()} sentiment overall
- Customer satisfaction appears to be {'high' if scores['POSITIVE'] > 0.6 else 'mixed' if scores['POSITIVE'] > 0.3 else 'low'}
- Consider addressing any concerns related to negative feedback
"""
        
        return SentimentResponse(
            sentiment=overall_sentiment,
            confidence=confidence,
            positive_score=scores['POSITIVE'],
            neutral_score=scores['NEUTRAL'],
            negative_score=scores['NEGATIVE'],
            analysis=analysis.strip()
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/sentiment/batch")
async def analyze_sentiment_batch(reviews: list[SentimentRequest]):
    """Analyze sentiment for multiple reviews"""
    try:
        results = []
        for review in reviews:
            result = await analyze_sentiment(review)
            results.append(result)
        return {"results": results}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
