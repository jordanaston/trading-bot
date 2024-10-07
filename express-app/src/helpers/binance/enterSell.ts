import { OrderSide } from "binance-api-node";
import { binance } from "..";
import Trade from "../../models/Trade";

export const enterSell = async (symbol: string) => {
  try {
    const tokenBalance = await binance.getTokenBalance(symbol);

    if (!tokenBalance || tokenBalance <= 0) {
      throw new Error("Insufficient token balance.");
    }

    const quantity = tokenBalance;

    const sellPayload = {
      symbol,
      side: OrderSide.SELL,
      type: "MARKET",
      quantity: quantity,
    };

    const sellOrder = await binance.createSellOrder(sellPayload);

    // maybe should get data from the response
    const tradeData = {
      symbol,
      side: OrderSide.SELL,
      type: "MARKET",
      tokenBalance,
      quantity,
      timestamp: new Date().toISOString(),
    };

    const trade = new Trade(tradeData);
    await trade.save();

    return sellOrder;
  } catch (error) {
    console.error("Error entering sell order:", error);
    throw error;
  }
};
