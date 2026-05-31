import redisClient from "../config/redis.js";
import { CACHE_KEYS } from "../constants/cache.constants.js";
import {
  createProfile,
  findProfile,
  updateProfile,
} from "../repositories/profile.repository.js";
import AppError from "../utils/app-error.js";

export const getProfileService = async () => {
  const cached = await redisClient.get(CACHE_KEYS.PROFILE);

  if (cached) {
    return JSON.parse(cached);
  }

  const profile = await findProfile();

  if (!profile) {
    throw new AppError("Profile Not Found", 404);
  }

  await redisClient.set(CACHE_KEYS.PROFILE, JSON.stringify(profile), {
    EX: 300,
  });
  return profile;
};

export const saveProfile = async (payload) => {
  let profile = await findProfile();

  if (!profile) {
    profile = await createProfile(payload);
  } else {
    profile = await updateProfile(profile._id, payload);
  }

  await redisClient.del(CACHE_KEYS.PROFILE);
};
