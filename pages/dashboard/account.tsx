import Head from 'next/head';
import Layout from '../../components/Layout';
import Link from 'next/link';
import { User } from '../../util/types';
import { getUserBySessionToken } from '../../util/database';
import { GetServerSidePropsContext } from 'next';
import nextCookies from 'next-cookies';
import { isSessionTokenValid } from '../../util/auth';

type Props = { loggedIn: boolean; user: User };

export default function Account(props: Props) {
  return (
    <Layout loggedIn={props.loggedIn}>
      <Head>
        <title>Account</title>
      </Head>
      <main>
        <h1>Account</h1>
        <h2>username</h2>
        <p>{props.user.username}</p>

        <h2>Email</h2>
        <p>{props.user.email}</p>

        <Link href="/goodbye">
          <a>
            <button>Delete account</button>
          </a>
        </Link>
      </main>
    </Layout>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { session: token } = nextCookies(context);
  const loggedIn = await isSessionTokenValid(token);

  if (!(await isSessionTokenValid(token))) {
    return {
      redirect: {
        destination: '/login?returnTo=/dashboard/account',
        permanent: false,
      },
    };
  }

  const user = await getUserBySessionToken(token);

  return {
    props: {
      user,
      loggedIn,
    },
  };
}
