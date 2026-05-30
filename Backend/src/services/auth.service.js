import bcrypt from "bcryptjs";
import {
  createUser,
  findUserByEmail,
} from "../repositories/user.repository.js";
import AppError from "../utils/app-error.js";
import { generateAccessToken } from "../utils/jwtToken.js";

export const registerUserService = async (payload) => {
  const exisitingUser = await findUserByEmail(payload.email);

  if (exisitingUser) {
    throw new AppError("Email already exist", 409);
  }
  const hasedPassword = await bcrypt.hash(payload.password, 12);

  const user = await createUser({ ...payload, password: hasedPassword });

  return {
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
  };
};

export const loginUserService = async (payload) => {
  if (!payload.email || !payload.password) {
    throw new AppError("Email and password are required", 400);
  }
  const checkUser = await findUserByEmail(payload.email);

  if (!checkUser) {
    throw new AppError("Invalid Email", 401);
  }

  const isPasswordValid = await bcrypt.compare(
    payload.password,
    checkUser.password,
  );

  if (!isPasswordValid) {
    throw new AppError("Invalid Password", 401);
  }

  const accessToken = generateAccessToken({
    userId: checkUser._id,
    role: checkUser.role,
  });

  console.log("Access Token", accessToken);

  return {
    accessToken,
    user: {
      id: checkUser._id,
      name: checkUser.name,
      email: checkUser.email,
      role: checkUser.role,
    },
  };
};
