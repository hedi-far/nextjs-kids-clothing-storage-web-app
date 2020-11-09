import Head from 'next/head';
import Layout from '../components/Layout';
import Link from 'next/link';
import { GetServerSidePropsContext } from 'next';
import nextCookies from 'next-cookies';
import { isSessionTokenValid } from '../util/auth';

type Props = {
  loggedIn: Boolean;
};

export default function Home(props: Props) {
  return (
    <div>
      <Layout loggedIn={props.loggedIn}>
        <Head>
          <title>Welcome!</title>
        </Head>
        <main>
          <h1>Landing Page</h1>
          {props.loggedIn ? null : (
            <Link href="/register">
              <a>
                <button>Register</button>
              </a>
            </Link>
          )}
        </main>
      </Layout>
    </div>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { session: token } = nextCookies(context);
  const loggedIn = await isSessionTokenValid(token);

  return { props: { loggedIn } };
}
