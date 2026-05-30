import jwt from "jsonwebtoken";
import { env } from "../config/env.js";

export const generateAccessToken = (payload) => {
  console.log("Near Generate Token", payload);
  return jwt.sign(payload, env.jwtSecret, { expiresIn: "15m" });
};

export const generateRefreshToken = (payload) => {
  return jwt.sign(payload, env.jwtRefreshSecret, { expiresIn: "7d" });
};

export const verifyAccessToken = (token) => {
  return jwt.verify(token, env.jwtSecret);
};

export const verifyRefreshToken = (token) => {
  return jwt.verify(token, env.jwtRefreshSecret);
};
