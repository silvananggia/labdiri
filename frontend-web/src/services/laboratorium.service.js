import axios from "../api/axios";

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
    getLaboratoriumAll,
    getLaboratorium,
    getLaboratoriumCat,
};

export default LaboratoriumService;
