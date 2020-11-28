import React from 'react';
import Head from 'next/head';
import { GetServerSidePropsContext } from 'next';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import nextCookies from 'next-cookies';
import Cookies from 'js-cookie';
import { css } from '@emotion/react';
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

const storageItemPageStyles = css`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr 0.5fr;
  gap: 0px 0px;
`;

//Name of storageItem as heading
const storageItemHeading = css`
  grid-area: 1 / 1 / 2 / 2;
  /* background-color: blue; */
  height: 40px;
  margin-top: 40px;
  img {
    height: 60px;
    width: 60px;
    margin-right: 5px;
    /* background-color: blue; */
  }
`;

//go back icon
const backButtonStyles = css`
  /* background-color: blue; */
  margin-top: 105px;
  cursor: pointer;
  & img {
    height: 30px;
    width: 30px;
  }
`;

/* const sideBarStyles = css`
  grid-area: 2 / 1 / 3 / 2;
  height: 200px;
  /* background-color: green; */
/* margin-top: -100px;
`; */

/* //grey box
const sideBarLinkStyles = css`
  font-size: 18px;
  height: 170px;
  width: 300px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  background-color: #e6e6e6;
  border-radius: 15px;
  box-shadow: -13px -9px 5px -6px rgba(135, 142, 138, 0.25);
  img {
    height: 30px;
    width: 30px;
    margin-right: 5px;
    /* background-color: blue; */
/* }
`; */

//yellow card
const storageItemDetailStyles = css`
  grid-area: 1 / 2 / 2 / 3;
  background-color: #f3f38e;
  height: 200px;
  width: 100%;
  margin: 10px;
  padding: 30px;
  margin-top: 50px;
  border-radius: 15px;
  font-size: 18px;
  display: flex;
  justify-content: space-around;
  flex-direction: column;
  box-shadow: -13px -9px 5px -6px rgba(135, 142, 138, 0.25);
  img {
    height: 30px;
    width: 30px;
    float: right;
    /* background-color: blue; */
  }
`;

//Edit storage Item
const storageItemDetailHeadingStyles = css`
  margin-bottom: 10px;
`;

const formButtonStyles = css`
  background-color: white;
  color: #645e49;
  height: 30px;
  width: 120px;
  margin: 10px;
  border: none;
  box-shadow: 0px 4px 4px 0px #000000 25%;
`;

//area around table
const listOfClothingItemsStyles = css`
  grid-area: 2 / 2 / 4 / 3;
  margin-top: -45px;
  height: 680px;
  /* background-color: grey; */

  overflow: auto;
  & img {
    height: 320px;
    margin-bottom: 25px;
  }
`;

//My clothing items (heading)
const listOfClothingItemsHeadingStyles = css`
  margin-bottom: 30px;
`;

//light pink box
const addNewClothingItemStyles = css`
  /* grid-area: 3 / 1 / 4 / 2; */
  grid-area: 2 / 1 / 3 / 2;
  /* background-color: blue; */
  margin-top: -50px;
  line-height: 50px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  font-size: 18px;
  img {
    height: 30px;
    width: 30px;
    margin-right: 5px;
    /* background-color: blue; */
  }
`;

//icon trashcan
const deleteButtonStyles = css`
  background-color: white;
  box-shadow: none;
  margin-top: 15px;
  & img {
    height: 30px;
    width: 30px;
  }
`;

