import Head from 'next/head';
import Layout from '../components/Layout';
// import Link from 'next/link';
import nextCookies from 'next-cookies';
import { GetServerSidePropsContext } from 'next';
import { isSessionTokenValid } from '../util/auth';

type Props = { loggedIn: boolean };

export default function SeeYouSoon(props: Props) {
  return (
    <div>
      <Layout loggedIn={props.loggedIn}>
        <Head>
          <title>Welcome!</title>
        </Head>
        <main>
          <h1>See you soon!</h1>
        </main>
      </Layout>
    </div>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { session: token } = nextCookies(context);
  const loggedIn = await isSessionTokenValid(token);

  if (await isSessionTokenValid(token)) {
    return {
      redirect: {
        destination: '/login?returnTo=/dashboard/',
        permanent: false,
      },
    };
  }

  return {
    props: {
      loggedIn,
    },
  };
}
