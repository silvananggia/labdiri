import {
  GET_LABORATORIUM,
  GET_LABORATORIUM_ID,
  GET_LABORATORIUM_CAT,
  GET_LAB_LIST,
GET_FILTER_LABORATORIUM,
} from "../actions/types";

const initialstate = {
  loading: true,
  laboratoriumlist: [],
  lablist: [],
 
  laboratoriumobj: {},
  errmessage: "",
};

function laboratoriumReducer(laboratorium = initialstate, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_LABORATORIUM:
      return {
        loading: false,
        errmessage: "",
        laboratoriumlist: action.payload,
        laboratoriumobj: {},
      };

    case GET_LABORATORIUM_ID:
      return {
        ...laboratorium,
        loading: false,
        laboratoriumobj: action.payload.data,
      };

    case GET_LABORATORIUM_CAT:
      return {
        loading: false,
        errmessage: "",
        laboratoriumlist: action.payload,
        laboratoriumobj: {},
      };

    case GET_LAB_LIST:
      return {
        loading: false,
        errmessage: "",
        lablist: action.payload,
        laboratoriumobj: {},
      };

      case GET_FILTER_LABORATORIUM:
        return {
          loading: false,
          errmessage: "",
          laboratoriumlist: action.payload,
          laboratoriumobj: {},
        };

    default:
      return laboratorium;
  }
}

export default laboratoriumReducer;