const messageStyle = css`
  background-color: #e6e6e6;
  color: #645e49;
  margin: 10px;
  padding-left: 12px;
  padding-right: 12px;
  border: none;
  border-radius: 15px;
  box-shadow: -13px -9px 5px -6px rgba(135, 142, 138, 0.25);
`;

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

  if (props.clothingItems.length === 0) {
    return (
      <div>
        {/* loggedIn is set to true by default, bc if no session token
        is found in getServerSideProps, the user will be redirected to the login page! */}
        <Layout loggedIn={true}>
          <Head>
            <title>{storageItemName}</title>
          </Head>
          <main css={storageItemPageStyles}>
            <div css={storageItemHeading}>
              <h1>
                <img src="/icons/box.svg" alt="box" />
                {storageItemName}
              </h1>
              <h2 css={backButtonStyles}>
                <Link href="/dashboard">
                  <a>
                    <img src="/icons/backward.svg" alt="arrow backwards" />
                    Back to dashboard!
                  </a>
                </Link>{' '}
              </h2>
            </div>

            <div css={storageItemDetailStyles}>
              <ul>
                <li>
                  <h2 css={storageItemDetailHeadingStyles}>
                    {' '}
                    <img src="/icons/pencil.svg" alt="pencil" />
                    Edit storage unit
                  </h2>
                </li>
                <li>
                  Name:{' '}
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
                      css={formButtonStyles}
                      onClick={() => {
                        setEditingKey('Name');
                      }}
                    >
                      Edit
                    </button>
                  ) : (
                    <>
                      <button
                        css={formButtonStyles}
                        onClick={async () => {
                          await fetch(
                            `/api/dashboard/${props.storageItem.id}`,
                            {
                              method: 'PATCH',
                              headers: {
                                'Content-Type': 'application/json',
                              },
                              body: JSON.stringify({
                                storageItemId: props.storageItem.id,
                                storageItemName: storageItemName,
                                storageItemLocation: storageItemLocation,
                              }),
                            },
                          );
                          setEditingKey(null);
                        }}
                      >
                        Save
                      </button>
                      <button
                        css={formButtonStyles}
                        onClick={() => {
                          setEditingKey(null);
                          setStorageItemName(props.storageItem.storageItemName);
                        }}
                      >
                        Cancel
                      </button>
                    </>
                  )}
                </li>
                <li>
                  Location:{' '}
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
                      css={formButtonStyles}
                      onClick={() => {
                        setEditingKey('Location');
                      }}
                    >
                      Edit
                    </button>
                  ) : (
                    <>
                      <button
                        css={formButtonStyles}
                        onClick={async () => {
                          await fetch(
                            `/api/dashboard/${props.storageItem.id}`,
                            {
                              method: 'PATCH',
                              headers: {
                                'Content-Type': 'application/json',
                              },
                              body: JSON.stringify({
                                storageItemId: props.storageItem.id,
                                storageItemName: storageItemName,
                                storageItemLocation: storageItemLocation,
                              }),
                            },
                          );
                          setEditingKey(null);
                        }}
                      >
                        Save
                      </button>
                      <button
                        css={formButtonStyles}
                        onClick={() => {
                          setEditingKey(null);
                          setStorageItemLocation(
                            props.storageItem.storageItemLocation,
                          );
                        }}
                      >
                        Cancel
                      </button>
                    </>
                  )}
                </li>
              </ul>
            </div>

            <div css={addNewClothingItemStyles}>
              {/* form to add new clothing items to respective storage item */}

              <h2>
                <img src="/icons/add.svg" alt="plus" /> Add new clothing item
              </h2>
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
                    onChange={(e) =>
                      setClothingItemTypeId(e.currentTarget.value)
                    }
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
                    onChange={(e) =>
                      setClothingItemSizeId(e.currentTarget.value)
                    }
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
                    onChange={(e) =>
                      setClothingItemColorId(e.currentTarget.value)
                    }
                  >
                    <option value=" ">none</option>
                    {props.clothingItemsColors.map(
                      (color: ClothingItemsColor) => {
                        return (
                          <option key={color.id} value={color.id}>
                            {color.color}
                          </option>
                        );
                      },
                    )}
                  </select>
                </label>

                <label htmlFor="season">
                  {' '}
                  Season:
                  <select
                    id="season"
                    value={clothingItemSeasonId}
                    onChange={(e) =>
                      setClothingItemSeasonId(e.currentTarget.value)
                    }
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
                    onChange={(e) =>
                      setClothingItemGenderId(e.currentTarget.value)
                    }
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
                    onChange={(e) =>
                      setClothingItemNotes(e.currentTarget.value)
                    }
                  />
                </label>
                <br />
                <button css={formButtonStyles}>Add</button>
                {/* button resets only select fields, reload clears input fields; when only reload, clothing_item is added to db twice  */}
                <button
                  css={formButtonStyles}
                  type="reset"
                  onClick={() => router.reload()}
                >
                  Reset
                </button>
              </form>
              <p css={messageStyle}>{errorMessage}</p>
            </div>
            <div css={listOfClothingItemsStyles}>
              <img src="/img/empty-list-img.svg" alt="man holding empty box" />
              <h2>
                {storageItemName} is empty! Please start by adding a new
                clothing item!
              </h2>
            </div>
          </main>
        </Layout>
      </div>
    );
  }
  return (
    <div>
      {/* loggedIn is set to true by default, bc if no session token
      is found in getServerSideProps, the user will be redirected to the login page! */}
      <Layout loggedIn={true}>
        <Head>
          <title>{storageItemName}</title>
        </Head>
        <main css={storageItemPageStyles}>
          <div css={storageItemHeading}>
            <h1>
              <img src="/icons/box.svg" alt="box" />
              {storageItemName}
            </h1>
            <h2 css={backButtonStyles}>
              <Link href="/dashboard">
                <a>
                  <img src="/icons/backward.svg" alt="delete button" />
                  Back to dashboard!
                </a>
              </Link>{' '}
            </h2>
          </div>
          <div css={storageItemDetailStyles}>
            <ul>
              <li>
                <h2 css={storageItemDetailHeadingStyles}>
                  {' '}
                  <img src="/icons/pencil.svg" alt="pencil" />
                  Edit storage unit
                </h2>
              </li>
              <li>
                Name:{' '}
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
                    css={formButtonStyles}
                    onClick={() => {
                      setEditingKey('Name');
                    }}
                  >
                    Edit
                  </button>
                ) : (
                  <>
                    <button
                      css={formButtonStyles}
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
                      Save
                    </button>
                    <button
                      css={formButtonStyles}
                      onClick={() => {
                        setEditingKey(null);
                        setStorageItemName(props.storageItem.storageItemName);
                      }}
                    >
                      Cancel
                    </button>
                  </>
                )}
              </li>
              <li>
                Location:{' '}
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
                    css={formButtonStyles}
                    onClick={() => {
                      setEditingKey('Location');
                    }}
                  >
                    Edit
                  </button>
                ) : (
                  <>
                    <button
                      css={formButtonStyles}
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
                      Save
                    </button>
                    <button
                      css={formButtonStyles}
                      onClick={() => {
                        setEditingKey(null);
                        setStorageItemLocation(
                          props.storageItem.storageItemLocation,
                        );
                      }}
                    >
                      Cancel
                    </button>
                  </>
                )}
              </li>
            </ul>
          </div>

          <div css={listOfClothingItemsStyles}>
            <h2 css={listOfClothingItemsHeadingStyles}>My clothing items</h2>
            {/* //table for clothing items */}
            <table>
              <thead>
                <tr>
                  <th>Type</th>
                  <th>Color</th>
                  <th>Size</th>
                  <th>Season</th>
                  <th>Gender</th>
                  <th>Notes</th>
                  <th>Delete</th>
                  <th>Add to List</th>
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
                          css={deleteButtonStyles}
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
                          <img src="/icons/trash.svg" alt="delete button" />
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
          </div>
          <div css={addNewClothingItemStyles}>
            {/* form to add new clothing items to respective storage item */}

            <h2>
              <img src="/icons/add.svg" alt="plus" /> Add new clothing item
            </h2>
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
                  onChange={(e) =>
                    setClothingItemColorId(e.currentTarget.value)
                  }
                >
                  <option value=" ">none</option>
                  {props.clothingItemsColors.map(
                    (color: ClothingItemsColor) => {
                      return (
                        <option key={color.id} value={color.id}>
                          {color.color}
                        </option>
                      );
                    },
                  )}
                </select>
              </label>

              <label htmlFor="season">
                {' '}
                Season:
                <select
                  id="season"
                  value={clothingItemSeasonId}
                  onChange={(e) =>
                    setClothingItemSeasonId(e.currentTarget.value)
                  }
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
                  onChange={(e) =>
                    setClothingItemGenderId(e.currentTarget.value)
                  }
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
              <button css={formButtonStyles}>Add</button>
              {/* button resets only select fields, reload clears input fields; when only reload, clothing_item is added to db twice  */}
              <button
                css={formButtonStyles}
                type="reset"
                onClick={() => router.reload()}
              >
                Reset
              </button>
            </form>
            <p css={messageStyle}>{errorMessage}</p>
          </div>
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
