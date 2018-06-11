import { LOAD_AUTHENTICATION_DATA } from "../commons/action.type";

export const loadAuthenticationData = () => {
  const appUser = JSON.parse(sessionStorage.getItem("appUser"));
  return dispatch => {
    dispatch({
      type: LOAD_AUTHENTICATION_DATA,
      data: appUser
    });
  };
};
