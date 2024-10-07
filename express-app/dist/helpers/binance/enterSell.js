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
const enterSell = (symbol) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tokenBalance = yield __1.binance.getTokenBalance(symbol);
        if (!tokenBalance || tokenBalance <= 0) {
            throw new Error("Insufficient token balance.");
        }
        const quantity = tokenBalance;
        const sellPayload = {
            symbol,
            side: "SELL" /* OrderSide.SELL */,
            type: "MARKET",
            quantity: quantity,
        };
        const sellOrder = yield __1.binance.createSellOrder(sellPayload);
        // maybe should get data from the response
        const tradeData = {
            symbol,
            side: "SELL" /* OrderSide.SELL */,
            type: "MARKET",
            tokenBalance,
            quantity,
            timestamp: new Date().toISOString(),
        };
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
