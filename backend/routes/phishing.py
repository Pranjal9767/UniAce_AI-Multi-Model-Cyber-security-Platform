from fastapi import APIRouter
from pydantic import BaseModel
from services.phishing_service import PhishingService

router = APIRouter()

class PhishingRequest(BaseModel):
    content: str

@router.post("/email")
async def detect_phishing_email(req: PhishingRequest):
    result = await PhishingService.analyze_email(req.content)
    return result

@router.post("/sms")
async def detect_phishing_sms(req: PhishingRequest):
    result = await PhishingService.analyze_sms(req.content)
    return result

@router.post("/url")
async def detect_phishing_url(req: PhishingRequest):
    result = await PhishingService.analyze_url(req.content)
    return result
