import React from 'react';
import Head from 'next/head';
import { GetServerSidePropsContext } from 'next';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import nextCookies from 'next-cookies';
import Cookies from 'js-cookie';
import Layout from '../../components/Layout';
import AddToListButton from '../../components/AddToListButton';
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
  getStorageItemsByUserId,
  getUserBySessionToken,
  getClothingItemByStorageItemId,
  getClothingItemColors,
  getClothingItemSizes,
  getClothingItemSeasons,
  getClothingItemGender,
} from '../../util/database';

type Props = {
  // loggedIn: boolean;
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
  const router = useRouter();
  const [clothingItemTypeId, setClothingItemTypeId] = useState('');
  const [clothingItemSizeId, setClothingItemSizeId] = useState('');
  const [clothingItemColorId, setClothingItemColorId] = useState('');
  const [clothingItemSeasonId, setClothingItemSeasonId] = useState('');
  const [clothingItemGenderId, setClothingItemGenderId] = useState('');
  const [clothingItemNotesId, setClothingItemNotes] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [myList, setMyList] = useState(props.myList);
  //editing key to edit storageItem
  const [editingKey, setEditingKey] = useState<string | null>(null);
  const [storageItemName, setStorageItemName] = useState(
    props.storageItem.storageItemName,
  );
  const [storageItemLocation, setStorageItemLocation] = useState(
    props.storageItem.storageItemLocation,
  );

  //sets cookie for personal clothing items list
  useEffect(() => {
    Cookies.set('myList', myList);
  }, [myList]);

  return (
    <div>
      {/* loggedIn is set to true by default, bc if no session token
      is found in getServerSideProps, the user will be redirected to the login page! */}
      <Layout loggedIn={true}>
        <Head>
          <title>{storageItemName}</title>
        </Head>
        <main>
          {/* user sees current list of clothing items in respective storage item */}
          <h1> Name: </h1>
          {editingKey === 'Name' ? (
            <input
              value={storageItemName}
              onChange={(event) =>
                setStorageItemName(event.currentTarget.value)
              }
            />
          ) : (
            storageItemName
          )}
          {editingKey !== 'Name' ? (
            <button
              onClick={() => {
                setEditingKey('Name');
              }}
            >
              edit
            </button>
          ) : (
            <>
              <button
                onClick={async () => {
                  await fetch(`/api/dashboard/${props.storageItem.id}`, {
                    method: 'PATCH',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                      storageItemId: props.storageItem.id,
                      storageItemName: storageItemName,
                      storageItemLocation: storageItemLocation,
                    }),
                  });
                  setEditingKey(null);
                }}
              >
                save
              </button>
              <button
                onClick={() => {
                  setEditingKey(null);
                  setStorageItemName(props.storageItem.storageItemName);
                }}
              >
                cancel
              </button>
            </>
          )}

          <h2>Location: </h2>
          {editingKey === 'Location' ? (
            <input
              value={storageItemLocation}
              onChange={(event) =>
                setStorageItemLocation(event.currentTarget.value)
              }
            />
          ) : (
            storageItemLocation
          )}
          {editingKey !== 'Location' ? (
            <button
              onClick={() => {
                setEditingKey('Location');
              }}
            >
              edit
            </button>
          ) : (
            <>
              <button
                onClick={async () => {
                  await fetch(`/api/dashboard/${props.storageItem.id}`, {
                    method: 'PATCH',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                      storageItemId: props.storageItem.id,
                      storageItemName: storageItemName,
                      storageItemLocation: storageItemLocation,
                    }),
                  });
                  setEditingKey(null);
                }}
              >
                save
              </button>
              <button
                onClick={() => {
                  setEditingKey(null);
                  setStorageItemLocation(props.storageItem.storageItemLocation);
                }}
              >
                cancel
              </button>
            </>
          )}

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
                      {' '}
                      <button
                        onClick={async () => {
                          const answer = window.confirm(`Really delete?`);

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
                  setErrorMessage(
                    'Sorry, that did not work! Please try again!',
                  );
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
            <button>Add storage item</button>
            {/* button resets only select fields, reload clears input fields; when only reload, clothing_item is added to db twice  */}
            <button type="reset" onClick={() => router.reload()}>
              Reset
            </button>
          </form>
          <p>{errorMessage}</p>
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
        destination: '/login?returnTo=/dashboard/[id]',
        permanent: false,
      },
    };
  }

  const allCookies = nextCookies(context);
  const myList = allCookies.myList || [];

  const userId = user.id;

  const storageItems = await getStorageItemsByUserId(userId);

  const currentId = Number(context.query.id);

  //function checks if logged-in-user-id is found in storageItems that were fetched above
  const storageItem = storageItems.find((element) => element.id === currentId);

  let clothingItems;

  //if any invalid storage item id is entered, user is returned to dashboard
  if (storageItem) {
    clothingItems = await getClothingItemByStorageItemId(storageItem.id);
  } else {
    return {
      redirect: {
        destination: '/dashboard',
        permanent: false,
      },
    };
  }

  const clothingItemsTypes = await getClothingItemTypes();

  const clothingItemsColors = await getClothingItemColors();

  const clothingItemsSizes = await getClothingItemSizes();

  const clothingItemsSeasons = await getClothingItemSeasons();

  const clothingItemsGender = await getClothingItemGender();

  return {
    props: {
      user,
      // loggedIn
      storageItem,
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
