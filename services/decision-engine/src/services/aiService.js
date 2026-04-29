"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPrediction = void 0;
const axios_1 = __importDefault(require("axios"));
const AI_SERVICE_URL = process.env.AI_SERVICE_URL || 'http://localhost:5000';
const getPrediction = async (factors) => {
    try {
        const response = await axios_1.default.post(`${AI_SERVICE_URL}/ai/predict`, { factors });
        return response.data;
    }
    catch (error) {
        console.error('AI Service Error:', error);
        return { prediction: 0.5, model: 'error_fallback', confidence: 0 };
    }
};
exports.getPrediction = getPrediction;
//# sourceMappingURL=aiService.js.map