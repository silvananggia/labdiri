import {
  CREATE_PROFILE,
  GET_PROFILE,
  GET_PROFILE_ID,
  UPDATE_PROFILE,
  DELETE_PROFILE,
} from "../actions/types";

const initialstate = {
  loading: true,
  profilelist: [],
  profileobj: {},
  errmessage: "",
};

function profileReducer(profile = initialstate, action) {
  const { type, payload } = action;

  switch (type) {
    case CREATE_PROFILE:
      return {
        ...profile,
        loading: false,
      };
    case GET_PROFILE:
      return {
        loading: false,
      
        profileobj: action.payload.data,
        errmessage: "",
        profilelist: action.payload,
      
      };

    case UPDATE_PROFILE:
      const _data = { ...action.payload };
      const _finaldata = profile.profilelist.map((item) => {
        console.log(item.id);
        console.log(item);
        return item.id === _data.id ? _data : item;
      });
      return {
        ...profile,
        profilelist: _finaldata,
      };

    case DELETE_PROFILE:
      return {
        ...profile,
        loading: false,
      };
    case GET_PROFILE_ID:
      return {
        ...profile,
        loading: false,
        profileobj: action.payload.data,
      };

    default:
      return profile;
  }
}

export default profileReducer;
