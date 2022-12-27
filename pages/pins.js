import Head from 'next/head';
import { useSession } from 'next-auth/react';
import NavBar from '../components/NavBar';

export default function Home() {
  const { data: session } = useSession();
  return (
    <>
      <Head>
        <title>Pin Pics</title>
      </Head>
      <header>
        <NavBar session={session} />
      </header>
      <main>
        {/* <PinList userId={props.userId} /> */}
      </main>
    </>
  );
}
