"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchAggregatedData = void 0;
const axios_1 = __importDefault(require("axios"));
const DATA_AGGREGATOR_URL = process.env.DATA_AGGREGATOR_URL || 'http://localhost:3003';
const fetchAggregatedData = async () => {
    try {
        const response = await axios_1.default.get(`${DATA_AGGREGATOR_URL}/aggregate`);
        return response.data;
    }
    catch (error) {
        console.error('Data Aggregator Error:', error);
        return { summary: 0.5, market: { trend: 0.5 }, weather: { score: 0.5 } };
    }
};
exports.fetchAggregatedData = fetchAggregatedData;
//# sourceMappingURL=dataService.js.map