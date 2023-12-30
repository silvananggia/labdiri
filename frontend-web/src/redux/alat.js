import {
  GET_ALAT,
  GET_ALAT_ID,
  GET_FILTER_ALAT,
} from "../actions/types";

const initialstate = {
  loading: true,
  alatlist: [],
  alatobj: {},
  labobj: {},
  lokasilist: [],
  errmessage: "",
};

function alatReducer(alat = initialstate, action) {
  const { type, payload } = action;

  switch (type) {

    case GET_ALAT:
      return {
        loading: false,
        errmessage: "",
        alatlist: action.payload,
        alatobj: {},
      };

   
    case GET_ALAT_ID:
      return {
        ...alat,
        loading: false,
        alatobj: action.payload.data,
        labobj: action.payload.data.laboratorium,
       
      };

      case GET_FILTER_ALAT:
      return {
        loading: false,
        errmessage: "",
        alatlist: action.payload,
        alatobj: {},
      };

    default:
      return alat;
  }
}

export default alatReducer;
