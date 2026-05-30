import {
  loginUserService,
  registerUserService,
} from "../services/auth.service.js";
import { successResponse } from "../utils/api-response.js";
import { asyncHandler } from "../utils/async-handler.js";

export const register = asyncHandler(async (req, res) => {
  const result = await registerUserService(req.body);
  return successResponse(res, result, "User Registred", 201);
});

export const login = asyncHandler(async (req, res) => {
  const result = await loginUserService(req.body);
  return successResponse(res, result, "Login Successfully");
});
