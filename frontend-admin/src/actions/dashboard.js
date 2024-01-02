import {
  GET_DASHBOARD
  } from "./types";
  
  import DashboardService from "../services/dashboard.service";
  import toast from "react-hot-toast";

  export const getDashboard = () => async (dispatch) => {
    try {
      const res = await DashboardService.getDashboard();
  
      dispatch({
        type: GET_DASHBOARD,
        payload: res.data.data,
      });
  
      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
  };