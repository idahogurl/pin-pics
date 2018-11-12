import React from 'react';
import { Route, Switch } from 'react-router-dom';
import IndexScreen from './screens/Index';

const routes = (
  <Switch>
    <Route
      path="/:userId?"
      render={({ match }) => <IndexScreen userId={match.params.userId} />}
    />
  </Switch>
);

export default routes;
