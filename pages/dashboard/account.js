import Head from 'next/head';
import Layout from '../../components/Layout';
import Link from 'next/link';

export default function Account() {
  return (
    <div>
      <Layout>
        <Head>
          <title>Welcome!</title>
        </Head>
        <main>
          <h1>Account</h1>
          <Link href="/goodbye">
            <a>
              <button>Delete account</button>
            </a>
          </Link>
        </main>
      </Layout>
    </div>
  );
}
