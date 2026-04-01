import mongoose from "mongoose";

const charitySchema = new mongoose.Schema({
  name: String,
  description: String,
  image: String,
  totalDonations: { type: Number, default: 0 }
}, { timestamps: true });

export default mongoose.model("Charity", charitySchema);