from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes import deepfake, phishing

app = FastAPI(title="UniAce AI Backend", version="1.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # For development
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(deepfake.router, prefix="/api/deepfake", tags=["Deepfake"])
app.include_router(phishing.router, prefix="/api/phishing", tags=["Phishing"])

@app.get("/")
def home():
    return {"message": "UniAce AI Backend Running 🚀"}