import { Request, Response } from "express";
import { enterBuy } from "../../helpers/binance/enterBuy";
import { enterSell } from "../../helpers/binance/enterSell";
import Bot from "../../models/Bot";

export enum OrderSide {
  BUY = "BUY",
  SELL = "SELL",
}

export const tradingViewWebhook = async (req: Request, res: Response) => {
  try {
    const { symbol, side, testOrder } = req.body;

    const botData = (await Bot.findOne()) || {
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
        const maxBuysMessage =
          "Maximum number of buys reached. Waiting for SELL alert...";
        console.log(maxBuysMessage, "BUY COUNT: ", buyCount);
        return res.status(200).json({ message: maxBuysMessage });
      }

      const buySuccess = await enterBuy(symbol, Number(buyCount), testOrder);

      if (buySuccess?.status === "FILLED") {
        console.log("BUY FILLED");
      }

      if (buySuccess && testOrder !== true) {
        buyCount = Number(buyCount) + 1;
        lastTrade = OrderSide.BUY;
        await Bot.updateOne({}, { buyCount, lastTrade });
        console.log("BUY COUNT + LAST TRADE: ", buyCount, lastTrade);
      }
    } else if (side === OrderSide.SELL) {
      if (lastTrade === OrderSide.SELL) {
        const repeatedSellMessage =
          "Repeated SELL detected. Skipping execution.";
        console.log(repeatedSellMessage);
        return res.status(200).json({ message: repeatedSellMessage });
      }

      const sellSuccess = await enterSell(symbol, testOrder);

      if (sellSuccess?.status === "FILLED") {
        console.log("SELL FILLED");
      }

      if (sellSuccess && testOrder !== true) {
        buyCount = 0;
        lastTrade = OrderSide.SELL;
        await Bot.updateOne({}, { buyCount, lastTrade });
        console.log("BUY COUNT + LAST TRADE: ", buyCount, lastTrade);
      }
    }
    console.log("Webhook triggered successfully");
    res.status(200).json({ message: "Webhook triggered successfully" });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(error);
      res.status(500).json({ message: error.message });
    } else {
      console.error("An unknown error occurred");
      res.status(500).json({ message: "An unknown error occurred" });
    }
  }
};

export default tradingViewWebhook;
