import { env } from "../config/env";
import redisClient from "../config/redis";

export const createSession = async (userId, sessionData) => {
  await redisClient.set(`session:${userId}`, JSON.stringify(sessionData), {
    expiration: env.refreshTokenExpiry,
  });
};

export const getSession = async (userId) => {
  const session = await redisClient.get(`session:${userId}`);
  return session ? JSON.parse(session) : null;
};

export const deleteSession = async (userId) => {
  await redisClient.del(`session:${userId}`);
};
