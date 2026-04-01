import express from "express";
import dotenv from "dotenv";
dotenv.config();

import cors from "cors";
import connectDB from './config/db.js';


import authRoutes from "./routes/authRoutes.js";
import subscriptionRoutes from "./routes/subscriptionRoutes.js";
import scoreRoutes from "./routes/scoreRoutes.js";
import drawRoutes from "./routes/drawRoutes.js";
import charityRoutes from "./routes/charityRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import userRoutes from "./routes/userRoutes.js";

const app = express();

app.use(express.json());
app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true
}));

connectDB();
// console.log(process.env.STRIPE_SECRET_KEY);

app.get("/", (req,res)=>{
  res.send("API Running");
});
app.use("/api/auth", authRoutes);
app.use("/api/subscription", subscriptionRoutes);
app.use("/api/scores", scoreRoutes);
app.use("/api/draw", drawRoutes);
app.use("/api/charity", charityRoutes)
app.use("/api/admin", adminRoutes);
app.use("/user", userRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, ()=>{
  console.log(`Server running on port ${PORT}`);
});