import axios from "../api/axios";

const getLokasiList = () => {
  return axios.get("/getlistlokasi");
};

const getAlatAll = (id, limit, page) => {
  return axios.get(`/getallalat/${id}?limit=${limit}&page=${page}`);
};

const getAlat = (id) => {
  return axios.get(`/getalat/${id}`);
};

const filterAlat = (idlab, nama, lokasi,limit, page) => {
  return axios.get(`/filteralat?idlab=${idlab}&nama=${nama}&lokasi=${lokasi}&limit=${limit}&page=${page}`);
};

const AlatService = {
  getLokasiList,
  getAlatAll,
  getAlat,
  filterAlat,
};

export default AlatService;
