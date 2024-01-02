import {
  GET_DASHBOARD,
  
} from "../actions/types";

const initialstate = {
  loading: true,
  dashboarddata: {},
  errmessage: "",
};

function dashboardReducer(dashboard = initialstate, action) {
  const { type, payload } = action;

  switch (type) {
   
    case GET_DASHBOARD:
      return {
        loading: false,
        errmessage: "",
        dashborddata: action.payload,
      };


    default:
      return dashboard;
  }
}

export default dashboardReducer;
