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
const Bot_1 = __importDefault(require("../../models/Bot"));
const enterBuy = (symbol, buyCount, testOrder) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const usdtCapital = yield __1.binance.getUSDTValue();
        if (buyCount === 0) {
            yield Bot_1.default.updateOne({}, { usdtCapital });
        }
        let purchaseAmount = 0;
        let usdtPercentage = 0;
        switch (buyCount) {
            case 0:
                purchaseAmount = usdtCapital * 0.2;
                usdtPercentage = 20;
                break;
            case 1:
                purchaseAmount = usdtCapital * 0.25;
                usdtPercentage = 25;
                break;
            case 2:
                purchaseAmount = usdtCapital * 0.3333;
                usdtPercentage = 33.33;
                break;
            case 3:
                purchaseAmount = usdtCapital * 0.5;
                usdtPercentage = 50;
                break;
            case 4:
                purchaseAmount = usdtCapital;
                usdtPercentage = 100;
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
        const safetyMargin = 0.999;
        const finalQuantity = parseFloat((preciseQuantity * safetyMargin).toFixed(precision));
        const finalAdjustedQuantity = Math.floor(finalQuantity / stepSize) * stepSize;
        const buyPayload = {
            symbol,
            side: "BUY" /* OrderSide.BUY */,
            type: "MARKET",
            quantity: finalAdjustedQuantity,
        };
        console.log("BUY PAYLOAD: ", buyPayload);
        const tradeData = {
            symbol,
            side: "BUY" /* OrderSide.BUY */,
            type: "MARKET",
            usdtCapital,
            purchaseAmount,
            usdtPercentage,
            symbolPrice,
            quantity,
            timestamp: new Date(),
        };
        let buyOrder;
        try {
            if (testOrder !== true) {
                buyOrder = yield __1.binance.createBuyOrder(buyPayload);
                if (buyOrder) {
                    const fill = (_a = buyOrder === null || buyOrder === void 0 ? void 0 : buyOrder.fills) === null || _a === void 0 ? void 0 : _a[0];
                    const symbolPrice = parseFloat((fill === null || fill === void 0 ? void 0 : fill.price) || "");
                    const quantity = parseFloat(buyOrder.executedQty);
                    const purchaseAmount = parseFloat(buyOrder.cummulativeQuoteQty);
                    tradeData.symbolPrice = symbolPrice;
                    tradeData.quantity = quantity;
                    tradeData.purchaseAmount = purchaseAmount;
                    console.log("Buy Data After Assignment:", {
                        symbolPrice: tradeData.symbolPrice,
                        quantity: tradeData.quantity,
                        purchaseAmount: tradeData.purchaseAmount,
                    });
                }
                else {
                    console.error("No fills found in the buy order.");
                }
            }
        }
        catch (orderError) {
            console.error("Error executing buy order:", orderError);
            tradeData.error = orderError.message;
        }
        if (testOrder === true) {
            tradeData.testOrder = true;
        }
        console.log("TRADE DATA FOR DB: ", tradeData);
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
