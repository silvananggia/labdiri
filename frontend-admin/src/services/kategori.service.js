import axios from "../api/axios";
import authHeader from "./auth-header";

const getKategoriAll = () => {
  return axios.get("/getkategorilab", { headers: authHeader() });
};

const getKategori = (id) => {
  return axios.get(`/kategorilab/${id}`, { headers: authHeader() });
};

const createKategori = (data) => {

  return axios.post("/kategorilab", data, { headers: authHeader() });
};

const updateKategori = (id, data) => {
  return axios.put(`/kategorilab/${id}`, data, { headers: authHeader() });
};

const deleteKategori = (id) => {
  return axios.delete(`/kategorilab/${id}`, { headers: authHeader() });
};

const kategoriService = {
    getKategoriAll,
    getKategori,
    createKategori,
    updateKategori,
    deleteKategori
};

export default kategoriService;
