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
Object.defineProperty(exports, "__esModule", { value: true });
exports.tradingViewWebhook = exports.OrderSide = void 0;
const enterBuy_1 = require("../../helpers/binance/enterBuy");
const enterSell_1 = require("../../helpers/binance/enterSell");
const betBotStatus_1 = require("../../helpers/binance/betBotStatus");
var OrderSide;
(function (OrderSide) {
    OrderSide["BUY"] = "BUY";
    OrderSide["SELL"] = "SELL";
})(OrderSide || (exports.OrderSide = OrderSide = {}));
let buyCount = 0;
const tradingViewWebhook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { symbol, side, testOrder } = req.body;
        const botStatusActive = yield (0, betBotStatus_1.getBotStatus)();
        if (!symbol || !side) {
            return res.status(400).json({ message: "Invalid request data." });
        }
        if (botStatusActive === false) {
            return res.status(200).json({ message: "Bot is inactive." });
        }
        if (side === OrderSide.BUY) {
            if (buyCount >= 5) {
                const maxBuysMessage = "Maximum number of buys reached. Waiting for SELL alert...";
                console.log(maxBuysMessage);
                return res.status(200).json({ message: maxBuysMessage });
            }
            const buySuccess = yield (0, enterBuy_1.enterBuy)(symbol, buyCount, testOrder);
            if (buySuccess && testOrder !== true)
                buyCount++;
        }
        else if (side === OrderSide.SELL) {
            const sellSuccess = yield (0, enterSell_1.enterSell)(symbol, testOrder);
            if (sellSuccess && testOrder !== true)
                buyCount = 0;
        }
        res.status(200).json({ message: "Webhook triggered successfully" });
    }
    catch (error) {
        if (error instanceof Error) {
            console.error(error);
            res.status(500).json({ message: error.message });
        }
        else {
            console.error("An unknown error occurred");
            res.status(500).json({ message: "An unknown error occurred" });
        }
    }
});
exports.tradingViewWebhook = tradingViewWebhook;
exports.default = exports.tradingViewWebhook;
