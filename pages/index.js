/* eslint-disable react/jsx-filename-extension */
import Head from 'next/head';
import { useSession } from 'next-auth/react';
import NavBar from '../components/NavBar';
import PinList from '../components/PinList';

export default function Home(pageProps) {
  const { urqlClient } = pageProps;
  const { data: session } = useSession();
  return (
    <>
      <Head>
        <title>Pin Pics</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header>
        <NavBar session={session} />
      </header>
      <main>
        <PinList client={urqlClient} />
      </main>
    </>
  );
}
