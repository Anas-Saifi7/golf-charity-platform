import User from "../models/User.js";
import Draw from "../models/Draw.js";
import Charity from "../models/Charity.js";

// 👤 Get All Users

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users || []);
  } catch (err) {
    console.log("USERS ERROR:", err);
    res.status(500).json({ msg: "Server Error" });
  }
};
// ❌ Delete User
export const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ msg: "User deleted" });
  } catch (err) {
    res.status(500).json(err);
  }
};

// 🎯 Get All Draws
export const getAllDraws = async (req, res) => {
  try {
    const draws = await Draw.find().sort({ date: -1 });
    res.json(draws);
  } catch (err) {
    res.status(500).json(err);
  }
};

// 🏆 Get Winners
export const getWinners = async (req, res) => {
  try {
    const draws = await Draw.find().sort({ createdAt: -1 }).limit(1);

    if (!draws.length) {
      return res.json([]);
    }

    res.json(draws[0].results || []);

  } catch (err) {
    console.log("WINNERS ERROR:", err);
    res.status(500).json({ msg: "Server Error" });
  }
};

// 📊 Dashboard Stats
export const getStats = async (req, res) => {
  try {
    const users = await User.countDocuments();
    const draws = await Draw.countDocuments();
    const charities = await Charity.countDocuments();

    const totalDonations = await Charity.aggregate([
      { $group: { _id: null, total: { $sum: "$totalDonations" } } }
    ]);

    res.json({
      users,
      draws,
      charities,
      totalDonations: totalDonations[0]?.total || 0
    });

  } catch (err) {
    console.log("STATS ERROR:", err);
    res.status(500).json({ msg: "Server Error" });
  }
};