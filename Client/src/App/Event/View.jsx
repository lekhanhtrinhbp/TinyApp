import T from 'prop-types';
import React from 'react';
import { Grid, Loader, Container, Confirm } from 'semantic-ui-react';

import Checkout from './Checkout';
import CardEvent from './Card';

const View = props => {
  return (
    <div style={{ maxWidth: '80%', margin: '30px auto 50px auto' }}>
      {props.isLoading || props.saveEvent.isLoadingPreview ? (
        <div>
          <Loader content="Loading" size="large" active />
        </div>
      ) : props.isPreview ? (
        <Container style={{ minHeight: '120vh' }}>
          <Grid>
            <Grid.Row only="computer tablet" computer={16} tablet={16}>
              <Grid.Column>
                <CardEvent
                  {...props.eventInfo}
                  handleBackFromPreview={props.handleBackFromPreview}
                  toggle={props.toggle}
                  bookmarks={props.bookmarks}
                  priceTagSize="large"
                  isPreview
                />
                {props.isRegist && (
                  <Checkout
                    toggle={props.toggle}
                    checkout={props.checkout}
                    {...props}
                  />
                )}
              </Grid.Column>
            </Grid.Row>
            <Grid.Row only="mobile" mobile={16}>
              <CardEvent
                {...props.eventInfo}
                handleBackFromPreview={props.handleBackFromPreview}
                toggle={props.toggle}
                bookmarks={props.bookmarks}
                priceTagSize={window.screen.width < 415 ? 'mini' : 'small'}
                mobileMode
                isPreview
              />
              {props.isRegist && (
                <Checkout
                  toggle={props.toggle}
                  checkout={props.checkout}
                  {...props}
                />
              )}
            </Grid.Row>
          </Grid>
        </Container>
      ) : props.isDetail ? (
        <Container style={{ minHeight: '120vh' }}>
          <Confirm
            header="Notification"
            onConfirm={props.handleConfirmCheckout}
            open={props.openCheckoutConfirm}
            content={props.checkoutMessage}
            cancelButton={null}
          />
          <Grid>
            <Grid.Row only="computer tablet" computer={16} tablet={16}>
              <CardEvent
                {...props.event}
                toggle={props.toggle}
                bookmarks={props.bookmarks}
                handleOpenCheckoutConfirm={props.handleOpenCheckoutConfirm}
                priceTagSize="large"
              />
              {props.isRegist && (
                <Checkout
                  toggle={props.toggle}
                  checkout={props.checkout}
                  {...props}
                />
              )}
            </Grid.Row>
            <Grid.Row only="mobile" mobile={16}>
              <CardEvent
                {...props.event}
                toggle={props.toggle}
                bookmarks={props.bookmarks}
                priceTagSize={window.screen.width < 415 ? 'mini' : 'small'}
                handleOpenCheckoutConfirm={props.handleOpenCheckoutConfirm}
                mobileMode
              />
              {props.isRegist && (
                <Checkout
                  toggle={props.toggle}
                  checkout={props.checkout}
                  {...props}
                />
              )}
            </Grid.Row>
          </Grid>
        </Container>
      ) : null}
    </div>
  );
};

View.propTypes = {
  eventInfo: T.shape(),
  location: T.shape(),
  tags: T.arrayOf(T.object),
  contentOverview: T.string,
  ticketType: T.string,
  priceFrom: T.number,
  priceTo: T.number,
  organizer: T.shape(),
  title: T.string,
  dateFrom: T.string,
  poster: T.string,
  isDetail: T.bool,
  toggle: T.func.isRequired,
  isRegist: T.bool,
  checkoutSuccess: T.bool,
  isPreview: T.bool,
  saveEvent: T.shape(),
  loading: T.bool,
};

export default View;
