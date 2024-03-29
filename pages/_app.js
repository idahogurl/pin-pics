/* eslint-disable react/prop-types, react/jsx-props-no-spreading */
import { config } from '@fortawesome/fontawesome-svg-core';
import Head from 'next/head';
import { SessionProvider } from 'next-auth/react';
import { withUrqlClient } from 'next-urql';

import '@fortawesome/fontawesome-svg-core/styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/globals.css';

import ErrorBoundary from '../components/ErrorBoundary';

config.autoAddCss = false;

function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <SessionProvider session={pageProps.session}>
        <ErrorBoundary><Component {...pageProps} /></ErrorBoundary>
      </SessionProvider>
    </>
  );
}

export default withUrqlClient(() => ({
  url: process.env.NEXT_PUBLIC_STEPZEN_ENDPOINT,
  fetchOptions: {
    headers: { authorization: `Apikey ${process.env.NEXT_PUBLIC_STEPZEN_API_KEY}` },
  },
}))(App);
