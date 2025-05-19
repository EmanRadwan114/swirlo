import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // access api url from .env file
  withCredentials: true, // important for http only cookie auth
});

//?example to use in any service file
//* export const fetchUsers = async () => {
// ? / users is the api endpoint
// *  const res = await api.get("/users");
//  * return res.data;
// *};

export default api;
