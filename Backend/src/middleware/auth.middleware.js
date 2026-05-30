import { findUserById } from "../repositories/user.repository.js";
import AppError from "../utils/app-error.js";
import { verifyAccessToken } from "../utils/jwtToken.js";

export const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return next(new AppError("Authentication Required", 401));
    }
    const token = authHeader.split(" ")[1];
    const decoded = verifyAccessToken(token);
    const user = await findUserById(decoded.userId);

    if (!user || !user.isActive) {
      return next(new AppError("User Disabled", 401));
    }
    req.user = {
      userId: user.userId,
      role: user.role,
      email: user.email,
    };
    next();
  } catch (err) {
    next(new AppError("Invalid or expire token", 401));
  }
};
