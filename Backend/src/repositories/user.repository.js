import User from "../models/user.model.js";

export const createUser = async (payload) => {
  const newUser = await User.create(payload);
  return newUser;
};

export const findUserByEmail = async (email) => {
  const user = await User.findOne({ email }).select("+password");
  return user;
};

export const findUserById = async (userId) => {
  const searcheduser = await User.findById(userId);
  return searcheduser;
};

export const updateUser = async (userId, payload) => {
  return await User.findByIdAndUpdate(userId, payload, {
    new: true,
    runValidators: true,
  });
};
