import httpClient from "./httpClient";

export const getChartDataApi = async (id) => {
  const response = await httpClient.get(`/reports/${id}/chart`);
  return response.data;
};
