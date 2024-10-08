import { OrderSide } from "binance-api-node";
import { binance } from "..";
import Trade from "../../models/Trade";
import { TradeType } from "../../types/types";
import binanceClient from "../../client/binanceClient";

export const enterSell = async (symbol: string, testOrder?: boolean) => {
  try {
    const tokenBalance = await binance.getTokenBalance(symbol);

    if (!tokenBalance || tokenBalance <= 0) {
      throw new Error("Insufficient token balance.");
    }

    const exchangeInfo = await binanceClient.exchangeInfo();
    const symbolInfo = exchangeInfo.symbols.find((s) => s.symbol === symbol);
    const precision = symbolInfo?.baseAssetPrecision || 0;
    const lotSizeFilter = symbolInfo?.filters.find(
      (f) => f.filterType === "LOT_SIZE"
    ) as { stepSize: string } | undefined;
    const stepSize = parseFloat(lotSizeFilter?.stepSize || "1");
    const adjustedQuantity = Math.floor(tokenBalance / stepSize) * stepSize;
    const preciseQuantity = parseFloat(adjustedQuantity.toFixed(precision));
    const safetyMargin = 0.999;
    const finalQuantity = parseFloat(
      (preciseQuantity * safetyMargin).toFixed(precision)
    );
    const finalAdjustedQuantity =
      Math.floor(finalQuantity / stepSize) * stepSize;

    const sellPayload = {
      symbol,
      side: OrderSide.SELL,
      type: "MARKET",
      quantity: finalAdjustedQuantity,
    };

    let sellOrder;
    const tradeData: TradeType = {
      symbol,
      side: OrderSide.SELL,
      type: "MARKET",
      quantity: finalAdjustedQuantity,
      timestamp: new Date(),
      usdtReceived: 0,
    };

    try {
      if (testOrder !== true) {
        sellOrder = await binance.createSellOrder(sellPayload);
        const usdtCapital = await binance.getUSDTValue();
        tradeData.usdtReceived = usdtCapital;
      }
    } catch (orderError: any) {
      console.error("Error executing sell order:", orderError);
      tradeData.error = orderError.message as string;
    }

    if (testOrder === true) {
      tradeData.testOrder = true;
    }

    const trade = new Trade(tradeData);
    await trade.save();

    return sellOrder;
  } catch (error) {
    console.error("Error entering sell order:", error);
    throw error;
  }
};
