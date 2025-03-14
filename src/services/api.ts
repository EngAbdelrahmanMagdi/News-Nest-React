import axios from "axios";
import { API_BASE_URL } from "../config/config";

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  withXSRFToken: true,
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json",
  },
});

export default api;
