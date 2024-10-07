import { getBotStatus } from "./binance/betBotStatus";
import { createBuyOrder } from "./binance/createBuyOrder";
import { createSellOrder } from "./binance/createSellOrder";
import { getSymbolPrice } from "./binance/getSymbolPrice";
import { getTokenBalance } from "./binance/getTokenBalance";
import getUSDTValue from "./binance/getUSDTValue";

export const binance = {
  createBuyOrder,
  createSellOrder,
  getUSDTValue,
  getSymbolPrice,
  getTokenBalance,
  getBotStatus,
};
