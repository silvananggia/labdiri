import {
  LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT, CHECK_AUTH
  } from "./types";

  import AuthService from "../services/auth.service";



  export const login = (username, password) => async (dispatch) => {
    try {
      const res = await AuthService.login(username,password);
      localStorage.setItem("user", JSON.stringify( res.data.data));

      //console.log(localStorage.getItem("user"))
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data.data,
      });
    } catch (error) {
      dispatch({
        type: LOGIN_FAILURE,
        payload: error.message,
      });
    }
  };
  
  export const checkAuth = (id) => async (dispatch) => {
    try {
      const res = await AuthService.checkAuth(id);
      dispatch({
       type: CHECK_AUTH, 
       payload: res.data });
    } catch (error) {
      dispatch({ type: LOGIN_FAILURE, payload: error.message });
    }
  };

  
  export const logout = () => ({
    type: LOGOUT,
  });