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

const initialState = {
  eventForApproving: {
    allEvent: {
      content: []
    },
    isLoading: false,
    isError: false,
    messageOnTop: ""
  },
  approveEvent: {
    contentEvent: {},
    isLoading: false,
    isError: false,
    messageOnTop: ""
  },
  registeredUser: {
    allUser: {
      content: []
    },
    isLoading: false,
    isError: false,
    messageOnTop: ""
  },
  rejectEventId: 0
};

const adminReducer = (state = initialState, action) => {
  switch (action.type) {
    // get all events for admin
    case ALLEVENT_REQUEST: {
      return {
        ...state,
        eventForApproving: {
          ...state.eventForApproving,
          isLoading: true
        }
      };
    }
    case ALLEVENT_SUCCESS: {
      return {
        ...state,
        eventForApproving: {
          ...state.eventForApproving,
          isLoading: false,
          allEvent: action.payload
        }
      };
    }
    case ALLEVENT_FAILURE: {
      return {
        ...state,
        eventForApproving: {
          ...state.eventForApproving,
          isLoading: false,
          isError: true,
          messageOnTop: action.payload
        }
      };
    }
    // approve
    case APPROVEEVENT_REQUEST: {
      return {
        ...state,
        approveEvent: {
          ...state.approveEvent,
          isLoading: true
        }
      };
    }
    case APPROVEEVENT_SUCCESS: {
      return {
        ...state,
        approveEvent: {
          ...state.approveEvent,
          isLoading: false,
          contentEvent: action.payload
        }
      };
    }
    case APPROVEEVENT_FAILURE: {
      return {
        ...state,
        approveEvent: {
          ...state.approveEvent,
          isLoading: false,
          isError: true,
          messageOnTop: action.payload
        }
      };
    }
    // get all users for admin
    case ALLUSER_REQUEST: {
      return {
        ...state,
        registeredUser: {
          ...state.registeredUser,
          isLoading: true
        }
      };
    }
    case ALLUSER_SUCCESS: {
      return {
        ...state,
        registeredUser: {
          ...state.registeredUser,
          isLoading: false,
          allUser: action.payload
        }
      };
    }
    case ALLUSER_FAILURE: {
      return {
        ...state,
        registeredUser: {
          ...state.registeredUser,
          isLoading: false,
          isError: true,
          messageOnTop: action.payload
        }
      };
    }
    case ALLEVENT_SUPERADMIN_REQUEST: {
      return {
        ...state,
        eventForApproving: {
          ...state.eventForApproving,
          isLoading: true
        }
      };
    }
    case ALLEVENT_SUPERADMIN_SUCCESS: {
      return {
        ...state,
        eventForApproving: {
          ...state.eventForApproving,
          isLoading: false,
          allEvent: action.payload
        }
      };
    }
    case ALLEVENT_SUPERADMIN_FAIL: {
      return {
        ...state,
        eventForApproving: {
          ...state.eventForApproving,
          isLoading: false,
          isError: true,
          messageOnTop: action.payload
        }
      };
    }
    // get user detail
    case ADMIN_USER_DETAIL_REQUEST: {
      return {
        ...state,
        userDetail: {
          ...state.userDetail,
          isLoading: true
        }
      };
    }
    case ADMIN_USER_DETAIL_SUCCESS: {
      return {
        ...state,
        userDetail: {
          isLoading: false,
          userInfo: action.payload
        }
      };
    }
    case ADMIN_USER_DETAIL_FAIL: {
      return {
        ...state,
        userDetail: {
          isLoading: false,
          isError: true,
          messageOnTop: action.payload
        }
      };
    }
    case EVENT_MANAGEMENT_POPUP_REJECT_OPENED: {
      return {
        ...state,
        rejectEventId: action.rejectEventId
      };
    }
    case EVENT_MANAGEMENT_POPUP_REJECT_CLOSED: {
      return {
        ...state,
        rejectEventId: 0
      };
    }
    case EVENT_MANAGEMENT_REJECT_CONFIRMED: {
      return {
        ...state,
        rejectEventId: 0
      };
    }
    case EVENT_MANAGEMENT_REJECT_SUCCESS: {
      return {
        ...state
      };
    }
    default:
      return state;
  }
};

export default adminReducer;
