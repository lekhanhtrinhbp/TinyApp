/*eslint eol-last: 0 */
/*eslint comma-dangle: 0 */
/*eslint array-bracket-spacing: 0 */
import {
  CREATE_EVENT_FAILURE,
  CREATE_EVENT_SUCCESS,
  CREATE_EVENT_REQUEST,
  LOCATION_CREATE_REQUEST,
  LOCATION_CREATE_SUCCESS,
  LOCATION_CREATE_FAILURE,
  EVENTTYPE_REQUEST,
  EVENTTYPE_SUCCESS,
  EVENTTYPE_FAILURE,
  EVENTTOPIC_REQUEST,
  EVENTTOPIC_SUCCESS,
  EVENTTOPIC_FAILURE,
  COUNTRY_REQUEST,
  COUNTRY_SUCCESS,
  COUNTRY_FAILURE,
  CITY_REQUEST,
  CITY_SUCCESS,
  CITY_FAILURE,
  PUBLISHEVENT_REQUEST,
  PUBLISHEVENT_SUCCESS,
  PUBLISHEVENT_FAILURE,
  PREVIEW_MODE_SUCCESS,
  PREVIEW_MODE_REQUEST,
  BACK_FROM_PREVIEW_REQUEST,
  BACK_FROM_PREVIEW_SUCCESS,
} from '../commons/action.type';

const initialState = {
  saveEvent: {
    eventInfo: {
      active: true,
      agendaOverview: '',
      approved: false,
      capacity: '',
      contentOverview: '',
      createdDate: '',
      dateFrom: '',
      dateTo: '',
      description: '',
      eventTopic: '',
      eventType: '',
      faq: '',
      lastModifiedDate: '',
      location: {
        city: '',
        country: '',
        district: '',
        houseNumber: '',
        mapLat: '',
        mapLong: '',
        street: '',
        title: '',
        ward: '',
      },
      organizer: {
        avatar: '',
        jobTitle: {
          key: 1,
          value: '',
        },
        name: '',
        description: '',
        professionalSummary: '',
        profile: '',
        socialUrl: '',
      },
      poster: '',
      priceFrom: '',
      priceTo: '',
      refundable: true,
      status: 'EDITING',
      tags: [{
        key: 1,
        value: '',
      }, ],
      ticketInfo: [{
        description: '',
        name: '',
        priceFrom: '',
        priceTo: '',
        quantity: '',
        showDescription: true,
        ticketType: '',
      }, ],
      timeZone: '',
      title: '',
    },
    isLoading: false,
    isLoadingPreview: false,
    isBackFromPreview: false,
    messageOnTop: '',
    isError: false,
  },

  eventType: {
    type: [],
    isLoading: false,
    messageOnTop: '',
    isError: false,
  },

  eventTopic: {
    topic: [],
    isLoading: false,
    messageOnTop: '',
    isError: false,
  },

  locationSuggest: {
    locations: [],
    isLoading: false,
    messageOnTop: '',
    isError: false,
  },

  citySuggest: {
    cities: [],
    isLoading: false,
    messageOnTop: '',
    isError: false,
  },

  countryOption: {
    countries: [],
    isLoading: false,
    messageOnTop: '',
    isError: false,
  },

  publishedEvent: {
    contentEvent: {},
    isLoading: false,
    isError: false,
    messageOnTop: '',
  },
};

