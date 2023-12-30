import {
    GET_ALAT,
    GET_ALAT_ID,
    GET_FILTER_ALAT,
  } from "./types";
  
  import AlatService from "../services/alat.service";


  
  export const getAllAlat = (id,limit,page) => async (dispatch) => {
    try {
      const res = await AlatService.getAlatAll(id,limit,page);

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

  export const getFilterAlat = (idlab,nama,lokasi,limit,page) => async (dispatch) => {
    try {
      const res = await AlatService.filterAlat(idlab,nama,lokasi,limit,page);
  
      dispatch({
        type: GET_FILTER_ALAT,
        payload: res.data.data,
      });
    } catch (err) {
      console.log(err);
    }
  };
  
  
  