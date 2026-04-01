import express from "express";
import { verifyToken } from "../middleware/authMiddleware.js";
import {
  createCheckoutSession,
  activateSubscription
} from "../controllers/subscriptionController.js";

const router = express.Router();

router.post("/create-checkout",verifyToken, createCheckoutSession);
router.post("/activate", activateSubscription);

export default router;