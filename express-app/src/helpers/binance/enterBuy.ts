import { OrderSide } from "binance-api-node";
import { binance } from "..";
import Trade from "../../models/Trade";
import { TradeType } from "../../types/types";
import binanceClient from "../../client/binanceClient";
import Bot from "../../models/Bot";

export const enterBuy = async (
  symbol: string,
  buyCount: number,
  testOrder: boolean
) => {
  try {
    const usdtCapital = await binance.getUSDTValue();

    if (buyCount === 0) {
      await Bot.updateOne({}, { usdtCapital });
    }

    let purchaseAmount: number = 0;
    let usdtPercentage: number = 0;

    switch (buyCount) {
      case 0:
        purchaseAmount = usdtCapital * 0.2;
        usdtPercentage = 20;
        break;
      case 1:
        purchaseAmount = usdtCapital * 0.25;
        usdtPercentage = 25;
        break;
      case 2:
        purchaseAmount = usdtCapital * 0.3333;
        usdtPercentage = 33.33;
        break;
      case 3:
        purchaseAmount = usdtCapital * 0.5;
        usdtPercentage = 50;
        break;
      case 4:
        purchaseAmount = usdtCapital;
        usdtPercentage = 100;
        break;
    }

    const symbolPrice = await binance.getSymbolPrice(symbol);
    const quantity = purchaseAmount / Number(symbolPrice);
    const exchangeInfo = await binanceClient.exchangeInfo();
    const symbolInfo = exchangeInfo.symbols.find((s) => s.symbol === symbol);
    const precision = symbolInfo?.baseAssetPrecision || 0;
    const lotSizeFilter = symbolInfo?.filters.find(
      (f) => f.filterType === "LOT_SIZE"
    ) as { stepSize: string } | undefined;
    const stepSize = parseFloat(lotSizeFilter?.stepSize || "1");
    const adjustedQuantity = Math.floor(quantity / stepSize) * stepSize;
    const preciseQuantity = parseFloat(adjustedQuantity.toFixed(precision));
    const safetyMargin = 0.999;
    const finalQuantity = parseFloat(
      (preciseQuantity * safetyMargin).toFixed(precision)
    );
    const finalAdjustedQuantity =
      Math.floor(finalQuantity / stepSize) * stepSize;

    const buyPayload = {
      symbol,
      side: OrderSide.BUY,
      type: "MARKET",
      quantity: finalAdjustedQuantity,
    };

    console.log("BUY PAYLOAD: ", buyPayload);

    const tradeData: TradeType = {
      symbol,
      side: OrderSide.BUY,
      type: "MARKET",
      usdtCapital,
      purchaseAmount,
      usdtPercentage,
      symbolPrice,
      quantity,
      timestamp: new Date(),
    };

    let buyOrder;
    try {
      if (testOrder !== true) {
        buyOrder = await binance.createBuyOrder(buyPayload);

        if (buyOrder) {
          const fill = buyOrder?.fills?.[0];
          const symbolPrice = parseFloat(fill?.price || "");
          const quantity = parseFloat(buyOrder.executedQty);
          const purchaseAmount = parseFloat(buyOrder.cummulativeQuoteQty);

          tradeData.symbolPrice = symbolPrice;
          tradeData.quantity = quantity;
          tradeData.purchaseAmount = purchaseAmount;

          console.log("Buy Data After Assignment:", {
            symbolPrice: tradeData.symbolPrice,
            quantity: tradeData.quantity,
            purchaseAmount: tradeData.purchaseAmount,
          });
        } else {
          console.error("No fills found in the buy order.");
        }
      }
    } catch (orderError: any) {
      console.error("Error executing buy order:", orderError);
      tradeData.error = orderError.message as string;
    }

    if (testOrder === true) {
      tradeData.testOrder = true;
    }

    console.log("TRADE DATA FOR DB: ", tradeData);

    const trade = new Trade(tradeData);
    await trade.save();

    return buyOrder;
  } catch (error) {
    console.error("Error entering buy order:", error);
    throw error;
  }
};
