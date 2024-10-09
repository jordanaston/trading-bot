import express from "express";
import createUser from "../handlers/users/createUser";
import createSellOrder from "../handlers/binance/createSellOrderRoute";
import tradingViewWebhook from "../handlers/tradingView/tradingViewWebhook";
import { getAllTrades } from "../handlers/trades/getAllTrades";
import loginUser from "../handlers/users/loginUser";
import controlBot from "../handlers/bot/controlBot";
import getBotStatus from "../handlers/bot/getBotStatus";
import getUSDTBalanceRoute from "../handlers/binance/getUSDTBalance";

const router = express.Router();

router.post("/users/createUser", createUser);

router.post("/users/loginUser", loginUser);

router.post("/binance/sell", createSellOrder);

router.get("/binance/getUSDTBalance", getUSDTBalanceRoute);

router.post("/tradingView/webhook", tradingViewWebhook);

router.get("/trades/getAllTrades", getAllTrades);

router.post("/bot/controlBot", controlBot);

router.get("/bot/getBotStatus", getBotStatus);

export default router;
