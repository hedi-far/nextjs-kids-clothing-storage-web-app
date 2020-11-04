import Head from 'next/head';
import Layout from '../../components/Layout';
import Link from 'next/link';

export default function Search() {
  return (
    <div>
      <Layout>
        <Head>
          <title>Welcome!</title>
        </Head>
        <main>
          <h1>Search</h1>
          {/* <Link href="/dashboard">
            <a>
              <button>Register</button>
            </a>
          </Link> */}
        </main>
      </Layout>
    </div>
  );
}
