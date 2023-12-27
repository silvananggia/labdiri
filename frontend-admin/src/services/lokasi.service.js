import axios from "../api/axios";
import authHeader from "./auth-header";

const getLokasiAll = () => {
  return axios.get("/getlokasi", { headers: authHeader() });
};

const getLokasi = (id) => {
  return axios.get(`/lokasi/${id}`, { headers: authHeader() });
};

const createLokasi = (data) => {

  return axios.post("/lokasi", data, { headers: authHeader() });
};

const updateLokasi = (id, data) => {

  return axios.put(`/lokasi/${id}`, data, { headers: authHeader() });
};

const deleteLokasi = (id) => {
  return axios.delete(`/lokasi/${id}`, { headers: authHeader() });
};

const LokasiService = {
    getLokasiAll,
    getLokasi,
    createLokasi,
    updateLokasi,
    deleteLokasi
};

export default LokasiService;
