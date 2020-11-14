import Head from 'next/head';
import nextCookies from 'next-cookies';
import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { GetServerSidePropsContext } from 'next';
import Layout from '../../components/Layout';
import { isSessionTokenValid } from '../../util/auth';
import { MyList } from '../../util/types';

type Props = { loggedIn: boolean; myList: MyList[] };

export default function MyListPage(props: Props) {
  const [myList, setMyList] = useState(props.myList);

  //sets cookie for personal clothing items list
  useEffect(() => {
    Cookies.set('myList', myList);
  }, [myList]);

  // console.log(myList);
  console.log(props.myList);
  // console.log(props.listInfo);

  return (
    <div>
      <Layout loggedIn={props.loggedIn}>
        <Head>
          <title>My List</title>
        </Head>
        <main>
          <h1>My List</h1>
          <table>
            {props.myList.map((listItem: MyList) => {
              return (
                <tbody key={listItem.id}>
                  <tr>
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
                      <button>Delete from List</button>
                    </td>
                  </tr>
                </tbody>
              );
            })}
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

  // console.log(myList);

  return {
    props: {
      loggedIn,
      myList,
    },
  };
}
