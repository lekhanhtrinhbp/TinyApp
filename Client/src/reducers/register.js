import {
  HOBBY_REQUEST,
  HOBBY_SUCCESS,
  HOBBY_FAILURE,
} from 'commons/action.type';

const initialState = {
  userHobbies: {
    hobbies: [],
    isLoading: false,
    isError: false,
    message: '',
  },
};

const registerReducer = (state = initialState, action) => {
  switch (action.type) {
    case HOBBY_REQUEST: {
      return {
        ...state,
        userHobbies: {
          ...state.userHobbies,
          isLoading: true,
        },
      };
    }
    case HOBBY_SUCCESS: {
      return {
        ...state,
        userHobbies: {
          ...state.userHobbies,
          isLoading: false,
          isError: false,
          hobbies: action.payload,
        },
      };
    }
    case HOBBY_FAILURE: {
      return {
        ...state,
        userHobbies: {
          ...state.userHobbies,
          isLoading: false,
          isError: true,
          message: action.payload,
        },
      };
    }

    default:
      return {
        ...state,
      };
  }
};

export default registerReducer;
