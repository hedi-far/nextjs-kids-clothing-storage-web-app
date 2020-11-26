import Link from 'next/link';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { useState } from 'react';
import Layout from '../components/Layout';
import { css } from '@emotion/react';

type Props = { token: string };

export default function Register(props: Props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();

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
    box-shadow: 0px 4px 4px 0px #000000 25%;
  `;

  const messageStyle = css`
    background-color: #e6e6e6;
    color: #645e49;
    margin: 10px;
    padding-left: 12px;
    padding-right: 12px;
    border: none;
    border-radius: 10%;
    box-shadow: 0px 4px 4px 0px #000000 25%;
  `;

  return (
    <div>
      <Layout>
        <Head>
          <title>Register</title>
        </Head>
        <main css={registerStyles}>
          <h1>Register here</h1>
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
                  setErrorMessage(
                    'You have been registered successfully! Please login now!',
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
              <br />
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
