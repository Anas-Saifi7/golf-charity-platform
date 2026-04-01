import User from "../models/User.js";

export const getDashboard = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    // 🔥 FINAL CHECK (access block)
    if (user.subscription?.status !== "active") {
      return res.status(403).json({ msg: "Please subscribe first" });
    }

    res.json({
      msg: "Welcome to dashboard",
      user
    });

  } catch (err) {
    res.status(500).json({ msg: "Server Error" });
  }
};