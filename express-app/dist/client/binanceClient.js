"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const binance_api_node_1 = __importDefault(require("binance-api-node"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const binanceClient = (0, binance_api_node_1.default)({
    apiKey: process.env.BINANCE_API_KEY,
    apiSecret: process.env.BINANCE_API_SECRET,
});
exports.default = binanceClient;
