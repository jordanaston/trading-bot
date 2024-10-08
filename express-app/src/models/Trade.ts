import mongoose, { Schema } from "mongoose";

const tradeSchema: Schema = new Schema({
  symbol: { type: String, required: true },
  side: { type: String, required: true },
  type: { type: String, required: true },
  usdtCapital: { type: Number, required: false },
  purchaseAmount: { type: Number, required: false },
  symbolPrice: { type: Number, required: false },
  quantity: { type: Number, required: true },
  timestamp: { type: Date, required: true },
  testOrder: { type: Boolean, required: false },
  usdtReceived: { type: Number, required: false },
  error: { type: String, required: false },
});

const Trade = mongoose.model("Trade", tradeSchema);

export type TradeClass = typeof Trade;

export default Trade;
