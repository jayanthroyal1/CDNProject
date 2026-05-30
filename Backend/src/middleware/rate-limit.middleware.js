import rateLimit from "express-rate-limit";

export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 50,
  standardHeaders: true,
  legacyHeaders: true,
  message: {
    success: false,
    message: "Too Many requestes. please try again later",
  },
});
