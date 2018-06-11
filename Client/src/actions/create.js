/*eslint indent: 0*/
/*eslint array-bracket-spacing: 0*/
/*eslint comma-dangle: 0*/
/*eslint eol-last: 0*/

import _ from 'lodash';
import draftToHtml from 'draftjs-to-html';
import {
  convertToRaw,
} from 'draft-js';
import {
  CREATE_EVENT_REQUEST,
  CREATE_EVENT_SUCCESS,
  CREATE_EVENT_FAILURE,
  LOCATION_CREATE_REQUEST,
  LOCATION_CREATE_SUCCESS,
  LOCATION_CREATE_FAILURE,
  EVENTTOPIC_REQUEST,
  EVENTTOPIC_SUCCESS,
  EVENTTOPIC_FAILURE,
  EVENTTYPE_REQUEST,
  EVENTTYPE_SUCCESS,
  EVENTTYPE_FAILURE,
  COUNTRY_REQUEST,
  COUNTRY_SUCCESS,
  COUNTRY_FAILURE,
  CITY_REQUEST,
  CITY_SUCCESS,
  CITY_FAILURE,
  PUBLISHEVENT_REQUEST,
  PUBLISHEVENT_SUCCESS,
  PUBLISHEVENT_FAILURE,
  PREVIEW_MODE_REQUEST,
  PREVIEW_MODE_SUCCESS,
  BACK_FROM_PREVIEW_REQUEST,
  BACK_FROM_PREVIEW_SUCCESS,
} from '../commons/action.type';
import axios from '../utils/axios';

const formatPayload = (infoInput) => {
  const htmlOrganizerDiscription = draftToHtml(
    convertToRaw(infoInput.organizerDiscription.getCurrentContent())
  )

  const formatString = _.trim(htmlOrganizerDiscription, '</p>').replace(/\r?\n|\r/g, '')

  let eventInfo = {
    agendaOverview: '',
    contentOverview: '',
    dateFrom: infoInput.dayStart,
    dateTo: infoInput.dayEnd,
    description: draftToHtml(
      convertToRaw(infoInput.eventDiscription.getCurrentContent())
    ),
    eventTopic: infoInput.topic || null,
    eventType: infoInput.type || null,
    faq: '',
    location: null,
    organizer: null,
    poster: infoInput.imgSrc || '',
    ticketInfo: null,
    title: infoInput.title,
  }

  if (infoInput.locationAddress) {
    eventInfo.location = {
      mapLat: infoInput.mapLat,
      mapLong: infoInput.mapLong,
      address: infoInput.locationAddress,
    }
  }

  if (infoInput.capacity || infoInput.ticketName) {
    eventInfo.ticketInfo = [{
      name: infoInput.ticketName,
      quantity: infoInput.capacity || 0,
    }, ]
  }

  if (infoInput.organizerName || formatString) {
    eventInfo.organizer = {
      name: infoInput.organizerName,
      description: draftToHtml(
        convertToRaw(infoInput.organizerDiscription.getCurrentContent())
      ),
    }
  }

  return eventInfo
}

export const createEvent = infoInput => async (dispatch, getState) => {
  dispatch({
    type: CREATE_EVENT_REQUEST,
  });

  const eventInfo = formatPayload(infoInput)

  // if user choosed a poster
  if (infoInput.poster) {
    const formData = new FormData();
    formData.append('file', infoInput.poster);
    const config = {
      headers: {
        'content-type': 'multipart/form-data',
      },
    };
    const savingMediaFileStatus = await axios.post(
      '/aws/upload',
      formData,
      config
    );
    // replace the info of media files by S3 url
    if (savingMediaFileStatus) {
      eventInfo.poster = savingMediaFileStatus.data;
    }
  }

  try {
    if (infoInput.id) {
      const response = await axios.put(`/events/${infoInput.id}`, { ...eventInfo
      })

      dispatch({
        type: CREATE_EVENT_SUCCESS,
        data: {
          ...response.data,
        },
      });
    } else {
      const response = await axios.post('/events', {
        ...eventInfo,
      });
      dispatch({
        type: CREATE_EVENT_SUCCESS,
        data: {
          ...response.data,
        },
      });
    }
  } catch (err) {
    dispatch({
      type: CREATE_EVENT_FAILURE,
      data: err.response.data,
    });
  }
};

export const getLocation = () => async dispatch => {
  dispatch({
    type: LOCATION_CREATE_REQUEST,
  });

  try {
    const response = await axios.get('/locations/suggest');
    dispatch({
      type: LOCATION_CREATE_SUCCESS,
      payload: response.data.map(location => {
        return {
          ...location,
          locationName: location.title,
          title: `${location.title}${', '}${location.houseNumber}${', '}${
            location.street
          }${', '}${location.ward}${', '}${location.district}${', '}${
            location.city ? location.city.value : null
          }${', '}${location.country ? location.country.value : null}${'.'}`,
        };
      }),
    });
  } catch (error) {
    dispatch({
      type: LOCATION_CREATE_FAILURE,
      payload: error.response ? error.response.data : null,
    });
  }
};

