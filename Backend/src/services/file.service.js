import {
  createFile,
  getFileById,
  getFiles,
  getFilesPaginated,
  updateFileMetadata,
} from "../repositories/file.repository.js";

import { processFile } from "../processors/processor.factory.js";

export const saveFileService = async (file, userId) => {
  let fileType = "report";

  if (file.mimetype.startsWith("image")) {
    fileType = "image";
  } else if (file.mimetype === "application/pdf") {
    fileType = "pdf";
  } else if (file.mimetype.startsWith("video")) {
    fileType = "video";
  }

  // Save metadata record first
  const savedFile = await createFile({
    originalName: file.originalname,
    fileName: file.filename,
    mimeType: file.mimetype,
    fileType,
    size: file.size,
    storagePath: file.path,
    uploadedBy: userId,
  });

  // Extract metadata based on file type
  const metadata = await processFile(fileType, file.path, file.mimetype);

  // Update Mongo document with extracted metadata
  const updatedFile = await updateFileMetadata(savedFile._id, metadata);

  return updatedFile;
};

// export const fetchFilesService = getFiles;

export const fetchFileService = getFileById;

export const fetchFilesService = async (page, limit, type, user) => {
  return getFilesPaginated(page, limit, type, user);
};

export const deleteFileService = async (id, user) => {
  const file = await getFileById(id);
  if (!file) {
    throw Object.assign(new Error("File not found"), { statusCode: 404 });
  }

  // Admin can delete any, normal user can only delete their own
  if (user.role !== "admin" && file.uploadedBy.toString() !== user.userId.toString()) {
    throw Object.assign(new Error("Unauthorized to delete this file"), { statusCode: 403 });
  }

  // Delete from filesystem
  const fs = await import("fs");
  if (fs.existsSync(file.storagePath)) {
    fs.unlinkSync(file.storagePath);
  }

  // Delete from DB
  await import("../repositories/file.repository.js").then(repo => repo.deleteFileById(id));
  return true;
};
