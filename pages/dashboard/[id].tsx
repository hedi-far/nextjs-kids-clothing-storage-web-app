import Head from 'next/head';
import Layout from '../../components/Layout';
// import Link from 'next/link';
import nextCookies from 'next-cookies';
import { GetServerSidePropsContext } from 'next';
import {
  StorageItem,
  ClothingItemDetail,
  ClothingItemsType,
  ClothingItemsColor,
} from '../../util/types';
import {
  getClothingItemTypes,
  getStorageItemByUserId,
  getUserBySessionToken,
  getClothingItemByStorageItemId,
  getClothingItemColors,
} from '../../util/database';
import { isSessionTokenValid } from '../../util/auth';

type Props = {
  loggedIn: boolean;
  storageItem: StorageItem;
  clothingItems: ClothingItemDetail[];
  clothingItemsTypes: ClothingItemsType[];
  clothingItemsColors: ClothingItemsColor[];
};

export default function Search(props: Props) {
  // console.log(props.clothingItemTypes);
  return (
    <div>
      <Layout loggedIn={props.loggedIn}>
        <Head>
          <title>Welcome!</title>
        </Head>
        <main>
          <h1>Storage item</h1>
          Name: {props.storageItem.storageItemName} <br />
          Location: {props.storageItem.storageItemLocation}
          <table>
            <tr>
              <th>type</th>
              <th>color</th>
              <th>size</th>
              <th>season</th>
              <th>gender</th>
              <th>notes</th>
              <th />
              <th />
              <th />
            </tr>
            {props.clothingItems.map((clothingItem: ClothingItemDetail) => {
              return (
                <tr key={clothingItem.id}>
                  <td>{clothingItem.clothingItemsType}</td>
                  <td>{clothingItem.color}</td>
                  <td>{clothingItem.size}</td>
                  <td>{clothingItem.season}</td>
                  <td>{clothingItem.gender}</td>
                  <td>{clothingItem.notes}</td>
                  <td>
                    <button>Edit</button>
                  </td>
                  <td>
                    {' '}
                    <button>Delete</button>
                  </td>
                  <td>
                    {' '}
                    <button>Add to List</button>
                  </td>
                </tr>
              );
            })}
          </table>
          <h1>Add new clothing_item</h1>
          <br />
          <form>
            <label htmlFor="type">
              {' '}
              Type:
              <select id="type" required>
                {props.clothingItemsTypes.map((type: ClothingItemsType) => {
                  return (
                    <option key={type.id} value={type.id}>
                      {type.clothingItemsType}
                    </option>
                  );
                })}
              </select>
            </label>
            <label htmlFor="color">
              {' '}
              Color:
              <select id="color" required>
                {props.clothingItemsColors.map((color: ClothingItemsColor) => {
                  return (
                    <option key={color.id} value={color.id}>
                      {color.color}
                    </option>
                  );
                })}
              </select>
            </label>
            <br />
            <button>Add storage item</button>
          </form>
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
        destination: '/login?returnTo=/dashboard/[id]',
        permanent: false,
      },
    };
  }

  const user = await getUserBySessionToken(token);

  const userId = user.id;

  // console.log(user, userId);

  const storageItems = await getStorageItemByUserId(userId);

  const currentId = Number(context.query.id);

  const storageItem = storageItems.find((element) => element.id === currentId);

  // console.log(storageItem);

  const clothingItems = await getClothingItemByStorageItemId(storageItem.id);

  // console.log(clothingItems);

  const clothingItemsTypes = await getClothingItemTypes();

  // console.log(clothingItemTypes);

  const clothingItemsColors = await getClothingItemColors();

  console.log(clothingItemsColors);

  return {
    props: {
      user,
      loggedIn,
      storageItem,
      clothingItems,
      clothingItemsTypes,
      clothingItemsColors,
    },
  };
}
