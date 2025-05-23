import api from "../utils/apiUrl";

// Sign Up
export const register = async (userData) => {
  try {
    const response = await api.post("/auth/register", {
      name: userData.name,
      email: userData.email,
      password: userData.password,
      role: userData.role || "user",
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Login
export const login = async (userData) => {
  const response = await api.post("/auth/login", userData);
  return response.data;
};


// Logout
export const logout = async () => {
  try {
    const res = await api.post("/auth/logout");
    return res.data;
  } catch (error) {
    throw error;
  }
};

// Get Current User
export const getCurrentUser = async () => {
  const res = await api.get("/users/me");
  return res.data;
};
