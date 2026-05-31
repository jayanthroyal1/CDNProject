import File from "../models/file.model.js";

export const createFile = async (payload) => File.create(payload);

export const getFiles = async () =>
  File.find().sort({
    createdAt: -1,
  });

export const getFileById = async (id) => File.findById(id);

export const updateFileMetadata = async (id, metadata) => {
  return File.findByIdAndUpdate(id, { metadata }, { new: true });
};

export const deleteFileById = async (id) => {
  return File.findByIdAndDelete(id);
};

export const getFilesPaginated = async (page, limit, type, user) => {
  const query = {};

  if (type) {
    query.fileType = type;
  }

  // Admin users see all files. Regular users only see their own files.
  if (user && user.role !== "admin") {
    query.uploadedBy = user.userId;
  }

  const total = await File.countDocuments(query);

  const files = await File.find(query)
    .skip((page - 1) * limit)
    .limit(limit)
    .sort({
      createdAt: -1,
    });

  return {
    files,
    total,
  };
};
