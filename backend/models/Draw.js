import mongoose from "mongoose";

const drawSchema = new mongoose.Schema({
  numbers: [Number],
  date: { type: Date, default: Date.now },
  results: [
    {
      userId: mongoose.Schema.Types.ObjectId,
      matchCount: Number,
      prize: Number
    }
  ],
  status: { type: String, default: "pending" }
});

export default mongoose.model("Draw", drawSchema);