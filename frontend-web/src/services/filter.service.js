import axios from "../api/axios";

const getLokasiList = () => {
  return axios.get("/getlistlokasi");
};


const FilterService = {
  getLokasiList,

};

export default FilterService;
