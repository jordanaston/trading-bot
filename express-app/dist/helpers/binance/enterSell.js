"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.enterSell = void 0;
const __1 = require("..");
const Trade_1 = __importDefault(require("../../models/Trade"));
const binanceClient_1 = __importDefault(require("../../client/binanceClient"));
const enterSell = (symbol, testOrder) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tokenBalance = yield __1.binance.getTokenBalance(symbol);
        if (!tokenBalance || tokenBalance <= 0) {
            throw new Error("Insufficient token balance.");
        }
        const exchangeInfo = yield binanceClient_1.default.exchangeInfo();
        const symbolInfo = exchangeInfo.symbols.find((s) => s.symbol === symbol);
        const precision = (symbolInfo === null || symbolInfo === void 0 ? void 0 : symbolInfo.baseAssetPrecision) || 0;
        const lotSizeFilter = symbolInfo === null || symbolInfo === void 0 ? void 0 : symbolInfo.filters.find((f) => f.filterType === "LOT_SIZE");
        const stepSize = parseFloat((lotSizeFilter === null || lotSizeFilter === void 0 ? void 0 : lotSizeFilter.stepSize) || "1");
        const adjustedQuantity = Math.floor(tokenBalance / stepSize) * stepSize;
        const preciseQuantity = parseFloat(adjustedQuantity.toFixed(precision));
        const safetyMargin = 0.999;
        const finalQuantity = parseFloat((preciseQuantity * safetyMargin).toFixed(precision));
        const finalAdjustedQuantity = Math.floor(finalQuantity / stepSize) * stepSize;
        const sellPayload = {
            symbol,
            side: "SELL" /* OrderSide.SELL */,
            type: "MARKET",
            quantity: finalAdjustedQuantity,
        };
        let sellOrder;
        const tradeData = {
            symbol,
            side: "SELL" /* OrderSide.SELL */,
            type: "MARKET",
            quantity: finalAdjustedQuantity,
            timestamp: new Date(),
            usdtReceived: 0,
        };
        try {
            if (testOrder !== true) {
                sellOrder = yield __1.binance.createSellOrder(sellPayload);
                const usdtCapital = yield __1.binance.getUSDTValue();
                tradeData.usdtReceived = usdtCapital;
            }
        }
        catch (orderError) {
            console.error("Error executing sell order:", orderError);
            tradeData.error = orderError.message;
        }
        if (testOrder === true) {
            tradeData.testOrder = true;
        }
        const trade = new Trade_1.default(tradeData);
        yield trade.save();
        return sellOrder;
    }
    catch (error) {
        console.error("Error entering sell order:", error);
        throw error;
    }
});
exports.enterSell = enterSell;
