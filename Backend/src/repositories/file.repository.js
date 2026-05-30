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
