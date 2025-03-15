import api from "./api";
import { getExtractedToken } from "./utils/tokenUtils";
import log from "./utils/logger";
import { UserPreferences } from "../types/types";

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

export const fetchCategories = async () => {
  const response = await api.get("/api/categories");
  return response.data;
};

export const fetchSources = async () => {
  const response = await api.get("/api/sources");
  return response.data;
};

export const fetchAuthors = async () => {
  const response = await api.get("/api/authors");
  return response.data;
};

export const saveUserPreferences = async (preferences: UserPreferences) => {
  const response = await api.post("/api/user/preferences", preferences, {
    headers: {
      Authorization: `Bearer ${getExtractedToken()}`,
    },
  });
  return response.data;
};
