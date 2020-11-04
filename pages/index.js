import Head from 'next/head';
import Layout from '../components/Layout';
import Link from 'next/link';

export default function Home() {
  return (
    <div>
      <Layout>
        <Head>
          <title>Welcome!</title>
        </Head>
        <main>
          <h1>Landing Page</h1>
          <Link href="/register">
            <a>
              <button>Register</button>
            </a>
          </Link>
        </main>
      </Layout>
    </div>
  );
}
