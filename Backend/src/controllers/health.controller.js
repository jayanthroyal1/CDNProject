import mongoose from "mongoose";
import redisClient from "../config/redis.js";

export const healthCheck = async (req, res) => {
  return res.status(200).json({
    success: true,
    uptime: process.uptime(),
    mongo: mongoose.connection.readyState === 1 ? "connected" : "disconnected",
    redis: redisClient.isReady ? "Connected" : "Disconnected",
    requestId: req.requestId,
  });
};
