import { getProfileService, saveProfile } from "../services/profile.service.js";
import { successResponse } from "../utils/api-response.js";
import { asyncHandler } from "../utils/async-handler.js";

export const getProfileController = asyncHandler(async (req, res, next) => {
  const profile = await getProfileService();

  return successResponse(res, profile, "Profile Fetched");
});

export const updateProfileController = asyncHandler(async (req, res) => {
  const profile = await saveProfile(req.body);
  return successResponse(res, profile, "Profile Saved");
});
