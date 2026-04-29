from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
import joblib
import os
import numpy as np

router = APIRouter()

class PredictionRequest(BaseModel):
    factors: list[float]

@router.post("/predict")
async def predict(request: PredictionRequest):
    model_path = "app/models/latest_model.joblib"
    
    if not os.path.exists(model_path):
        # Fallback to a simple weighted sum if no model exists
        score = np.mean(request.factors)
        return {"prediction": score, "model": "fallback_mean", "confidence": 0.5}

    try:
        model = joblib.load(model_path)
        prediction = model.predict([request.factors])[0]
        return {"prediction": float(prediction), "model": "regression_v1", "confidence": 0.85}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
