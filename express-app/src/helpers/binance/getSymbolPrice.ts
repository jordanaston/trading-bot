import binanceClient from "../../client/binanceClient";

export const getSymbolPrice = async (symbol: string) => {
  try {
    const priceData = await binanceClient.prices({ symbol });
    const price = parseFloat(priceData[symbol]);

    return price;
  } catch (error) {
    console.error(`Failed to fetch price for symbol ${symbol}:`, error);
    throw new Error(`Could not retrieve price for symbol ${symbol}`);
  }
};
