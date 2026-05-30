import Profile from "../models/profile.model.js";

export const createProfile = async (payload) => {
  return await Profile.create(payload);
};

export const findProfile = async () => {
  return await Profile.findOne();
};

export const updateProfile = async (profileId, payload) => {
  return Profile.findByIdAndUpdate(profileId, payload, {
    new: true,
  });
};
