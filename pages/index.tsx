import Head from 'next/head';
import Layout from '../components/Layout';
import Link from 'next/link';
import { GetServerSidePropsContext } from 'next';
import nextCookies from 'next-cookies';
import { isSessionTokenValid } from '../util/auth';
import { css } from '@emotion/react';

const landingPageStyles = css`
  margin-top: 100px;
  height: 100vh;
  display: grid;
  grid-template-columns: 50% 50%;
`;

const paragraphStyles = css`
  margin-top: 80px;
  width: 700px;
  height: auto;
  /* background-color: blue; */
  font-size: 18px;
  line-height: 2;
`;

const bulletPointsStyles = css`
  font-size: 18px;
  font-weight: bold;
  list-style: disc;
  margin-left: 25px;
`;

const landingPageButton = css`
  margin-top: 80px;
  margin-left: 300px;
`;

type Props = {
  loggedIn: Boolean;
};

export default function Home(props: Props) {
  return (
    <div>
      <Layout loggedIn={props.loggedIn}>
        <Head>
          <title>N! Welcome!</title>
        </Head>
        <main css={landingPageStyles}>
          <div>
            <h1>Welcome to Neatify!</h1>
            <p css={paragraphStyles}>
              Neatify! is an easy and efficient way to manage the clothes your
              kids have grown out of, but should be kept for later reuse!
              <ul css={bulletPointsStyles}>
                <li>
                  {' '}
                  Create your own database and save information on the storage
                  unit you are using, its location and the clothing items inside
                  of it!
                </li>
                <li>Add notes to each clothing item!</li>
                <li>
                  Search across all your storage items by clothing type, size,
                  season and more!
                </li>
                <li>
                  Put together your own printable list to easily find the
                  clothing items in your home!
                </li>
              </ul>
              Neatify! is completely free. I hope, you enjoy it!
            </p>
            {props.loggedIn ? null : (
              <Link href="/register">
                <a>
                  <button css={landingPageButton}>Register</button>
                </a>
              </Link>
            )}{' '}
          </div>
          <img
            src="/img/landing-page-img.svg"
            alt="parents putting clothes away "
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

  return { props: { loggedIn } };
}
