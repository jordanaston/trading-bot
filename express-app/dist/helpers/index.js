"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.binance = void 0;
const betBotStatus_1 = require("./binance/betBotStatus");
const createBuyOrder_1 = require("./binance/createBuyOrder");
const createSellOrder_1 = require("./binance/createSellOrder");
const getSymbolPrice_1 = require("./binance/getSymbolPrice");
const getTokenBalance_1 = require("./binance/getTokenBalance");
const getUSDTValue_1 = __importDefault(require("./binance/getUSDTValue"));
exports.binance = {
    createBuyOrder: createBuyOrder_1.createBuyOrder,
    createSellOrder: createSellOrder_1.createSellOrder,
    getUSDTValue: getUSDTValue_1.default,
    getSymbolPrice: getSymbolPrice_1.getSymbolPrice,
    getTokenBalance: getTokenBalance_1.getTokenBalance,
    getBotStatus: betBotStatus_1.getBotStatus,
};
