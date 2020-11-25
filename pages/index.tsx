import Head from 'next/head';
import Layout from '../components/Layout';
import Link from 'next/link';
import { GetServerSidePropsContext } from 'next';
import nextCookies from 'next-cookies';
import { isSessionTokenValid } from '../util/auth';
import { css } from '@emotion/react';

const landingPage = css`
  background-color: red;
  & .grid {
    grid-template-columns: 55% 45%;
  }
`;

const landingPageImage = css`
  grid-column-start: 2;
  grid-column-end: 2;
`;

const paragraphStyles = css`
  background-color: green;
  width: 700px;
  height: 300px;
  grid-column-start: 1;
  grid-column-end: 1;
  /* grid-row-start: row1-start;
  grid-row-end: 3; */
`;

type Props = {
  loggedIn: Boolean;
};

export default function Home(props: Props) {
  return (
    <div>
      <Layout loggedIn={props.loggedIn}>
        <Head>
          <title>Welcome!</title>
        </Head>
        <main>
          <h1>Welcome to Neatify!</h1>
          <div css={landingPage}>
            <p css={paragraphStyles}>
              Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
              nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
              erat, sed diam voluptua. At vero eos et accusam et justo duo
              dolores et ea rebum. Stet clita kasd gubergren, no sea takimata
              sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit
              amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor
              invidunt ut labore et dolore magna aliquyam erat, sed diam
              voluptua. At vero eos et accusam et justo duo dolores et ea rebum.
              Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum
              dolor sit amet.
            </p>
            {props.loggedIn ? null : (
              <Link href="/register">
                <a>
                  <button>Register</button>
                </a>
              </Link>
            )}
            <img
              css={landingPageImage}
              src="/img/landing-page-img.svg"
              alt="parents putting clothes away "
              width="800px"
              height="600px"
            />
          </div>
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
