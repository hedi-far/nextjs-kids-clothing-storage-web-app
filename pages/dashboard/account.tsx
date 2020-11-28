import Head from 'next/head';
import Layout from '../../components/Layout';
import { useState } from 'react';
import { useRouter } from 'next/router';
import nextCookies from 'next-cookies';
import { User } from '../../util/types';
import { getUserBySessionToken } from '../../util/database';
import { GetServerSidePropsContext } from 'next';
import { isSessionTokenValid } from '../../util/auth';
import { css } from '@emotion/react';

type Props = { loggedIn: boolean; user: User };

const accountStyles = css`
  border-radius: 10%;
  margin-top: 100px;
  margin-bottom: 250px;
  margin-left: 600px;
  width: 400px;
  line-height: 70px;
  padding: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #e6e6e6;
  //#E5FFBE light green?
  box-shadow: -13px -9px 5px -6px rgba(135, 142, 138, 0.25);
`;

const formButtonStyles = css`
  background-color: white;
  color: #645e49;
  height: 40px;
  width: 120px;
  margin: 10px;
  border: none;
  box-shadow: 0px 4px 4px 0px #000000 25%;
`;

export default function Account(props: Props) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();
  return (
    <Layout loggedIn={props.loggedIn}>
      <Head>
        <title>N! Account</title>
      </Head>
      <main css={accountStyles}>
        <ul>
          <h1>My account</h1>
          <h2>User-Id: {props.user.id}</h2>
          <h2>Username: {props.user.username}</h2>
          <button
            css={formButtonStyles}
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
                  // Redirect to goodbye page
                  router.push(`/goodbye`);
                } else {
                  setErrorMessage('Failed!');
                }
              }
            }}
          >
            Delete account
          </button>
        </ul>
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
