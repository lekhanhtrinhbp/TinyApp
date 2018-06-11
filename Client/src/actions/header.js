import {
  NOTIFICATION_FAILURE,
  NOTIFICATION_REQUEST,
  NOTIFICATION_SUCCESS,
  NOTIFICATION_SEEN_REQUEST,
  NOTIFICATION_SEEN_SUCCESS,
  NOTIFICATION_SEEN_FAILURE,
  CHANGE_LANG
} from "../commons/action.type";
import axios from "../utils/axios";

export const getNotifies = () => {
  return async dispatch => {
    dispatch({
      type: NOTIFICATION_REQUEST
    });
    // connect API
    try {
      const response = await axios.get("/notifications/up-coming-events");
      dispatch({
        type: NOTIFICATION_SUCCESS,
        data: {
          ...response.data
        }
      });
    } catch (err) {
      dispatch({
        type: NOTIFICATION_FAILURE,
        data: {
          ...err.response.data
        }
      });
    }
  };
};

export const seenNotifies = () => async dispatch => {
  dispatch({
    type: NOTIFICATION_SEEN_REQUEST
  });
  try {
    const response = await axios.post("/notifications/seen");
    dispatch({
      type: NOTIFICATION_SEEN_SUCCESS,
      data: {
        ...response.data
      }
    });
  } catch (err) {
    dispatch({
      type: NOTIFICATION_SEEN_FAILURE,
      data: {
        ...err.response.data
      }
    });
  }
};

export const changeLang = lang => dispatch =>
  dispatch({
    type: CHANGE_LANG,
    data: {
      lang
    }
  });
