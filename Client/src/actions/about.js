import { FETCH_ABOUT } from "../commons/action.type";

export const fetchAboutData = () => {
  return dispatch => {
    dispatch({
      type: FETCH_ABOUT,
      data: {
        message: "This message is loaded from redux to About page"
      }
    });
  };
};
