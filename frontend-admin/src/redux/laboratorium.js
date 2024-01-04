import {
  CREATE_LABORATORIUM,
  GET_LABORATORIUM,
  GET_LAB,
  GETLABALL,
  GET_LABORATORIUM_ID,
  UPDATE_LABORATORIUM,
  DELETE_LABORATORIUM,
} from "../actions/types";

const initialstate = {
  loading: true,
  laboratoriumlist: [],
  laboratoriumobj: {},
  errmessage: "",
};

function laboratoriumReducer(laboratorium = initialstate, action) {
  const { type, payload } = action;

  switch (type) {
    case CREATE_LABORATORIUM:
      return {
        ...laboratorium,
        loading: false,
      };
    case GET_LABORATORIUM:
      return {
        loading: false,
        errmessage: "",
        laboratoriumlist: action.payload,
        laboratoriumobj: {},
      };

          case GETLABALL:
      return {
        loading: false,
        errmessage: "",
        laboratoriumlist: action.payload,
        laboratoriumobj: {},
      };

    case GET_LAB:
      return {
        loading: false,
        errmessage: "",
        laboratoriumlist: action.payload,
        laboratoriumobj: {},
      };

    case UPDATE_LABORATORIUM:
     
      return {
        ...laboratorium,
        loading: false,
        errmessage: "",
// laboratoriumlist: action.payload,
      };

    case DELETE_LABORATORIUM:
      return {
        ...laboratorium,
        loading: false,
      };
    case GET_LABORATORIUM_ID:
      return {
        ...laboratorium,
        loading: false,
        laboratoriumobj: action.payload.data,
      };

    default:
      return laboratorium;
  }
}

export default laboratoriumReducer;
