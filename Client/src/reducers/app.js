import {
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT,
  LOAD_AUTHENTICATION_DATA,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
} from '../commons/action.type';

const initialState = {
  appUser: undefined,
  isAuthorization: false,
  isLoading: false,
  isError: false,
  messageOnTop: '',
  userRegister: {
    userInfo: undefined,
    isLoading: false,
    isError: false,
    messageOnTop: '',
  },
};

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    // login
    case LOGIN_REQUEST:
      return {
        ...state,
        appUser: action.data,
        isLoading: true,
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        messageOnTop: action.data.msg,
        isLoading: false,
        isError: true,
        isAuthorization: false,
      };
    case LOGIN_SUCCESS: {
      sessionStorage.setItem('authToken', action.data.accessToken.token);
      sessionStorage.setItem('appUser', JSON.stringify(action.data));
      return {
        ...state,
        appUser: action.data,
        isLoading: false,
        isAuthorization: true,
        isError: false,
      };
    }
    // logout
    case LOGOUT:
      sessionStorage.removeItem('authToken');
      sessionStorage.removeItem('appUser');
      return {
        ...initialState,
      };
    // register
    case REGISTER_REQUEST: {
      return {
        ...state,
        userRegister: {
          ...state.userRegister,
          isLoading: true,
        },
      };
    }
    case REGISTER_SUCCESS: {
      return {
        ...state,
        userRegister: {
          ...state.userRegister,
          isLoading: false,
          userInfo: action.payload,
        },
      };
    }
    case REGISTER_FAILURE: {
      return {
        ...state,
        userRegister: {
          ...state.userRegister,
          isLoading: false,
          isError: true,
          messageOnTop: action.payload,
        },
      };
    }
    // authenticate
    case LOAD_AUTHENTICATION_DATA: {
      return {
        ...state,
        appUser: action.data,
        isAuthorization: !action.data,
      };
    }
    default:
      return state;
  }
};

export default appReducer;
