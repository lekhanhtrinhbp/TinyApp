import {
  NOTIFICATION_FAILURE,
  NOTIFICATION_REQUEST,
  NOTIFICATION_SUCCESS,
  NOTIFICATION_SEEN_REQUEST,
  NOTIFICATION_SEEN_SUCCESS,
  NOTIFICATION_SEEN_FAILURE
} from "../commons/action.type";

const initState = {
  notification: [],
  loading: true
};

const headerReducer = (state = initState, action) => {
  switch (action.type) {
    case NOTIFICATION_REQUEST:
      return {
        ...state,
        loading: true
      };
    case NOTIFICATION_SUCCESS:
      return {
        ...state,
        notification: action.data,
        loading: false
      };
    case NOTIFICATION_FAILURE:
      return {
        ...state,
        loading: true
      };
    case NOTIFICATION_SEEN_REQUEST:
      return {
        ...state,
        loading: true
      };
    case NOTIFICATION_SEEN_SUCCESS:
      return {
        ...state,
        loading: false
      };
    case NOTIFICATION_SEEN_FAILURE:
      return {
        ...state,
        loading: true
      };
    default:
      return state;
  }
};

export default headerReducer;
