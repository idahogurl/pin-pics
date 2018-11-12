import React, { Fragment } from 'react';
import { Query } from 'react-apollo';
import GET_PINS from '../graphql/GetPins.gql';
import onError from '../utils/onError';
import Spinner from './Spinner';
import AddPin from '../components/AddPin';
import PinListItem from './PinListItem';

// Show name if viewing certain user
const PinList = React.memo((props) => {
  const { userId } = props;
  const where = userId === undefined ? '{}' : `{"userId": "${userId}"}`;

  return (
    <Query query={GET_PINS} variables={{ where }} fetchPolicy="network-only">
      {({ data, loading, error }) => {
      if (error) onError(error);
      if (loading) return <Spinner size="2" />;

      let screenName;
      if (userId !== undefined) {
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
                userFiltered={userId !== undefined}
                {...p}
              />
          ))}
          </div>
        </Fragment>
      );
    }}
    </Query>
  );
});

export default PinList;
