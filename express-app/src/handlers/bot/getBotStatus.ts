import { Request, Response } from "express";
import Bot from "../../models/Bot";

export const getBotStatus = async (req: Request, res: Response) => {
  try {
    const bot = await Bot.findOne();
    if (!bot) {
      return res.status(404).json({ message: "Bot not found" });
    }
    return res.status(200).json({ active: bot.active });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

export default getBotStatus;
