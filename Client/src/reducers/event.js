import {
  EVENT_REQUEST,
  EVENT_SUCCESS,
  EVENT_FAILURE,
  TICKET_SELECTED,
  CHECK_OUT_REQUEST,
  CHECK_OUT_SUCCESS,
  CHECK_OUT_FAIL,
  GUEST_CHECK_OUT,
  GUEST_ENTER,
  OUT_OF_TICKET,
  LOAD_TICKETS,
  TOGGLE,
  GUEST_INFO_REQUEST,
  GUEST_INFO_SUCCESS,
  GUEST_INFO_FAILURE,
  LOAD_CURRENT_USER_REQUEST,
  LOAD_CURRENT_USER_SUCCESS,
  LOAD_CURRENT_USER_FAIL,
  UPDATE_GUEST_INFO_INPUT,
  CLEAR_GUEST,
  LOGOUT,
} from 'commons/action.type';

const initialState = {
  event: {
    agendaOverview: 'string',
    capacity: 0,
    contentOverview: 'string',
    dateFrom: '',
    dateTo: '',
    description: 'string',
    eventTopic: {
      key: {},
      value: 'string',
    },
    eventType: {
      key: {},
      value: 'string',
    },
    faq: 'string',
    id: 0,
    location: {
      city: {
        key: {},
        value: 'string',
      },
      country: {
        key: {},
        value: 'string',
      },
      district: 'string',
      houseNumber: 'string',
      id: 0,
      mapLat: 0,
      mapLong: 0,
      street: 'string',
      title: 'string',
      version: 0,
      ward: 'string',
    },
    organizer: {
      avatar: 'string',
      description: 'string',
      id: 0,
      jobTitle: {
        key: {},
        value: 'string',
      },
      name: 'string',
      professionalSummary: 'string',
      profile: 'string',
      socialUrl: 'string',
      version: 0,
    },
    poster: 'string',
    priceFrom: 0,
    priceTo: 0,
    published: true,
    refundable: true,
    tags: [
      {
        key: {},
        value: 'string',
      },
    ],
    ticketInfo: {
      description: 'string',
      id: 0,
      maxTicketAllowed: 0,
      minTicketAllowed: 0,
      name: 'string',
      priceFrom: 0,
      priceTo: 0,
      quantity: 0,
      saleEndDate: '',
      saleStartDate: '',
      showDescription: true,
      ticketType: 'FREE',
      version: 0,
    },
    ticketType: 'FREE',
    timeZone: 'string',
    title: 'string',
    version: 0,
  },
  isLoading: false,
  ticketsSelected: [],
  isGuest: false,
  ticketInfo: [],
  guestInfo: {
    guest: {
      email: '',
      firstName: '',
      lastName: '',
    },
    isLoading: false,
  },
  errorTicket: [],
  checkoutSuccess: false,
  checkoutFail: false,
  showTickets: false,
  currentUser: {
    user: undefined,
    isLoading: false,
    isError: false,
    message: '',
  },
};

const eventReducer = (state = initialState, action) => {
  switch (action.type) {
    case EVENT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case EVENT_SUCCESS:
      return {
        ...state,
        ...action.data,
        loading: false,
      };
    case EVENT_FAILURE:
      return {
        ...state,
        loading: true,
      };
    case TICKET_SELECTED: {
      return {
        ...state,
        ...action.data,
      };
    }
    case CHECK_OUT_REQUEST: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case CHECK_OUT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        ticketsSelected: [],
        isGuest: false,
        guestInfo: {
          ...state.guestInfo,
          guest: {
            email: '',
            firstName: '',
            lastName: '',
          },
        },
        checkoutSuccess: true,
        showTickets: false,
      };
    case CHECK_OUT_FAIL: {
      return {
        ...state,
        isLoading: false,
        ticketsSelected: [],
        isGuest: false,
        guestInfo: {
          ...state.guestInfo,
          guest: {
            email: '',
            firstName: '',
            lastName: '',
          },
        },
        checkoutFail: true,
        showTickets: false,
      };
    }
    case GUEST_CHECK_OUT:
      return {
        ...state,
        isGuest: true,
      };
    case UPDATE_GUEST_INFO_INPUT: {
      return {
        ...state,
        guestInfo: {
          ...state.guestInfo,
          guest: { ...state.guestInfo.guest, ...action.payload },
        },
      };
    }
    case GUEST_ENTER:
      return {
        ...state,
        guestInfo: {
          ...state.guestInfo,
          guest: action.guestInfo,
        },
      };
    case OUT_OF_TICKET:
      return {
        ...state,
        ...action.data,
      };
    case LOAD_TICKETS:
      return {
        ...state,
        ...action.data,
      };
    case TOGGLE:
      return {
        ...state,
        ...action.data,
      };
    case GUEST_INFO_REQUEST:
      return {
        ...state,
        guestInfo: {
          ...state.guestInfo,
          isLoading: true,
        },
      };
    case GUEST_INFO_SUCCESS: {
      if (action.payload === '') {
        return {
          ...state,
          guestInfo: {
            ...state.guestInfo,
            isLoading: false,
            guest: {
              ...state.guestInfo.guest,
              firstName: '',
              lastName: '',
            },
          },
        };
      }
      return {
        ...state,
        guestInfo: {
          ...state.guestInfo,
          isLoading: false,
          guest: action.payload,
        },
      };
    }
    case GUEST_INFO_FAILURE:
      return {
        ...state,
        guestInfo: {
          ...state.guestInfo,
          isLoading: false,
        },
      };

    case LOAD_CURRENT_USER_REQUEST: {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          isLoading: true,
        },
        guestInfo: {
          ...state.guestInfo,
          guest: {},
        },
      };
    }

    case LOAD_CURRENT_USER_SUCCESS: {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          isLoading: false,
          isError: false,
          user: action.payload,
        },
      };
    }

    case LOAD_CURRENT_USER_FAIL: {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          isLoading: false,
          isError: true,
          message: action.payload,
        },
      };
    }

    case CLEAR_GUEST: {
      return {
        ...state,
        guestInfo: {
          ...state.guestInfo,
          guest: {},
          isLoading: false,
        },
      };
    }

    case LOGOUT: {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          isLoading: false,
          isError: false,
          user: undefined,
        },
      };
    }

    default:
      return state;
  }
};

export default eventReducer;
