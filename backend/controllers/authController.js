import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// REGISTER
export const register = async (req, res) => {
  try {
    console.log("BODY:", req.body);

    const { name, email, password } = req.body;

    // ✅ ADD THIS
    if (!name || !email || !password) {
      return res.status(400).json({ msg: "All fields required" });
    }

    const exist = await User.findOne({ email });
    if (exist) return res.status(400).json({ msg: "User already exists" });

    const hashed = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashed
    });

    res.json({ msg: "Registered Successfully" });

  } catch (err) {
    console.log("REGISTER ERROR:", err);
    res.status(500).json({ error: err.message });
  }
};


export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 🔥 ADMIN LOGIN (HARDCODED)
    if (email === "anas.saifi4201@gmail.com" && password === "Anas@7668S") {
      const adminUser = {
        _id: "admin123",
        name: "Anas",
        email: "anas.saifi4201@gmail.com",
        role: "admin"
      };

      const token = jwt.sign(
  { id: adminUser._id },
  process.env.JWT_SECRET,
  { expiresIn: "7d" }
);

      return res.json({
        token,
        user: adminUser
      });
    }

    // 👤 NORMAL USER LOGIN
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Wrong password" });

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);

    res.json({
      token,
      user
    });

  } catch (err) {
  console.log("🔥 ERROR:", err);   // 👈 ye sabse important
  res.status(500).json({ error: err.message });
}
};

export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    res.json(user);

  } catch (err) {
    console.log("🔥 ERROR:", err);
    res.status(500).json({ error: err.message });
  }
};