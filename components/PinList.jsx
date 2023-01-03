import { memo, useEffect, useState } from 'react';
import { useQuery } from 'urql';
import PropTypes from 'prop-types';
import Spinner from './Spinner';
import AddPin from './AddPin';
import PinListItem from './PinListItem';
import GET_ALL_PINS from '../graphql/GetAllPins.gql';
import GET_PINS from '../graphql/GetPins.gql';

async function loadMasonry() {
  const Masonry = (await import('masonry-layout')).default;
  const msnry = new Masonry('.row', {});
  msnry.reloadItems();
}
function PinList(props) {
  const { userId, session } = props;

  const query = userId ? GET_PINS : GET_ALL_PINS;
  const [res] = useQuery({
    query,
    variables: {
      id: userId,
    },
    requestPolicy: 'cache-and-network',
  });

  const { fetching, data, error } = res;

  const [imagesLoaded, setImagesLoaded] = useState(0);

  useEffect(() => {
    if (data && imagesLoaded === data.pins.length) {
      loadMasonry();
    }
  }, [imagesLoaded, data]);

  if (fetching) {
    return <Spinner size={2} />;
  } if (error) {
    throw error;
  }

  let screenName;
  if (userId !== undefined) {
    screenName = data.pins[0] ? `${data.pins[0].user.name}'s Pins` : 'User has no pins';
  }
  const title = userId ? screenName : 'All Pins';
  return (
    <>
      <h1>{title}</h1>
      <div className="row" data-masonry='{"percentPosition": true }'>
        <AddPin session={session} />
        {data.pins[0] && data.pins.map((p) => (
          <PinListItem
            key={p.id}
            userFiltered={userId !== undefined}
            session={session}
            setImagesLoaded={setImagesLoaded}
            showPinnerName={userId === undefined}
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...p}
          />
        ))}
      </div>
    </>
  );
}

PinList.propTypes = {
  userId: PropTypes.string,
  session: PropTypes.shape({
    user: PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
    }),
  }),
};

PinList.defaultProps = {
  userId: undefined,
  session: undefined,
};

export default memo(PinList);
