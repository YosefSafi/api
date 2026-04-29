from fastapi import APIRouter
from pydantic import BaseModel
from sklearn.linear_model import LinearRegression
import joblib
import numpy as np

router = APIRouter()

class TrainingData(BaseModel):
    X: list[list[float]]
    y: list[float]

@router.post("/train")
async def train_model(data: TrainingData):
    try:
        X = np.array(data.X)
        y = np.array(data.y)
        
        model = LinearRegression()
        model.fit(X, y)
        
        model_path = "app/models/latest_model.joblib"
        joblib.dump(model, model_path)
        
        return {"message": "Model trained successfully", "model_path": model_path}
    except Exception as e:
        return {"message": "Training failed", "error": str(e)}
