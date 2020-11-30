import Head from 'next/head';
import { GetServerSidePropsContext } from 'next';
import nextCookies from 'next-cookies';
import { css } from '@emotion/react';
import Layout from '../../components/Layout';
import { isSessionTokenValid } from '../../util/auth';
import { ClothingItemDetail } from '../../util/types';

const printStyles = css`
  footer {
    display: none;
  }

  header {
    display: none;
  }

  h1,
  h2 {
    padding: 20px;
  }
`;

type Props = { loggedIn: boolean; myList: ClothingItemDetail[] };

export default function MyListPage(props: Props) {
  const currentDate = new Date().toDateString();

  //if list is empty - returns null; user cannot access, because
  //link is not displayed on my-list page when list is empty
  if (props.myList.length === 0) {
    return null;
  } else {
    return (
      <div css={printStyles}>
        <Layout loggedIn={props.loggedIn}>
          <Head>
            <title>My List {currentDate} </title>
          </Head>
          <main>
            <h1>My Neatify! List</h1>
            <h2>{currentDate} </h2>
            <div>
              <table>
                <tr>
                  <th>Found it</th>
                  <th>Type</th>
                  <th>Color</th>
                  <th>Size</th>
                  <th>Season</th>
                  <th>Gender</th>
                  <th>Notes</th>
                  <th>Storage unit</th>
                  <th>Storage location</th>
                </tr>
                {props.myList.map((listItem: ClothingItemDetail) => {
                  return (
                    <tr key={listItem.id}>
                      <td> &#9675;</td>
                      <td>{listItem.clothingItemsType}</td>
                      <td>{listItem.color}</td>
                      <td>{listItem.size}</td>
                      <td>{listItem.season}</td>
                      <td>{listItem.gender}</td>
                      <td>{listItem.notes}</td>
                      <td>{listItem.storageItemName}</td>
                      <td>{listItem.storageItemLocation}</td>
                    </tr>
                  );
                })}
              </table>
            </div>
          </main>
        </Layout>
      </div>
    );
  }
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { session: token } = nextCookies(context);
  const loggedIn = await isSessionTokenValid(token);

  if (!(await isSessionTokenValid(token))) {
    return {
      redirect: {
        destination: '/login?returnTo=/dashboard/print-my-list',
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
