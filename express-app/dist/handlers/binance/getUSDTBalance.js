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
exports.getUSDTBalanceRoute = void 0;
const getUSDTValue_1 = require("../../helpers/binance/getUSDTValue");
const getUSDTBalanceRoute = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const balance = yield (0, getUSDTValue_1.getUSDTValue)();
        return res.status(200).json({ balance });
    }
    catch (error) {
        const err = error;
        return res.status(500).json({ message: err.message });
    }
});
exports.getUSDTBalanceRoute = getUSDTBalanceRoute;
exports.default = exports.getUSDTBalanceRoute;
