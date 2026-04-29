"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_cron_1 = __importDefault(require("node-cron"));
const dotenv_1 = __importDefault(require("dotenv"));
const retrainTask_1 = require("./tasks/retrainTask");
dotenv_1.default.config();
console.log('[Worker] Service started. Waiting for scheduled tasks...');
// Run retraining every 5 minutes
node_cron_1.default.schedule('*/5 * * * *', () => {
    (0, retrainTask_1.runRetrainTask)();
});
// Initial run
(0, retrainTask_1.runRetrainTask)();
//# sourceMappingURL=index.js.map