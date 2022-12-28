import { memo } from 'react';
import { useQuery } from 'urql';
import PropTypes from 'prop-types';
// import onError from '../utils/onError';
import Spinner from './Spinner';
import AddPin from './AddPin';
import PinListItem from './PinListItem';
import GET_ALL_PINS from '../graphql/GetAllPins.gql';
import GET_PINS from '../graphql/GetPins.gql';

// Show name if viewing certain user
const PinList = memo(function PinList(props) {
  const { userId, session } = props;
  const query = userId ? GET_PINS : GET_ALL_PINS;
  const [res] = useQuery({
    query,
    variables: {
      id: userId,
    },
    requestPolicy: 'cache-and-network',
  });

  if (res.fetching) {
    return <Spinner size={2} />;
  } if (res.error) {
    // onError(res.error);
    console.error(res.error);
  }
  const { data } = res;
  let screenName;
  if (userId !== undefined) {
    screenName = data.pins.length ? `${data.pins[0].user.name}'s Pins` : 'User has no pins';
  }
  const title = userId ? screenName : 'All Pins';
  return (
    <>
      <h1>{title}</h1>
      <div className="row" data-masonry='{"percentPosition": true }'>
        <AddPin session={session} />
        {data.pins.map((p) => (
        // Don't show pin name if showing wall
          <PinListItem
            key={p.id}
            userFiltered={userId !== undefined}
            session={session}
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...p}
          />
        ))}
      </div>
    </>
  );
});

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

export default PinList;
