import express from "express";
import { verifyToken } from "../middleware/authMiddleware.js";
import checkSubscription from "../middleware/checkSubscription.js";
import { getDashboard } from "../controllers/userController.js";

const router = express.Router();

// 🔥 CLEAN ROUTE
router.get("/dashboard", verifyToken, checkSubscription, getDashboard);

export default router;