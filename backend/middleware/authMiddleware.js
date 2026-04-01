import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
 
  const header = req.headers.authorization;
 
  if (!header) {
    return res.status(401).json({ msg: "No token" });
  }

  const token = header.split(" ")[1]; // ✅ Bearer fix

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: decoded.id };
    console.log("DECODED:", decoded);
    next();
  } catch {
    res.status(401).json({ msg: "Invalid token" });
  }
};
