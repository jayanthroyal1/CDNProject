import {
  createFile,
  getFileById,
  getFiles,
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

export const fetchFilesService = getFiles;

export const fetchFileService = getFileById;
