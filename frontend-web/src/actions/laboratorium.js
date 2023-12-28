import {
    GET_LABORATORIUM,
    GET_LABORATORIUM_ID,
    GET_LABORATORIUM_CAT,
  } from "./types";
  
  import LaboratoriumService from "../services/laboratorium.service";


  
  export const getAllLaboratorium = (id) => async (dispatch) => {
    try {
      const res = await LaboratoriumService.getLaboratoriumCat(id);

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
  console.log(res.data);
      dispatch({
        type: GET_LABORATORIUM_CAT,
        payload: res.data,
      });
    } catch (err) {
      console.log(err);
    }
  };
  
  
  