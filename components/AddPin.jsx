import { memo } from 'react';
import PropTypes from 'prop-types';
import { Formik, Form, Field } from 'formik';
import { useMutation } from 'urql';
import cn from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import CREATE_PIN from '../graphql/CreatePin.gql';

import Spinner from './Spinner';

function AddPin({ session }) {
  const [res, executeMutation] = useMutation(CREATE_PIN);

  if (res.error) {
    throw res.error;
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
      onSubmit={async (values, actions) => {
        actions.setSubmitting(true);
        await executeMutation({ userId: session.user.id, imageUrl: values.imageUrl });
        actions.setSubmitting(false);
        actions.resetForm();
      }}
    >
      {({ isSubmitting, errors }) => (
        <div className="col-sm-6 col-lg-4 mb-4">
          <div className="card m-2 text-center" style={{ maxWidth: '18em' }}>
            <Form style={{ margin: 0 }}>
              <div className="card-body">
                <div className="form-group">
                  <h5 className="card-title">Add Pin</h5>
                  <p><FontAwesomeIcon icon={faPlusCircle} color="red" size="2x" /></p>
                  <Field type="text" name="imageUrl" placeholder="Image Url" className={cn('form-control', { 'is-invalid': errors.imageUrl })} required />
                  {errors.imageUrl && (
                  <span className="text-danger font-italic">
                    *
                    {errors.imageUrl}
                  </span>
                  )}
                </div>
              </div>
              <div className="card-footer">
                { session?.user.id ? (
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
        </div>
      )}
    </Formik>
  );
}

AddPin.propTypes = {
  session: PropTypes.shape({
    user: PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
    }),
  }),
};

AddPin.defaultProps = {
  session: undefined,
};

export default memo(AddPin);
