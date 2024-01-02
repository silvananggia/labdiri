// reducers/authReducer.js
import { LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT  , CHECK_AUTH} from '../actions/types';

const initialState = {
  isAuthenticated: false,
  user: null,
  error: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
        error: null,
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        error: action.payload,
      };

      case CHECK_AUTH:
        return {
          ...state,
          user: action.payload,
          error: null,
          isAuthenticated: true,
        };
    case LOGOUT:
      return initialState;
    default:
      return state;
  }
};

export default authReducer;
