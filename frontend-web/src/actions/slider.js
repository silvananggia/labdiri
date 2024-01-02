import {
    GET_SLIDER,
  } from "./types";
  
  import SliderService from "../services/slider.service";


  export const getSlider = () => async (dispatch) => {
    try {
      const res = await SliderService.getSlider();

      dispatch({
        type: GET_SLIDER,
        payload: res.data,
      });
    } catch (err) {
      console.log(err);
    }
  };
  
  
  