import Head from 'next/head';
import { useState } from 'react';
import { GetServerSidePropsContext } from 'next';
import nextCookies from 'next-cookies';
import Layout from '../../components/Layout';
import { isSessionTokenValid } from '../../util/auth';
import { ClothingItemDetail } from '../../util/types';
import { handleDeleteFromList } from '../../util/my-list';

type Props = { loggedIn: boolean; myList: ClothingItemDetail[] };

export default function MyListPage(props: Props) {
  const [myList, setMyList] = useState(props.myList);

  return (
    <div>
      <Layout loggedIn={props.loggedIn}>
        <Head>
          <title>My List</title>
        </Head>
        <main>
          <h1>My List</h1>
          <table>
            {props.myList.map((listItem: ClothingItemDetail) => {
              return (
                <tbody key={listItem.id}>
                  <tr key={listItem.id}>
                    <td>{listItem.clothingItemsType}</td>
                    <td>{listItem.color}</td>
                    <td>{listItem.size}</td>
                    <td>{listItem.season}</td>
                    <td>{listItem.gender}</td>
                    <td>{listItem.notes}</td>
                    <td>{listItem.storageItemName}</td>
                    <td>{listItem.storageItemLocation}</td>
                    <td>
                      {' '}
                      <button
                        onClick={() =>
                          setMyList(handleDeleteFromList(myList, listItem.id))
                        }
                      >
                        Delete from List
                      </button>
                    </td>
                  </tr>
                </tbody>
              );
            })}
            {/* <button onClick={window.print}>Print</button> */}
          </table>
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
        destination: '/login?returnTo=/dashboard/my-list',
        permanent: false,
      },
    };
  }
  const allCookies = nextCookies(context);
  const myList = allCookies.myList || [];

  return {
    props: {
      loggedIn,
      myList,
    },
  };
}
