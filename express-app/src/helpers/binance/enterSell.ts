import { OrderSide } from "binance-api-node";
import { binance } from "..";
import Trade from "../../models/Trade";
import { TradeType } from "../../types/types";
import binanceClient from "../../client/binanceClient";
import { getChangePercentage } from "./getChangePercentage";
import Bot from "../../models/Bot";

export const enterSell = async (symbol: string, testOrder?: boolean) => {
  await new Promise((resolve) => setTimeout(resolve, 2000));
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

    console.log("SELL PAYLOAD: ", sellPayload);

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

        if (sellOrder) {
          const fill = sellOrder?.fills?.[0];
          const symbolPrice = parseFloat(fill?.price || "");
          const quantity = parseFloat(sellOrder.executedQty);
          const closeAmount = parseFloat(sellOrder.cummulativeQuoteQty);

          tradeData.symbolPrice = symbolPrice;
          tradeData.quantity = quantity;
          tradeData.closeAmount = closeAmount;

          console.log("Sell Data After Assignment:", {
            symbolPrice: tradeData.symbolPrice,
            quantity: tradeData.quantity,
            closeAmount: tradeData.closeAmount,
          });
        } else {
          console.error("No fills found in the sell order.");
        }
      }
    } catch (orderError: any) {
      console.error("Error executing sell order:", orderError);
      tradeData.error = orderError.message as string;
    }

    const botData = await Bot.findOne({});
    const usdtCapitalBeforeBuy = botData?.usdtCapital as number;

    // If your last fix doesn't work, try adding the closeAmount to the usdtCapitalBeforeBuy
    // const usdtCapitalAfterSell =
    //   usdtCapitalBeforeBuy + tradeData.closeAmount;

    await new Promise((resolve) => setTimeout(resolve, 8000));
    const usdtCapitalAfterSell = await binance.getUSDTValue();

    console.log("USDT CAPITAL BEFORE BUY: ", usdtCapitalBeforeBuy);
    console.log("USDT CAPITAL AFTER SELL: ", usdtCapitalAfterSell);
    const change = await getChangePercentage(
      usdtCapitalBeforeBuy,
      usdtCapitalAfterSell
    );

    tradeData.usdtReceived = usdtCapitalAfterSell;
    tradeData.change = change;

    if (testOrder === true) {
      tradeData.testOrder = true;
    }

    console.log("TRADE DATA FOR DB: ", tradeData);

    const trade = new Trade(tradeData);
    await trade.save();

    return sellOrder;
  } catch (error) {
    console.error("Error entering sell order:", error);
    throw error;
  }
};
