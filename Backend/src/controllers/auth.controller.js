import { env } from "../config/env.js";
import {
  loginUserService,
  logoutUserService,
  refreshUserTokenService,
  registerUserService,
} from "../services/auth.service.js";
import { successResponse } from "../utils/api-response.js";
import { asyncHandler } from "../utils/async-handler.js";
import AppError from "../utils/app-error.js";

export const register = asyncHandler(async (req, res) => {
  const result = await registerUserService(req.body);
  return successResponse(res, result, "User Registered", 201);
});

export const login = asyncHandler(async (req, res) => {
  const result = await loginUserService(req.body);
  res.cookie("refreshToken", result.refreshToken, {
    httpOnly: true,
    secure: env.nodeEnv === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
  delete result.refreshToken;
  return successResponse(res, result, "Login Successfully");
});

export const refreshToken = asyncHandler(async (req, res) => {
  const token = req.cookies.refreshToken;

  if (!token) {
    throw new AppError("Refresh token missing", 401);
  }
  const accessToken = await refreshUserTokenService(token);

  return successResponse(res, { accessToken }, "Token Refreshed");
});

export const logout = asyncHandler(async (req, res) => {
  await logoutUserService(req.user.userId);
  res.clearCookie("refreshToken");
  return successResponse(res, null, "logged out");
});
