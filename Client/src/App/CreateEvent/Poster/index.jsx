import React from 'react';
import { Form, Segment, Icon } from 'semantic-ui-react';

import TranslateTag from '../../../components/TranslateTag';
import styles from './styles.css';

const Poster = props => {
  return (
    <Form>
      <div>
        <TranslateTag lblKey="add-image" />
      </div>
      <br />
      <input
        multiple
        className={styles.inputFile}
        name="myFile"
        accept="image/*"
        type="file"
        onChange={props.handleUploadImage}
        id="fileInput"
      />
      <Form.Field>
        <Segment className={styles.segmentImage}>
          {props.imgSrc === '' ? (
            <label htmlFor="fileInput" className={styles.labelInput}>
              <i className="fa fa-camera" />
              <TranslateTag lblKey="choose-a-poster" />
            </label>
          ) : (
            <img
              src={props.imgSrc}
              alt="preview"
              className={styles.imagePreview}
            />
          )}
        </Segment>
      </Form.Field>
      {props.isRemove ? (
        <div className={styles.remove}>
          <a
            href="#"
            onClick={props.handleRemoveImage}
            className={styles.removeButton}
          >
            <Icon name="trash alternate" size="small" />
            <TranslateTag lblKey="remove-poster" />
          </a>
        </div>
      ) : null}
      <div className={styles.recommend}>
        <span>
          <TranslateTag lblKey="recommend" />
        </span>
      </div>
    </Form>
  );
};

export default Poster;
