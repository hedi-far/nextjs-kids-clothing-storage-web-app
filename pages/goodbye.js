import Head from 'next/head';
import Layout from '../components/Layout';
import Link from 'next/link';

export default function Goodbye() {
  return (
    <div>
      <Layout>
        <Head>
          <title>Welcome!</title>
        </Head>
        <main>
          <h1>Goodbye forever</h1>
        </main>
      </Layout>
    </div>
  );
}
