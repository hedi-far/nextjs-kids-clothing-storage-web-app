import Head from 'next/head';
import Layout from '../../components/Layout';
import Link from 'next/link';
import nextCookies from 'next-cookies';
import { GetServerSidePropsContext } from 'next';
import { isSessionTokenValid } from '../../util/auth';

type Props = { loggedIn: boolean };

export default function Dashboard(props: Props) {
  return (
    <div>
      <Layout loggedIn={props.loggedIn}>
        <Head>
          <title>Welcome!</title>
        </Head>
        <main>
          <h1>My dashbaord</h1>
          <Link href="/dashboard/storage-item">
            <a>
              <button>Storage-item</button>
            </a>
          </Link>

          <Link href="/dashboard/search">
            <a>Search</a>
          </Link>
          <Link href="/dashboard/my-list">
            <a>List</a>
          </Link>

          <Link href="/dashboard/account">
            <a>
              <button>Account</button>
            </a>
          </Link>
        </main>
      </Layout>
    </div>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { session: token } = nextCookies(context);
  const loggedIn = await isSessionTokenValid(token);

  if (!(await isSessionTokenValid(token))) {
    return {
      redirect: {
        destination: '/login?returnTo=/dashboard',
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
