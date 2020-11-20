import { GetServerSidePropsContext } from 'next';
import nextCookies from 'next-cookies';
import cookie from 'cookie';
import { deleteSessionByToken } from '../util/database';

export default function Logout() {
  return null;
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { session: token } = nextCookies(context);

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
    redirect: {
      destination: '/see-you-soon',
      permanent: false,
    },
  };
}
