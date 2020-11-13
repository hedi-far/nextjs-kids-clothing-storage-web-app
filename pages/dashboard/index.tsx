import Head from 'next/head';
import Layout from '../../components/Layout';
import Link from 'next/link';
import nextCookies from 'next-cookies';
// import { useState } from 'react';
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
  // console.log(props.storageItems[0].storageItemName);
  // console.log(typeof props.storageItems);
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
          <br />
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

  // console.log(user);

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
