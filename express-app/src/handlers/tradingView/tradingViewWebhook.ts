import { Request, Response } from "express";
import { enterBuy } from "../../helpers/binance/enterBuy";
import { enterSell } from "../../helpers/binance/enterSell";
import { getBotStatus } from "../../helpers/binance/betBotStatus";

export enum OrderSide {
  BUY = "BUY",
  SELL = "SELL",
}

let buyCount = 0;
let lastTrade: OrderSide | null = null;

export const tradingViewWebhook = async (req: Request, res: Response) => {
  try {
    const { symbol, side, testOrder } = req.body;

    const botStatusActive = await getBotStatus();

    if (!symbol || !side) {
      return res.status(400).json({ message: "Invalid request data." });
    }

    if (botStatusActive === false) {
      return res.status(200).json({ message: "Bot is inactive." });
    }

    if (side === OrderSide.BUY) {
      if (buyCount >= 5) {
        const maxBuysMessage =
          "Maximum number of buys reached. Waiting for SELL alert...";
        console.log(maxBuysMessage);
        return res.status(200).json({ message: maxBuysMessage });
      }

      const buySuccess = await enterBuy(symbol, buyCount, testOrder);

      if (buySuccess && testOrder !== true) {
        buyCount++;
        lastTrade = OrderSide.BUY;
      }
    } else if (side === OrderSide.SELL) {
      if (lastTrade === OrderSide.SELL) {
        const repeatedSellMessage =
          "Repeated SELL detected. Skipping execution.";
        console.log(repeatedSellMessage);
        return res.status(200).json({ message: repeatedSellMessage });
      }

      const sellSuccess = await enterSell(symbol, testOrder);

      if (sellSuccess && testOrder !== true) {
        buyCount = 0;
        lastTrade = OrderSide.SELL;
      }
    }

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
