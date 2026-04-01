import User from "../models/User.js";

export const isAdmin = async (req, res, next) => {
  try {
    // 🔥 HARDCODED ADMIN
    if (req.user.id === "admin123") {
      return next();
    }

    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    if (user.role !== "admin") {
      return res.status(403).json({ msg: "Access denied (Admin only)" });
    }

    next();

  } catch (err) {
    console.log("ADMIN ERROR:", err);
    res.status(500).json({ msg: "Server Error" });
  }
};