import axios from "../api/axios";

const getKategoriAll = () => {
  return axios.get("/getkategorilab");
};

const getKategori = (id) => {
  return axios.get(`/getkategorilab/${id}`);
};


const kategoriService = {
    getKategoriAll,
    getKategori,
};

export default kategoriService;
