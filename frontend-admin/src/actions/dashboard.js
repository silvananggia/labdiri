import {
  GET_DASHBOARD,
  GET_STAT_ALAT,
  GET_STAT_LABLOKASI,
  GET_STAT_LOKASIALAT,
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

export const getStatAlat = () => async (dispatch) => {
  try {
    const res = await DashboardService.getStatAlat();

    dispatch({
      type: GET_STAT_ALAT,
      payload: res.data.data,
    });

    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
};

export const getStatLabLokasi = () => async (dispatch) => {
  try {
    const res = await DashboardService.getStatLabLokasi();

    dispatch({
      type: GET_STAT_LABLOKASI,
      payload: res.data.data,
    });

    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
};

export const getStatAlatLokasi = () => async (dispatch) => {
  try {
    const res = await DashboardService.getStatAlatLokasi();

    dispatch({
      type: GET_STAT_LOKASIALAT,
      payload: res.data.data,
    });

    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
};
