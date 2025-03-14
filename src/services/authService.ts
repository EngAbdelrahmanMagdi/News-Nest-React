import api from "./api";
import log from "./utils/logger";
import { getExtractedToken } from "./utils/tokenUtils";
import { AuthResponse } from "./utils/authResponse";

/**
 * Register a new user.
 */
export const register = async (name: string, email: string, password: string) => {

  try {
    const response = await api.post<AuthResponse>("/api/register", { name, email, password });
    localStorage.setItem("token", response.data.token);
    return response.data;
  } catch (error: any) {
    log.error("Register Error:", error.response?.data || error.message);
    throw error;
  }
};

/**
 * Log in a user.
 */
export const login = async (email: string, password: string) => {
  try {
    const response = await api.post<AuthResponse>("/api/login", { email, password });
    localStorage.setItem("token", response.data.token);
    return response.data;
  } catch (error: any) {
    log.error("Login Error:", error.response?.data || error.message);
    throw error;
  }
};

/**
 * Request password reset email.
 */
export const forgotPassword = async (email: string) => {
  try {
    const response = await api.post("/api/forgot-password", { email });
    return response.data;
  } catch (error: any) {
    log.error("Forgot Password Error:", error.response?.data || error.message);
    throw error;
  }
};

/**
 * Reset password with token.
 */
export const resetPassword = async (email: string, token: string, password: string, confirmPassword: string) => {
  try {
    const response = await api.post("/api/reset-password", {
      email,
      token,
      password,
      password_confirmation: confirmPassword,
    });
    return response.data;
  } catch (error: any) {
    log.error("Reset Password Error:", error.response?.data || error.message);
    throw error;
  }
};

/**
 * Change Password.
 */
export const changePassword = async (oldPassword: string, newPassword: string, confirmPassword: string) => {

  try {

    return api.post("/api/change-password", { 
      old_password: oldPassword, 
      new_password: newPassword, 
      confirm_password: confirmPassword 
    }, {
      headers: {
        Authorization: `Bearer ${getExtractedToken()}`,
      },
    });
  } catch (error: any) {
    log.error("Login Error:", error.response?.data || error.message);
    throw error;
  }
};


/**
 * Log out a user.
 */
export const logout = async () => {

  try {
    await api.post("/api/logout", {}, {
      headers: {
        Authorization: `Bearer ${getExtractedToken()}`,
      },
    });
    localStorage.removeItem("token");
  } catch (error: any) {
    log.error("Logout Error:", error.response?.data || error.message);
    throw error;
  }
};

/**
 * Fetch the authenticated user.
 */
export const getUser = async () => {
  try {
    const response = await api.get("/api/user", {
      headers: {
        Authorization: `Bearer ${getExtractedToken()}`,
      },
    });
    log.info("User Info:", response.data);
    return response.data;
  } catch (error: any) {
    log.error("Fetch User Error:", error.response?.data || error.message);
    throw error;
  }
};
