import httpClient from "./httpClient";

export const sendContactApi = async (payload) => {
  const response = await httpClient.post("/contact", payload);
  return response.data;
};
