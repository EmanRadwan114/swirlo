import axios from "axios";
import api from "../utils/apiUrl";
export const register = async (userData) => {
  try {
    const response = await api.post("/auth/register", {
      name: userData.name,
      email: userData.email,
      password: userData.password,
      role: userData.role || "user", // Fallback to "user" if not provided
    });
    return response.data;
  } catch (error) {
    // Rethrow the error to be caught in the component
    throw error;
  }
};
export const login = async (credentials) => {
  const res = await api.post("/auth/login");
  return res.data;
};

export const logout = async () => {
  const res = await api.post("/auth/logout");
  return res.data;
};

export const activateEmail = async (token) => {
  const response = await api.get(`/auth/activate/${token}`);
  return response.data;
};

export const getCurrentUser = async () => {
  const res = await api.get("/users/me");
  return res.data;
};
  