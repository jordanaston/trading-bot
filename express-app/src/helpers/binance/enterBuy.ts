import { OrderSide } from "binance-api-node";
import { binance } from "..";
import Trade from "../../models/Trade";

export const enterBuy = async (symbol: string, buyCount: number) => {
  try {
    const usdtCapital = await binance.getUSDTValue();
    let purchaseAmount: number = 0;

    switch (buyCount) {
      case 0:
        purchaseAmount = usdtCapital * 0.2;
        break;
      case 1:
        purchaseAmount = usdtCapital * 0.25;
        break;
      case 2:
        purchaseAmount = usdtCapital * 0.3333;
        break;
      case 3:
        purchaseAmount = usdtCapital * 0.5;
        break;
      case 4:
        purchaseAmount = usdtCapital;
        break;
    }

    const symbolPrice = await binance.getSymbolPrice(symbol);
    const quantity = usdtCapital / Number(symbolPrice);

    const buyPayload = {
      symbol,
      side: OrderSide.BUY,
      type: "MARKET",
      quantity,
    };

    const buyOrder = await binance.createBuyOrder(buyPayload);

    // maybe should get data from the response
    const tradeData = {
      symbol,
      side: OrderSide.BUY,
      type: "MARKET",
      usdtCapital,
      purchaseAmount,
      symbolPrice,
      quantity,
      timestamp: new Date().toISOString(),
    };

    const trade = new Trade(tradeData);
    await trade.save();

    return buyOrder;
  } catch (error) {
    console.error("Error entering buy order:", error);
    throw error;
  }
};
