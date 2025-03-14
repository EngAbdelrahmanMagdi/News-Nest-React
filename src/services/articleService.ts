import api from "./api";
import { getExtractedToken } from "./utils/tokenUtils";
import log from "./utils/logger";

export const fetchArticles = async () => {
  try {
    const response = await api.get("/api/articles", {
      headers: {
        Authorization: `Bearer ${getExtractedToken()}`,
      },
    });
    return response.data;
  } catch (error: any) {
    log.error("Fetch Articles Error:", error.response?.data || error.message);
    throw error;
  }
};
