import axios from "../api/axios";

const getLabList = () => {
  return axios.get("/getlistlab");
};



const getLaboratoriumAll = () => {
  return axios.get("/getlab");
};

const getLaboratorium = (id) => {
  return axios.get(`/getlab/${id}`);
};

const getLaboratoriumCat = (id, limit, page) => {
  return axios.get(`/getlaboratorium/${id}?limit=${limit}&page=${page}`);
};

const filterLab = (nama, lokasi,limit, page) => {
  return axios.get(`/filterlab?nama=${nama}&lokasi=${lokasi}&limit=${limit}&page=${page}`);
};

const LaboratoriumService = {

    getLabList,
    getLaboratoriumAll,
    getLaboratorium,
    getLaboratoriumCat,
    filterLab,
};

export default LaboratoriumService;
