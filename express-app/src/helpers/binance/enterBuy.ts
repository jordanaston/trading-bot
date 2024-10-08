import { OrderSide } from "binance-api-node";
import { binance } from "..";
import Trade from "../../models/Trade";
import { TradeType } from "../../types/types";
import binanceClient from "../../client/binanceClient";

export const enterBuy = async (
  symbol: string,
  buyCount: number,
  testOrder: boolean
) => {
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
    const quantity = purchaseAmount / Number(symbolPrice);
    const exchangeInfo = await binanceClient.exchangeInfo();
    const symbolInfo = exchangeInfo.symbols.find((s) => s.symbol === symbol);
    const precision = symbolInfo?.baseAssetPrecision || 0;
    const lotSizeFilter = symbolInfo?.filters.find(
      (f) => f.filterType === "LOT_SIZE"
    );
    const stepSize = parseFloat(lotSizeFilter?.stepSize || "1");
    const adjustedQuantity = Math.floor(quantity / stepSize) * stepSize;
    const preciseQuantity = parseFloat(adjustedQuantity.toFixed(precision));
    const safetyMargin = 0.98;
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

    const tradeData: TradeType = {
      symbol,
      side: OrderSide.BUY,
      type: "MARKET",
      usdtCapital,
      purchaseAmount,
      symbolPrice,
      quantity: finalAdjustedQuantity,
      timestamp: new Date(),
    };

    if (testOrder === true) {
      tradeData.testOrder = true;
    }

    let buyOrder;
    try {
      if (testOrder !== true) {
        buyOrder = await binance.createBuyOrder(buyPayload);
      }
    } catch (orderError: any) {
      console.error("Error executing buy order:", orderError);
      tradeData.error = orderError.message as string;
    }

    const trade = new Trade(tradeData);
    await trade.save();

    return buyOrder;
  } catch (error) {
    console.error("Error entering buy order:", error);
    throw error;
  }
};
