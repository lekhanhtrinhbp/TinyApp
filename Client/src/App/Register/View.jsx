import React from 'react';
import T from 'prop-types';
import { Grid } from 'semantic-ui-react';
import TranslateTag from './../../components/TranslateTag';

import ResgisterForm from './FormRegister';

const Register = props => {
  return (
    <Grid>
      <Grid.Row style={{ justifyContent: `center` }}>
        <h1 style={{ paddingTop: `14px` }}>
          <TranslateTag lblKey="register" />
        </h1>
      </Grid.Row>

      <Grid.Row
        style={{ justifyContent: `center`, marginBottom: '12px' }}
        only="computer tablet"
        computer={16}
        tablet={16}
      >
        <ResgisterForm {...props} widthResponse="12" />
      </Grid.Row>
      <Grid.Row
        style={{ justifyContent: `center`, marginBottom: '12px' }}
        only="mobile"
        mobile={16}
      >
        <ResgisterForm {...props} widthResponse="12" />
      </Grid.Row>
    </Grid>
  );
};

Register.propTypes = {
  handleChange: T.func.isRequired,
  handleRegister: T.func.isRequired,
  handleInvalid: T.func.isRequired,
  handleOnValid: T.func.isRequired,
  handleCancel: T.func.isRequired,
  disableSubmit: T.bool,
};

export default Register;
