import mongoose, { Schema } from "mongoose";

const botSchema: Schema = new Schema({
  active: { type: Boolean, required: true },
  buyCount: { type: Number, required: true },
  lastTrade: { type: String, required: true },
});

const Bot = mongoose.model("Bot", botSchema);

export default Bot;