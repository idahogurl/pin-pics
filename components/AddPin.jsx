import React, { memo } from 'react';
import { Formik, Form, Field } from 'formik';
import { useMutation } from 'urql';
import uuid from 'uuid/v4';
import cn from 'classnames';
import CREATE_PIN from '../graphql/CreatePin.gql';

import onError from '../utils/onError';

import Spinner from './Spinner';

export default memo(function AddPin() {
  const [res, executeMutation] = useMutation(CREATE_PIN);

  if (res.error) {
    onError(res.error);
  }

  return (
    <Formik
      initialValues={{ imageUrl: '' }}
      validateOnBlur={false}
      validateOnChange={false}

      validate={(values) => {
        const errors = {};
        if (values.imageUrl.trim() === '') errors.imageUrl = 'Field is required';

        return errors;
      }}
      onSubmit={(values, actions) => {
        actions.setSubmitting(true);
        executeMutation({
          input: { pin: { id: uuid(), userId: sessionStorage.currentUser, ...values } },
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
    >
      {({ isSubmitting, errors }) => (
        <div className="card m-2 text-center" style={{ maxWidth: '18em' }}>
          <Form style={{ margin: 0 }}>
            <div className="card-body">
              <div className="form-group">
                <h5 className="card-title">Add Pin</h5>
                <p><i className="fa fa-2x fa-plus-circle text-danger" aria-hidden="true" /></p>
                <Field type="text" name="imageUrl" placeholder="Image Url" className={cn('form-control', { 'is-invalid': errors.imageUrl })} required="true" />
                {errors.imageUrl && (
                <span className="text-danger font-italic">
                  *
                {errors.imageUrl}
                </span>
                )}
              </div>
            </div>
            <div className="card-footer">
              { 'currentUser' in sessionStorage ? (
                <button className="btn btn-primary" type="submit">
                  {isSubmitting && <Spinner />}
                  {' '}
                  Save
                </button>
              )
                : 'Log in to save'}
            </div>
          </Form>
        </div>
      )}
    </Formik>
  );
});
