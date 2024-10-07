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
exports.getTokenBalance = void 0;
const binanceClient_1 = __importDefault(require("../../client/binanceClient"));
const getTokenBalance = (symbol) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        symbol = symbol.replace(/USDT$/, "");
        const accountInfo = yield binanceClient_1.default.accountInfo();
        const isTokenHeld = accountInfo.balances.some((b) => b.asset === symbol);
        if (!isTokenHeld) {
            console.warn(`Token ${symbol} is not held in the account.`);
            throw new Error(`Balance for symbol ${symbol} not found.`);
        }
        const tokenBalance = accountInfo.balances.find((b) => b.asset === symbol);
        if (!tokenBalance) {
            throw new Error(`Balance for symbol ${symbol} not found.`);
        }
        return parseFloat(tokenBalance.free);
    }
    catch (error) {
        console.error(`Failed to fetch balance for symbol ${symbol}:`, error);
        throw new Error(`Could not retrieve balance for symbol ${symbol}`);
    }
});
exports.getTokenBalance = getTokenBalance;
