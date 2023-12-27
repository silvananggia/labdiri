import {
    CREATE_ALAT,
    GET_ALAT,
    GET_ALAT_LAB,
    GET_ALAT_ID,
    UPDATE_ALAT,
    DELETE_ALAT,
  } from "./types";
  
  import AlatService from "../services/alat.service";


  export const createAlat = (data) => async (dispatch) => {
    try {
      const res = await AlatService.createAlat(data);
  
      dispatch({
        type: CREATE_ALAT,
        payload: res.data,
      });
     
  
      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
  };
  
  export const getAllAlat = () => async (dispatch) => {
    try {
      const res = await AlatService.getAlatAll();

      dispatch({
        type: GET_ALAT,
        payload: res.data.data,
      });
    } catch (err) {
      console.log(err);
    }
  };

  export const getAlatLab = (id) => async (dispatch) => {
    try {
      const res = await AlatService.getAlatLab(id);

      dispatch({
        type: GET_ALAT_LAB,
        payload: res.data.data,
      });
    } catch (err) {
      console.log(err);
    }
  };
  
  export const updateAlat = (id, data) => async (dispatch) => {
    try {
      const res = await AlatService.updateAlat(id, data);
      dispatch({
        type: UPDATE_ALAT,
        payload: data,
      }); 
  
      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
  };
  
  export const deleteAlat= (id) => async (dispatch) => {
    try {
      await AlatService.deleteAlat(id);
  
      dispatch({
        type: DELETE_ALAT,
        payload: { id },
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
  
  
  