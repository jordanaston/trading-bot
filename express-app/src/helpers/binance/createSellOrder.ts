import binanceClient from "../../client/binanceClient";
import { getBotStatus } from "./betBotStatus";

export const createSellOrder = async (payload: any) => {
  try {
    const botStatusActive = await getBotStatus();

    if (botStatusActive === true) {
      const sellOrder = await binanceClient.order(payload);
      return sellOrder;
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log(error);
      throw new Error(error.message);
    } else {
      throw new Error("An unknown error occurred");
    }
  }
};
