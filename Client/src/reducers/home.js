import {
  SEARCH_REQUEST,
  SEARCH_SUCCESS,
  SEARCH_FAILURE,
  UPDATE_VALUE,
  LOCATION_SUGGEST,
  UPDATE_UI_DATA,
  SEARCH_HOME_REQUEST,
  SEARCH_HOME_SUCCESS,
  SEARCH_HOME_FAILURE,
  GET_RECENTLY_EVENTS_REQUEST,
  GET_RECENTLY_EVENTS_SUCCESS,
  GET_RECENTLY_EVENTS_FAILURE,
  GET_POPULAR_EVENTS_REQUEST,
  GET_POPULAR_EVENTS_SUCCESS,
  GET_POPULAR_EVENTS_FAILURE,
  CAROUSEL_RECENTLY_EVENTS_BACK,
  CAROUSEL_RECENTLY_EVENTS_NEXT,
  CAROUSEL_POPULAR_EVENTS_BACK,
  CAROUSEL_POPULAR_EVENTS_NEXT
} from 'commons/action.type';

const initialState = {
  // input params for search
  childTopicId: null,
  eventTypeId: null,
  fromDate: '',
  locationId: null,
  location: '',
  search: '',
  ticketType: null,
  toDate: '',
  topicId: null,
  page: 0,
  size: 20,
  sort: [],
  // pagination
  totalPages: 0,
  totalElements: 0,
  lastPage: true,
  numberOfElements: 0,
  firstPage: true,
  // end input params for search
  searchResult: [],
  locationSuggest: [],
  loading: false,
  categoryList: [],
  eventTypeList: [],
  topCategories: [],
  homeEvents: [],
  homeLoading: false,
  emptyResult: false,
  recentlyEvents: {
    loading: false,
    events: [],
    from: 0,
    to: 4
  },
  popularEvents: {
    loading: false,
    events: [],
    from: 0,
    to: 4
  }
};

const homeReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_VALUE:
      return {
        ...state,
        ...action.data,
      };
    case SEARCH_REQUEST:
      return {
        ...state,
        searchResult: [],
        loading: true,
      };
    case SEARCH_SUCCESS:
      return {
        ...state,
        ...action.data,
        loading: false,
        emptyResult: action.data.searchResult.length === 0,
      };
    case SEARCH_FAILURE:
      return {
        ...state,
        searchResult: [],
        loading: true,
        emptyResult: true,
      };
    case LOCATION_SUGGEST:
      return {
        ...state,
        locationSuggest: action.data,
      };
    case UPDATE_UI_DATA:
      return {
        ...state,
        ...action.data,
      };
    case SEARCH_HOME_REQUEST:
      return {
        ...state,
        search: '',
        location: '',
        locationId: null,
        homeLoading: true,
      };
    case SEARCH_HOME_SUCCESS:
      return {
        ...state,
        ...action.data,
        homeLoading: false,
      };
    case SEARCH_HOME_FAILURE:
      return {
        ...state,
        homeLoading: false,
        emptyResult: true,
      };
    case GET_RECENTLY_EVENTS_REQUEST:
      return {
        ...state,
        recentlyEvents: {
          loading: true,
          events: [],
          from: 0
        }
      };
    case GET_RECENTLY_EVENTS_SUCCESS:
      return {
        ...state,
        recentlyEvents: {
          ...state.recentlyEvents,
          loading: false,
          events: action.data.events,
          to: action.data.events.length > 4 ? 4 : action.data.events.length
        }
      };
    case GET_RECENTLY_EVENTS_FAILURE:
      return {
        ...state,
        recentlyEvents: {
          loading: false,
          events: []
        }
      };
    case GET_POPULAR_EVENTS_REQUEST:
      return {
        ...state,
        popularEvents: {
          loading: true,
          events: [],
          from: 0
        }
      };
    case GET_POPULAR_EVENTS_SUCCESS:
      return {
        ...state,
        popularEvents: {
          ...state.popularEvents,
          loading: false,
          events: action.data.events,
          to: action.data.events.length > 4 ? 4 : action.data.events.length
        }
      };
    case GET_POPULAR_EVENTS_FAILURE:
      return {
        ...state,
        popularEvents: {
          loading: false,
          events: []
        }
      };
    case CAROUSEL_RECENTLY_EVENTS_BACK:
    case CAROUSEL_RECENTLY_EVENTS_NEXT:
      return {
        ...state,
        recentlyEvents: {
          ...state.recentlyEvents,
          from: action.from,
          to: action.to
        }
      };
    case CAROUSEL_POPULAR_EVENTS_BACK:
    case CAROUSEL_POPULAR_EVENTS_NEXT:
      return {
        ...state,
        popularEvents: {
          ...state.popularEvents,
          from: action.from,
          to: action.to
        }
      };
    default:
      return state;
  }
};

export default homeReducer;
