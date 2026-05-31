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

// export const getFilesController = asyncHandler(async (req, res) => {
//   const files = await fetchFilesService();
//   return successResponse(res, files, "Files Fetched");
// });

export const getFileController = asyncHandler(async (req, res) => {
  const file = await fetchFileService(req.params.id);
  return successResponse(res, file, "File Fetched");
});

export const getFilesController = asyncHandler(async (req, res) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const type = req.query.type;
  const result = await fetchFilesService(page, limit, type);

  return successResponse(
    res,
    {
      files: result.files,

      pagination: {
        page,
        limit,
        total: result.total,
      },
    },
    "Files fetched",
  );
});
