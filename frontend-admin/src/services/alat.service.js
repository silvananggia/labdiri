import axios from "../api/axios";
import authHeader from "./auth-header";

const getAlatAll = (search,limit,page) => {
  return axios.get(`/peralatan?search=${search}&limit=${limit}&page=${page}`, { headers: authHeader() });
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
  const headers = {
    ...authHeader(),
    "Content-Type": "multipart/form-data",
  };
  return axios.post(`/alat/${id}`, data, { headers: headers });
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
