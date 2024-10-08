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
exports.enterBuy = void 0;
const __1 = require("..");
const Trade_1 = __importDefault(require("../../models/Trade"));
const binanceClient_1 = __importDefault(require("../../client/binanceClient"));
const enterBuy = (symbol, buyCount, testOrder) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const usdtCapital = yield __1.binance.getUSDTValue();
        let purchaseAmount = 0;
        switch (buyCount) {
            case 0:
                purchaseAmount = usdtCapital * 0.2;
                break;
            case 1:
                purchaseAmount = usdtCapital * 0.25;
                break;
            case 2:
                purchaseAmount = usdtCapital * 0.3333;
                break;
            case 3:
                purchaseAmount = usdtCapital * 0.5;
                break;
            case 4:
                purchaseAmount = usdtCapital;
                break;
        }
        const symbolPrice = yield __1.binance.getSymbolPrice(symbol);
        const quantity = purchaseAmount / Number(symbolPrice);
        const exchangeInfo = yield binanceClient_1.default.exchangeInfo();
        const symbolInfo = exchangeInfo.symbols.find((s) => s.symbol === symbol);
        const precision = (symbolInfo === null || symbolInfo === void 0 ? void 0 : symbolInfo.baseAssetPrecision) || 0;
        const lotSizeFilter = symbolInfo === null || symbolInfo === void 0 ? void 0 : symbolInfo.filters.find((f) => f.filterType === "LOT_SIZE");
        const stepSize = parseFloat((lotSizeFilter === null || lotSizeFilter === void 0 ? void 0 : lotSizeFilter.stepSize) || "1");
        const adjustedQuantity = Math.floor(quantity / stepSize) * stepSize;
        const preciseQuantity = parseFloat(adjustedQuantity.toFixed(precision));
        const safetyMargin = 0.98;
        const finalQuantity = parseFloat((preciseQuantity * safetyMargin).toFixed(precision));
        const finalAdjustedQuantity = Math.floor(finalQuantity / stepSize) * stepSize;
        const buyPayload = {
            symbol,
            side: "BUY" /* OrderSide.BUY */,
            type: "MARKET",
            quantity: finalAdjustedQuantity,
        };
        const tradeData = {
            symbol,
            side: "BUY" /* OrderSide.BUY */,
            type: "MARKET",
            usdtCapital,
            purchaseAmount,
            symbolPrice,
            quantity: finalAdjustedQuantity,
            timestamp: new Date(),
        };
        if (testOrder === true) {
            tradeData.testOrder = true;
        }
        let buyOrder;
        try {
            if (testOrder !== true) {
                buyOrder = yield __1.binance.createBuyOrder(buyPayload);
            }
        }
        catch (orderError) {
            console.error("Error executing buy order:", orderError);
            tradeData.error = orderError.message;
        }
        const trade = new Trade_1.default(tradeData);
        yield trade.save();
        return buyOrder;
    }
    catch (error) {
        console.error("Error entering buy order:", error);
        throw error;
    }
});
exports.enterBuy = enterBuy;
