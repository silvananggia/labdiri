import {
  GET_SLIDER,
} from "../actions/types";

const initialstate = {
  loading: true,
  sliderlist: [],
  errmessage: "",
};

function sliderReducer(slider = initialstate, action) {
  const { type, payload } = action;

  switch (type) {


   
    case GET_SLIDER:
      return {
        ...slider,
        loading: false,
        sliderlist: action.payload.data,
      };

    default:
      return slider;
  }
}

export default sliderReducer;