export const getEventType = () => async dispatch => {
  dispatch({
    type: EVENTTYPE_REQUEST,
  });

  try {
    const response = await axios.get('/event-types');
    dispatch({
      type: EVENTTYPE_SUCCESS,
      payload: response.data.map(type => {
        return {
          key: type.key,
          value: type.key,
          text: type.value,
        };
      }),
    });
  } catch (error) {
    dispatch({
      type: EVENTTYPE_FAILURE,
      payload: error.response ? error.response.data : null,
    });
  }
};

export const getEventTopic = () => async dispatch => {
  dispatch({
    type: EVENTTOPIC_REQUEST,
  });

  try {
    const response = await axios.get('/event-topics');
    dispatch({
      type: EVENTTOPIC_SUCCESS,
      payload: response.data.map(topic => {
        return {
          key: topic.key,
          value: topic.key,
          text: topic.value,
        };
      }),
    });
  } catch (error) {
    dispatch({
      type: EVENTTOPIC_FAILURE,
      payload: error.response ?
        error.response ?
        error.response.data :
        null : null,
    });
  }
};

export const getCountry = () => async dispatch => {
  dispatch({
    type: COUNTRY_REQUEST,
  });

  try {
    const response = await axios.get('/countries');
    dispatch({
      type: COUNTRY_SUCCESS,
      payload: response.data.map(country => {
        return {
          key: country.key,
          value: country.key,
          text: country.value,
        };
      }),
    });
  } catch (error) {
    dispatch({
      type: COUNTRY_FAILURE,
      payload: error.response ?
        error.response ?
        error.response.data :
        null : null,
    });
  }
};

export const getCity = () => async dispatch => {
  dispatch({
    type: CITY_REQUEST,
  });

  try {
    const response = await axios.get('/cities/suggest');
    dispatch({
      type: CITY_SUCCESS,
      payload: response.data.map(city => ({
        key: city.key,
        value: city.key,
        title: city.value,
      })),
    });
  } catch (error) {
    dispatch({
      type: CITY_FAILURE,
      payload: error.response ?
        error.response ?
        error.response.data :
        null : null,
    });
  }
};

export const publish = event => async dispatch => {
  dispatch({
    type: PUBLISHEVENT_REQUEST,
  });

  try {
    const response = await axios.post(`/events/${event.id}/publish`);
    return dispatch({
      type: PUBLISHEVENT_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    return dispatch({
      type: PUBLISHEVENT_FAILURE,
      payload: error.response ?
        error.response ?
        error.response.data :
        null : null,
    });
  }
};

export const preview = infoInput => async (dispatch, getState) => {
  dispatch({
    type: PREVIEW_MODE_REQUEST,
  });

  const eventInfo = {
    id: infoInput.id || undefined,
    active: true,
    agendaOverview: '',
    approved: false,
    capacity: infoInput.capacity,
    contentOverview: '',
    createdDate: '',
    dateFrom: infoInput.dayStart,
    dateTo: infoInput.dayEnd,
    description: draftToHtml(
      convertToRaw(infoInput.eventDiscription.getCurrentContent())
    ),
    eventTopic: infoInput.topic,
    eventType: infoInput.type,
    faq: '',
    lastModifiedDate: '',
    location: {
      city: infoInput.city,
      country: infoInput.country,
      district: infoInput.district,
      houseNumber: infoInput.houseNumber,
      mapLat: infoInput.mapLat,
      mapLong: infoInput.mapLong,
      street: infoInput.street,
      title: infoInput.locationName,
      ward: infoInput.ward,
      address: infoInput.locationAddress,
    },
    organizer: {
      avatar: '',
      jobTitle: {
        key: 1,
        value: '',
      },
      name: infoInput.organizerName,
      description: draftToHtml(
        convertToRaw(infoInput.organizerDiscription.getCurrentContent())
      ),
      professionalSummary: '',
      profile: '',
      socialUrl: '',
    },
    poster: infoInput.poster || null,
    imgSrc: infoInput.imgSrc || '',
    priceFrom: infoInput.ticketPrice,
    priceTo: infoInput.ticketPrice,
    refundable: true,
    status: 'EDITING',
    tags: [{
      key: 1,
      value: '',
    }, ],
    ticketInfo: [{
      description: '',
      name: infoInput.ticketName,
      priceFrom: infoInput.ticketPrice,
      priceTo: infoInput.ticketPrice,
      quantity: infoInput.capacity,
      showDescription: true,
      ticketType: infoInput.ticketType,
    }, ],
    timeZone: infoInput.timeZone,
    title: infoInput.title,
  };

  if (infoInput.poster) {
    const formData = new FormData();
    formData.append('file', infoInput.poster);
    const config = {
      headers: {
        'content-type': 'multipart/form-data',
      },
    };
    const savingMediaFileStatus = await axios.post(
      '/aws/upload',
      formData,
      config
    );
    // replace the info of media files by S3 url
    if (savingMediaFileStatus) {
      eventInfo.imgSrc = savingMediaFileStatus.data;
    }
  }

  dispatch({
    type: PREVIEW_MODE_SUCCESS,
    payload: eventInfo,
  });
};

export const backFromPreview = () => dispatch => {
  dispatch({
    type: BACK_FROM_PREVIEW_REQUEST,
  });
};

export const confirmBackFromPreview = () => dispatch => {
  dispatch({
    type: BACK_FROM_PREVIEW_SUCCESS,
  });
};