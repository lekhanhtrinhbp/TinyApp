import {
  LOGIN_REQUEST,
  LOGIN_FAILURE,
  LOGIN_SUCCESS,
  LOGOUT,
} from '../commons/action.type';
import axios from '../utils/axios';

export const login = (username, password) => {
  return async dispatch => {
    dispatch({
      type: LOGIN_REQUEST,
      data: {
        username,
        password,
      },
    });
    // connect API
    try {
      const response = await axios.post('/auth/token', { username, password });
      dispatch({
        type: LOGIN_SUCCESS,
        data: {
          ...response.data,
        },
      });
    } catch (err) {
      dispatch({
        type: LOGIN_FAILURE,
        data: {
          ...err.response.data,
        },
      });
    }
  };
};

export const logout = () => {
  return dispatch => {
    dispatch({
      type: LOGOUT,
    });
  };
};
