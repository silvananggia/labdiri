import {
  GET_DASHBOARD,
  GET_STAT_ALAT,
  GET_STAT_LABLOKASI,
  GET_STAT_LOKASIALAT,
} from "../actions/types";

const initialState = {
  loading: true,
  dashboarddata: {}, // Corrected field name
  statalat: [],
  statlablok: [], // Added missing field
  statlokalat: [], // Added missing field
  errmessage: "",
};

function dashboardReducer(dashboard = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_DASHBOARD:
      return {
        loading: false,
        errmessage: "",
        dashboarddata: payload, // Corrected field name
        statalat: dashboard.statalat,
        statlablok: dashboard.statlablok,
        statlokalat: dashboard.statlokalat,
      };

    case GET_STAT_ALAT:
      return {
        loading: false,
        errmessage: "",
        statalat: payload,
        dashboarddata: dashboard.dashboarddata,
        statlablok: dashboard.statlablok,
        statlokalat: dashboard.statlokalat,
      };

    case GET_STAT_LABLOKASI:
      return {
        loading: false,
        errmessage: "",
        statlablok: payload,
        statalat: dashboard.statalat,
        dashboarddata: dashboard.dashboarddata,
        statlokalat: dashboard.statlokalat,
      };

    case GET_STAT_LOKASIALAT:
      return {
        loading: false,
        errmessage: "",
        statlokalat: payload,
        statlablok: dashboard.statlablok,
        statalat: dashboard.statalat,
        dashboarddata: dashboard.dashboarddata,
      };

    default:
      return dashboard;
  }
}

export default dashboardReducer;
