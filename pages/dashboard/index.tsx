import Head from 'next/head';
import Layout from '../../components/Layout';
import Link from 'next/link';
import nextCookies from 'next-cookies';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { User, StorageItem } from '../../util/types';
import { GetServerSidePropsContext } from 'next';
import {
  // getUserByUserId
  getStorageItemByUserId,
  getUserBySessionToken,
} from '../../util/database';
import { isSessionTokenValid } from '../../util/auth';

type Props = { loggedIn: boolean; user: User; storageItems: StorageItem };

export default function Dashboard(props: Props) {
  const [storageItemName, setStorageItemName] = useState('');
  const [storageItemLocation, setStorageItemLocation] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();

  return (
    <div>
      <Layout loggedIn={props.loggedIn}>
        <Head>
          <title>
            Welcome <p>{props.user.username}</p>!
          </title>
        </Head>
        <main>
          <h1>My dashboard</h1>
          <h2>My storage items</h2>
          <ul>
            {props.storageItems.map((storageItem: StorageItem) => {
              return (
                <li key={storageItem.id}>
                  <ul>
                    <Link href={`/dashboard/${storageItem.id}`}>
                      <a>
                        Name: {storageItem.storageItemName} Location:
                        {storageItem.storageItemLocation}
                      </a>
                    </Link>
                  </ul>
                </li>
              );
            })}
          </ul>
          <br />
          <h2>Add new storage item</h2>
          <form
            onSubmit={async (e) => {
              // Prevent the default browser behavior of forms
              e.preventDefault();

              // Send the data to the
              // API route
              const response = await fetch('/api/dashboard', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  storageItemName: storageItemName,
                  storageItemLocation: storageItemLocation,
                  userId: props.user.id,
                  // token: props.token,
                }),
              });

              const { success } = await response.json();

              if (success) {
                // Redirect to the homepage if successfully registered
                router.push('/dashboard');
              } else {
                // If the response status code (set using response.status()
                // in the API route) is 409 (Conflict) then show an error
                // message that the user already exists
                if (response.status === 409) {
                  setErrorMessage('Already exists!');
                } else {
                  setErrorMessage('Failed!');
                }
              }
            }}
          >
            <label htmlFor="name">
              Name of storage item:
              <input
                type="text"
                id="name"
                value={storageItemName}
                placeholder="e.g. brown box"
                maxLength={50}
                required
                onChange={(e) => setStorageItemName(e.currentTarget.value)}
              />
            </label>
            <br />
            <label htmlFor="location">
              Location of storage item:
              <input
                type="text"
                id="location"
                value={storageItemLocation}
                placeholder=".e.g. basement"
                maxLength={50}
                onChange={(e) => setStorageItemLocation(e.currentTarget.value)}
              />
            </label>
            <br />
            <button>Add storage item</button>
          </form>
          <p>{errorMessage}</p>
          <h2>My account</h2>
          <Link href="/dashboard/account">
            <a>My account</a>
          </Link>
          <br />
        </main>
      </Layout>
    </div>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { session: token } = nextCookies(context);
  const loggedIn = await isSessionTokenValid(token);

  if (!(await isSessionTokenValid(token))) {
    return {
      redirect: {
        destination: '/login?returnTo=/dashboard',
        permanent: false,
      },
    };
  }

  const user = await getUserBySessionToken(token);

  const userId = user.id;

  const storageItems = await getStorageItemByUserId(userId);

  // console.log(storageItems);

  return {
    props: {
      user,
      loggedIn,
      storageItems,
    },
  };
}
