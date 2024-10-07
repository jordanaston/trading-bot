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
const enterBuy = (symbol, buyCount) => __awaiter(void 0, void 0, void 0, function* () {
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
        const quantity = usdtCapital / Number(symbolPrice);
        const buyPayload = {
            symbol,
            side: "BUY" /* OrderSide.BUY */,
            type: "MARKET",
            quantity,
        };
        const buyOrder = yield __1.binance.createBuyOrder(buyPayload);
        // maybe should get data from the response
        const tradeData = {
            symbol,
            side: "BUY" /* OrderSide.BUY */,
            type: "MARKET",
            usdtCapital,
            purchaseAmount,
            symbolPrice,
            quantity,
            timestamp: new Date().toISOString(),
        };
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
