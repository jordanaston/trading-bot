import { OrderSide } from "binance-api-node";
import { binance } from "..";
import Trade from "../../models/Trade";
import { TradeType } from "../../types/types";
import binanceClient from "../../client/binanceClient";

export const enterSell = async (symbol: string, testOrder?: boolean) => {
  try {
    const tokenBalance = await binance.getTokenBalance(symbol);
    const usdtCapitalBeforeSell = await binance.getUSDTValue();

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
    const safetyMargin = 0.99;
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
      usdtPercentage: 100,
      timestamp: new Date(),
      usdtReceived: 0,
    };

    try {
      if (testOrder !== true) {
        sellOrder = await binance.createSellOrder(sellPayload);
        const usdtCapitalAfterSell = await binance.getUSDTValue();
        tradeData.usdtReceived = usdtCapitalAfterSell;
        const ticker = await binanceClient.prices({ symbol });
        const tokenPriceInUSDT = parseFloat(ticker[symbol]);
        tradeData.closeAmount = parseFloat(
          (finalAdjustedQuantity * tokenPriceInUSDT).toFixed(4)
        );

        tradeData.change = parseFloat(
          (
            ((usdtCapitalAfterSell -
              (usdtCapitalBeforeSell + tradeData.closeAmount)) /
              (usdtCapitalBeforeSell + tradeData.closeAmount)) *
            100
          ).toFixed(4)
        );
        tradeData.symbolPrice = tokenPriceInUSDT;
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
