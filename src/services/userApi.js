//just a js file for storing api methods related to user

import api from "../utils/apiUrl";

const fetchProfileData = async () => {
  const res = await api.get(`/users/me`);
  return res.data;
};

const fetchUserOrders = async (page = 1, limit = 3) => {
  const res = await api.get(`/orders/me?page=${page}&limit=${limit}`);
  return res.data;
};

const changeUserData = async (data) => {
  const res = await api.put(`/users/me`, data);
  return res.data;
};

const logout = async (data) => {
  const res = await api.post(`/auth/logout`, data);
  return res.data;
};

const userServices = {
  fetchProfileData,
  fetchUserOrders,
  changeUserData,
  logout,
};

export default userServices;
