import {
  GET_PAGE,
} from "../actions/types";

const initialstate = {
  loading: true,
  pagelist: [],
  pageobj: {},
  labobj: {},
  errmessage: "",
};

function pageReducer(page = initialstate, action) {
  const { type, payload } = action;

  switch (type) {


   
    case GET_PAGE:
      return {
        ...page,
        loading: false,
        data: action.payload.data, // Change pageobj to data
      };

    default:
      return page;
  }
}

export default pageReducer;
