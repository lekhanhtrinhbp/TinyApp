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
import axios from '../utils/axios';

export const searchEvents = input => {
  return async (dispatch, getState) => {
    dispatch({
      type: SEARCH_REQUEST,
    });
    const searchEventObject = {
      childTopicId: getState().home.childTopicId,
      eventTypeId: getState().home.eventTypeId,
      fromDate: getState().home.fromDate,
      locationId: getState().home.locationId,
      location: getState().home.location,
      search: getState().home.search,
      ticketType: getState().home.ticketType,
      toDate: getState().home.toDate,
      topicId: getState().home.topicId,
      freeText: !getState().home.locationId,
    };
    if (input) {
      Object.assign(searchEventObject, input);
    }
    if (!searchEventObject.ticketType) {
      delete searchEventObject.ticketType;
    }
    try {
      const url = `/events/us/search?page=${getState().home.page}&size=${
        getState().home.size}
        ${getState().home.sort ? `&sort=${getState().home.sort}` : ''}`;
      const response = await axios.post(url, {
        ...searchEventObject,
      });
      dispatch({
        type: SEARCH_SUCCESS,
        data: {
          searchResult: response.data.content || [],
          totalPages: response.data.totalPages,
          totalElements: response.data.totalElements,
          numberOfElements: response.data.numberOfElements,
          lastPage: response.data.last,
          firstPage: response.data.first,
          size: response.data.size,
          currentPage: response.data.number,
        },
      });
    } catch (err) {
      console.log(err);
      dispatch({
        type: SEARCH_FAILURE,
      });
    }
  };
};

export const updateValue = value => {
  return {
    type: UPDATE_VALUE,
    data: value,
  };
};

export const remove = name => {
  return (dispatch, getState) => {
    return dispatch({
      type: UPDATE_VALUE,
      data: { [name]: null },
    });
  };
};

export const locationSuggest = (value = '') => async dispatch => {
  try {
    const response = await axios.get('/locations/suggest', {
      params: {
        search: value,
      },
    });

    dispatch({
      type: LOCATION_SUGGEST,
      data: response.data.map(item => ({
        id: item.id,
        key: item.id,
        value: `${item.id}`,
        // text: `${item.title} ${item.houseNumber} ${item.street}, ${item.ward}
        // ${item.city.value} ${item.country.value}`,
        text: `${item.address}`
      })),
    });
  } catch (error) {
    dispatch({
      type: LOCATION_SUGGEST,
      data: [],
    });
  }
};

export const category = () => {
  return async dispatch => {
    const response = await axios.get('/event-topics');
    if (response.code === 500 || response.status !== 200) {
      dispatch({
        type: UPDATE_UI_DATA,
        data: {
          categoryList: [],
        },
      });
    } else {
      dispatch({
        type: UPDATE_UI_DATA,
        data: {
          categoryList: response.data,
        },
      });
    }
  };
};

export const eventType = () => {
  return async dispatch => {
    const response = await axios.get('/event-types');
    if (response.code === 500 || response.status !== 200) {
      dispatch({
        type: UPDATE_UI_DATA,
        data: {
          eventTypeList: [],
        },
      });
    } else {
      dispatch({
        type: UPDATE_UI_DATA,
        data: {
          eventTypeList: response.data,
        },
      });
    }
  };
};

export const browseCategories = () => {
  return async dispatch => {
    const response = await axios.get('/event-topics/metadata');
    if (response.code === 500 || response.status !== 200) {
      dispatch({
        type: UPDATE_UI_DATA,
        data: {
          topCategories: [],
        },
      });
    } else {
      dispatch({
        type: UPDATE_UI_DATA,
        data: {
          topCategories: response.data,
        },
      });
    }
  };
};

export const homeEvents = () => {
  return async (dispatch, getState) => {
    dispatch({
      type: SEARCH_HOME_REQUEST,
    });
    try {
      const response = await axios.post('/events/us/home');
      dispatch({
        type: SEARCH_HOME_SUCCESS,
        data: {
          homeEvents: response.data.content || [],
        },
      });
    } catch (err) {
      dispatch({
        type: SEARCH_HOME_FAILURE,
      });
    }
  };
};

export const getRecentlyEvents = () => {
  return async (dispatch, getState) => {
    dispatch({
      type: GET_RECENTLY_EVENTS_REQUEST,
    });
    try {
      const response = await axios.get('/v1/restaurants');
      dispatch({
        type: GET_RECENTLY_EVENTS_SUCCESS,
        data: {
          events: response.data.items || [],
        },
      });
    } catch (err) {
      dispatch({
        type: GET_RECENTLY_EVENTS_FAILURE,
      });
    }
  };
};

export const getPopularEvents = () => {
  return async (dispatch, getState) => {
    dispatch({
      type: GET_POPULAR_EVENTS_REQUEST,
    });
    try {
      const response = await axios.get('v1/restaurants');
      dispatch({
        type: GET_POPULAR_EVENTS_SUCCESS,
        data: {
          events: response.data.items || [],
        },
      });
    } catch (err) {
      dispatch({
        type: GET_POPULAR_EVENTS_FAILURE,
      });
    }
  };
};

export const backRecentlyEvents = () => {
  return (dispatch, getState) => {
    const recentlyEvents = getState().home.recentlyEvents;
    let from = recentlyEvents.from;
    let to = recentlyEvents.to;

    if (from > 0) {
      from -= 1;
      to -= 1;
    }

    dispatch({
      type: CAROUSEL_RECENTLY_EVENTS_BACK,
      from,
      to
    });
  };
};

export const nextRecentlyEvents = () => {
  return (dispatch, getState) => {
    const recentlyEvents = getState().home.recentlyEvents;
    let from = recentlyEvents.from;
    let to = recentlyEvents.to;

    if (to < recentlyEvents.events.length - 1) {
      from += 1;
      to += 1;
    }

    dispatch({
      type: CAROUSEL_RECENTLY_EVENTS_NEXT,
      from,
      to
    });
  };
};

export const backPopularEvents = () => {
  return (dispatch, getState) => {
    const popularEvents = getState().home.popularEvents;
    let from = popularEvents.from;
    let to = popularEvents.to;

    if (from > 0) {
      from -= 1;
      to -= 1;
    }

    dispatch({
      type: CAROUSEL_POPULAR_EVENTS_BACK,
      from,
      to
    });
  };
};

export const nextPopularEvents = () => {
  return (dispatch, getState) => {
    const popularEvents = getState().home.popularEvents;
    let from = popularEvents.from;
    let to = popularEvents.to;

    if (to < popularEvents.events.length - 1) {
      from += 1;
      to += 1;
    }

    dispatch({
      type: CAROUSEL_POPULAR_EVENTS_NEXT,
      from,
      to
    });
  };
};
