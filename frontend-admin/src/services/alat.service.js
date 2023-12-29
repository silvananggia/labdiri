import axios from "../api/axios";
import authHeader from "./auth-header";

const getAlatAll = () => {
  return axios.get("/peralatan", { headers: authHeader() });
};

const getAlatLab = (id) => {
  return axios.get(`/alatlab/${id}`, { headers: authHeader() });
};


const getAlat = (id) => {
  return axios.get(`/peralatan/${id}`, { headers: authHeader() });
};

const createAlat = (data) => {

  const headers = {
    ...authHeader(),
    "Content-Type": "multipart/form-data"
  };

  return axios.post("/alat", data, { headers:  headers });
};

const updateAlat = (id, data) => {

  return axios.put(`/alat/${id}`, data, { headers: authHeader() });
};

const deleteAlat = (id) => {
  return axios.delete(`/alat/${id}`, { headers: authHeader() });
};

const AlatService = {
    getAlatAll,
    getAlatLab,
    getAlat,
    createAlat,
    updateAlat,
    deleteAlat
};

export default AlatService;
