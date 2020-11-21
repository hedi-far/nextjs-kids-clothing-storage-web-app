import Head from 'next/head';
import Layout from '../../components/Layout';
// import Link from 'next/link';
import AddToListButton from '../../components/AddToListButton';
import nextCookies from 'next-cookies';
import { GetServerSidePropsContext } from 'next';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { isSessionTokenValid } from '../../util/auth';
import {
  getClothingItemColors,
  getClothingItemGender,
  getClothingItemSeasons,
  getClothingItemSizes,
  getClothingItemTypes,
  // getStorageItemByUserId,
  getClothingItemByUserId,
  getUserBySessionToken,
} from '../../util/database';
import {
  ClothingItemDetail,
  ClothingItemDetailByUser,
  ClothingItemsColor,
  ClothingItemsGender,
  ClothingItemsSeason,
  ClothingItemsSize,
  ClothingItemsType,
  StorageItem,
} from '../../util/types';

type Props = {
  loggedIn: boolean;
  storageItem: StorageItem;
  clothingItems: ClothingItemDetailByUser[];
  clothingItemsTypes: ClothingItemsType[];
  clothingItemsColors: ClothingItemsColor[];
  clothingItemsSizes: ClothingItemsSize[];
  clothingItemsSeasons: ClothingItemsSeason[];
  clothingItemsGender: ClothingItemsGender[];
  myList: ClothingItemDetail[];
};

