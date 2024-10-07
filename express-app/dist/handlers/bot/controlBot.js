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
exports.controlBot = void 0;
const Bot_1 = __importDefault(require("../../models/Bot"));
var BotControl;
(function (BotControl) {
    BotControl["ACTIVE"] = "active";
    BotControl["INACTIVE"] = "inactive";
})(BotControl || (BotControl = {}));
const controlBot = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { control } = req.body;
    if (control === BotControl.ACTIVE) {
        try {
            yield Bot_1.default.updateOne({}, { active: true }, { upsert: true });
            res.status(200).send({ message: "Bot activated successfully." });
            console.log("Bot activated successfully.");
        }
        catch (error) {
            res.status(500).send({ error: "Failed to update bot status." });
        }
    }
    else if (control === BotControl.INACTIVE) {
        try {
            yield Bot_1.default.updateOne({}, { active: false }, { upsert: true });
            res.status(200).send({ message: "Bot deactivated successfully." });
            console.log("Bot deactivated successfully.");
        }
        catch (error) {
            res.status(500).send({ error: "Failed to update bot status." });
        }
    }
    else {
        res.status(400).send({ error: "Invalid control value." });
    }
});
exports.controlBot = controlBot;
exports.default = exports.controlBot;
