import jwt from "jsonwebtoken";
import { User } from "../models/user-models.js";

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.header("Authorization") || req.header("authorization");
    if (!token) {
      return res.status(401).json({ message: "Unauthorized: Token not provided" });
    }

   
    const jwtToken = token.replace(/^Bearer\s+/i, "").trim();

    // Verify token
    const isVerified = jwt.verify(jwtToken, process.env.SECRET_KEY);

    // Find user
    const userData = await User.findOne({ email: isVerified.email }).select({
        password:0
    });
    if (!userData) {
      return res.status(404).json({ message: "User not found" });
    }


    req.user = userData;
    req.token=token;
    req.userID=userData._id;

    next();
  } catch (error) {
    console.error("Auth error:", error);
    return res.status(401).json({ message: "Unauthorized: Invalid or expired token" });
  }
};

export { authMiddleware };
