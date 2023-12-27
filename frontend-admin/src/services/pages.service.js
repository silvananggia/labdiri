import axios from "../api/axios";
import authHeader from "./auth-header";

const getPagesAll = () => {
  return axios.get("/pages", { headers: authHeader() });
};

const getPages = (id) => {
  return axios.get(`/pages/${id}`, { headers: authHeader() });
};

const createPages = (data) => {
  const headers = {
    ...authHeader(),
    "Content-Type": "multipart/form-data"
  };


  return axios.post("/pages", data, { headers: headers});
};

const updatePages = (id, data) => {

  return axios.put(`/pages/${id}`, data, { headers: authHeader() });
};

const deletePages = (id) => {
  return axios.delete(`/pages/${id}`, { headers: authHeader() });
};

const PagesService = {
    getPagesAll,
    getPages,
    createPages,
    updatePages,
    deletePages
};

export default PagesService;
