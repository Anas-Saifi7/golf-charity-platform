import Draw from "../models/Draw.js";
import User from "../models/User.js";
import Score from "../models/Score.js";

// 🎲 Generate Numbers
const generateNumbers = () => {
  let nums = new Set();

  while (nums.size < 5) {
    nums.add(Math.floor(Math.random() * 45) + 1);
  }

  return Array.from(nums);
};

// 🎯 Run Draw
export const runDraw = async (req, res) => {
  try {
    const numbers = generateNumbers();

    const users = await User.find({
      "subscription.status": "active"
    });

    console.log("Active Users:", users.length);

    if (users.length === 0) {
      return res.json({ msg: "No active users" });
    }

    const totalPool = users.length * 500;

    let winners = {
      5: [],
      4: [],
      3: []
    };

    for (let user of users) {
     const userScores = await Score.find({ userId: user._id });

let scores = userScores.map(s => s.value);

      let matchCount = scores.filter(n => numbers.includes(n)).length;

      if (matchCount >= 3 && winners[matchCount]) {
        winners[matchCount].push(user._id);
      }
    }

    let results = [];

 const distribute = (usersArr, percent, matchType) => {
  if (!usersArr || usersArr.length === 0) return [];

  let total = (percent / 100) * totalPool;
  let each = total / usersArr.length;

  return usersArr.map(u => ({
    userId: u,
    prize: each,
    match: matchType   // 🔥 IMPORTANT
  }));
};

results.push(...distribute(winners[5], 40, 5));
results.push(...distribute(winners[4], 35, 4));
results.push(...distribute(winners[3], 25, 3));

let jackpotCarry = 0;

if (winners[5].length === 0) {
  jackpotCarry = (40 / 100) * totalPool;
}

  const draw = await Draw.create({
  numbers,
  results,
  jackpotCarry,
  month: new Date().toLocaleString("default", { month: "long" }),
  status: "completed"
});

    res.json(draw);

  } catch (err) {
    console.log("DRAW ERROR:", err);
    res.status(500).json({ msg: "Draw failed", error: err.message });
  }
};

export const getDraws = async (req, res) => {
  try {
   const draws = await Draw.find()
  .populate("results.userId", "name email")
  .sort({ date: -1 })
  .limit(1);

res.json(draws[0]);
  } catch (err) {
    res.status(500).json(err);
  }
};

export const getUserWinnings = async (req, res) => {
  try {
    const userId = req.user.id;

    const draws = await Draw.find({
      "results.userId": userId
    });

    let winnings = [];

    draws.forEach(draw => {
      draw.results.forEach(r => {
        if (r.userId.toString() === userId) {
          winnings.push({
            amount: r.prize,
            match: r.match,
            date: draw.createdAt
          });
        }
      });
    });

    res.json(winnings);

  } catch (err) {
    res.status(500).json({ msg: "Server Error" });
  }
};