import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: { type: String, default: "user" },

  subscription: {
    plan: String,
    status: { type: String, default: "inactive" },
    expiry: Date
  },

  scores: [
    {
      value: Number,
      date: Date
    }
  ],

  charity: {
    name: String,
    percentage: { type: Number, default: 10 }
  }

}, { timestamps: true });

export default mongoose.model("User", userSchema);