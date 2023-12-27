import axios from "../api/axios";
import authHeader from "./auth-header";

const getLab = () => {
  return axios.get("/getlab", { headers: authHeader() });
};

const getLaboratoriumAll = () => {
  return axios.get("/laboratorium", { headers: authHeader() });
};

const getLaboratorium = (id) => {
  return axios.get(`/laboratorium/${id}`, { headers: authHeader() });
};

const createLaboratorium = (data) => {
  const headers = {
    ...authHeader(),
    "Content-Type": "multipart/form-data",
  };

  return axios.post("/laboratorium", data, { headers: headers });
};

const updateLaboratorium = (id, data) => {
  const headers = {
    ...authHeader(),
    "Content-Type": "multipart/form-data",
  };
  return axios.post(`/laboratorium/${id}`, data, { headers: headers });
};

const deleteLaboratorium = (id) => {
  return axios.delete(`/laboratorium/${id}`, { headers: authHeader() });
};

const LaboratoriumService = {
  getLab,
  getLaboratoriumAll,
  getLaboratorium,
  createLaboratorium,
  updateLaboratorium,
  deleteLaboratorium,
};

export default LaboratoriumService;