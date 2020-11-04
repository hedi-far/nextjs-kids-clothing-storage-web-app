import Head from 'next/head';
import Layout from '../components/Layout';
import Link from 'next/link';

export default function Login() {
  return (
    <div>
      <Layout>
        <Head>
          <title>Welcome!</title>
        </Head>
        <main>
          <h1>Login Page</h1>
          <Link href="/dashboard/dashboard">
            <a>
              <button>Login</button>
            </a>
          </Link>
        </main>
      </Layout>
    </div>
  );
}
