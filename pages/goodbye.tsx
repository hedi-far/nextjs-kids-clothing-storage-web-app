import Head from 'next/head';
import Layout from '../components/Layout';
// import Link from 'next/link';
import nextCookies from 'next-cookies';
import Cookies from 'js-cookie';
import cookie from 'cookie';
import { GetServerSidePropsContext } from 'next';
import { deleteSessionByToken } from '../util/database';

type Props = { loggedIn: boolean };

export default function Goodbye(props: Props) {
  //Remove the client-side list cookie
  const myList = Cookies.remove('myList', {
    path: './logout.tsx',
  });

  return (
    <div>
      <Layout loggedIn={props.loggedIn}>
        <Head>
          <title>Welcome!</title>
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
}
