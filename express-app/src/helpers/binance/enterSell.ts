import { OrderSide } from "binance-api-node";
import { binance } from "..";
import Trade from "../../models/Trade";
import { TradeType } from "../../types/types";
import binanceClient from "../../client/binanceClient";
import { getChangePercentage } from "./getChangePercentage";

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

    const tradeData: TradeType = {
      symbol,
      side: OrderSide.SELL,
      type: "MARKET",
      quantity: finalAdjustedQuantity,
      usdtPercentage: 100,
      timestamp: new Date(),
      usdtReceived: 0,
    };

    let sellOrder;
    try {
      if (testOrder !== true) {
        sellOrder = await binance.createSellOrder(sellPayload);
        const usdtCapitalAfterSell = await binance.getUSDTValue();

        if (sellOrder?.fills && sellOrder.fills.length > 0) {
          const fill = sellOrder.fills[0];
          const price = fill.price;
          const qty = fill.qty;
          const quoteQty = (parseFloat(price) * parseFloat(qty)).toFixed(8);

          const completedSellAmount = usdtCapitalBeforeSell + Number(quoteQty);
          const change = await getChangePercentage(
            completedSellAmount,
            usdtCapitalAfterSell
          );

          tradeData.symbolPrice = Number(price);
          tradeData.quantity = Number(qty);
          tradeData.closeAmount = Number(quoteQty);
          tradeData.usdtReceived = usdtCapitalAfterSell;
          tradeData.change = change;
        } else {
          console.error("No fills found in the sell order.");
        }
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
