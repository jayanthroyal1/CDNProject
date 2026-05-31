import { env } from "../config/env.js";
import redisClient from "../config/redis.js";

const parseExpiryToSeconds = (expiry) => {
  if (typeof expiry === "number") return expiry;
  if (typeof expiry !== "string") return 86400 * 7; // default 7 days

  const match = expiry.match(/^(\d+)([smhd])$/);
  if (!match) return parseInt(expiry, 10) || 86400 * 7;

  const value = parseInt(match[1], 10);
  const unit = match[2];

  switch (unit) {
    case "s": return value;
    case "m": return value * 60;
    case "h": return value * 3600;
    case "d": return value * 86400;
    default: return value;
  }
};

export const createSession = async (userId, sessionData) => {
  const seconds = parseExpiryToSeconds(env.refreshTokenExpiry);
  await redisClient.set(`session:${userId}`, JSON.stringify(sessionData), {
    EX: seconds,
  });
};

export const getSession = async (userId) => {
  const session = await redisClient.get(`session:${userId}`);
  return session ? JSON.parse(session) : null;
};

export const deleteSession = async (userId) => {
  await redisClient.del(`session:${userId}`);
};
