import bcrypt from "bcryptjs";
import {
  createUser,
  findUserByEmail,
} from "../repositories/user.repository.js";
import AppError from "../utils/app-error.js";
import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} from "../utils/jwtToken.js";
import { createSession, deleteSession, getSession } from "./session.service.js";

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

  const newPayload = {
    userId: checkUser._id,
    role: checkUser.role,
  };

  const accessToken = generateAccessToken(newPayload);

  const refreshToken = generateRefreshToken(newPayload);

  await createSession(checkUser._id.toString(), {
    userId: checkUser._id.toString(),
    email: checkUser.email,
    role: checkUser.role,
  });

  return {
    accessToken,
    refreshToken,
    user: {
      id: checkUser._id,
      name: checkUser.name,
      email: checkUser.email,
      role: checkUser.role,
    },
  };
};

export const refreshUserTokenService = async (refreshToken) => {
  const decoded = verifyRefreshToken(refreshToken);
  const session = await getSession(decoded.userId);

  if (!session) {
    throw new AppError("Session Expired", 401);
  }

  return generateAccessToken({
    userId: decoded.userId,
    role: decoded.role,
  });
};

export const logoutUserService = async (userId) => {
  await deleteSession(userId);
  return true;
};
