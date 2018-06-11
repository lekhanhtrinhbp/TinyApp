import {
  EVENT_REQUEST,
  EVENT_SUCCESS,
  EVENT_FAILURE,
  TICKET_SELECTED,
  CHECK_OUT_REQUEST,
  CHECK_OUT_SUCCESS,
  CHECK_OUT_FAIL,
  LOAD_TICKETS,
  GUEST_INFO_REQUEST,
  GUEST_INFO_SUCCESS,
  GUEST_INFO_FAILURE,
  LOAD_CURRENT_USER_REQUEST,
  LOAD_CURRENT_USER_SUCCESS,
  LOAD_CURRENT_USER_FAIL,
  UPDATE_GUEST_INFO_INPUT,
} from 'commons/action.type';
import axios from 'utils/axios';

export const loadEvent = id => async dispatch => {
  dispatch({
    type: EVENT_REQUEST,
  });

  try {
    const response = await axios.get(`events/us/${id}`);
    dispatch({
      type: EVENT_SUCCESS,
      data: {
        event: response.data,
      },
    });
  } catch (error) {
    dispatch({ type: EVENT_FAILURE });
  }
};

export const ticketSelect = value => async (dispatch, getState) => {
  const ticketState = getState().event.ticketsSelected;
  // const ticketSelected = getState().event.ticketInfo.filter(
  //   i => i.id === value.key
  // )[0];
  // if (value.value > ticketSelected.remainQuantity) {
  //   return dispatch({
  //     type: OUT_OF_TICKET,
  //     data: {
  //       errorTicket: [value.key],
  //     },
  //   });
  // }
  let exist = false;
  ticketState.map(i => {
    if (i.key === value.key) {
      Object.assign(i, value);
      exist = true;
      return i;
    }
    return i;
  });
  if (!exist) {
    ticketState.push(value);
  }
  const errorTicket = getState().event.errorTicket.filter(i => i !== value.key);
  return dispatch({
    type: TICKET_SELECTED,
    data: {
      ticketsSelected: ticketState,
      errorTicket,
    },
  });
};

export const loadTickets = () => async (dispatch, getState) => {
  const tickets = await axios.post(
    `events/us/${getState().event.event.id}/ticket-info`
  );
  return dispatch({
    type: LOAD_TICKETS,
    data: {
      ticketInfo: tickets.data,
    },
  });
};

export const checkout = () => {
  return async (dispatch, getState) => {
    dispatch({
      type: CHECK_OUT_REQUEST,
    });

    const appUser = JSON.parse(sessionStorage.getItem('appUser'));
    let email = getState().event.guestInfo.guest.email;
    let firstName = getState().event.guestInfo.guest.firstName;
    let lastName = getState().event.guestInfo.guest.lastName;
    if (appUser) {
      const currentUser = await axios.get('/users/current-user');
      email = currentUser.data.guest.email;
      firstName = currentUser.data.guest.firstName;
      lastName = currentUser.data.guest.lastName;
    }

    const user = {
      event: getState().event.event.id,
      guest: {
        email,
        firstName,
        lastName,
      },
      ticketRegistrations: getState().event.ticketsSelected,
    };

    try {
      await axios.post('/registrations/register', { ...user });
      dispatch({
        type: CHECK_OUT_SUCCESS,
      });
    } catch (error) {
      dispatch({
        type: CHECK_OUT_FAIL,
      });
    }
  };
};

export const updateGuestInfo = (name, value) => dispatch => {
  dispatch({
    type: UPDATE_GUEST_INFO_INPUT,
    payload: {
      [name]: value,
    },
  });
};

export const loadCurrentUserInfo = () => async dispatch => {
  dispatch({
    type: LOAD_CURRENT_USER_REQUEST,
  });

  try {
    const response = await axios.get('/users/current-user');

    dispatch({
      type: LOAD_CURRENT_USER_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: LOAD_CURRENT_USER_FAIL,
      payload: error.response ? error.response.data : null,
    });
  }
};

export const loadGuestInfo = email => async dispatch => {
  dispatch({
    type: GUEST_INFO_REQUEST,
  });

  try {
    const response = await axios.get(`/guests/us?email=${email}`);
    dispatch({
      type: GUEST_INFO_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({ type: GUEST_INFO_FAILURE, payload: error.response ? error.response.data : null });
  }
};
