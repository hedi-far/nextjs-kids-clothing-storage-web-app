import Head from 'next/head';
import { GetServerSidePropsContext } from 'next';
import Cookies from 'js-cookie';
import nextCookies from 'next-cookies';
import cookie from 'cookie';
import Layout from '../components/Layout';
import { deleteSessionByToken } from '../util/database';

type Props = { loggedIn: boolean };

export default function Goodbye(props: Props) {
  //Remove the client-side list cookie
  Cookies.remove('myList', {
    path: './logout.tsx',
  });

  return (
    <div>
      <Layout loggedIn={props.loggedIn}>
        <Head>
          <title>Goodbye!</title>
        </Head>
        <main>
          <h1>Goodbye forever</h1>
        </main>
      </Layout>
    </div>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { session: token } = nextCookies(context);

  await deleteSessionByToken(token);

  // Remove the session cookie
  context.res.setHeader(
    'Set-Cookie',
    cookie.serialize('session', '', {
      maxAge: -1,
      path: '/',
    }),
  );

  return {
    redirect: {
      destination: '/see-you-soon',
      permanent: false,
    },
  };
}
