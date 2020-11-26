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

const landingPageImage = css``;

const paragraphStyles = css`
  margin-top: 80px;
  width: 700px;
  height: auto;
  /* background-color: blue; */
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
          <title>Welcome!</title>
        </Head>
        <main css={landingPageStyles}>
          <div>
            <h1>Welcome to Neatify!</h1>
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
              dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing
              elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore
              magna aliquyam erat, sed diam voluptua. At vero eos et accusam et
              justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea
              takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor
              sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod
              tempor invidunt ut labore et dolore magna aliquyam erat, sed diam
              voluptua. At vero eos et accusam et justo duo dolores et ea rebum.
              Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum
              dolor sit amet.
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
            css={landingPageImage}
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
