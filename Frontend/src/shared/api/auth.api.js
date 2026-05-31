import httpClient from "./httpClient";

export const loginApi = async (payload) => {
  const response = await httpClient.post("/auth/login", payload);
  return response.data;
};

export const registerApi = async (payload) => {
  const response = await httpClient.post("/auth/register", payload);
  return response.data;
};

export const logoutApi = async () => {
  const response = await httpClient.post("/auth/logout");

  return response.data;
};

export const refreshApi = async () => {
  const response = await httpClient.post("/auth/refresh");

  return response.data;
};

export const getCurrentUserApi = async () => {
  const response = await httpClient.get("/users/me");

  return response.data;
};
