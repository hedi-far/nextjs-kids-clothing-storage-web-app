import Head from 'next/head';
import { GetServerSidePropsContext } from 'next';
import Cookies from 'js-cookie';
import nextCookies from 'next-cookies';
import cookie from 'cookie';
import Layout from '../components/Layout';
import { deleteSessionByToken } from '../util/database';

import { css } from '@emotion/react';
import { isSessionTokenValid } from '../util/auth';

const goodByePageStyles = css`
  margin-top: 100px;
  height: 100vh;
  display: grid;
  grid-template-columns: 50% 50%;
`;
const goodByeHeadingStyles = css`
  /* background-color: blue; */
  text-align: center;
  vertical-align: center;
  margin-top: 200px;
  width: 800px;
  height: 100px;
`;

const goodByeImageStyles = css`
  /* background-color: blue; */
  margin-left: -400px;
`;

type Props = { loggedIn: boolean };

export default function Goodbye(props: Props) {
  //Remove the client-side list cookie
  Cookies.remove('myList', {
    path: './logout.tsx',
  });

  return (
    <div>
      <Layout loggedIn={props.loggedIn}>
        <Head>
          <title>Goodbye!</title>
        </Head>
        <main css={goodByePageStyles}>
          <h1 css={goodByeHeadingStyles}>
            Your account has been deleted! Goodbye!
          </h1>
          <img
            css={goodByeImageStyles}
            src="/img/goodbye-img.svg"
            alt="man sulking"
            width="800px"
            height="600px"
          />
        </main>
      </Layout>
    </div>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { session: token } = nextCookies(context);
  const loggedIn = await isSessionTokenValid(token);

  //when user is logged-in, user is redirected to dashboard
  if (await isSessionTokenValid(token)) {
    return {
      redirect: {
        destination: '/dashboard/',
        permanent: false,
      },
    };
  }

  await deleteSessionByToken(token);

  // Remove the session cookie
  context.res.setHeader(
    'Set-Cookie',
    cookie.serialize('session', '', {
      maxAge: -1,
      path: '/',
    }),
  );

  return {
    props: {
      loggedIn,
    },
  };
}
