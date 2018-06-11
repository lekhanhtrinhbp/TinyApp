import axios from "utils/axios";
import {
  USER_EVENTS_MANAGEMENT_REQUEST,
  USER_EVENTS_MANAGEMENT_SUCCESS,
  USER_EVENTS_MANAGEMENT_FAIL,
  TYPE_CHANGED,
  CREATE_EVALUATE_REQUEST,
  CREATE_EVALUATE_SUCCESS,
  CREATE_EVALUATE_FAIL
} from "commons/action.type";

export const getEvents = (page = 0, size = 10) => {
  return async (dispatch, getState) => {
    dispatch({
      type: USER_EVENTS_MANAGEMENT_REQUEST
    });
    const status = getState().management.status;
    const url =
      `${status === "Events"
        ? "/events/management/own"
        : "/events/management/registered"}?page=${page}&size=${size}`;

    try {
      const events = await axios.get(url);
      dispatch({
        type: USER_EVENTS_MANAGEMENT_SUCCESS,
        data: events.data
      });
    } catch (e) {
      dispatch({
        type: USER_EVENTS_MANAGEMENT_FAIL
      });
    }
  };
};

export const changeType = type => {
  return {
    type: TYPE_CHANGED,
    data: {
      status: type
    }
  };
};
export const submitEvaluate = evaluateInfo => async (dispatch, getState) => {
  dispatch({
    type: "CREATE_EVALUATE_REQUEST"
  });

  try {
    const currentUser = await axios.get("/users/current-user");
    const config = {
      headers: { Accept: "*/*" }
    };
    const response = await axios.post(
      `/events/${evaluateInfo.eventId}/review`,
      {
        comment: evaluateInfo.comment,
        guest: { value: currentUser.data.guest.email || "guest" },
        rating: evaluateInfo.rating
      }
    );
    dispatch({
      type: CREATE_EVALUATE_SUCCESS,
      payload: response.data
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: CREATE_EVALUATE_FAIL,
      payload: error
    });
  }
};
