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
exports.getBotStatus = void 0;
const Bot_1 = __importDefault(require("../../models/Bot"));
const getBotStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bot = yield Bot_1.default.findOne();
        if (!bot) {
            return res.status(404).json({ message: "Bot not found" });
        }
        return res.status(200).json({ active: bot.active });
    }
    catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
});
exports.getBotStatus = getBotStatus;
exports.default = exports.getBotStatus;
