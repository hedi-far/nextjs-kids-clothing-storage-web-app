import Head from 'next/head';
import Layout from '../../components/Layout';

export default function MyList() {
  return (
    <div>
      <Layout>
        <Head>
          <title>Welcome!</title>
        </Head>
        <main>
          <h1>My List</h1>
        </main>
      </Layout>
    </div>
  );
}
