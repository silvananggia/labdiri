import {
    CREATE_LABORATORIUM,
    GET_LABORATORIUM,
    GET_LAB,
    GETLABALL,
    GET_LABORATORIUM_ID,
    UPDATE_LABORATORIUM,
    DELETE_LABORATORIUM,
  } from "./types";
  
  import LaboratoriumService from "../services/laboratorium.service";
  import toast from "react-hot-toast";

  export const createLaboratorium = (data) => async (dispatch) => {
    try {
      const res = await LaboratoriumService.createLaboratorium(data);
  
      dispatch({
        type: CREATE_LABORATORIUM,
        payload: res.data,
      });
  
      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
  };
  
  export const getAllLaboratorium = (limit,page) => async (dispatch) => {
    try {
      const res = await LaboratoriumService.getLaboratoriumAll(limit,page);

      dispatch({
        type: GET_LABORATORIUM,
        payload: res.data.data,
      });
    } catch (err) {
      console.log(err);
    }
  };

  export const getLabAll = () => async (dispatch) => {
    try {
      const res = await LaboratoriumService.getLab();

      dispatch({
        type: GETLABALL,
        payload: res.data.data,
      });
    } catch (err) {
      console.log(err);
    }
  };


  
  export const updateLaboratorium = (id, data) => async (dispatch) => {
    try {
      const res = await LaboratoriumService.updateLaboratorium(id, data);
      dispatch({
        type: UPDATE_LABORATORIUM,
        payload: res.data,
      }); 
  
      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
  };
  
  export const deleteLaboratorium= (id) => async (dispatch) => {
    try {
      await LaboratoriumService.deleteLaboratorium(id);
  
      dispatch({
        type: DELETE_LABORATORIUM,
        payload: { id },
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

  export const getLab = (id) => async (dispatch) => {
    try {
      const res = await LaboratoriumService.getLaboratorium(id);
  
      dispatch({
        type: GET_LAB,
        payload: [res.data],
      });
    } catch (err) {
      console.log(err);
    }
  };
  
  
  