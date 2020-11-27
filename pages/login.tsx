import Head from 'next/head';
import Layout from '../components/Layout';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import nextCookies from 'next-cookies';
import { GetServerSidePropsContext } from 'next';
import { isSessionTokenValid } from '../util/auth';
import { css } from '@emotion/react';

const loginStyles = css`
  margin: 150px;
  line-height: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const formButtonStyles = css`
  background-color: white;
  color: #645e49;
  height: 30px;
  width: 120px;
  margin: 10px;
  border: none;
`;

const messageStyle = css`
  background-color: #e6e6e6;
  color: #645e49;
  margin: 10px;
  padding-left: 12px;
  padding-right: 12px;
  border: none;
  border-radius: 15px;
  box-shadow: -13px -9px 5px -6px rgba(135, 142, 138, 0.25);
`;

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
      <main css={loginStyles}>
        <h1>Login</h1>
        <ul>
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
                setErrorMessage('Something went wrong! Please try again!');
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
                required
              />
            </label>
            <br />

            <label>
              Password
              <input
                value={password}
                type="password"
                onChange={(e) => setPassword(e.currentTarget.value)}
                required
              />
            </label>
            <br />
            <button css={formButtonStyles}>Log in</button>
            <button css={formButtonStyles} onClick={() => router.reload()}>
              Reset
            </button>
          </form>
        </ul>
        <p css={messageStyle}>{errorMessage}</p>
        <Link href="/register">
          <a>No account yet? Register!</a>
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
