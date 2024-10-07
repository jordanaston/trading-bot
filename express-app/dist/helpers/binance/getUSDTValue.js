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
exports.getUSDTValue = void 0;
const binanceClient_1 = __importDefault(require("../../client/binanceClient"));
const getUSDTValue = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const accountInfo = yield binanceClient_1.default.accountInfo();
        const usdtBalance = accountInfo.balances.find((balance) => balance.asset === "USDT");
        if (!usdtBalance) {
            throw new Error("USDT balance not found");
        }
        return Number(usdtBalance.free);
    }
    catch (error) {
        if (error instanceof Error) {
            console.error("Error fetching USDT value:", error.message);
            throw error;
        }
        else {
            console.error("An unknown error occurred while fetching USDT value");
            throw new Error("An unknown error occurred");
        }
    }
});
exports.getUSDTValue = getUSDTValue;
exports.default = exports.getUSDTValue;
