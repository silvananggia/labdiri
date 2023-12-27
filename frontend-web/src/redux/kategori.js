import {

  GET_KATEGORI,
  GET_KATEGORI_ID,
 
} from "../actions/types";

const initialstate = {
  loading: true,
  kategorilist: [],
  kategoriobj: {},
  errmessage: "",
};

function kategoriReducer(kategori = initialstate, action) {
  const { type, payload } = action;

  switch (type) {
   

    case GET_KATEGORI:
      return {
        loading: false,
        errmessage: "",
        kategorilist: action.payload,
        kategoriobj: {},
      };

    case GET_KATEGORI_ID:return{
        ...kategori,
        loading:false,
        kategoriobj:action.payload.data
    }

    default:
      return kategori;
  }
}

export default kategoriReducer;
