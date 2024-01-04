import axios from "../api/axios";
import authHeader from "./auth-header";

const getUserAll = () => {
  return axios.get("/user", { headers: authHeader() });
};

const getUser = (id) => {
  return axios.get(`/user/${id}`, { headers: authHeader() });
};

const createUser = (data) => {
  const headers = {
    ...authHeader(),
    "Content-Type": "multipart/form-data"
  };


  return axios.post("/user", data, { headers: headers});
};

const updateUser = (id, data) => {

  return axios.put(`/user/${id}`, data, { headers: authHeader() });
};

const deleteUser = (id) => {
  return axios.delete(`/user/${id}`, { headers: authHeader() });
};

const getRoles = () => {
  return axios.get("/roles", { headers: authHeader() });
};

const UserService = {
    getUserAll,
    getUser,
    createUser,
    updateUser,
    deleteUser,
    getRoles
};

export default UserService;
