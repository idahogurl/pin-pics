// if (process.env.NODE_ENV==='development') {
//   // Must use require here as import statements are only allowed
//   // to exist at the top of a file.
//   require("preact/debug");
// }

import React from 'react';
import ReactDOM from 'react-dom';
import Router from 'preact-router';
import { Provider, Client, dedupExchange, cacheExchange, fetchExchange } from 'urql';
import IndexScreen from './screens/Index';
import { createRenderer } from 'fela';
import { RendererProvider } from 'react-fela';

const { document } = window;

const renderer = createRenderer();

const client = new Client({
  url: '/graphql',
  exchanges: [dedupExchange, cacheExchange, fetchExchange],
});

const App = () => (<Provider value={client}>
  <RendererProvider renderer={renderer}>
    <Router>
      <IndexScreen path="/:userId?" />
    </Router>
  </RendererProvider>
</Provider>);

ReactDOM.render(
 <App/>,
  document.getElementById('app'),
);
