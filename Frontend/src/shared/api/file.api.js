import httpClient from "./httpClient";

export const listFilesApi = async () => {
  const response = await httpClient.get("/files");
  return response.data;
};

export const uploadFileApi = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  const response = await httpClient.post("/files/upload", formData);
  return response.data;
};

export const getFileApi = async (id) => {
  const response = await httpClient.get(`/files/${id}`);
  return response.data;
};

export const deleteFileApi = async (id) => {
  const response = await httpClient.delete(`/files/${id}`);
  return response.data;
};
