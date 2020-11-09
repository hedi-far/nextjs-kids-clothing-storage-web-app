import Head from 'next/head';
import Layout from '../components/Layout';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import nextCookies from 'next-cookies';
import { GetServerSidePropsContext } from 'next';
import { isSessionTokenValid } from '../util/auth';

type Props = { loggedIn: boolean; redirectDestination: string };

export default function Login(props: Props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();

  return (
    <Layout loggedIn={props.loggedIn}>
      <Head>
        <title>Login</title>
      </Head>
      <main>
        <h1>Login</h1>
        <form
          onSubmit={async (e) => {
            e.preventDefault();

            const response = await fetch('/api/login', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ username, password }),
            });

            const { success } = await response.json();

            if (!success) {
              setErrorMessage('Login failed!');
            } else {
              setErrorMessage('');
              router.push(props.redirectDestination);
            }
          }}
        >
          <label>
            Username
            <input
              value={username}
              onChange={(e) => setUsername(e.currentTarget.value)}
            />
          </label>
          <br />

          <label>
            Password
            <input
              value={password}
              type="password"
              onChange={(e) => setPassword(e.currentTarget.value)}
            />
          </label>
          <button>Log in</button>
        </form>

        <p style={{ color: 'red' }}>{errorMessage}</p>

        <Link href="/register">
          <a>Register</a>
        </Link>
      </main>
    </Layout>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { session: token } = nextCookies(context);
  const loggedIn = await isSessionTokenValid(token);

  const redirectDestination = context?.query?.returnTo ?? '/dashboard';

  if (await isSessionTokenValid(token)) {
    return {
      redirect: {
        destination: redirectDestination,
        permanent: false,
      },
    };
  }

  return {
    props: { loggedIn, redirectDestination },
  };
}
