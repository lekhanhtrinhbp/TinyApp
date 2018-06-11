import React from 'react';
import T from 'prop-types';
import {
  Button,
  Form,
  Checkbox,
  Header,
  Dropdown,
  Loader,
  Input,
  Grid,
  Segment,
  Responsive,
  Label,
  Confirm,
} from 'semantic-ui-react';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import Datetime from 'react-datetime';
import translate from 'components/Translate';
import { Link } from 'react-router';
import 'react-datetime/css/react-datetime.css';
import moment from 'moment';

import styles from './styles.css';
import TranslateTag from '../../components/TranslateTag';
import TicketType from './TicketType';
import Location from './Location';
import Poster from './Poster';
import SelectTicketType from './SelectTicketType';

const CreateEvent = props => {
  const {
    title,
    inputTitle,
    dayStart,
    dayEnd,
    eventDiscription,
    organizerName,
    organizerDiscription,
    type,
    topic,
  } = props;
  return (
    <div style={{ maxWidth: "80%", margin: "30px auto 50px auto" }}>
      {props.saveEvent.isLoading ? (
        <div>
          <Loader content="Loading" size="large" active />
        </div>
      ) : (
        <div className={styles.container}>
          <br />
          <Responsive
            {...Responsive.onlyComputer}
            minWidth={Responsive.onlyComputer.minWidth}
          >
            <Confirm
              open={props.openSaveConfirm}
              onConfirm={props.handleSaveConfirm}
              content={props.saveMessage}
              header="Notification"
              cancelButton={null}
            />
            <Confirm
              header="Notification"
              cancelButton={null}
              open={props.openPublishConfirm}
              onConfirm={props.handlePublishConfirm}
              content={props.publishMessage}
            />
            <Grid>
              <Grid.Row style={{ margin: `24px auto` }}>
                <Grid.Column
                  floated="left"
                  width="4"
                  className={styles.columnDisplay}
                >
                  <Header className={styles.eventTitlePC}>
                    {translate(title)}
                  </Header>
                </Grid.Column>
                {props.isDetail ? null : (
                  <Grid.Column
                    floated="right"
                    width="10"
                    textAlign="right"
                    className={styles.columnDisplay}
                  >
                    <div>
                      <Button
                        className={styles.buttonOnTop}
                        onClick={props.handleCreate}
                        disabled={props.invalidTitle || props.disabledButton}
                      >
                        <TranslateTag lblKey="save" />
                      </Button>
                      <Link to="preview" style={{ margin: 'auto 20px' }}>
                        <Button
                          className={styles.buttonOnTop}
                          onClick={props.handlePreview}
                          disabled={props.invalidTitle || props.disabledButton}
                        >
                          <TranslateTag lblKey="preview" />
                        </Button>
                      </Link>
                      <Button
                        className={styles.btnPublicOnBot}
                        onClick={() => props.handlePublish(props.eventEdit)}
                        disabled={props.invalidTitle || props.disabledButton}
                      >
                        <TranslateTag lblKey="make-your-event-live" />
                      </Button>
                    </div>
                  </Grid.Column>
                )}
              </Grid.Row>
            </Grid>
          </Responsive>
          <Responsive
            {...Responsive.onlyTablet}
            minWidth={Responsive.onlyTablet.minWidth}
          >
            <Grid>
              <Grid.Row textAlign="center" style={{ margin: `24px` }}>
                <Grid.Column>
                  <Header className={styles.eventTitleMB}>
                    {translate(title)}
                  </Header>
                  <div className={styles.columnDisplay}>
                    <Button
                      className={styles.buttonOnTop}
                      onClick={props.handleCreate}
                      disabled={props.invalidTitle || props.disabledButton}
                    >
                      <i className="fa fa-check" />
                    </Button>
                    <Link to="preview">
                      <Button
                        className={styles.buttonOnTop}
                        onClick={props.handlePreview}
                        disabled={props.invalidTitle || props.disabledButton}
                      >
                        <i className="fa fa-eye" />
                      </Button>
                    </Link>
                    <Button
                      className={styles.buttonOnTop}
                      onClick={() =>
                        props.handlePublish(props.saveEvent.eventInfo)
                      }
                      disabled={props.invalidTitle || props.disabledButton}
                    >
                      <i className="fa fa-upload" />
                    </Button>
                  </div>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Responsive>
          <Responsive
            {...Responsive.onlyMobile}
            minWidth={Responsive.onlyMobile.minWidth}
          >
            <div style={{ textAlign: `center`, margin: `24px auto` }}>
              <div style={{ justifyContent: `center` }}>
                <Header className={styles.eventTitleMB}>
                  {translate(title)}
                </Header>
                <div className={styles.columnDisplay}>
                  <Button
                    className={styles.buttonOnTop}
                    onClick={props.handleCreate}
                    disabled={props.invalidTitle || props.disabledButton}
                  >
                    <i className="fa fa-check" />
                  </Button>
                  <Link to="preview">
                    <Button
                      className={styles.buttonOnTop}
                      onClick={props.handlePreview}
                      disabled={props.invalidTitle || props.disabledButton}
                    >
                      <i className="fa fa-eye" />
                    </Button>
                  </Link>
                  <Button
                    className={styles.buttonOnTop}
                    onClick={() =>
                      props.handlePublish(props.saveEvent.eventInfo)
                    }
                    disabled={props.invalidTitle || props.disabledButton}
                  >
                    <i className="fa fa-upload" />
                  </Button>
                </div>
              </div>
            </div>
          </Responsive>
          <Segment inverted className={styles.segmentTitle}>
            <TranslateTag lblKey="event-details" />
          </Segment>
          <Grid>
            <Grid.Row>
              <Grid.Column>
                <div>
                  <TranslateTag lblKey="event-title" />
                </div>
                <Form>
                  <Form.Field>
                    <Input
                      className={styles.input}
                      placeholder={translate('give-a-short-distinct-name')}
                      name="title"
                      onChange={props.handleChange}
                      value={inputTitle || ''}
                    />
                    {props.invalidTitle ? (
                      <Label
                        color="red"
                        content={<TranslateTag lblKey="title-is-not-empty" />}
                        style={{ marginTop: '6px' }}
                      />
                    ) : null}
                  </Form.Field>
                </Form>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row only="computer tablet" computer={16} tablet={16}>
              <Grid.Column>
                <div>
                  <TranslateTag lblKey="location" />
                </div>
                <Location {...props} />
              </Grid.Column>
            </Grid.Row>
            <Grid.Row only="mobile" mobile={16}>
              <Grid.Column>
                <div>
                  <TranslateTag lblKey="location" />
                </div>
                <Location {...props} isMobile />
              </Grid.Column>
            </Grid.Row>
            <Grid.Row
              only="computer tablet"
              computer={16}
              tablet={16}
              style={{ display: `flex`, marginBottom: `6px` }}
            >
              <Grid.Column style={{ flex: '1', paddingRight: '2px' }}>
                <div>
                  <TranslateTag lblKey="start" />
                </div>
                <Form>
                  <Datetime
                    className={styles.input}
                    onChange={props.handleDayStart}
                    inputProps={{
                      placeholder: 'From day',
                      value: props.dayStart
                        ? moment(props.dayStart).format('DD/MM/YYYY, h:mm A')
                        : '',
                    }}
                    isValidDate={currentDate => {
                      return currentDate.isAfter(
                        Datetime.moment().subtract(1, 'day')
                      );
                    }}
                  />
                </Form>
                {props.invalidDayStart ? (
                  <Label
                    color="red"
                    content={<TranslateTag lblKey="invalid-date-start" />}
                    style={{ marginTop: '6px' }}
                  />
                ) : null}
              </Grid.Column>
              <Grid.Column style={{ flex: '1', paddingLeft: '8px' }}>
                <div>
                  <TranslateTag lblKey="end" />
                </div>
                <Form>
                  <Datetime
                    className={styles.input}
                    onChange={props.handleDayEnd}
                    inputProps={{
                      placeholder: 'To day',
                      value: props.dayEnd
                        ? moment(props.dayEnd).format('DD/MM/YYYY, h:mm A')
                        : '',
                    }}
                    isValidDate={currentDate => {
                      return currentDate.isAfter(
                        Datetime.moment().subtract(1, 'day')
                      );
                    }}
                  />
                </Form>
                {props.invalidDayEnd ? (
                  <Label
                    color="red"
                    content={<TranslateTag lblKey="invalid-date-end" />}
                    style={{ marginTop: '6px' }}
                  />
                ) : null}
              </Grid.Column>
            </Grid.Row>
            <Responsive {...Responsive.onlyMobile} style={{ width: '100%' }}>
              <Grid.Row style={{ display: 'block' }}>
                <Grid.Column style={{ marginBottom: '12px' }}>
                  <div>
                    <TranslateTag lblKey="start" />
                  </div>
                  <Form>
                    <Datetime
                      className={styles.input}
                      onChange={props.handleDayStart}
                      inputProps={{
                        placeholder: 'From day',
                        value: props.dayStart
                          ? moment(props.dayStart).format('DD/MM/YYYY, h:mm A')
                          : '',
                      }}
                      isValidDate={currentDate => {
                        return currentDate.isAfter(
                          Datetime.moment().subtract(1, 'day')
                        );
                      }}
                    />
                  </Form>
                  {props.invalidDayStart ? (
                    <Label
                      color="red"
                      content={<TranslateTag lblKey="invalid-date-start" />}
                      style={{ marginTop: '6px' }}
                    />
                  ) : null}
                </Grid.Column>
                <Grid.Column>
                  <div>
                    <TranslateTag lblKey="end" />
                  </div>
                  <Form>
                    <Datetime
                      className={styles.input}
                      placeholder="To day"
                      onChange={props.handleDayEnd}
                      inputProps={{
                        placeholder: 'To day',
                        value: props.dayEnd
                          ? moment(props.dayEnd).format('DD/MM/YYYY, h:mm A')
                          : '',
                      }}
                      isValidDate={currentDate => {
                        return currentDate.isAfter(
                          Datetime.moment().subtract(1, 'day')
                        );
                      }}
                    />
                  </Form>
                  {props.invalidDayEnd ? (
                    <Label
                      color="red"
                      content={<TranslateTag lblKey="invalid-date-end" />}
                      style={{ marginTop: '6px' }}
                    />
                  ) : null}
                </Grid.Column>
              </Grid.Row>
            </Responsive>
            {/* Image Preview */}
            <Grid.Row only="computer tablet" computer={16} tablet={16}>
              <Grid.Column>
                <Poster {...props} />
              </Grid.Column>
            </Grid.Row>
            <Grid.Row only="mobile" mobile={16}>
              <Grid.Column>
                <Poster {...props} />
              </Grid.Column>
            </Grid.Row>
            {/* Event description */}
            <Grid.Row>
              <Grid.Column width="16">
                <Form>
                  <Form.Field>
                    <div>
                      <TranslateTag lblKey="event-description" />
                    </div>
                    <Segment>
                      <Editor
                        editorState={eventDiscription}
                        editorClassName={styles.editor}
                        toolbarClassName={styles.toolbar}
                        onEditorStateChange={props.handleEventDiscription}
                        toolbar={{
                          options: [
                            'inline',
                            'blockType',
                            'list',
                            'textAlign',
                            'colorPicker',
                            'link',
                          ],
                        }}
                      />
                    </Segment>
                  </Form.Field>
                </Form>
              </Grid.Column>
            </Grid.Row>
            {/* Organizer */}
            <Grid.Row>
              <Grid.Column width="16">
                <Form>
                  <Form.Field>
                    <div>
                      <TranslateTag lblKey="organizer-name" />
                    </div>
                    <Input
                      type="text"
                      placeholder={translate('who-is-organizing-this-event')}
                      name="organizerName"
                      onChange={props.handleChange}
                      className={styles.input}
                      value={organizerName}
                    />
                  </Form.Field>
                </Form>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column width="16">
                <Form>
                  <Form.Field>
                    <div>
                      <TranslateTag lblKey="organizer-description" />
                    </div>
                    <Segment>
                      <Editor
                        editorState={organizerDiscription}
                        editorClassName={styles.editor}
                        toolbarClassName={styles.toolbar}
                        onEditorStateChange={props.handleOrganizerDiscription}
                        toolbar={{
                          options: [
                            'inline',
                            'blockType',
                            'list',
                            'textAlign',
                            'colorPicker',
                            'link',
                          ],
                        }}
                      />
                    </Segment>
                  </Form.Field>
                </Form>
              </Grid.Column>
            </Grid.Row>
          </Grid>
          <Segment inverted className={styles.segmentTitle}>
            <TranslateTag lblKey="ticket" />
          </Segment>
          <Grid>
            <Grid.Row textAlign="right">
              <Grid.Column className={styles.reverseSeating}>
                <label>
                  <TranslateTag lblKey="reserved-seating" />
                </label>
                <Checkbox toggle />
              </Grid.Column>
            </Grid.Row>
            <Grid.Row
              textAlign="center"
              only="computer tablet"
              computer={16}
              tablet={16}
            >
              <SelectTicketType {...props} />
            </Grid.Row>
            <Grid.Row textAlign="center" only="mobile" mobile={16}>
              <SelectTicketType {...props} />
            </Grid.Row>
            <Grid.Row only="computer tablet" computer={16} tablet={16}>
              <Grid.Column>
                {props.ticketType === '' ? null : (
                  <TicketType {...props} isMobile="false" />
                )}
              </Grid.Column>
            </Grid.Row>
            <Grid.Row only="mobile" mobile={16}>
              <Grid.Column>
                {props.ticketType === '' ? null : (
                  <TicketType {...props} isMobile="true" />
                )}
              </Grid.Column>
            </Grid.Row>
          </Grid>
          <Segment inverted className={styles.segmentTitle}>
            <TranslateTag lblKey="additional-setting" />
          </Segment>
          <Grid>
            <Grid.Row>
              <Grid.Column width="12">
                <Form className={styles.listingPrivacy}>
                  <div>
                    <TranslateTag lblKey="listing-privacy" />
                  </div>
                  <br />
                  <Form.Field>
                    <Checkbox
                      radio
                      label={translate('publish')}
                      value="publish"
                      checked={props.isPublished === 'publish'}
                      onChange={props.handleListingPrivacy}
                    />
                  </Form.Field>
                  <Form.Field>
                    <Checkbox
                      radio
                      label={translate('private')}
                      value="private"
                      checked={props.isPublished === 'private'}
                      onChange={props.handleListingPrivacy}
                    />
                  </Form.Field>
                </Form>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column>
                {props.isPublished === 'publish' ? (
                  <Form>
                    <Form.Field>
                      <div>
                        <TranslateTag lblKey="event-type" />
                      </div>
                      <Dropdown
                        className={styles.dropdown}
                        name="typeKey"
                        placeholder={translate('select-type')}
                        selection
                        options={props.eventType.type}
                        onChange={props.handleSelect}
                        text={type ? type.value : ''}
                      />
                    </Form.Field>
                    <Form.Field>
                      <div>
                        <TranslateTag lblKey="event-topic" />
                      </div>
                      <Dropdown
                        className={styles.dropdown}
                        name="topicKey"
                        placeholder={translate('select-topic')}
                        selection
                        options={props.eventTopic.topic}
                        onChange={props.handleSelect}
                        text={topic ? topic.value : ''}
                      />
                    </Form.Field>
                  </Form>
                ) : null}
              </Grid.Column>
            </Grid.Row>
            {props.isDetail ? null : (
              <Grid.Row textAlign="center">
                <Grid.Column className={styles.buttonGroupBtn}>
                  <Button
                    className={styles.buttonOnTop}
                    onClick={props.handleCreate}
                    disabled={props.invalidTitle || props.disabledButton}
                  >
                    <TranslateTag lblKey="save" />
                  </Button>
                  <Link to="preview">
                    <Button
                      className={styles.buttonOnTop}
                      onClick={props.handlePreview}
                      disabled={props.invalidTitle || props.disabledButton}
                    >
                      <TranslateTag lblKey="preview" />
                    </Button>
                  </Link>
                  <Button
                    className={styles.btnPublicOnBot}
                    onClick={() => props.handlePublish(props.eventEdit)}
                    disabled={props.invalidTitle || props.disabledButton}
                  >
                    <TranslateTag lblKey="make-your-event-live" />
                  </Button>
                </Grid.Column>
              </Grid.Row>
            )}
          </Grid>
          <br />
        </div>
      )}
    </div>
  );
};

