/* eslint indent: 0 */
/* eslint no-trailing-spaces: 0 */
import React from 'react';
import T from 'prop-types';
import _ from 'lodash';
import { EditorState, ContentState } from 'draft-js';
import { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import htmlToDraft from 'html-to-draftjs';
import moment from 'moment';
import { browserHistory } from 'react-router';
import TranslateTag from 'components/TranslateTag';
import View from './View';

// TODO: search location feature, day start - day end, add image.

class CreateEvent extends React.Component {
  constructor(props) {
    super(props);
    this.handleCreate = this.handleCreate.bind(this);
    this.handlePublish = this.handlePublish.bind(this);
    this.handlePreview = this.handlePreview.bind(this);
    this.handleEventDiscription = this.handleEventDiscription.bind(this);
    this.handleOrganizerDiscription = this.handleOrganizerDiscription.bind(
      this
    );
    this.handleChange = this.handleChange.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.handleCitySelect = this.handleCitySelect.bind(this);
    this.handleLocationSelect = this.handleLocationSelect.bind(this);
    // -- time start event -- //
    this.handleDayStart = this.handleDayStart.bind(this);
    this.handleDayEnd = this.handleDayEnd.bind(this);
    // --image-- //
    this.handleUploadImage = this.handleUploadImage.bind(this);
    this.handleRemoveImage = this.handleRemoveImage.bind(this);
    //
    this.handleCitySearch = this.handleCitySearch.bind(this);
    this.handleLocationSearch = this.handleLocationSearch.bind(this);
    this.handleAddAddress = this.handleAddAddress.bind(this);
    this.handleTicketType = this.handleTicketType.bind(this);
    // --time start & end-- //
    // this.handleStartSelling = this.handleStartSelling.bind(this);
    // this.handleEndSelling = this.handleEndSelling.bind(this);
    // --setting-- //
    this.handleListingPrivacy = this.handleListingPrivacy.bind(this);
    // preview mode
    this.handleDetail = this.handleDetail.bind(this);
    //
    this.handleLocationPlacesChange = this.handleLocationPlacesChange.bind(
      this
    );
    this.handleLocationPlacesSelect = this.handleLocationPlacesSelect.bind(
      this
    );
    this.handleLocationPlacesCloseClick = this.handleLocationPlacesCloseClick.bind(
      this
    );
    this.handleLocationPlacesError = this.handleLocationPlacesError.bind(this);
    this.handleSaveConfirm = this.handleSaveConfirm.bind(this);
    this.handleResetState = this.handleResetState.bind(this);

    this.state = {
      id: undefined,
      // details
      title: 'Create An Event',
      inputTitle: '',
      invalidTitle: false,
      disabledButton: true,
      // location
      locationName: '',
      houseNumber: '',
      street: '',
      ward: '',
      district: '',
      city: {
        key: 0,
        value: '',
      },
      country: {
        key: 0,
        value: '',
      },
      locationAddress: '',
      // location places autocomplete
      address: '',
      errorMessage: '',
      latitude: null,
      longitude: null,
      isGeocoding: false,
      // --time start event-- //
      dayStart: '',
      dayEnd: '',
      invalidDayStart: false,
      invalidDayEnd: false,
      // ---- //
      poster: null,
      imgSrc: '',
      isRemove: false,
      //
      eventDiscription: EditorState.createEmpty(),
      organizerName: '',
      organizerDiscription: EditorState.createEmpty(),
      // Ticket
      ticketType: '',
      ticketName: '',
      ticketPrice: 0,
      capacity: '',
      // startSelling: '',
      // endSelling: '',
      // Setting
      topic: null,
      type: null,
      // city suggestion
      citySearch: {
        isSearching: false,
        results: [],
        value: '',
      },
      // location suggestion
      locationSearch: {
        isSearching: false,
        results: [],
        value: '',
      },
      // add address
      isAdd: false,
      // publish event (invite require)
      isPublished: 'publish',
      openSaveConfirm: false,
    };
  }

  async componentWillMount() {
    const { isDetail } = this.props;
    if (isDetail) {
      this.handleDetail(this.props.eventInfo);
    } else if (this.props.route && this.props.route.isEdit) {
      await this.props.loadEvent(this.props.params.id);
      this.handleDetail(this.props.eventEdit);
    } else if (this.props.saveEvent.isBackFromPreview) {
      this.props.confirmBackFromPreview();
      this.handleDetail(this.props.saveEvent.eventInfo);
    }
  }

  componentDidMount() {
    this.props.getEventTopic();
    this.props.getEventType();
    this.props.getLocation();
    this.props.getCity();
    this.props.getCountry();
  }

  componentWillReceiveProps(nextProps) {
    const { location } = nextProps.router;
    if (
      location.pathname === '/create' &&
      location.state &&
      location.state.prevPath === `/event/${location.state.eventID}/edit`
    ) {
      this.handleResetState();
    }
  }

  handleResetState() {
    this.setState({
      id: undefined,
      // details
      title: 'Create An Event',
      inputTitle: '',
      invalidTitle: false,
      disabledButton: true,
      // location
      locationName: '',
      houseNumber: '',
      street: '',
      ward: '',
      district: '',
      city: {
        key: 0,
        value: '',
      },
      country: {
        key: 0,
        value: '',
      },
      locationAddress: '',
      // location places autocomplete
      address: '',
      errorMessage: '',
      latitude: null,
      longitude: null,
      isGeocoding: false,
      // --time start event-- //
      dayStart: '',
      dayEnd: '',
      invalidDayStart: false,
      invalidDayEnd: false,
      // ---- //
      poster: null,
      imgSrc: '',
      isRemove: false,
      //
      eventDiscription: EditorState.createEmpty(),
      organizerName: '',
      organizerDiscription: EditorState.createEmpty(),
      // Ticket
      ticketType: '',
      ticketName: '',
      ticketPrice: 0,
      capacity: '',
      // Setting
      topic: null,
      type: null,
      // city suggestion
      citySearch: {
        isSearching: false,
        results: [],
        value: '',
      },
      // location suggestion
      locationSearch: {
        isSearching: false,
        results: [],
        value: '',
      },
      // add address
      isAdd: false,
      // publish event (invite require)
      isPublished: 'publish',
      openSaveConfirm: false,
      saveMessage: '',
      //
      publishMessage: '',
      openPublishConfirm: false,
    });
  }

  handleDetail(eventInfo) {
    this.setState({
      id: eventInfo.id || undefined,
      ticketName: eventInfo.ticketInfo ? eventInfo.ticketInfo[0].name : '',
      ticketType: 'FREE',
      capacity: eventInfo.ticketInfo ? eventInfo.ticketInfo[0].quantity : '',
      locationName: eventInfo.location ? eventInfo.location.title : '',
      houseNumber: eventInfo.location ? eventInfo.location.houseNumber : '',
      street: eventInfo.location ? eventInfo.location.street : '',
      ward: eventInfo.location ? eventInfo.location.ward : '',
      district: eventInfo.location ? eventInfo.location.district : '',
      city: eventInfo.location ? eventInfo.location.city : {key: 0, value: ''}, // for payload
      locationAddress: eventInfo.location ? eventInfo.location.address : '',
      mapLat: eventInfo.location ? eventInfo.location.mapLat : '',
      mapLong: eventInfo.location ? eventInfo.location.mapLong : '',
      latitude: eventInfo.location ? eventInfo.location.mapLat : null,
      longitude: eventInfo.location ? eventInfo.location.mapLong : null,
      citySearch: {
        ...this.state.citySearch,
        value:
        eventInfo.location && eventInfo.location.city && eventInfo.location.city.value
            ? eventInfo.location.city.value
            : '',
      }, // for display
      country: {
        key:
        eventInfo.location && eventInfo.location.country && eventInfo.location.country.key
            ? eventInfo.location.country.key
            : 0,
        value:
        eventInfo.location && eventInfo.location.country && eventInfo.location.country.value
            ? eventInfo.location.country.value
            : '',
      },
      title: eventInfo.title,
      inputTitle: eventInfo.title === 'Create An Event' ? '' : eventInfo.title,
      dayStart: eventInfo.dateFrom,
      dayEnd: eventInfo.dateTo,
      eventDiscription: EditorState.createWithContent(
        ContentState.createFromBlockArray(
          htmlToDraft(eventInfo.description).contentBlocks
        )
      ),
      organizerName: eventInfo.organizer ? eventInfo.organizer.name : '',
      organizerDiscription: eventInfo.organizer ? EditorState.createWithContent(
        ContentState.createFromBlockArray(
          htmlToDraft(eventInfo.organizer.description).contentBlocks
        )
      ) : EditorState.createEmpty(),
      type: eventInfo.eventType,
      topic: eventInfo.eventTopic,
      imgSrc:
        typeof eventInfo.poster === 'string'
          ? eventInfo.poster
          : typeof eventInfo.poster === 'undefined'
            ? ''
            : eventInfo.imgSrc,
      poster: typeof eventInfo.poster === 'string' ? null : eventInfo.poster,
      isRemove: eventInfo.poster || eventInfo.imgSrc,
      isAdd: true,
      disabledButton: false,
    });
  }

  async handleCreate() {
    await this.props.createEvent(this.state);
    if (this.props.saveEvent.isError) {
      this.setState({
        saveMessage: 'Save event fail!',
        openSaveConfirm: true,
      });
    } else {
      this.setState({
        saveMessage: 'Save event successfully!',
        openSaveConfirm: true,
      });
    }
  }

  handleSaveConfirm() {
    if (this.props.saveEvent.isError) {
      this.setState({ openSaveConfirm: false });
    } else {
      this.setState({ openSaveConfirm: false });
      browserHistory.push('/management');
    }
  }

  async handlePublish(event) {
    let createRes = {};
    let publishRes = {};
    const { eventEdit, publishedEvent } = this.props;
    // eslint-disable-next-line no-unused-expressions
    if (
      (eventEdit && eventEdit.id) ||
      (publishedEvent &&
        publishedEvent.contentEvent &&
        publishedEvent.contentEvent.id)
    ) {
      publishRes = await this.props.publish(event);
    } else {
      createRes = await this.handleCreate();
      publishRes = await this.props.publish(createRes.data);
    }
    // eslint-disable-indent
    if (this.props.publishedEvent.isError) {
      this.setState({
        publishMessage: `Fail to publish!! ${
          publishRes.payload ? publishRes.payload.msg : ''
        }`,
        openPublishConfirm: true
      })
    } else {
      this.setState({
        publishMessage: 'Publish successfully!',
        openPublishConfirm: true
      })
    }
  }

  handlePublishConfirm() {
    if (this.props.saveEvent.isError) {
      this.setState({ openPublishConfirm: false });
    } else {
      this.setState({ openPublishConfirm: false });
      browserHistory.push('/management');
    }
  }

  handlePreview() {
    this.props.preview(this.state);
  }

  handleChange(event, { name, value }) {
    return name === 'title'
      ? value !== ''
        ? this.setState({
            title: value,
            inputTitle: value,
            ticketName: value,
            invalidTitle: false,
            disabledButton: false,
          })
        : this.setState({
            title: 'Create An Event',
            inputTitle: '',
            ticketName: '',
            invalidTitle: true,
            disabledButton: true,
          })
      : this.setState({ [name]: value });
  }

  handleEventDiscription(editorState) {
    this.setState({ eventDiscription: editorState });
  }

  handleOrganizerDiscription(editorState) {
    this.setState({ organizerDiscription: editorState });
  }

  handleCitySelect(event, { result }) {
    this.setState({
      citySearch: { ...this.state.citySearch, value: result.title },
      city: {
        ...this.state.city,
        key: result.key,
        value: result.title,
      },
    });
  }

  handleCitySearch(event, { value }) {
    this.setState({
      citySearch: { ...this.state.citySearch, isSearching: true, value },
    });

    setTimeout(() => {
      if (this.state.citySearch.value.length < 1) {
        this.setState({
          citySearch: {
            ...this.state.citySearch,
            isSearching: false,
            value: '',
            results: [],
          },
        });
      }

      const content = new RegExp(
        _.escapeRegExp(this.state.citySearch.value),
        'i'
      );
      const isMatch = city => content.test(city.title);

      this.setState({
        citySearch: {
          ...this.state.citySearch,
          isSearching: false,
          results: _.filter(this.props.citySuggest.cities, isMatch),
        },
      });
    }, 500);
  }

  handleLocationSelect(event, { result }) {
    this.setState({
      locationName: result.locationName,
      houseNumber: result.houseNumber,
      mapLat: result.mapLat,
      mapLong: result.mapLong,
      street: result.street,
      ward: result.ward,
      district: result.district,
      city: {
        ...this.state.city,
        key: result.city.key,
        value: result.city.value,
      },
      country: {
        ...this.state.country,
        key: result.country.key,
        value: result.country.value,
      },
      locationSearch: { ...this.state.locationSearch, value: result.title },
      locationAddress: result.locationAddress,
    });
  }

  handleLocationSearch(event, { value }) {
    this.setState({
      locationSearch: {
        ...this.state.locationSearch,
        isSearching: true,
        value,
      },
    });

    setTimeout(() => {
      if (this.state.locationSearch.value.length < 1) {
        this.setState({
          locationSearch: {
            ...this.state.locationSearch,
            isSearching: false,
            value: '',
            results: [],
          },
        });
      }

      const content = new RegExp(
        _.escapeRegExp(this.state.locationSearch.value),
        'i'
      );
      const isMatch = location => content.test(location.title);

      this.setState({
        locationSearch: {
          ...this.state.locationSearch,
          isSearching: false,
          results: _.filter(this.props.locationSuggest.locations, isMatch),
        },
      });
    }, 500);
  }

  handleSelect(event, { name, value }) {
    switch (name) {
      case 'topicKey': {
        return this.setState({
          topic: this.props.eventTopic.topic
            .map(topic => {
              return {
                key: topic.key,
                value: topic.text,
              };
            })
            .filter(topic => topic.key === value)[0],
        });
      }
      case 'typeKey': {
        return this.setState({
          type: this.props.eventType.type
            .map(type => {
              return {
                key: type.key,
                value: type.text,
              };
            })
            .filter(type => type.key === value)[0],
        });
      }
      case 'countryKey': {
        return this.setState({
          country: this.props.countryOption.countries
            .map(country => {
              return {
                key: country.key,
                value: country.text,
              };
            })
            .filter(country => country.key === value)[0],
        });
      }
      default:
        return 0;
    }
  }

  handleDayStart(event) {
    this.setState({
      dayStart: event._d,
      invalidDayStart:
        moment(event._d).isSameOrAfter(this.state.dayEnd, 'minute') ||
        moment(event._d) < moment(Date.now()),
    });
  }

  handleDayEnd(event) {
    this.setState({
      dayEnd: event._d,
      invalidDayEnd:
        moment(event._d).isSameOrBefore(this.state.dayStart, 'minute') ||
        moment(event._d) < moment(Date.now()),
    });
  }

  handleUploadImage(event) {
    const file = event.target.files[0];
    this.setState({
      poster: file,
      imgSrc: window.URL.createObjectURL(file),
      isRemove: !this.state.isRemove,
    });
    event.target.value = null; // eslint-disable-line no-param-reassign
  }

  handleRemoveImage(event) {
    this.setState({
      poster: null,
      imgSrc: '',
      isRemove: !this.state.isRemove,
    });
    event.preventDefault();
  }

  handleAddAddress(event) {
    event.preventDefault();
    this.setState({ isAdd: !this.state.isAdd });
  }

  handleTicketType(event, { value }) {
    this.setState({ ticketType: value });
  }

  // handleStartSelling(event) {
  //   const day = event._d.toISOString();
  //   this.setState({ startSelling: day });
  // }

  // handleEndSelling(event) {
  //   const day = event._d.toISOString();
  //   this.setState({ endSelling: day });
  // }

  handleListingPrivacy(event, { value }) {
    this.setState({ isPublished: value });
  }

  handleLocationPlacesChange(address) {
    this.setState({
      address,
      errorMessage: '',
    });
  }

  handleLocationPlacesSelect(selected) {
    this.setState({ isGeocoding: true, address: selected });
    geocodeByAddress(selected)
      .then(res => getLatLng(res[0]))
      .then(({ lat, lng }) => {
        this.setState({
          latitude: lat,
          longitude: lng,
          isGeocoding: false,
          locationAddress: selected,
          mapLat: lat,
          mapLong: lng,
        });
      })
      .catch(error => {
        this.setState({ isGeocoding: false });
        console.log('error', error); // eslint-disable-line no-console
      });
  }

  handleLocationPlacesCloseClick() {
    this.setState({
      address: '',
      latitude: null,
      longitude: null,
      locationAddress: '',
      mapLat: null,
      mapLong: null,
    });
  }

  handleLocationPlacesError(status, clearSuggestions) {
    console.log('Error from Google Maps API', status); // eslint-disable-line no-console
    this.setState({ errorMessage: status }, () => {
      clearSuggestions();
    });
  }

  render() {
    const { saveEvent, eventTopic, eventType, countryOption } = this.props;
    const { isPreview } = this.props;
    return (
      <View
        handleCreate={this.handleCreate}
        handleCreateThenPush={this.handleCreateThenPush}
        handlePublish={this.handlePublish}
        handlePreview={this.handlePreview}
        handleChange={this.handleChange}
        handleSelect={this.handleSelect}
        handleEventDiscription={this.handleEventDiscription}
        handleOrganizerDiscription={this.handleOrganizerDiscription}
        // ---- //
        saveEvent={saveEvent}
        eventType={eventType}
        eventTopic={eventTopic}
        countryOption={countryOption}
        // --location-- //
        handleCitySelect={this.handleCitySelect}
        citySearch={this.state.citySearch}
        handleCitySearch={this.handleCitySearch}
        // --- //
        handleLocationSearch={this.handleLocationSearch}
        handleLocationSelect={this.handleLocationSelect}
        locationSearch={this.state.locationSearch}
        // --- //
        handleCountrySelect={this.handleCountrySelect}
        // --time-- //
        handleDayStart={this.handleDayStart}
        handleDayEnd={this.handleDayEnd}
        // --image-- //
        handleUploadImage={this.handleUploadImage}
        handleRemoveImage={this.handleRemoveImage}
        // --add address-- //
        handleAddAddress={this.handleAddAddress}
        isAdd={this.state.isAdd}
        // --ticket type-- //
        handleTicketType={this.handleTicketType}
        // --time start & end selling ticket-- //
        // handleStartSelling={this.handleStartSelling}
        // handleEndSelling={this.handleEndSelling}
        // --listing privacy-- //
        isPublished={this.state.isPublished}
        handleListingPrivacy={this.handleListingPrivacy}
        // image preview
        imgSrc={this.state.imgSrc}
        // preview mode
        isPreview={isPreview}
        //
        handleLocationPlacesChange={this.handleLocationPlacesChange}
        handleLocationPlacesSelect={this.handleLocationPlacesSelect}
        handleLocationPlacesCloseClick={this.handleLocationPlacesCloseClick}
        handleLocationPlacesError={this.handleLocationPlacesError}
        //
        handleSaveConfirm={this.handleSaveConfirm}
        //
        {...this.state}
        {...this.props}
      />
    );
  }
}

CreateEvent.propTypes = {
  // actions
  createEvent: T.func.isRequired,
  getEventTopic: T.func.isRequired,
  getEventType: T.func.isRequired,
  getLocation: T.func.isRequired,
  getCity: T.func.isRequired,
  getCountry: T.func.isRequired,
  // state
  create: T.shape({
    eventTopic: T.shape(),
    eventType: T.shape(),
    citySuggest: T.shape(),
    countryOption: T.shape(),
    locationSuggest: T.shape(),
  }),
};

export default CreateEvent;
