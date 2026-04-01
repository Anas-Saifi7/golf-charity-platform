import express from "express";
import { getDraws, getUserWinnings, runDraw } from "../controllers/drawController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getDraws);
// only admin should run draw
router.post("/run", verifyToken, runDraw);
router.get("/winnings", verifyToken, getUserWinnings);

export default router;