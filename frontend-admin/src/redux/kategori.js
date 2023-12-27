import {
  CREATE_KATEGORI,
  GET_KATEGORI,
  GET_KATEGORI_ID,
  UPDATE_KATEGORI,
  DELETE_KATEGORI,
  OPEN_POPUP,
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
    case OPEN_POPUP:
      return {
          ...kategori,
          kategoriobj: {}
      }
    case CREATE_KATEGORI:return{
        ...kategori,
        loading:false
    }

    case GET_KATEGORI:
      return {
        loading: false,
        errmessage: "",
        kategorilist: action.payload,
        kategoriobj: {},
      };

    case UPDATE_KATEGORI:
      const _data = { ...action.payload };
      const _finaldata = kategori.kategorilist.map(item => {
   
          return item.id === _data.id ? _data : item
      });
      return {
          ...kategori,
          kategorilist: _finaldata
      }



    case DELETE_KATEGORI:return{
        ...kategori,
        loading:false
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
