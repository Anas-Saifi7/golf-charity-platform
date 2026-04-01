import express from "express";
import {
  getAllUsers,
  deleteUser,
  getAllDraws,
  getWinners,
  getStats
} from "../controllers/adminController.js";

import { verifyToken } from "../middleware/authMiddleware.js";
import { isAdmin } from "../middleware/adminMiddleware.js";

const router = express.Router();

console.log("Admin Routes Loaded ✅");

// 🔥 IMPORTANT
router.use(verifyToken, isAdmin);

// 🔥 ROUTES
router.get("/users", getAllUsers);
router.get("/stats", getStats);
router.get("/winners", getWinners);
router.get("/draws", getAllDraws);

router.delete("/users/:id", deleteUser);

export default router;