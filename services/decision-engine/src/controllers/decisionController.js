"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.evaluate = void 0;
const express_1 = require("express");
const aiService_1 = require("../services/aiService");
const dataService_1 = require("../services/dataService");
const evaluate = async (req, res) => {
    const { factors, weights } = req.body;
    try {
        // 1. Get AI Prediction
        const aiResult = await (0, aiService_1.getPrediction)(factors || [0.5, 0.5, 0.5]);
        // 2. Fetch Aggregated Data
        const aggregatedData = await (0, dataService_1.fetchAggregatedData)();
        const marketTrend = aggregatedData.summary;
        // 3. Decision Logic (Weighted Score)
        const w_ai = weights?.ai || 0.6;
        const w_market = weights?.market || 0.4;
        const finalScore = (aiResult.prediction * w_ai) + (marketTrend * w_market);
        const decision = finalScore > 0.7 ? 'STRONG_BUY' : finalScore > 0.5 ? 'HOLD' : 'SELL';
        res.status(200).json({
            decision,
            score: finalScore,
            factors: {
                ai_prediction: aiResult.prediction,
                aggregated_trend: marketTrend,
                details: aggregatedData
            },
            meta: {
                model: aiResult.model,
                confidence: aiResult.confidence
            }
        });
    }
    catch (error) {
        res.status(500).json({ message: 'Decision evaluation failed', error });
    }
};
exports.evaluate = evaluate;
//# sourceMappingURL=decisionController.js.map