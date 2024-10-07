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
exports.createBuyOrder = void 0;
const betBotStatus_1 = require("./betBotStatus");
const createBuyOrder = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const botStatusActive = yield (0, betBotStatus_1.getBotStatus)();
        if (botStatusActive === true) {
            const buyOrder = "test";
            // const buyOrder = await binanceClient.order(payload);
            return buyOrder;
        }
    }
    catch (error) {
        if (error instanceof Error) {
            console.log(error);
            throw new Error(error.message);
        }
        else {
            throw new Error("An unknown error occurred");
        }
    }
});
exports.createBuyOrder = createBuyOrder;
