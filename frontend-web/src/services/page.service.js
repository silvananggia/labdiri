import axios from "../api/axios";



const getPage = (id) => {
  return axios.get(`/getpage/${id}`);
};


const PageService = {
    getPage,

};

export default PageService;
