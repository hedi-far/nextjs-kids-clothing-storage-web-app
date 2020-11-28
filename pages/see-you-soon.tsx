import Head from 'next/head';
import nextCookies from 'next-cookies';
import Cookies from 'js-cookie';
import { GetServerSidePropsContext } from 'next';
import Layout from '../components/Layout';
import { isSessionTokenValid } from '../util/auth';
import { css } from '@emotion/react';

const seeYouSoonPageStyles = css`
  margin-top: 100px;
  height: 100vh;
  display: grid;
  grid-template-columns: 50% 50%;
`;
const seeYouSoonHeadingStyles = css`
  /* background-color: blue; */
  text-align: center;
  vertical-align: center;
  margin-top: 200px;
  width: 800px;
  height: 100px;
`;

type Props = { loggedIn: boolean };

export default function SeeYouSoon(props: Props) {
  //Remove the client-side list cookie
  Cookies.remove('myList', {
    path: './logout',
  });
  return (
    <div>
      <Layout loggedIn={props.loggedIn}>
        <Head>
          <title>N! See you soon!</title>
        </Head>
        <main css={seeYouSoonPageStyles}>
          <h1 css={seeYouSoonHeadingStyles}>
            See you soon, and say "Hi!" to the kids from me!
          </h1>
          <img
            src="/img/see-you-soon-img.svg"
            alt="woman waving "
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

  if (await isSessionTokenValid(token)) {
    return {
      redirect: {
        destination: '/login?returnTo=/dashboard/',
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
