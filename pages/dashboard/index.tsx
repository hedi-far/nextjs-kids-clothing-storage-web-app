import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { GetServerSidePropsContext } from 'next';
import nextCookies from 'next-cookies';
import { css } from '@emotion/react';
import Layout from '../../components/Layout';
import { User, StorageItem } from '../../util/types';
import {
  getStorageItemsByUserId,
  getUserBySessionToken,
} from '../../util/database';

const dashboardStyles = css`
  display: grid;
  grid-template-columns: 0.5fr 0.1fr 1.5fr;
  grid-template-rows: 0.3fr 1.4fr 0.7fr;
  gap: 10px 0px;
`;

//My dashboard
const headingStyles = css`
  grid-area: 1 / 1 / 2 / 2;
  height: 40px;
  margin-top: 40px;
`;

//My storageItems
const storageItemsHeadingStyles = css`
  grid-area: 1 / 3 / 2 / 4;
  height: 40px;
  margin-top: 100px;
  img {
    height: 30px;
    width: 30px;
    margin-right: 5px;
  }
`;

//area around grey box
const sideBarStyles = css`
  grid-area: 2 / 1 / 3 / 2;
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
  justify-content: space-around;
  background-color: #e6e6e6;
  border-radius: 10%;
  box-shadow: -13px -9px 5px -6px rgba(135, 142, 138, 0.25);
  img {
    height: 30px;
    width: 30px;
    margin-right: 5px;
  }
`;

//area around yellow boxes
const storageItemsAreaStyles = css`
  grid-area: 2 / 3 / 3 / 4;
  height: 680px;
  overflow: auto;

  & img {
    height: 400px;
    margin-bottom: 25px;
  }

  & ul {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
  }
`;

//yellow box
const storageItemStyles = css`
  background-color: #f3f38e;
  height: 200px;
  width: 300px;
  margin: 10px;
  padding: 30px;
  border-radius: 10%;
  font-size: 24px;
  display: flex;
  justify-content: space-around;
  flex-direction: column;
  box-shadow: -13px -9px 5px -6px rgba(135, 142, 138, 0.25);
`;

//light pink box
const addStorageItemStyles = css`
  line-height: 50px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-top: 40px;
  font-size: 18px;
  img {
    height: 30px;
    width: 30px;
    margin-right: 5px;
  }
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

//icon trashcan
const deleteButtonStyles = css`
  background-color: #f3f38e;
  box-shadow: none;
  margin-top: 15px;
  & img {
    height: 30px;
    width: 30px;
    float: left;
  }
`;

//icon box
const openButtonStyles = css`
  margin-top: 5px;
  cursor: pointer;
  & img {
    float: right;
    height: 40px;
    width: 40px;
  }
