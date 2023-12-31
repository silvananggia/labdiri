import {
    GET_LABORATORIUM,
    GET_LABORATORIUM_ID,
    GET_LABORATORIUM_CAT,
    GET_LAB_LIST,
    GET_FILTER_LABORATORIUM,
  } from "./types";
  
  import LaboratoriumService from "../services/laboratorium.service";


  export const getLabList = () => async (dispatch) => {
    try {
      const res = await LaboratoriumService.getLabList();
  
      dispatch({
        type: GET_LAB_LIST,
        payload: res.data.data,
      });
    } catch (err) {
      console.log(err);
    }
  };

  
  export const getAllLaboratorium = (id,limit,page) => async (dispatch) => {
    try {
      const res = await LaboratoriumService.getLaboratoriumCat(id,limit,page);

      dispatch({
        type: GET_LABORATORIUM,
        payload: res.data.data,
      });
    } catch (err) {
      console.log(err);
    }
  };
  

  export const getLaboratoriumID = (id) => async (dispatch) => {
    try {
      const res = await LaboratoriumService.getLaboratorium(id);

      dispatch({
        type: GET_LABORATORIUM_ID,
        payload: res.data,
      });
    } catch (err) {
      console.log(err);
    }
  };
  

  export const getLaboratoriumCat = (id) => async (dispatch) => {
    try {
      const res = await LaboratoriumService.getLaboratoriumCat(id);
 
      dispatch({
        type: GET_LABORATORIUM_CAT,
        payload: res.data,
      });
    } catch (err) {
      console.log(err);
    }
  };

  export const getFilterLaboratorium = (nama,lokasi,limit,page) => async (dispatch) => {
    try {
      const res = await LaboratoriumService.filterLab(nama,lokasi,limit,page);
 
      dispatch({
        type: GET_FILTER_LABORATORIUM,
        payload: res.data.data,
      });
    } catch (err) {
      console.log(err);
    }
  };
  
  
  