import {
    CREATE_LOKASI,
    GET_LOKASI,
    GET_LOKASI_ID,
    UPDATE_LOKASI,
    DELETE_LOKASI,
    OPEN_POPUP_LOKASI,
  } from "./types";
  
  import LokasiService from "../services/lokasi.service";
  
  export const OpenPopupLokasi=()=>{
    return{
        type:OPEN_POPUP_LOKASI
    }
};
  export const createLokasi = (data) => async (dispatch) => {
    try {
      const res = await LokasiService.createLokasi(data);
  
      dispatch({
        type: CREATE_LOKASI,
        payload: res.data,
      });
  
      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
  };
  
  export const getAllLokasi = () => async (dispatch) => {
    try {
      const res = await LokasiService.getLokasiAll();
  
      dispatch({
        type: GET_LOKASI,
        payload: res.data.data,
      });
    } catch (err) {
      console.log(err);
    }
  };
  
  export const updateLokasi = (id, data) => async (dispatch) => {
    try {
      const res = await LokasiService.updateLokasi(id, data);

      dispatch({
        type: UPDATE_LOKASI,
        payload: data,
      }); 
  
      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
  };
  
  export const deleteLokasi= (id) => async (dispatch) => {
    try {
      await LokasiService.deleteLokasi(id);
  
      dispatch({
        type: DELETE_LOKASI,
        payload: { id },
      });
    } catch (err) {
      console.log(err);
    }
  };

  export const getLokasiID = (id) => async (dispatch) => {
    try {
      const res = await LokasiService.getLokasi(id);
  
      dispatch({
        type: GET_LOKASI_ID,
        payload: res.data,
      });
    } catch (err) {
      console.log(err);
    }
  };
  
  
  