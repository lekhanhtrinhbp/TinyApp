import { FETCH_ABOUT } from "../commons/action.type";

const initialState = {
  message: "This message will be changed after you click button"
};

const homeReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ABOUT: {
      return {
        ...state,
        ...action.data
      };
    }
    default:
      return state;
  }
};

export default homeReducer;
