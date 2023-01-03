import Head from 'next/head';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';

import NavBar from '../../components/NavBar';
import PinList from '../../components/PinList';

export default function MyPins() {
  const router = useRouter();
  const { data: session } = useSession();
  const { userId } = router.query;

  return (
    <>
      <Head>
        <title>Pin Pics</title>
      </Head>
      <header>
        <NavBar session={session} />
      </header>
      <main>
        <PinList userId={userId} session={session} />
      </main>
    </>
  );
}
