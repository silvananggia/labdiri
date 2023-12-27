import {
    CREATE_PAGES,
    GET_PAGES,
    GET_PAGES_ID,
    UPDATE_PAGES,
    DELETE_PAGES,
  } from "./types";
  
  import PagesService from "../services/pages.service";
  import toast from "react-hot-toast";

  export const createPages = (data) => async (dispatch) => {
    try {
      const res = await PagesService.createPages(data);
  
      dispatch({
        type: CREATE_PAGES,
        payload: res.data,
      });
  
      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
  };
  
  export const getAllPages = () => async (dispatch) => {
    try {
      const res = await PagesService.getPagesAll();

      dispatch({
        type: GET_PAGES,
        payload: res.data.data,
      });
    } catch (err) {
      console.log(err);
    }
  };
  
  export const updatePages = (id, data) => async (dispatch) => {
    try {
      const res = await PagesService.updatePages(id, data);
      dispatch({
        type: UPDATE_PAGES,
        payload: data,
      }); 
  
      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
  };
  
  export const deletePages= (id) => async (dispatch) => {
    try {
      await PagesService.deletePages(id);
  
      dispatch({
        type: DELETE_PAGES,
        payload: { id },
      });
    } catch (err) {
      console.log(err);
    }
  };

  export const getPagesID = (id) => async (dispatch) => {
    try {
      const res = await PagesService.getPages(id);
  
      dispatch({
        type: GET_PAGES_ID,
        payload: res.data,
      });
    } catch (err) {
      console.log(err);
    }
  };
  
  
  