import {
 
  GET_LOKASI_LIST,
} from "../actions/types";

const initialstate = {
  loading: true,
 
  lokasilist: [],
  errmessage: "",
};

function filterReducer(filter = initialstate, action) {
  const { type, payload } = action;

  switch (type) {

      case GET_LOKASI_LIST:
        return {
          loading: false,
          errmessage: "",
          lokasilist: action.payload,
        };

    default:
      return filter;
  }
}

export default filterReducer;
