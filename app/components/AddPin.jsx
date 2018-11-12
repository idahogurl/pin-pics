import React from 'react';
import { Formik, Form, Field } from 'formik';
import { Mutation } from 'react-apollo';
import uuid from 'uuid/v4';

import CREATE_PIN from '../graphql/CreatePin.gql';

import onError from '../utils/onError';

import Spinner from './Spinner';

const AddPin = React.memo(() => (
  <Mutation mutation={CREATE_PIN}>
    {mutate => (
      <Formik
        initialValues={{ imageUrl: '' }}
        onSubmit={(values, actions) => {
          actions.setSubmitting(true);
          mutate({
            variables: {
              input: { pin: { id: uuid(), userId: sessionStorage.currentUser, ...values } },
            },
          })
            .then(() => {
              actions.setSubmitting(false);
              window.location.reload();
            })
            .catch((err) => {
              onError(err);
              actions.setSubmitting(false);
            });
        }}
        render={({ isSubmitting }) => (
          <div className="card m-2 text-center" style={{ maxWidth: '18em' }}>
            <Form style={{ margin: 0 }}>
              <div className="card-body">
                <h5 className="card-title">Add Pin</h5>
                <p><i className="fa fa-2x fa-plus-circle text-danger" aria-hidden="true" /></p>
                <Field type="text" name="imageUrl" placeholder="Image Url" />
              </div>
              <div className="card-footer">
                { 'currentUser' in sessionStorage ? (
                  <button className="btn btn-primary" type="submit">
                    {isSubmitting && <Spinner />} Save
                  </button>) :
                'Log in to save'
              }
              </div>
            </Form>
          </div>
        )}
      />
    )}
  </Mutation>
));

export default AddPin;
