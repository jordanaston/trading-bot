import Bot from "../../models/Bot";

export const getBotStatus = async () => {
  const bot = await Bot.findOne({});
  return bot?.active as boolean;
};
