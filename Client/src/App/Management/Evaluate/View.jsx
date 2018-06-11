import React from "react";
import T from "prop-types";
// import StarsRating from "react-stars-rating";
import StarsRating from "react-star-rating-meter";
import translate from "components/Translate";
import {
  Responsive,
  Segment,
  Grid,
  Header,
  Form,
  Input,
  Button
} from "semantic-ui-react";
import styles from "./styles.css";

import TranslateTag from "./../../../components/TranslateTag";

const Evaluate = props => {
  const { comment, rating } = props;
  return (
    <div>
      <Segment>
        <Grid>
          <Grid.Row>
            <Grid.Column width="16">
              <Form>
                <Form.Field>
                  <div>
                    <TranslateTag lblKey="rating" />
                  </div>
                  <StarsRating
                    name="rate"
                    meterEmptyColor="#ffffff"
                    meterSelectColor="#f9ffbf"
                    meterBorderColor="#ffffff"
                    starSelectColor="#fffc56"
                    highlightColor="#f2ee21"
                    starSize={35}
                    totalStars={5}
                    rating={rating}
                    getRating={props.getRating}
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
                    <TranslateTag lblKey="comment" />
                  </div>
                  <Input
                    type="text"
                    placeholder={translate("comment")}
                    name="comment"
                    onChange={props.onChange}
                    className={styles.input}
                  />
                </Form.Field>
              </Form>
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <div className={styles.btnCancel}>
          <Button
            onClick={() =>
              props.submitEvaluate({
                comment: props.comment,
                rating: props.rating,
                eventId: props.eventId
              })
            }
            color="green"
          >
            <TranslateTag lblKey="save" />
          </Button>
          <Button onClick={() => props.cancelFunc()} color="orange">
            <TranslateTag lblKey="cancel" />
          </Button>
        </div>
      </Segment>
    </div>
  );
};

Evaluate.propTypes = {
  comment: T.string,
  rating: T.number.isRequired,
  eventId: T.number.isRequired,
  submitEvaluate: T.func.isRequired
};
export default Evaluate;
