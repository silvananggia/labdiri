import { LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT, CHECK_AUTH } from "./types";

import AuthService from "../services/auth.service";

export const login = (username, password) => async (dispatch) => {
  try {
    const res = await AuthService.login(username, password);
    localStorage.setItem("user", JSON.stringify(res.data.data));

    //console.log(localStorage.getItem("user"))
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data.data,
    });
  } catch (error) {
    dispatch({
      type: LOGIN_FAILURE,
      payload: error.response.data.error,
    });
  }
};

export const checkAuth = (id) => async (dispatch) => {
  try {
    const res = await AuthService.checkAuth(id);
    dispatch({
      type: CHECK_AUTH,
      payload: res.data,
    });
  } catch (error) {
    dispatch({ type: LOGIN_FAILURE, payload: error.message });
  }
};

export const logout = () => async (dispatch) => {
  try {
    const res = await AuthService.logout();
    dispatch({
      type: LOGOUT,
      payload: res.data,
    });

    localStorage.removeItem("user");

    // Return a successful response
    return { success: true };
  } catch (error) {
    // Dispatch the LOGIN_FAILURE action with the error message
    dispatch({ type: LOGIN_FAILURE, payload: error.message });

    // Return an unsuccessful response
    return { success: false, error: error.message };
  }
};
