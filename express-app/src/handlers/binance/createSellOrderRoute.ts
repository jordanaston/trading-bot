import { Request, Response } from "express";
import dotenv from "dotenv";
import { binance } from "../../helpers";
dotenv.config();

export const createSellOrderRoute = async (req: Request, res: Response) => {
  const { symbol, quantity, side, type } = req.body;

  const payload = {
    symbol,
    side,
    type,
    quantity,
  };

  try {
    const sellOrder = await binance.createSellOrder(payload);
    res.status(201).json(sellOrder);
    console.log("Sell order successful:", sellOrder);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(409).json({ message: error.message });
    } else {
      res.status(409).json({ message: "An unknown error occurred" });
    }
  }
};

export default createSellOrderRoute;
