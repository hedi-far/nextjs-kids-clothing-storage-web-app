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
  ClothingItemsSize,
  ClothingItemsSeason,
  ClothingItemsGender,
} from '../../util/types';
import {
  getClothingItemTypes,
  getStorageItemByUserId,
  getUserBySessionToken,
  getClothingItemByStorageItemId,
  getClothingItemColors,
  getClothingItemSizes,
  getClothingItemSeasons,
  getClothingItemGender,
} from '../../util/database';
import { isSessionTokenValid } from '../../util/auth';

type Props = {
  loggedIn: boolean;
  storageItem: StorageItem;
  clothingItems: ClothingItemDetail[];
  clothingItemsTypes: ClothingItemsType[];
  clothingItemsColors: ClothingItemsColor[];
  clothingItemsSizes: ClothingItemsSize[];
  clothingItemsSeasons: ClothingItemsSeason[];
  clothingItemsGender: ClothingItemsGender[];
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
              Type (required):
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
              <select id="color">
                <option label=" " />
                {props.clothingItemsColors.map((color: ClothingItemsColor) => {
                  return (
                    <option key={color.id} value={color.id}>
                      {color.color}
                    </option>
                  );
                })}
              </select>
            </label>
            <label htmlFor="size">
              {' '}
              Size (required):
              <select id="size" required>
                {props.clothingItemsSizes.map((size: ClothingItemsSize) => {
                  return (
                    <option key={size.id} value={size.id}>
                      {size.size}
                    </option>
                  );
                })}
              </select>
            </label>
            <label htmlFor="season">
              {' '}
              Season:
              <select id="season">
                <option label=" " />
                {props.clothingItemsSeasons.map(
                  (season: ClothingItemsSeason) => {
                    return (
                      <option key={season.id} value={season.id}>
                        {season.season}
                      </option>
                    );
                  },
                )}
              </select>
            </label>
            <label htmlFor="gender">
              {' '}
              Gender:
              <select id="gender">
                <option label=" " />
                {props.clothingItemsGender.map(
                  (gender: ClothingItemsGender) => {
                    return (
                      <option key={gender.id} value={gender.id}>
                        {gender.gender}
                      </option>
                    );
                  },
                )}
              </select>
            </label>
            <label htmlFor="notes">
              Notes:
              <input
                type="text"
                id="note"
                // value="clothingItemNotes"
                minLength={0}
                maxLength={100}
              />
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

  // console.log(clothingItemsColors);

  const clothingItemsSizes = await getClothingItemSizes();

  // console.log(clothingItemsSizes);

  const clothingItemsSeasons = await getClothingItemSeasons();

  // console.log(clothingItemsSeasons);

  const clothingItemsGender = await getClothingItemGender();

  // console.log(clothingItemsGender);

  return {
    props: {
      user,
      loggedIn,
      storageItem,
      clothingItems,
      clothingItemsTypes,
      clothingItemsColors,
      clothingItemsSizes,
      clothingItemsSeasons,
      clothingItemsGender,
    },
  };
}
