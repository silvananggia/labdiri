import axios from "../api/axios";



const getSlider= () => {
  return axios.get(`/getslider`);
};


const SliderService = {
  getSlider,

};

export default SliderService;
