import axios from "../api/axios";

const getAlatAll = (id,limit,page) => {
  return axios.get(`/getallalat/${id}?limit=${limit}&page=${page}`);
};

const getAlat = (id) => {
  return axios.get(`/getalat/${id}`);
};


const AlatService = {
    getAlatAll,
    getAlat,

};

export default AlatService;
