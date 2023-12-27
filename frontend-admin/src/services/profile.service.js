import axios from "../api/axios";
import authHeader from "./auth-header";

const getProfileAll = () => {
  return axios.get("/profile", { headers: authHeader() });
};

const getProfile = (id) => {
  return axios.get(`/profile/${id}`, { headers: authHeader() });
};

const createProfile = (data) => {
  const headers = {
    ...authHeader(),
    "Content-Type": "multipart/form-data"
  };


  return axios.post("/profile", data, { headers: headers});
};

const updateProfile = (id, data) => {

  return axios.put(`/profile/${id}`, data, { headers: authHeader() });
};

const deleteProfile = (id) => {
  return axios.delete(`/profile/${id}`, { headers: authHeader() });
};

const ProfileService = {
    getProfileAll,
    getProfile,
    createProfile,
    updateProfile,
    deleteProfile
};

export default ProfileService;
