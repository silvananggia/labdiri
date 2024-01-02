import axios from "../api/axios";
import authHeader from "./auth-header";

const getDashboard = () => {
  return axios.get("/getdashboard", { headers: authHeader() });
};


const PagesService = {
  getDashboard,
};

export default PagesService;
