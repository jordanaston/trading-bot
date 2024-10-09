import { Request, Response } from "express";
import { getUSDTValue } from "../../helpers/binance/getUSDTValue";

export const getUSDTBalanceRoute = async (req: Request, res: Response) => {
  try {
    const balance = await getUSDTValue();
    return res.status(200).json({ balance });
  } catch (error) {
    const err = error as Error;
    return res.status(500).json({ message: err.message });
  }
};

export default getUSDTBalanceRoute;
