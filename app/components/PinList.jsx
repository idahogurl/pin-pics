import React, { Fragment, memo } from 'react';
import GET_PINS from '../graphql/GetPins.gql';
import onError from '../utils/onError';
import Spinner from './Spinner';
import AddPin from '../components/AddPin';
import PinListItem from './PinListItem';
import { useQuery } from 'urql';

// Show name if viewing certain user
const PinList = memo((props) => {
  const { userId } = props;
  const where = userId === '' ? '{}' : `{"userId": "${userId}"}`;
  const [res] = useQuery({
    query: GET_PINS,
    variables: { where },
    requestPolicy: 'cache-and-network'
  });

  if (res.fetching) {
    return <Spinner size={2} />;
  } else if (res.error) {
    onError(res.error);
  }
  const { data } = res;

  let screenName;
  if (userId !== '') {
    screenName = data.pins.length ? `${data.pins[0].user.screenName}'s Pins` : 'User has no pins';
  }
  return (
    <Fragment>
      <h1>{screenName}</h1>
      <div className="card-columns">
        <AddPin />
        {data.pins.map(p => (
        // Don't show pin name if showing wall
          <PinListItem
            key={p.id}
            userFiltered={userId !== ''}
            {...p}
          />
      ))}
      </div>
    </Fragment>
  );
});

export default PinList;