CreateEvent.propTypes = {
  imgSrc: T.string,
  title: T.string,
  handleCreate: T.func.isRequired,
  handleChange: T.func.isRequired,
  handleSelect: T.func.isRequired,
  handleEventDiscription: T.func.isRequired,
  handleOrganizerDiscription: T.func.isRequired,
  saveEvent: T.shape(),
  eventType: T.shape(),
  eventTopic: T.shape(),
  countryOption: T.shape(),
  handleDayStart: T.func.isRequired,
  handleDayEnd: T.func.isRequired,
  handleUploadImage: T.func.isRequired,
  isAdd: T.bool,
  handleTicketType: T.func.isRequired,
  ticketType: T.string,
  // handleStartSelling: T.func.isRequired,
  // handleEndSelling: T.func.isRequired,
  isPublished: T.string,
  handleListingPrivacy: T.func.isRequired,
  handlePreview: T.func.isRequired,
  handlePublish: T.func.isRequired,
  isPreview: T.bool,
  topic: T.shape(),
  type: T.shape(),
  organizerDiscription: T.shape(),
  organizerName: T.string,
  eventDiscription: T.shape(),
  dayEndDisplay: T.string,
  dayStartDisplay: T.string,
  inputTitle: T.string,
  isMobile: T.bool,
};

TicketType.propTypes = {
  ticketName: T.string,
  capacity: T.number,
  ticketPrice: T.string,
  handleChange: T.func.isRequired,
  ticketType: T.string,
  isMobile: T.bool,
};

Location.propTypes = {
  isMobile: T.bool,
  handleChange: T.func.isRequired,
  countryOption: T.shape({
    countries: T.array,
  }),
  citySearch: T.shape({
    results: T.array,
    isSearching: T.bool,
  }),
  locationSearch: T.shape({
    results: T.array,
    isSearching: T.bool,
  }),
  handleCitySearch: T.func.isRequired,
  handleCitySelect: T.func.isRequired,
  handleAddAddress: T.func.isRequired,
  handleLocationSearch: T.func.isRequired,
  handleLocationSelect: T.func.isRequired,
  isAdd: T.bool,
  country: T.shape(),
  houseNumber: T.string,
  street: T.string,
  ward: T.string,
  district: T.string,
  locationName: T.string,
  handleSelect: T.func.isRequired,
};

export default CreateEvent;
