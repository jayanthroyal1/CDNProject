import {
  fetchFileService,
  fetchFilesService,
  saveFileService,
} from "../services/file.service.js";
import { successResponse } from "../utils/api-response.js";
import { asyncHandler } from "../utils/async-handler.js";

export const uploadFileController = asyncHandler(async (req, res) => {
  const result = await saveFileService(req.file, req.user.userId);
  return successResponse(res, result, "File Uploaded", 201);
});

export const getFilesController = asyncHandler(async (req, res) => {
  const files = await fetchFilesService();
  return successResponse(res, files, "Files Fetched");
});

export const getFileContriller = asyncHandler(async (req, res) => {
  const file = await fetchFileService();
  return successResponse(res, file, "File Fetched");
});
