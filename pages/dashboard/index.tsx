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
import { css } from '@emotion/react';

const dashboardStyles = css`
  display: grid;
  grid-template-columns: 0.5fr 0.1fr 1.5fr;
  grid-template-rows: 0.3fr 1.4fr 0.7fr;
  gap: 10px 0px;
`;

//My dashboard
const headingStyles = css`
  grid-area: 1 / 1 / 2 / 2;
  /* background-color: pink; */
  height: 40px;
  margin-top: 40px;
`;

//My storageItems
const storageItemsHeadingStyles = css`
  grid-area: 1 / 3 / 2 / 4;
  /* background-color: red; */
  height: 40px;
  margin-top: 100px;
`;

//area around grey box
const sideBarStyles = css`
  grid-area: 2 / 1 / 3 / 2;
  /* background-color: green; */
  height: 200px;
`;

//grey box
const sideBarLinkStyles = css`
  font-size: 18px;
  height: 170px;
  width: 300px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-content: center;
  justify-content: space-around;
  background-color: #e6e6e6;
  border-radius: 10%;
  box-shadow: -13px -9px 5px -6px rgba(135, 142, 138, 0.25);
`;

//area around yellow boxes
const storageItemsAreaStyles = css`
  grid-area: 2 / 3 / 3 / 4;
  /* background-color: blue; */
  height: 680px;
  overflow: auto;
`;

//ul
const storageItemsAreaStyles2 = css`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
`;

//yellow box
const storageItemStyles = css`
  background-color: #f3f38e;
  height: 170px;
  width: 300px;
  margin: 10px;
  padding: 40px;
  /* flex-shrink: 4; */
  border-radius: 10%;
  font-size: 24px;
  display: flex;
  justify-content: space-around;
  flex-direction: column;
  box-shadow: -13px -9px 5px -6px rgba(135, 142, 138, 0.25);
`;

//light pink box
const addStorageItemStyles = css`
  /* background-color: blue; */
  line-height: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 40px;
`;

const formButtonStyles = css`
  background-color: white;
  color: #645e49;
  height: 30px;
  width: 120px;
  margin: 10px;
  border: none;
  box-shadow: 0px 4px 4px 0px #000000 25%;
`;

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
          <title>Dashboard</title>
        </Head>
        <main css={dashboardStyles}>
          <h1 css={headingStyles}>My dashboard</h1>
          <div css={sideBarStyles}>
            <ul css={sideBarLinkStyles}>
              <li>
                {' '}
                <Link href="/dashboard/account">
                  <a>My account</a>
                </Link>
              </li>
              <li>
                {' '}
                <Link href="/dashboard/search">
                  <a>Search my storage!</a>
                </Link>
              </li>
              <li>
                {' '}
                <Link href="/dashboard/my-list">
                  <a>My list</a>
                </Link>
              </li>
              <li>
                {' '}
                <Link href="/logout">
                  <a>Logout</a>
                </Link>
              </li>
            </ul>
            <div css={addStorageItemStyles}>
              <h2>Add new storage unit</h2>
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
                      setErrorMessage('Something went wrong! Please try again');
                    } else {
                      setErrorMessage('Something went wrong! Please try again');
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
                    onChange={(e) =>
                      setStorageItemLocation(e.currentTarget.value)
                    }
                  />
                </label>
                <br />
                <button css={formButtonStyles}>Add storage item</button>
                <button css={formButtonStyles} onClick={() => router.reload()}>
                  Reset
                </button>
              </form>
              <p>{errorMessage}</p>
            </div>
          </div>

          <h2 css={storageItemsHeadingStyles}>My storage units</h2>
          <div css={storageItemsAreaStyles}>
            <ul css={storageItemsAreaStyles2}>
              {props.storageItems.map((storageItem: StorageItem) => {
                return (
                  <li css={storageItemStyles} key={storageItem.id}>
                    Name: {storageItem.storageItemName}
                    <br />
                    Location: {storageItem.storageItemLocation}
                    <Link href={`/dashboard/${storageItem.id}`}>
                      <button>
                        {' '}
                        <a>Open</a>
                      </button>
                    </Link>
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
                  </li>
                );
              })}
            </ul>
          </div>
          {/* <div css={addStorageItemStyles}>
            <h2>Add new storage unit</h2>
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
                    setErrorMessage('Something went wrong! Please try again');
                  } else {
                    setErrorMessage('Something went wrong! Please try again');
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
                  onChange={(e) =>
                    setStorageItemLocation(e.currentTarget.value)
                  }
                />
              </label>
              <br />
              <button css={formButtonStyles}>Add storage item</button>
              <button css={formButtonStyles} onClick={() => router.reload()}>
                Reset
              </button>
            </form>
            <p>{errorMessage}</p>
          </div> */}
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
