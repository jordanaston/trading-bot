// import { Request, Response } from "express";
// import dotenv from "dotenv";
// import { binance } from "../../helpers";
// dotenv.config();

// export const createBuyOrderRoute = async (req: Request, res: Response) => {
//   const { symbol, quantity, side, type } = req.body;

//   const payload = {
//     symbol,
//     side,
//     type,
//     quantity,
//   };

//   try {
//     const buyOrder = await binance.createBuyOrder(payload);
//     res.status(201).json(buyOrder);
//   } catch (error: unknown) {
//     if (error instanceof Error) {
//       res.status(409).json({ message: error.message });
//     } else {
//       res.status(409).json({ message: "An unknown error occurred" });
//     }
//   }
// };

// export default createBuyOrderRoute;
