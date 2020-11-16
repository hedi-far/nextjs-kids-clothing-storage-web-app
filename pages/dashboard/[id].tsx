import Head from 'next/head';
import Layout from '../../components/Layout';
import AddToListButton from '../../components/AddToListButton';
// import Link from 'next/link';
import { GetServerSidePropsContext } from 'next';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import nextCookies from 'next-cookies';
import Cookies from 'js-cookie';
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
  myList: ClothingItemDetail[];
};

export default function Search(props: Props) {
  const [clothingItemTypeId, setClothingItemTypeId] = useState('');
  const [clothingItemSizeId, setClothingItemSizeId] = useState('');
  const [clothingItemColorId, setClothingItemColorId] = useState('');
  const [clothingItemSeasonId, setClothingItemSeasonId] = useState('');
  const [clothingItemGenderId, setClothingItemGenderId] = useState('');
  const [clothingItemNotesId, setClothingItemNotes] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();
  const [myList, setMyList] = useState(props.myList);

  //sets cookie for personal clothing items list
  useEffect(() => {
    Cookies.set('myList', myList);
  }, [myList]);

  return (
    <div>
      <Layout loggedIn={props.loggedIn}>
        <Head>
          <title>Welcome!</title>
        </Head>
        <main>
          {/* user sees current list of clothing items in respective storage item */}
          <h1> Name: {props.storageItem.storageItemName}</h1>

          <h2>Location: {props.storageItem.storageItemLocation}</h2>
          <h2>Content:</h2>
          {/* //table for clothing items */}
          <table>
            <thead>
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
                    <td>
                      <button>Edit</button>
                    </td>
                    <td>
                      {' '}
                      <button
                        onClick={async () => {
                          const answer = window.confirm(`Really delete? ?`);

                          if (answer === true) {
                            // Send the data to the
                            // API route
                            const id = props.storageItem.id;

                            const response = await fetch(
                              `../api/dashboard/${id}`,
                              {
                                method: 'DELETE',
                                headers: {
                                  'Content-Type': 'application/json',
                                },
                                body: JSON.stringify({
                                  clothingItemId: clothingItem.id,
                                }),
                              },
                            );

                            const { success } = await response.json();

                            if (success) {
                              // Redirect so same page
                              router.push(`/dashboard/${id}`);
                            } else {
                              // If the response status code (set using response.status()
                              // in the API route) is 409 (Conflict) then show an error
                              // message that the user already exists

                              setErrorMessage('Failed!');
                            }
                          }
                        }}
                      >
                        Delete
                      </button>
                    </td>
                    <td>
                      {' '}
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
          {/* form to add new clothing items to respective storage item */}
          <h1>Add new clothing item</h1>
          <br />
          <form
            onSubmit={async (e) => {
              // Prevent the default browser behavior of forms
              e.preventDefault();

              // Send the data to the
              // API route
              const id = props.storageItem.id;

              const response = await fetch(`../api/dashboard/${id}`, {
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
                  storageItemId: props.storageItem.id,
                }),
              });

              const { success } = await response.json();

              if (success) {
                // Redirect so same page
                router.push(`/dashboard/${id}`);
              } else {
                // If the response status code (set using response.status()
                // in the API route) is 409 (Conflict) then show an error
                // message that the user already exists
                if (response.status === 409) {
                  setErrorMessage('Already exists!');
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
                <option label=" " value=" " />
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
                <option label=" " value=" " />
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
                <option label=" " value=" " />
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
              <select
                id="gender"
                value={clothingItemGenderId}
                onChange={(e) => setClothingItemGenderId(e.currentTarget.value)}
              >
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
            <button>Add storage item</button>
          </form>
          <p>{errorMessage}</p>
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

  const storageItems = await getStorageItemByUserId(userId);

  const currentId = Number(context.query.id);

  const storageItem = storageItems.find((element) => element.id === currentId);

  const clothingItems = await getClothingItemByStorageItemId(storageItem.id);

  const clothingItemsTypes = await getClothingItemTypes();

  const clothingItemsColors = await getClothingItemColors();

  const clothingItemsSizes = await getClothingItemSizes();

  const clothingItemsSeasons = await getClothingItemSeasons();

  const clothingItemsGender = await getClothingItemGender();

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
      myList,
      // listInfo,
    },
  };
}
