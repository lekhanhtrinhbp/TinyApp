import {
  ALLEVENT_REQUEST,
  ALLEVENT_SUCCESS,
  ALLEVENT_FAILURE,
  APPROVEEVENT_REQUEST,
  APPROVEEVENT_SUCCESS,
  APPROVEEVENT_FAILURE,
  ALLUSER_REQUEST,
  ALLUSER_SUCCESS,
  ALLUSER_FAILURE,
  ALLEVENT_SUPERADMIN_REQUEST,
  ALLEVENT_SUPERADMIN_SUCCESS,
  ALLEVENT_SUPERADMIN_FAIL,
  ADMIN_USER_DETAIL_REQUEST,
  ADMIN_USER_DETAIL_SUCCESS,
  ADMIN_USER_DETAIL_FAIL,
  EVENT_MANAGEMENT_POPUP_REJECT_OPENED,
  EVENT_MANAGEMENT_POPUP_REJECT_CLOSED,
  EVENT_MANAGEMENT_REJECT_CONFIRMED,
  EVENT_MANAGEMENT_REJECT_SUCCESS,
  EVENT_MANAGEMENT_REJECT_FAILURE
} from "../commons/action.type";
import axios from "../utils/axios";

export const getAllEvent = (page = 0, size = 10) => async dispatch => {
  dispatch({
    type: ALLEVENT_REQUEST
  });

  try {
    const response = await axios.get(`/events/admins/management?page=${page}&size=${size}`);
    dispatch({
      type: ALLEVENT_SUCCESS,
      payload: response.data
    });
  } catch (error) {
    dispatch({
      type: ALLEVENT_FAILURE,
      payload: error.response ? error.response ? error.response.data : null : null
    });
  }
};

export const approve = event => async dispatch => {
  dispatch({
    type: APPROVEEVENT_REQUEST
  });

  try {
    const response = await axios.post(`/events/${event.id}/approve`);
    dispatch({
      type: APPROVEEVENT_SUCCESS,
      payload: response.data
    });
  } catch (error) {
    dispatch({
      type: APPROVEEVENT_FAILURE,
      payload: error.response ? error.response.data : null
    });
  }
};

export const getAllUser = () => async dispatch => {
  dispatch({
    type: ALLUSER_REQUEST
  });

  try {
    const response = await axios.get("/users");
    dispatch({
      type: ALLUSER_SUCCESS,
      payload: response.data
    });
  } catch (error) {
    dispatch({
      type: ALLUSER_FAILURE,
      payload: error.response ? error.response.data : null
    });
  }
};

export const getAllEventSuperAdmin = (page = 0, size = 10) => async dispatch => {
  dispatch({
    type: ALLEVENT_SUPERADMIN_REQUEST
  });

  try {
    const response = await axios.get(`/events?page=${page}&size=${size}`);
    dispatch({
      type: ALLEVENT_SUPERADMIN_SUCCESS,
      payload: response.data
    });
  } catch (error) {
    dispatch({
      type: ALLEVENT_SUPERADMIN_FAIL,
      payload: error.response ? error.response.data : null
    });
  }
};

export const getUserDetail = userId => async dispatch => {
  dispatch({
    type: ADMIN_USER_DETAIL_REQUEST
  });

  try {
    const response = await axios.get(`/users/${userId}`);
    dispatch({
      type: ADMIN_USER_DETAIL_SUCCESS,
      payload: response.data
    });
  } catch (error) {
    dispatch({
      type: ADMIN_USER_DETAIL_FAIL,
      payload: error
    });
  }
};

export const openPopupRejectEvent = eventId => dispatch => {
  dispatch({
    type: EVENT_MANAGEMENT_POPUP_REJECT_OPENED,
    rejectEventId: eventId
  });
};

export const closePopupRejectEvent = () => dispatch => {
  dispatch({
    type: EVENT_MANAGEMENT_POPUP_REJECT_CLOSED,
    rejectEventId: 0
  });
};

export const rejectEventConfirmed = (eventId, reason) => async dispatch => {
  dispatch({
    type: EVENT_MANAGEMENT_REJECT_CONFIRMED,
    reason
  });

  const data = {
    eventId,
    reason
  };

  try {
    const response = await axios.post('/events/reject', data);
    dispatch({
      type: EVENT_MANAGEMENT_REJECT_SUCCESS,
      payload: response.data
    });
  } catch (error) {
    dispatch({
      type: EVENT_MANAGEMENT_REJECT_FAILURE,
      payload: error.response ? error.response.data : null
    });
  }

  dispatch(getAllEventSuperAdmin());
};
