import {
  CREATE_USER,
  GET_USER,
  GET_USER_ID,
  UPDATE_USER,
  DELETE_USER,
  GET_ROLES,
} from "../actions/types";

const initialstate = {
  loading: true,
  userlist: [],
  userobj: {},
  errmessage: "",
};

function userReducer(user = initialstate, action) {
  const { type, payload } = action;

  switch (type) {
    case CREATE_USER:
      return {
        ...user,
        loading: false,
      };
    case GET_USER:
      return {
        loading: false,
        errmessage: "",
        userlist: action.payload,
        userobj: {},
      };

    case UPDATE_USER:
      const _data = { ...action.payload };
      const _finaldata = user.userlist.map((item) => {
       
        return item.id === _data.id ? _data : item;
      });
      return {
        ...user,
        userlist: _finaldata,
      };

    case DELETE_USER:
      return {
        ...user,
        loading: false,
      };
    case GET_USER_ID:
      return {
        ...user,
        loading: false,
        userobj: action.payload.data,
      };
      case GET_ROLES:
        return {
          loading: false,
          errmessage: "",
          userlist: user.userlist,
          rolelist: action.payload,
          userobj: user.userobj,
        };
    default:
      return user;
  }
}

export default userReducer;
