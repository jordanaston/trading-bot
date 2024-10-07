import mongoose, { Schema } from "mongoose";

const tradeSchema: Schema = new Schema({
  id: { type: Schema.Types.ObjectId, required: true },
  symbol: { type: String, required: true },
  side: { type: String, required: true },
  type: { type: String, required: true },
  usdtCapital: { type: Number, required: false },
  purchaseAmount: { type: Number, required: false },
  symbolPrice: { type: Number, required: false },
  quantity: { type: Number, required: true },
  timestamp: { type: Date, required: true },
});

const Trade = mongoose.model("Trade", tradeSchema);

export type TradeClass = typeof Trade;

export default Trade;
