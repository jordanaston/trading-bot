import Binance from "binance-api-node";
import dotenv from "dotenv";
dotenv.config();

const binanceClient = Binance({
  apiKey: process.env.BINANCE_API_KEY,
  apiSecret: process.env.BINANCE_API_SECRET,
});

export default binanceClient;