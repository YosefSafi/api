from fastapi import FastAPI
from app.routers import predict, train
import uvicorn
import os
from dotenv import load_dotenv

load_dotenv()

app = FastAPI(title="Aiko AI Service", version="1.0.0")

app.include_router(predict.router, prefix="/ai", tags=["Prediction"])
app.include_router(train.router, prefix="/ai", tags=["Training"])

@app.get("/health")
async def health_check():
    return {"status": "UP", "service": "AI Service"}

if __name__ == "__main__":
    port = int(os.getenv("PORT", 5000))
    uvicorn.run("main:app", host="0.0.0.0", port=port, reload=True)
