"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const tradeSchema = new mongoose_1.Schema({
    symbol: { type: String, required: true },
    side: { type: String, required: true },
    type: { type: String, required: true },
    usdtCapital: { type: Number, required: false },
    purchaseAmount: { type: Number, required: false },
    usdtPercentage: { type: Number, required: false },
    symbolPrice: { type: Number, required: false },
    quantity: { type: Number, required: true },
    timestamp: { type: Date, required: true },
    testOrder: { type: Boolean, required: false },
    usdtReceived: { type: Number, required: false },
    closeAmount: { type: Number, required: false },
    error: { type: String, required: false },
    change: { type: Number, required: false },
});
const Trade = mongoose_1.default.model("Trade", tradeSchema);
exports.default = Trade;
