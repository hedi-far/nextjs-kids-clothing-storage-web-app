import Head from 'next/head';
import Layout from '../components/Layout';
// import Link from 'next/link';

export default function Login() {
  return (
    <div>
      <Layout>
        <Head>
          <title>Welcome!</title>
        </Head>
        <main>
          <h1>Login Page</h1>
          <form action="/dashboard/dashboard">
            <label>
              username
              <input type="text" name="zuname" id="zuname" maxlength="40" />
            </label>

            <label>
              password
              <input type="text" name="zuname" id="zuname" maxlength="40" />
            </label>
            <button type="submit">Submit</button>
            <button type="reset">Reset</button>
          </form>
        </main>
      </Layout>
    </div>
  );
}
