import {
    GET_PAGE,
  } from "./types";
  
  import PageService from "../services/page.service";


  export const getPage = (id) => async (dispatch) => {
    try {
      const res = await PageService.getPage(id);

      dispatch({
        type: GET_PAGE,
        payload: res.data,
      });
    } catch (err) {
      console.log(err);
    }
  };
  
  
  