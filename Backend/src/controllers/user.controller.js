import { successResponse } from "../utils/api-response.js";
import { asyncHandler } from "../utils/async-handler.js";

export const getMe = asyncHandler(async (req, res) => {
  return successResponse(res, req.user, "User-Profile");
});
