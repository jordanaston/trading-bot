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
exports.getChangePercentage = void 0;
const getChangePercentage = (usdtCapitalBeforeBuy, usdtCapitalAfterSell) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const change = ((usdtCapitalAfterSell - usdtCapitalBeforeBuy) / usdtCapitalBeforeBuy) *
            100;
        const fixedChange = parseFloat(change.toFixed(4));
        return fixedChange;
    }
    catch (error) {
        console.error("Error calculating change percentage:", error);
        throw error;
    }
});
exports.getChangePercentage = getChangePercentage;
