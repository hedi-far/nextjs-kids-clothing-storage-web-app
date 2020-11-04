import Head from 'next/head';
import Layout from '../../components/Layout';
import Link from 'next/link';

export default function Dashboard() {
  return (
    <div>
      <Layout>
        <Head>
          <title>Welcome!</title>
        </Head>
        <main>
          <h1>My dashbaord</h1>
          <Link href="./storage-item">
            <a>
              <button>Storage-item</button>
            </a>
          </Link>

          <Link href="./account">
            <a>
              <button>Account</button>
            </a>
          </Link>
        </main>
      </Layout>
    </div>
  );
}
