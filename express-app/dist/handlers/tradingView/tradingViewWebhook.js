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
exports.tradingViewWebhook = exports.OrderSide = void 0;
const enterBuy_1 = require("../../helpers/binance/enterBuy");
const enterSell_1 = require("../../helpers/binance/enterSell");
const Bot_1 = __importDefault(require("../../models/Bot"));
var OrderSide;
(function (OrderSide) {
    OrderSide["BUY"] = "BUY";
    OrderSide["SELL"] = "SELL";
})(OrderSide || (exports.OrderSide = OrderSide = {}));
const tradingViewWebhook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { symbol, side, testOrder } = req.body;
        const botData = (yield Bot_1.default.findOne()) || {
            buyCount: 0,
            lastTrade: null,
            active: true,
        };
        let { buyCount, lastTrade, active: botStatusActive } = botData;
        console.log("BOT DATA: ", botData);
        console.log("REQUEST BODY: ", req.body, "BUY COUNT: ", buyCount);
        if (!symbol || !side) {
            console.log("Invalid request data.");
            return res.status(400).json({ message: "Invalid request data." });
        }
        if (botStatusActive === false) {
            console.log("Bot is inactive.");
            return res.status(200).json({ message: "Bot is inactive." });
        }
        if (side === OrderSide.BUY) {
            if (Number(buyCount) >= 5) {
                const maxBuysMessage = "Maximum number of buys reached. Waiting for SELL alert...";
                console.log(maxBuysMessage, "BUY COUNT: ", buyCount);
                return res.status(200).json({ message: maxBuysMessage });
            }
            const buySuccess = yield (0, enterBuy_1.enterBuy)(symbol, Number(buyCount), testOrder);
            console.log("BUY SUCCESS: ", buySuccess);
            if (buySuccess && testOrder !== true) {
                buyCount = Number(buyCount) + 1;
                lastTrade = OrderSide.BUY;
                yield Bot_1.default.updateOne({}, { buyCount, lastTrade });
                console.log("BUY COUNT + LAST TRADE: ", buyCount, lastTrade);
            }
        }
        else if (side === OrderSide.SELL) {
            if (lastTrade === OrderSide.SELL) {
                const repeatedSellMessage = "Repeated SELL detected. Skipping execution.";
                console.log(repeatedSellMessage);
                return res.status(200).json({ message: repeatedSellMessage });
            }
            const sellSuccess = yield (0, enterSell_1.enterSell)(symbol, testOrder);
            console.log("SELL SUCCESS: ", sellSuccess);
            if (sellSuccess && testOrder !== true) {
                buyCount = 0;
                lastTrade = OrderSide.SELL;
                yield Bot_1.default.updateOne({}, { buyCount, lastTrade });
                console.log("BUY COUNT + LAST TRADE: ", buyCount, lastTrade);
            }
        }
        console.log("Webhook triggered successfully");
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
