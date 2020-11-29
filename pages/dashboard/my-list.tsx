import Head from 'next/head';
import { useState } from 'react';
import { GetServerSidePropsContext } from 'next';
import Link from 'next/link';
import nextCookies from 'next-cookies';
import { css } from '@emotion/react';
import Layout from '../../components/Layout';
import { isSessionTokenValid } from '../../util/auth';
import { ClothingItemDetail } from '../../util/types';
import { handleDeleteFromList } from '../../util/my-list';

const myListPageStyles = css`
  /* display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 0.5fr 1fr 1fr; */
`;

const myListPageHeadingStyles = css`
  /* grid-area: 1 / 1 / 2 / 2;  */
  height: 40px;
  margin-top: 40px;
  img {
    height: 60px;
    width: 60px;
    margin-right: 5px;
    /* background-color: blue; */
  }
`;

const myListAreaStyles = css`
  /* grid-area: 2 / 1 / 3 / 2;
  margin-top: -110px;*/
  margin-left: 400px;
  img {
    height: 400px;
    width: 400px;
  }
  table {
    margin-top: 100px;
    width: 50%;
    font-size: 20px;
  }
`;

//icon trashcan
const deleteButtonStyles = css`
  background-color: white;
  box-shadow: none;
  margin-top: 15px;
  & img {
    height: 30px !important;
    width: 30px !important;
  }
`;

const myListPageButtonAreaStyles = css`
  /* grid-area: 3 / 1 / 4 / 2; */
  padding: 15px;
`;

//go back icon
const backButtonStyles = css`
  margin-top: 10px;
  cursor: pointer;
  & img {
    height: 30px;
    width: 30px;
  }
`;

type Props = { loggedIn: boolean; myList: ClothingItemDetail[] };

export default function MyListPage(props: Props) {
  const [myList, setMyList] = useState(props.myList);

  //when list is empty
  if (props.myList.length === 0) {
    return (
      <div>
        <Layout loggedIn={props.loggedIn}>
          <Head>
            <title>N! My List</title>
          </Head>
          <main css={myListPageStyles}>
            <h1 css={myListPageHeadingStyles}>
              {' '}
              <img src="/icons/list.svg" alt="list" />
              My List
            </h1>
            <div css={myListAreaStyles}>
              <h1>
                Your list is empty!{' '}
                <img src="/img/empty-list-img.svg" alt="empty list" />{' '}
              </h1>
              {/* <table>
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
                              setMyList(
                                handleDeleteFromList(myList, listItem.id),
                              )
                            }
                          >
                            Delete from List
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  );
                })}
              </table> */}
              <div css={myListPageButtonAreaStyles}>
                <h2 css={backButtonStyles}>
                  <Link href="/dashboard">
                    <a>
                      <img src="/icons/backward.svg" alt="delete button" /> Back
                      to dashboard!
                    </a>
                  </Link>
                </h2>
                {/* <button onClick={window.print}>Print</button> */}
              </div>
            </div>
          </main>
        </Layout>
      </div>
    );
    //when list is not empty
  } else {
    return (
      <div>
        <Layout loggedIn={props.loggedIn}>
          <Head>
            <title>My List</title>
          </Head>
          <main css={myListPageStyles}>
            <h1 css={myListPageHeadingStyles}>
              {' '}
              <img src="/icons/list.svg" alt="list" />
              My List
            </h1>
            <div css={myListAreaStyles}>
              <table>
                <tr>
                  <th>Type</th>
                  <th>Color</th>
                  <th>Size</th>
                  <th>Season</th>
                  <th>Gender</th>
                  <th>Notes</th>
                  <th>Storage unit</th>
                  <th>Storage location</th>
                  <th>Delete from list</th>
                </tr>
                {props.myList.map((listItem: ClothingItemDetail) => {
                  return (
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
                          css={deleteButtonStyles}
                          onClick={() =>
                            setMyList(handleDeleteFromList(myList, listItem.id))
                          }
                        >
                          <img src="/icons/trash.svg" alt="delete button" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </table>
              <div css={myListPageButtonAreaStyles}>
                {/* <button onClick={window.print}>Print</button> */}
                <Link href="/dashboard/print-my-list">
                  <button>
                    <a>Printable Version</a>
                  </button>
                </Link>
              </div>
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
