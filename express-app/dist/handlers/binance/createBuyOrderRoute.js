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
exports.createBuyOrderRoute = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const helpers_1 = require("../../helpers");
dotenv_1.default.config();
const createBuyOrderRoute = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { symbol, quantity, side, type } = req.body;
    const payload = {
        symbol,
        side,
        type,
        quantity,
    };
    try {
        const buyOrder = yield helpers_1.binance.createBuyOrder(payload);
        res.status(201).json(buyOrder);
        console.log("Buy order successful:", buyOrder);
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(409).json({ message: error.message });
        }
        else {
            res.status(409).json({ message: "An unknown error occurred" });
        }
    }
});
exports.createBuyOrderRoute = createBuyOrderRoute;
exports.default = exports.createBuyOrderRoute;
