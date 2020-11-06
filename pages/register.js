import Link from 'next/link';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { useState } from 'react';
import Layout from '../components/Layout';

export default function Register(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();

  return (
    <div>
      <Layout>
        <Head>
          <title>Register</title>
        </Head>
        <main>
          <h1>Register here</h1>
          <form
            onSubmit={async (e) => {
              // Prevent the default browser behavior of forms
              e.preventDefault();

              // Send the username, password and token to the
              // API route
              const response = await fetch('/api/register', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  email: email,
                  username: username,
                  password: password,
                  token: props.token,
                }),
              });

              console.log(response);

              const { success } = await response.json();

              if (success) {
                // Redirect to the homepage if successfully registered
                router.push('/');
              } else {
                // If the response status code (set using response.status()
                // in the API route) is 409 (Conflict) then show an error
                // message that the user already exists
                if (response.status === 409) {
                  setErrorMessage('User already exists!');
                } else {
                  setErrorMessage('Failed!');
                }
              }
            }}
          >
            <label>
              E-mail
              <input
                value={email}
                onChange={(e) => setEmail(e.currentTarget.value)}
              />
            </label>
            <br />
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
            <br />
            <button>Register</button>
          </form>

          <p>{errorMessage}</p>

          <Link href="/login">
            <a>Already have an account? Login</a>
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
