import {
    CREATE_PROFILE,
    GET_PROFILE,
    GET_PROFILE_ID,
    UPDATE_PROFILE,
    DELETE_PROFILE,
  } from "./types";
  
  import ProfileService from "../services/profile.service";
  import toast from "react-hot-toast";

  export const createProfile = (data) => async (dispatch) => {
    try {
      const res = await ProfileService.createProfile(data);
  
      dispatch({
        type: CREATE_PROFILE,
        payload: res.data,
      });
  
      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
  };
  
  export const getAllProfile = () => async (dispatch) => {
    try {
      const res = await ProfileService.getProfileAll();

      dispatch({
        type: GET_PROFILE,
        payload: res.data.data,
      });
    } catch (err) {
      console.log(err);
    }
  };
  
  export const updateProfile = (id, data) => async (dispatch) => {
    try {
      const res = await ProfileService.updateProfile(id, data);
      dispatch({
        type: UPDATE_PROFILE,
        payload: data,
      }); 
  
      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
  };
  
  export const deleteProfile= (id) => async (dispatch) => {
    try {
      await ProfileService.deleteProfile(id);
  
      dispatch({
        type: DELETE_PROFILE,
        payload: { id },
      });
    } catch (err) {
      console.log(err);
    }
  };

  export const getProfileID = (id) => async (dispatch) => {
    try {
      const res = await ProfileService.getProfile(id);
  
      dispatch({
        type: GET_PROFILE_ID,
        payload: res.data,
      });
    } catch (err) {
      console.log(err);
    }
  };
  
  
  