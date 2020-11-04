import Head from 'next/head';
import Layout from '../components/Layout';
import Link from 'next/link';

export default function Register() {
  return (
    <div>
      <Layout>
        <Head>
          <title>Welcome!</title>
        </Head>
        <main>
          <h1>Register here</h1>
          <Link href="/dashboard/dashboard">
            <a>
              <button>Register</button>
            </a>
          </Link>
        </main>
      </Layout>
    </div>
  );
}
