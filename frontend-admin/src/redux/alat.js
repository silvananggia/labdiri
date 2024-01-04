import {
  CREATE_ALAT,
  GET_ALAT,
  GET_ALAT_LAB,
  GET_ALAT_ID,
  UPDATE_ALAT,
  DELETE_ALAT,
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
    case CREATE_ALAT:
      return {
        ...alat,
        loading: false,
      };
    case GET_ALAT:
      return {
        loading: false,
        errmessage: "",
        alatlist: action.payload,
        alatobj: {},
      };
      case GET_ALAT_LAB:
        return {
          loading: false,
          errmessage: "",
          alatlist: action.payload,
          alatobj: {},
        };

        case UPDATE_ALAT:

          return {
            ...alat,
            errmessage: "",
          //  alatlist: action.payload,
           // alatobj: alat.alatobj,
          };

    case DELETE_ALAT:
      return {
        ...alat,
        loading: false,
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
