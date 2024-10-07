import { Request, Response } from "express";
import Bot from "../../models/Bot";

enum BotControl {
  ACTIVE = "active",
  INACTIVE = "inactive",
}

export const controlBot = async (req: Request, res: Response) => {
  const { control } = req.body;

  if (control === BotControl.ACTIVE) {
    try {
      await Bot.updateOne({}, { active: true }, { upsert: true });
      res.status(200).send({ message: "Bot activated successfully." });
      console.log("Bot activated successfully.");
    } catch (error) {
      res.status(500).send({ error: "Failed to update bot status." });
    }
  } else if (control === BotControl.INACTIVE) {
    try {
      await Bot.updateOne({}, { active: false }, { upsert: true });
      res.status(200).send({ message: "Bot deactivated successfully." });
      console.log("Bot deactivated successfully.");
    } catch (error) {
      res.status(500).send({ error: "Failed to update bot status." });
    }
  } else {
    res.status(400).send({ error: "Invalid control value." });
  }
};
export default controlBot;
