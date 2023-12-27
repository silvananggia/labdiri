import {
    CREATE_KATEGORI,
    GET_KATEGORI,
    GET_KATEGORI_ID,
    UPDATE_KATEGORI,
    DELETE_KATEGORI,
    OPEN_POPUP,
  } from "./types";
  
  import kategoriService from "../services/kategori.service";
  
  export const OpenPopup=()=>{
    return{
        type:OPEN_POPUP
    }
};
  export const createKategori = (data) => async (dispatch) => {
    try {
      const res = await kategoriService.createKategori(data);
  
      dispatch({
        type: CREATE_KATEGORI,
        payload: res.data,
      });
  
      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
  };
  
  export const getAllKategori = () => async (dispatch) => {
    try {
      const res = await kategoriService.getKategoriAll();
  
      dispatch({
        type: GET_KATEGORI,
        payload: res.data.data,
      });
    } catch (err) {
      console.log(err);
    }
  };
  
  export const updateKategori = (id, data) => async (dispatch) => {
    try {
      const res = await kategoriService.updateKategori(id, data);

      dispatch({
        type: UPDATE_KATEGORI,
        payload: data,
      }); 
  
      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
  };
  
  export const deleteKategori = (id) => async (dispatch) => {
    try {
      await kategoriService.deleteKategori(id);
  
      dispatch({
        type: DELETE_KATEGORI,
        payload: { id },
      });
    } catch (err) {
      console.log(err);
    }
  };

  export const getKategoriID = (id) => async (dispatch) => {
    try {
      const res = await kategoriService.getKategori(id);
  
      dispatch({
        type: GET_KATEGORI_ID,
        payload: res.data,
      });
    } catch (err) {
      console.log(err);
    }
  };
  
  
  