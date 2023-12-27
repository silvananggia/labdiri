import {

  GET_LABORATORIUM,
  GET_LABORATORIUM_ID,
  GET_LABORATORIUM_CAT
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

    default:
      return laboratorium;
  }
}

export default laboratoriumReducer;
