import axios from "../api/axios";
import authHeader from "./auth-header";

const getDashboard = () => {
  return axios.get("/getdashboard", { headers: authHeader() });
};

const getStatAlat = () => {
  return axios.get("/getstatalat", { headers: authHeader() });
};

const getStatLabLokasi = () => {
  return axios.get("/getstatlablokasi", { headers: authHeader() });
};

const getStatAlatLokasi = () => {
  return axios.get("/getstatalatlokasi", { headers: authHeader() });
};


const PagesService = {
  getDashboard,
  getStatAlat,
  getStatLabLokasi,
  getStatAlatLokasi,

};

export default PagesService;
