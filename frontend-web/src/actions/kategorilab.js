import {
    GET_KATEGORI,
    GET_KATEGORI_ID,
  } from "./types";
  
  import kategoriService from "../services/kategori.service";

  
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
  
  
  