`;

const messageStyle = css`
  background-color: #e6e6e6;
  color: #645e49;
  margin: 10px;
  padding-left: 12px;
  padding-right: 12px;
  border: none;
  border-radius: 15px;
  box-shadow: -13px -9px 5px -6px rgba(135, 142, 138, 0.25);
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

  //if no storage items have been added by user yet
  if (props.storageItems.length === 0) {
    return (
      <div>
        {/* loggedIn is set to true by default, bc if no session token
is found in getServerSideProps, the user will be redirected to the login page! */}
        <Layout loggedIn={true}>
          <Head>
            <title>N! Dashboard</title>
          </Head>
          <main css={dashboardStyles}>
            <h1 css={headingStyles}>My dashboard</h1>
            <div css={sideBarStyles}>
              <ul css={sideBarLinkStyles}>
                <li>
                  {' '}
                  <Link href="/dashboard/account">
                    <a>
                      <img src="/icons/account.svg" alt="account" />
                      My account
                    </a>
                  </Link>
                </li>
                <li>
                  {' '}
                  <Link href="/dashboard/search">
                    <a>
                      <img src="/icons/loupe.svg" alt="loupe" />
                      Search my storage
                    </a>
                  </Link>
                </li>
                <li>
                  {' '}
                  <Link href="/dashboard/my-list">
                    <a>
                      <img src="/icons/list.svg" alt="list " />
                      My list
                    </a>
                  </Link>
                </li>
                <li>
                  {' '}
                  <Link href="/logout">
                    <a>
                      <img src="/icons/exit.svg" alt="exit" />
                      Logout
                    </a>
                  </Link>
                </li>
              </ul>
              <div css={addStorageItemStyles}>
                <h2>
                  <img src="/icons/add.svg" alt="plus" />
                  Add new storage unit
                </h2>
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
                        setErrorMessage(
                          'Something went wrong! Please try again',
                        );
                      } else {
                        setErrorMessage(
                          'Something went wrong! Please try again',
                        );
                      }
                    }
                  }}
                >
                  <label htmlFor="name">
                    Name (required):
                    <input
                      type="text"
                      id="name"
                      value={storageItemName}
                      placeholder="e.g. brown box"
                      maxLength={50}
                      required
                      onChange={(e) =>
                        setStorageItemName(e.currentTarget.value)
                      }
                    />
                  </label>
                  <br />
                  <label htmlFor="location">
                    Location:
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
                  <button css={formButtonStyles}>Add</button>
                  <button
                    css={formButtonStyles}
                    onClick={() => router.reload()}
                  >
                    Reset
                  </button>
                </form>
                <p css={messageStyle}>{errorMessage}</p>
              </div>
            </div>

            <h2 css={storageItemsHeadingStyles}>
              <img src="/icons/box.svg" alt="box" />
              My storage units
            </h2>
            <div css={storageItemsAreaStyles}>
              <img
                src="/img/empty-storage-img.svg"
                alt="man holding empty box"
              />
              <h2>
                Your storage is empty! Please start by adding a new storage
                unit!
              </h2>
            </div>
          </main>
        </Layout>
      </div>
    );
  }
  //if storage items have been added by user
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
                  <a>
                    <img src="/icons/account.svg" alt="account" />
                    My account
                  </a>
                </Link>
              </li>
              <li>
                {' '}
                <Link href="/dashboard/search">
                  <a>
                    <img src="/icons/loupe.svg" alt="loupe" />
                    Search my storage
                  </a>
                </Link>
              </li>
              <li>
                {' '}
                <Link href="/dashboard/my-list">
                  <a>
                    <img src="/icons/list.svg" alt="list " />
                    My list
                  </a>
                </Link>
              </li>
              <li>
                {' '}
                <Link href="/logout">
                  <a>
                    <img src="/icons/exit.svg" alt="exit" />
                    Logout
                  </a>
                </Link>
              </li>
            </ul>
            <div css={addStorageItemStyles}>
              <h2>
                <img src="/icons/add.svg" alt="plus" />
                Add new storage unit
              </h2>
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
                  Name (required):
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
                  Location:
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
                <button css={formButtonStyles}>Add</button>
                <button css={formButtonStyles} onClick={() => router.reload()}>
                  Reset
                </button>
              </form>
              <p>{errorMessage}</p>
            </div>
          </div>

          <h2 css={storageItemsHeadingStyles}>
            <img src="/icons/box.svg" alt="box" />
            My storage units
          </h2>
          <div css={storageItemsAreaStyles}>
            <ul>
              {props.storageItems.map((storageItem: StorageItem) => {
                return (
                  <li css={storageItemStyles} key={storageItem.id}>
                    <button
                      css={deleteButtonStyles}
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
                      <img src="/icons/trash.svg" alt="delete button" />
                    </button>
                    {storageItem.storageItemName}
                    <br />
                    {storageItem.storageItemLocation}
                    <Link href={`/dashboard/${storageItem.id}`}>
                      <a css={openButtonStyles}>
                        <img src="/icons/box.svg" alt="open button" />
                      </a>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
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
