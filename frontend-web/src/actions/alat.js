import {
    GET_ALAT,
    GET_ALAT_ID,
  } from "./types";
  
  import AlatService from "../services/alat.service";


  
  export const getAllAlat = (id) => async (dispatch) => {
    try {
      const res = await AlatService.getAlatAll(id);

      dispatch({
        type: GET_ALAT,
        payload: res.data.data,
      });
    } catch (err) {
      console.log(err);
    }
  };
  

  export const getAlatID = (id) => async (dispatch) => {
    try {
      const res = await AlatService.getAlat(id);
  
      dispatch({
        type: GET_ALAT_ID,
        payload: res.data,
      });
    } catch (err) {
      console.log(err);
    }
  };
  
  
  