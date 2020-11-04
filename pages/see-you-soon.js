import Head from 'next/head';
import Layout from '../components/Layout';
import Link from 'next/link';

export default function SeeYouSoon() {
  return (
    <div>
      <Layout>
        <Head>
          <title>Welcome!</title>
        </Head>
        <main>
          <h1>See you soon!</h1>
        </main>
      </Layout>
    </div>
  );
}
