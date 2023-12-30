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

const getLaboratoriumCat = (id) => {
  return axios.get(`/getlaboratorium/${id}`);
};

const LaboratoriumService = {

    getLabList,
    getLaboratoriumAll,
    getLaboratorium,
    getLaboratoriumCat,
};

export default LaboratoriumService;
