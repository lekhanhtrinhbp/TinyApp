/*eslint eol-last: 0 */
import {
  USER_EVENTS_MANAGEMENT_REQUEST,
  USER_EVENTS_MANAGEMENT_SUCCESS,
  USER_EVENTS_MANAGEMENT_FAIL,
  TYPE_CHANGED,
  CREATE_EVALUATE_REQUEST,
  CREATE_EVALUATE_SUCCESS,
  CREATE_EVALUATE_FAIL
} from "commons/action.type";

const initial = {
  status: "Events",
  events: {
    content: []
  },
  loading: false,
};
const managementReducer = (state = initial, action) => {
  switch (action.type) {
    case USER_EVENTS_MANAGEMENT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case USER_EVENTS_MANAGEMENT_SUCCESS: {
      const obj = {
        ...state,
        events: action.data,
        loading: false
      };

      return {
        ...state,
        events: action.data,
        loading: false
      };
    }
    case USER_EVENTS_MANAGEMENT_FAIL:
      return {
        ...state,
        loading: false
      };
    case TYPE_CHANGED:
      return {
        ...state,
        ...action.data
      };
    case CREATE_EVALUATE_REQUEST:
      return {
        ...state,
        loading: true
      };
    case CREATE_EVALUATE_SUCCESS:
      return {
        ...state,
        ...action.data,
        loading: false
      };
    case CREATE_EVALUATE_FAIL:
      return {
        ...state,
        loading: false,
        isError: true,
        message: action.payload
      };
    default:
      return state;
  }
};

export default managementReducer;