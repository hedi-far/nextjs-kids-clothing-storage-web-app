import Head from 'next/head';
import Layout from '../components/Layout';

export default function Register() {
  return (
    <div>
      <Layout>
        <Head>
          <title>Welcome!</title>
        </Head>
        <main>
          <h1>Register here</h1>
          <form action="/dashboard/dashboard" id="person">
            <label>
              e-mail
              <input type="text" name="e-mail" id="e-mail" maxlength="40" />
            </label>

            <label for="e-mail">
              username
              <input type="text" name="e-mail" id="e-mail" maxlength="40" />
            </label>

            <label for="password">
              password
              <input type="text" name="password" id="password" maxlength="40" />
            </label>
            <button type="submit">Submit</button>
            <button type="reset">Reset</button>
          </form>
        </main>
      </Layout>
    </div>
  );
}
