import express from "express";
import {
  addCharity,
  getCharities,
  selectCharity
} from "../controllers/charityController.js";

import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/add", verifyToken, addCharity);     // admin
router.get("/", getCharities);                    // public
router.post("/select", verifyToken, selectCharity);

export default router;