const eventReducer = (state = initialState, action) => {
  switch (action.type) {
    // create event
    case CREATE_EVENT_REQUEST:
      {
        return {
          ...state,
          saveEvent: { ...state.saveEvent,
            isLoading: true
          },
        };
      }
    case CREATE_EVENT_SUCCESS:
      {
        return {
          ...state,
          saveEvent: {
            ...state.saveEvent,
            isLoading: false,
            eventInfo: action.data,
          },
        };
      }
    case CREATE_EVENT_FAILURE:
      {
        return {
          ...state,
          saveEvent: {
            ...state.saveEvent,
            isLoading: false,
            isError: true,
            messageOnTop: action.data.error,
          },
        };
      }

      // location search
    case LOCATION_CREATE_REQUEST:
      {
        return {
          ...state,
          locationSuggest: {
            ...state.locationSuggest,
            isLoading: true,
          },
        };
      }
    case LOCATION_CREATE_SUCCESS:
      {
        return {
          ...state,
          locationSuggest: {
            ...state.locationSuggest,
            isLoading: false,
            locations: action.payload,
          },
        };
      }
    case LOCATION_CREATE_FAILURE:
      {
        return {
          ...state,
          locationSuggest: {
            ...state.locationSuggest,
            isLoading: false,
            isError: true,
            messageOnTop: action.payload,
          },
        };
      }

      // event type
    case EVENTTYPE_REQUEST:
      {
        return {
          ...state,
          eventType: {
            ...state.eventType,
            isLoading: true,
          },
        };
      }
    case EVENTTYPE_SUCCESS:
      {
        return {
          ...state,
          eventType: {
            ...state.eventType,
            isLoading: false,
            type: action.payload,
          },
        };
      }
    case EVENTTYPE_FAILURE:
      {
        return {
          ...state,
          eventType: {
            ...state.eventType,
            isLoading: false,
            isError: true,
            messageOnTop: action.payload,
          },
        };
      }

      // event topic
    case EVENTTOPIC_REQUEST:
      {
        return {
          ...state,
          eventTopic: {
            ...state.eventTopic,
            isLoading: true,
          },
        };
      }
    case EVENTTOPIC_SUCCESS:
      {
        return {
          ...state,
          eventTopic: {
            ...state.eventTopic,
            isLoading: false,
            topic: action.payload,
          },
        };
      }
    case EVENTTOPIC_FAILURE:
      {
        return {
          ...state,
          eventTopic: {
            ...state.eventTopic,
            isLoading: false,
            isError: true,
            messageOnTop: action.payload,
          },
        };
      }

      // city suggest
    case CITY_REQUEST:
      {
        return {
          ...state,
          citySuggest: {
            ...state.citySuggest,
            isLoading: true,
          },
        };
      }
    case CITY_SUCCESS:
      {
        return {
          ...state,
          citySuggest: {
            ...state.citySuggest,
            isLoading: false,
            cities: action.payload,
          },
        };
      }
    case CITY_FAILURE:
      {
        return {
          ...state,
          citySuggest: {
            ...state.citySuggest,
            isLoading: false,
            isError: true,
            messageOnTop: action.payload,
          },
        };
      }

      // country option
    case COUNTRY_REQUEST:
      {
        return {
          ...state,
          countryOption: {
            ...state.countryOption,
            isLoading: true,
          },
        };
      }
    case COUNTRY_SUCCESS:
      {
        return {
          ...state,
          countryOption: {
            ...state.countryOption,
            isLoading: false,
            countries: action.payload,
          },
        };
      }
    case COUNTRY_FAILURE:
      {
        return {
          ...state,
          eventTopic: {
            ...state.eventTopic,
            isLoading: false,
            isError: true,
            messageOnTop: action.payload,
          },
        };
      }
      // publish
    case PUBLISHEVENT_REQUEST:
      {
        return {
          ...state,
          publishedEvent: {
            ...state.publishedEvent,
            isLoading: true,
          },
        };
      }
    case PUBLISHEVENT_SUCCESS:
      {
        return {
          ...state,
          publishedEvent: {
            ...state.publishedEvent,
            isLoading: false,
            isError: false,
            contentEvent: action.payload,
          },
        };
      }
    case PUBLISHEVENT_FAILURE:
      {
        return {
          ...state,
          publishedEvent: {
            ...state.publishedEvent,
            isLoading: false,
            isError: true,
            messageOnTop: action.payload,
          },
        };
      }
      // preview mode
    case PREVIEW_MODE_REQUEST:
      {
        return {
          ...state,
          saveEvent: {
            ...state.saveEvent,
            isLoadingPreview: true,
          },
        };
      }
    case PREVIEW_MODE_SUCCESS:
      {
        return {
          ...state,
          saveEvent: {
            ...state.saveEvent,
            isLoadingPreview: false,
            eventInfo: action.payload,
          },
        };
      }
      // back from preview to continue editting
    case BACK_FROM_PREVIEW_REQUEST:
      {
        return {
          ...state,
          saveEvent: {
            ...state.saveEvent,
            isBackFromPreview: true,
          },
        };
      }
    case BACK_FROM_PREVIEW_SUCCESS:
      {
        return {
          ...state,
          saveEvent: {
            ...state.saveEvent,
            isBackFromPreview: false,
          },
        };
      }
    default:
      return state;
  }
};

export default eventReducer;