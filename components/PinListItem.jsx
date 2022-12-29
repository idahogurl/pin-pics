import { memo } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
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

function PinListItem({
  session, user, id, image_url: imageUrl, setImagesLoaded, showPinnerName,
}) {
  const [res, executeMutation] = useMutation(DELETE_PIN);

  if (res.error) {
    onError(res.error);
  }

  // Allow delete if current user's pin
  return (
    <div className="col-sm-6 col-lg-4 mb-4">
      <div className="card m-2 text-center" style={{ maxWidth: '18em' }}>
        <img
          src={imageUrl}
          className="card-img-top"
          alt=""
          onError={imgError}
          onLoad={() => {
            setImagesLoaded((v) => v + 1);
          }}
        />
        <div className="card-body">
          {showPinnerName && (
            <div className="card-text">
              Pinned by
              {' '}
              <Link href={`/pins/${user.id}`}>
                @
                {user.name}
              </Link>
            </div>
          )}
        </div>
        {!showPinnerName && session?.user.id === user.id && (
          <div className="card-footer">
            <button
              type="button"
              className="btn btn-danger"
              onClick={async () => {
                await executeMutation({ id });
                setImagesLoaded((v) => v - 1);
              }}
            >
              {res.fetching && <Spinner />}
              {' '}
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

PinListItem.propTypes = {
  session: PropTypes.shape({
    user: PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
    }),
  }),
  user: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
  id: PropTypes.string.isRequired,
  image_url: PropTypes.string.isRequired,
  setImagesLoaded: PropTypes.func.isRequired,
  showPinnerName: PropTypes.bool.isRequired,
};

PinListItem.defaultProps = {
  session: undefined,
};

export default memo(PinListItem);
