import {
  CREATE_LOKASI,
  GET_LOKASI,
  GET_LOKASI_ID,
  UPDATE_LOKASI,
  DELETE_LOKASI,
  OPEN_POPUP_LOKASI,
} from "../actions/types";

const initialstate = {
  loading: true,
  lokasilist: [],
  lokasiobj: {},
  errmessage: "",
};

function lokasiReducer(lokasi = initialstate, action) {
  const { type, payload } = action;

  switch (type) {
    case OPEN_POPUP_LOKASI:
      return {
          ...lokasi,
          lokasiobj: {}
      }
    case CREATE_LOKASI:return{
        ...lokasi,
        loading:false
    }

    case GET_LOKASI:
      return {
        loading: false,
        errmessage: "",
        lokasilist: action.payload,
        lokasiobj: {},
      };

    case UPDATE_LOKASI:
      const _data = { ...action.payload };
      const _finaldata = lokasi.lokasilist.map(item => {

          return item.id === _data.id ? _data : item
      });
      return {
          ...lokasi,
          lokasilist: _finaldata
      }



    case DELETE_LOKASI:return{
        ...lokasi,
        loading:false
    };
    case GET_LOKASI_ID:return{
        ...lokasi,
        loading:false,
        lokasiobj:action.payload.data
    }

    default:
      return lokasi;
  }
}

export default lokasiReducer;
