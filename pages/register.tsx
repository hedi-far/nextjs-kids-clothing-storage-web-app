import Link from 'next/link';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { useState } from 'react';
import Layout from '../components/Layout';
import { css } from '@emotion/react';

const registerStyles = css`
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

type Props = { token: string };

export default function Register(props: Props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();

  return (
    <div>
      <Layout>
        <Head>
          <title>N! Register</title>
        </Head>
        <main css={registerStyles}>
          <h1>Register</h1>
          <ul>
            <form
              onSubmit={async (e) => {
                e.preventDefault();

                const response = await fetch('/api/register', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                    username: username,
                    password: password,
                    token: props.token,
                  }),
                });

                const { success } = await response.json();

                if (success) {
                  setUsername('');
                  setPassword('');
                  setErrorMessage(
                    'You have been registered successfully! Please proceed to login!',
                  );
                } else {
                  // If the response status code (set using response.status()
                  // in the API route) is 409 (Conflict) then show an error
                  // message that the user already exists
                  if (response.status === 409) {
                    setErrorMessage('User already exists!');
                  } else {
                    setErrorMessage('Something went wrong! Please try again!');
                  }
                }
              }}
            >
              <label htmlFor="username">
                Username
                <input
                  value={username}
                  type="text"
                  onChange={(e) => setUsername(e.currentTarget.value)}
                  required
                />
              </label>
              <br />
              <label htmlFor="password">
                Password
                <input
                  value={password}
                  type="password"
                  onChange={(e) => setPassword(e.currentTarget.value)}
                  required
                />
              </label>
              <br />
              <button css={formButtonStyles}>Register</button>
              <button css={formButtonStyles} onClick={() => router.reload()}>
                Reset
              </button>
            </form>
          </ul>
          <p css={messageStyle}>{errorMessage}</p>
          <Link href="/login">
            <a>Already have an account? Login!</a>
          </Link>
        </main>
      </Layout>
    </div>
  );
}

export async function getServerSideProps() {
  // Import and instantiate a CSRF tokens helper
  const tokens = new (await import('csrf')).default();
  const secret = process.env.CSRF_TOKEN_SECRET;

  if (typeof secret === 'undefined') {
    throw new Error('CSRF_TOKEN_SECRET environment variable not configured!');
  }

  // Create a CSRF token based on the secret
  const token = tokens.create(secret);
  return { props: { token } };
}
