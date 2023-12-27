import {
  GET_ALAT,
  GET_ALAT_ID,
} from "../actions/types";

const initialstate = {
  loading: true,
  alatlist: [],
  alatobj: {},
  labobj: {},
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

    default:
      return alat;
  }
}

export default alatReducer;