export default function Search(props: Props) {
  const router = useRouter();
  const [clothingItemTypeId, setClothingItemTypeId] = useState('');
  const [clothingItemSizeId, setClothingItemSizeId] = useState('');
  const [clothingItemColorId, setClothingItemColorId] = useState('');
  const [clothingItemSeasonId, setClothingItemSeasonId] = useState('');
  const [clothingItemGenderId, setClothingItemGenderId] = useState('');
  const [clothingItemNotesId, setClothingItemNotes] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [myList, setMyList] = useState(props.myList);
  return (
    <div>
      <Layout loggedIn={props.loggedIn}>
        <Head>
          <title>Welcome!</title>
        </Head>
        <main>
          <h1>Search</h1>
          <form
            onSubmit={async (e) => {
              // Prevent the default browser behavior of forms
              e.preventDefault();

              // Send the data to the
              // API route
              // const id = props.storageItem.id;

              const response = await fetch(`../api/dashboard/search`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },

                body: JSON.stringify({
                  clothingItemsTypeId: clothingItemTypeId,
                  sizeId: clothingItemSizeId,
                  colorId: clothingItemColorId,
                  seasonId: clothingItemSeasonId,
                  genderId: clothingItemGenderId,
                  notes: clothingItemNotesId,
                  // storageItemId: props.storageItem.id,
                }),
              });

              const { success } = await response.json();

              if (success) {
                // Redirect so same page
                // router.push(`/dashboard/${id}`);
                window.alert('Success!');
                console.log(response);
              } else {
                // If the response status code (set using response.status()
                // in the API route) is 409 (Conflict) then show an error
                // message that the user already exists
                if (response.status === 409) {
                  setErrorMessage('No results!');
                } else {
                  setErrorMessage('Failed!');
                }
              }
            }}
          >
            {/* form fields start here */}
            <label htmlFor="type">
              {' '}
              Type (required):
              <select
                id="type"
                required
                value={clothingItemTypeId}
                onChange={(e) => setClothingItemTypeId(e.currentTarget.value)}
              >
                <option />
                {props.clothingItemsTypes.map((type: ClothingItemsType) => {
                  return (
                    <option key={type.id} value={type.id}>
                      {type.clothingItemsType}
                    </option>
                  );
                })}
              </select>
            </label>
            <label htmlFor="size">
              {' '}
              Size (required):
              <select
                id="size"
                required
                value={clothingItemSizeId}
                onChange={(e) => setClothingItemSizeId(e.currentTarget.value)}
              >
                <option />
                {props.clothingItemsSizes.map((size: ClothingItemsSize) => {
                  return (
                    <option key={size.id} value={size.id}>
                      {size.size}
                    </option>
                  );
                })}
              </select>
            </label>
            <br />
            <label htmlFor="color">
              {' '}
              Color:
              <select
                id="color"
                value={clothingItemColorId}
                onChange={(e) => setClothingItemColorId(e.currentTarget.value)}
              >
                <option value=" ">none</option>
                {props.clothingItemsColors.map((color: ClothingItemsColor) => {
                  return (
                    <option key={color.id} value={color.id}>
                      {color.color}
                    </option>
                  );
                })}
              </select>
            </label>

            <label htmlFor="season">
              {' '}
              Season:
              <select
                id="season"
                value={clothingItemSeasonId}
                onChange={(e) => setClothingItemSeasonId(e.currentTarget.value)}
              >
                <option value=" ">none</option>
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
              <select
                id="gender"
                value={clothingItemGenderId}
                onChange={(e) => setClothingItemGenderId(e.currentTarget.value)}
              >
                <option value=" ">none</option>
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
              <br />
            </label>
            <label htmlFor="notes">
              Notes:
              <textarea
                rows={3}
                cols={20}
                id="notes"
                name="notes"
                value={clothingItemNotesId}
                maxLength={100}
                onChange={(e) => setClothingItemNotes(e.currentTarget.value)}
              />
            </label>
            <br />
            <button>Search</button>
            <button onClick={() => router.reload()}>Reset</button>
          </form>
          <p>{errorMessage}</p>

          {/* complete list of logged in user */}
          <h1>Entire list of clothing items</h1>
          <table>
            <thead>
              <tr>
                <th>type</th>
                <th>color</th>
                <th>size</th>
                <th>season</th>
                <th>gender</th>
                <th>notes</th>
                <th>storage item name</th>
                <th>storage item location</th>
                <th />
                <th />
                <th />
              </tr>
            </thead>

            {props.clothingItems.map((clothingItem: ClothingItemDetail) => {
              return (
                <tbody key={clothingItem.id}>
                  <tr>
                    <td>{clothingItem.clothingItemsType}</td>
                    <td>{clothingItem.color}</td>
                    <td>{clothingItem.size}</td>
                    <td>{clothingItem.season}</td>
                    <td>{clothingItem.gender}</td>
                    <td>{clothingItem.notes}</td>
                    <td>{clothingItem.storageItemName}</td>
                    <td>{clothingItem.storageItemLocation}</td>

                    <td>
                      <AddToListButton
                        myList={myList}
                        setMyList={setMyList}
                        clothingItem={clothingItem}
                        clothingItemId={clothingItem.id}
                      />
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
        destination: '/login?returnTo=/dashboard/[id]',
        permanent: false,
      },
    };
  }

  const allCookies = nextCookies(context);
  const myList = allCookies.myList || [];

  const user = await getUserBySessionToken(token);

  const userId = user.id;

  // console.log(userId);

  // const storageItems = await getStorageItemByUserId(userId);

  // console.log(storageItems);

  // const currentId = Number(context.query.id);

  // const storageItem = storageItems.find((element) => element.id === currentId);

  const clothingItems = await getClothingItemByUserId(userId);

  // console.log(clothingItems);

  const clothingItemsTypes = await getClothingItemTypes();

  const clothingItemsColors = await getClothingItemColors();

  const clothingItemsSizes = await getClothingItemSizes();

  const clothingItemsSeasons = await getClothingItemSeasons();

  const clothingItemsGender = await getClothingItemGender();

  return {
    props: {
      user,
      loggedIn,
      // storageItem,
      clothingItems,
      clothingItemsTypes,
      clothingItemsColors,
      clothingItemsSizes,
      clothingItemsSeasons,
      clothingItemsGender,
      myList,
    },
  };
}
