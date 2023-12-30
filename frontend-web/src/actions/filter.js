import {
    GET_LOKASI_LIST,
  } from "./types";
  
  import FilterService from "../services/filter.service";


  export const getLokasiList = () => async (dispatch) => {
    try {
      const res = await FilterService.getLokasiList();
  
      dispatch({
        type: GET_LOKASI_LIST,
        payload: res.data.data,
      });
    } catch (err) {
      console.log(err);
    }
  };
  
  
  
  