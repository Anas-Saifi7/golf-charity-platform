import Charity from "../models/Charity.js";
import User from "../models/User.js";

// ➕ Add Charity
export const addCharity = async (req, res) => {
  try {
    const charity = await Charity.create(req.body);
    res.json(charity);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// 📋 Get All Charities
export const getCharities = async (req, res) => {
  try {
    const charities = await Charity.find();
    res.json(charities);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// ❤️ Select Charity
export const selectCharity = async (req, res) => {
  try {
    const { charityId, percentage } = req.body;

    if (!req.user) {
      return res.status(401).json({ msg: "Unauthorized ❌" });
    }

    if (!charityId) {
      return res.status(400).json({ msg: "No charity selected ❌" });
    }

    if (percentage < 10 || percentage > 50) {
      return res.status(400).json({ msg: "Invalid percentage ❌" });
    }

    const charity = await Charity.findById(charityId);

    if (!charity) {
      return res.status(404).json({ msg: "Charity not found ❌" });
    }

    const user = await User.findById(req.user.id);

    // ✅ IMPORTANT FIX
    user.charity = {
      _id: charity._id.toString(),
      name: charity.name,
      percentage
    };

    await user.save();

    res.json({
      msg: "Charity selected ✅",
      charity: user.charity
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: err.message });
  }
};