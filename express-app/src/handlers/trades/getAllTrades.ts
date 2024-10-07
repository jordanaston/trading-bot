import { Request, Response } from "express";
import Trade from "../../models/Trade";

export const getAllTrades = async (req: Request, res: Response) => {
  try {
    const trades = await Trade.find().sort({ timestamp: -1 }); 
    res.status(200).json(trades);
    return trades;
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch trades" });
  }
};
