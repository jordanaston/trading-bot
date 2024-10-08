import { Request, Response } from "express";
import dotenv from "dotenv";
import { enterSell } from "../../helpers/binance/enterSell";
dotenv.config();

export const createSellOrderRoute = async (req: Request, res: Response) => {
  const { symbol } = req.body;

  try {
    const sellOrder = await enterSell(symbol);
    res.status(201).json(sellOrder);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(409).json({ message: error.message });
    } else {
      res.status(409).json({ message: "An unknown error occurred" });
    }
  }
};

export default createSellOrderRoute;
