import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'preact-router';
import { useMutation } from 'urql';

import DELETE_PIN from '../graphql/DeletePin.gql';

import onError from '../utils/onError';

import Spinner from './Spinner';

let errorCount = 0;
const imgError = function imgError(e) {
  // try 2 times?
  if (errorCount < 3) {
    e.target.src = 'https://via.placeholder.com/288x288?text=Image+Not+Found';
    errorCount += 1;
  }
};

class PinListItem extends PureComponent {
  onClick = this.onClick.bind(this);
  onClick() {
    const { id } = this.props;
    this.executeMutation({ input: { id } } )
      .then(() => {
        window.location.reload();
      });
  }

  render() {
    const { user, imageUrl } = this.props;
    const [res, executeMutation] = useMutation(DELETE_PIN);
    this.executeMutation = executeMutation;

    if (res.error) {
      onError(res.error);
    }
  
    // Allow delete if current user's pin
    return (
      <div className="card m-2 text-center" style={{ maxWidth: '18em' }}>
        <img src={imageUrl} className="card-img-top" alt="" onError={imgError} />
        <div className="card-body">
          <div className="card-text">
        Pinned by <Link href={`/${user.id}`}>@{user.screenName}</Link>
          </div>
        </div>
        {'currentUser' in sessionStorage && sessionStorage.currentUser === user.id && (
        <div className="card-footer">
          <button className="btn btn-danger" onClick={this.onClick}>
            {res.fetching && <Spinner />} Delete
          </button>
        </div>)}
      </div>);
  }
}

PinListItem.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.string.isRequired,
    screenName: PropTypes.string.isRequired,
  }).isRequired,
  id: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
};

export default PinListItem;
