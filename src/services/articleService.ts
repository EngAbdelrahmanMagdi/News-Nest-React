import api from "./api";
import { getExtractedToken } from "./utils/tokenUtils";
import log from "./utils/logger";
import { UserPreferences } from "../types/types";

/**
 * Fetch articles.
 */
export const fetchArticles = async () => {
  try {
    const response = await api.get("/api/articles");
    return response.data;
  } catch (error: any) {
    log.error("Fetch Articles Error:", error.response?.data || error.message);
    throw error;
  }
};

/**
 * Fetch categories.
 */
export const fetchCategories = async () => {
  try {
    const response = await api.get("/api/categories");
    return response.data;
  } catch (error: any) {
    log.error("Fetch Categories Error:", error);
    throw error;
  }
};

/**
 * Fetch sources.
 */
export const fetchSources = async () => {
  try {
    const response = await api.get("/api/sources");
    return response.data;
  } catch (error: any) {
    log.error("Fetch Sources Error:", error);
    throw error;
  }
};

/**
 * Fetch authors.
 */
export const fetchAuthors = async () => {
  try {
    const response = await api.get("/api/authors");
    return response.data;
  } catch (error: any) {
    log.error("Fetch Authors Error:", error);
    throw error;
  }
};

/**
 * Save user preferences.
 */
export const saveUserPreferences = async (preferences: UserPreferences) => {
  try {
    const response = await api.post("/api/user/preferences", preferences);
    return response.data;
  } catch (error: any) {
    log.error("Save Preferences Error:", error);
    throw error;
  }
};
