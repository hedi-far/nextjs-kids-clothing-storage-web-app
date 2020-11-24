import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { GetServerSidePropsContext } from 'next';
import nextCookies from 'next-cookies';
import Layout from '../../components/Layout';
import { User, StorageItem } from '../../util/types';
import {
  getStorageItemsByUserId,
  getUserBySessionToken,
} from '../../util/database';

type Props = {
  // loggedIn: boolean;
  user: User;
  storageItems: StorageItem[];
};

export default function Dashboard(props: Props) {
  const [storageItemName, setStorageItemName] = useState('');
  const [storageItemLocation, setStorageItemLocation] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const router = useRouter();

  return (
    <div>
      {/* loggedIn is set to true by default, bc if no session token
      is found in getServerSideProps, the user will be redirected to the login page! */}
      <Layout loggedIn={true}>
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
                      <a>{storageItem.storageItemName}</a>
                    </Link>
                    Location: {storageItem.storageItemLocation}
                    <button
                      onClick={async () => {
                        const answer = window.confirm(`Really delete?`);

                        if (answer === true) {
                          // Send the data to the
                          // API route
                          const id = storageItem.id;

                          const response = await fetch(`../api/dashboard`, {
                            method: 'DELETE',
                            headers: {
                              'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                              storageItemId: id,
                            }),
                          });

                          const { success } = await response.json();

                          if (success) {
                            // Redirect so same page
                            router.push(`/dashboard/`);
                          } else {
                            setErrorMessage('Failed!');
                          }
                        }
                      }}
                    >
                      Delete
                    </button>
                  </ul>
                </li>
              );
            })}
          </ul>
          <br />
          <h2>Add new storage item</h2>
          <form
            onSubmit={async (e) => {
              e.preventDefault();

              const response = await fetch('/api/dashboard', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  storageItemName: storageItemName,
                  storageItemLocation: storageItemLocation,
                  userId: props.user.id,
                }),
              });

              const { success } = await response.json();

              if (success) {
                // Redirect to dashboard if successfully inserted
                router.push('/dashboard');
              } else {
                // If the response status code (set using response.status()
                // in the API route) is 409 (Conflict) then show an error
                // message
                if (response.status === 409) {
                  setErrorMessage('Already exists!');
                } else {
                  setErrorMessage('Failed!');
                }
              }
            }}
          >
            <label htmlFor="name">
              Name of storage item (required):
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
            <button onClick={() => router.reload()}>Reset</button>
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
  // const loggedIn = await isSessionTokenValid(token);
  const user = await getUserBySessionToken(token);

  if (!token || !user) {
    return {
      redirect: {
        destination: '/login?returnTo=/dashboard',
        permanent: false,
      },
    };
  }

  const userId = user.id;

  const storageItems = await getStorageItemsByUserId(userId);

  return {
    props: {
      user,
      // loggedIn,
      storageItems,
    },
  };
}
