import { CHANGE_LANG } from "./../commons/action.type";

const initialState = {
  // todo: localStorage here when guest changes language
  // lang: localStorage.getItem('LANGUAGE')
  //   ? localStorage.getItem('LANGUAGE')
  //   : 'en',
  lang: "en"
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_LANG:
      return {
        ...state,
        lang: action.data.lang
      };
    default:
      return state;
  }
};

export default userReducer;
