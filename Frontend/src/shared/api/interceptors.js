// Attach JWT
// Refresh Token

import httpClient from "./httpClient";

// Retry Failed Requests
let accessToken = null;

export const setToken = (token) => {
  accessToken = token;
};

httpClient.interceptors.request.use((config) => {
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});
