import {
  CREATE_PAGES,
  GET_PAGES,
  GET_PAGES_ID,
  UPDATE_PAGES,
  DELETE_PAGES,
} from "../actions/types";

const initialstate = {
  loading: true,
  pageslist: [],
  pagesobj: {},
  errmessage: "",
};

function pagesReducer(pages = initialstate, action) {
  const { type, payload } = action;

  switch (type) {
    case CREATE_PAGES:
      return {
        ...pages,
        loading: false,
      };
    case GET_PAGES:
      return {
        loading: false,
        errmessage: "",
        pageslist: action.payload,
        pagesobj: {},
      };

    case UPDATE_PAGES:
      const _data = { ...action.payload };
      const _finaldata = pages.pageslist.map((item) => {
        console.log(item.id);
        console.log(item);
        return item.id === _data.id ? _data : item;
      });
      return {
        ...pages,
        pageslist: _finaldata,
      };

    case DELETE_PAGES:
      return {
        ...pages,
        loading: false,
      };
    case GET_PAGES_ID:
      return {
        ...pages,
        loading: false,
        pagesobj: action.payload.data,
      };

    default:
      return pages;
  }
}

export default pagesReducer;
