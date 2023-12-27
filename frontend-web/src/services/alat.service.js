import axios from "../api/axios";

const getAlatAll = (id) => {
  return axios.get(`/getallalat/${id}`);
};

const getAlat = (id) => {
  return axios.get(`/getalat/${id}`);
};


const AlatService = {
    getAlatAll,
    getAlat,

};

export default AlatService;
