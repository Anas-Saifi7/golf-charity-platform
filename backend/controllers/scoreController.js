import User from "../models/User.js";
import Score from "../models/Score.js";
// ADD SCORE

export const addScore = async (req, res) => {
  try {
    const { value } = req.body;
    const userId = req.user.id;

    if (!value) {
      return res.status(400).json({ msg: "Score required" });
    }

    // 🔥 Save in Score collection
    await Score.create({
      userId,
      value,
      date: new Date()
    });

    // 🔥 Keep only last 5 scores
    const scores = await Score.find({ userId }).sort({ date: -1 });

    if (scores.length > 5) {
      const extra = scores.slice(5);
      for (let s of extra) {
        await Score.findByIdAndDelete(s._id);
      }
    }

    const updatedScores = await Score.find({ userId }).sort({ date: -1 });

    res.json({
      msg: "Score added",
      scores: updatedScores
    });

  } catch (err) {
    console.log("SCORE ERROR:", err.message);
    res.status(500).json({ msg: "Failed to add score" });
  }
};

export const getScores = async (req, res) => {
  try {
    const userId = req.user.id;

    const scores = await Score.find({ userId }).sort({ date: -1 });

    res.json(scores);

  } catch (err) {
    console.log("GET SCORE ERROR:", err.message);
    res.status(500).json({ msg: "Failed to fetch scores" });
  }
};