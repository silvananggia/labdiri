import {
    CREATE_USER,
    GET_USER,
    GET_USER_ID,
    UPDATE_USER,
    DELETE_USER,
    GET_ROLES,
  } from "./types";
  
  import UserService from "../services/user.service";
  import toast from "react-hot-toast";

  export const createUser = (data) => async (dispatch) => {
    try {
      const res = await UserService.createUser(data);
  
      dispatch({
        type: CREATE_USER,
        payload: res.data,
      });
  
      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
  };
  
  export const getAllUser = () => async (dispatch) => {
    try {
      const res = await UserService.getUserAll();

      dispatch({
        type: GET_USER,
        payload: res.data.data,
      });
    } catch (err) {
      console.log(err);
    }
  };
  
  export const updateUser = (id, data) => async (dispatch) => {
    try {
      const res = await UserService.updateUser(id, data);
      dispatch({
        type: UPDATE_USER,
        payload: data,
      }); 
  
      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
  };
  
  export const deleteUser= (id) => async (dispatch) => {
    try {
      await UserService.deleteUser(id);
  
      dispatch({
        type: DELETE_USER,
        payload: { id },
      });
    } catch (err) {
      console.log(err);
    }
  };

  export const getUserID = (id) => async (dispatch) => {
    try {
      const res = await UserService.getUser(id);
  
      dispatch({
        type: GET_USER_ID,
        payload: res.data,
      });
    } catch (err) {
      console.log(err);
    }
  };
  
  export const getRoles = () => async (dispatch) => {
    try {
      const res = await UserService.getRoles();

      dispatch({
        type: GET_ROLES,
        payload: res.data.data,
      });
    } catch (err) {
      console.log(err);
    }
  };
  