import User from "../models/User.js";

const checkSubscription = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    // 🔥 Expiry check
    if (user.subscription?.expiry && user.subscription.expiry < new Date()) {
      user.subscription.status = "expired";
      await user.save();
    }

    next();

  } catch (err) {
    return res.status(500).json({ msg: "Server Error" });
  }
};

export default checkSubscription;