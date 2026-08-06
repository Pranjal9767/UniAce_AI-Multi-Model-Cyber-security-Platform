from fastapi import APIRouter
from pydantic import BaseModel
from services.deepfake_service import DeepfakeService

router = APIRouter()

class DeepfakeRequest(BaseModel):
    url: str

@router.post("/video")
async def detect_deepfake_video(req: DeepfakeRequest):
    result = await DeepfakeService.analyze_video(req.url)
    return result

@router.post("/image")
async def detect_deepfake_image(req: DeepfakeRequest):
    result = await DeepfakeService.analyze_image(req.url)
    return result
