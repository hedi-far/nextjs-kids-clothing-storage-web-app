import Head from 'next/head';
import Layout from '../../components/Layout';
import { useState } from 'react';
import { useRouter } from 'next/router';
import nextCookies from 'next-cookies';
import { User } from '../../util/types';
import { getUserBySessionToken } from '../../util/database';
import { GetServerSidePropsContext } from 'next';
import { isSessionTokenValid } from '../../util/auth';
type Props = { loggedIn: boolean; user: User };

export default function Account(props: Props) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();
  return (
    <Layout loggedIn={props.loggedIn}>
      <Head>
        <title>Account</title>
      </Head>
      <main>
        <h1>Account</h1>
        <h2>user-id</h2>
        <p>{props.user.id}</p>
        <h2>username</h2>
        <p>{props.user.username}</p>

        <button
          onClick={async () => {
            const answer = window.confirm(`Really delete?`);

            if (answer === true) {
              // Send the data to the
              // API route

              const response = await fetch(`../api/dashboard/account`, {
                method: 'DELETE',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  userId: props.user.id,
                }),
              });

              const { success } = await response.json();

              if (success) {
                // Redirect so goodbye page
                router.push(`/goodbye  `);
              } else {
                setErrorMessage('Failed!');
              }
            }
          }}
        >
          Delete account
        </button>
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
