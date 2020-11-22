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
  SearchTerms,
  StorageItem,
} from '../../util/types';
import { getSearchResults } from '../../util/get-search-results';

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
  searchTerms: SearchTerms;
  newSearchTerms: SearchTerms;
  filteredClothingItems: ClothingItemDetailByUser[];
};

export default function Search(props: Props) {
  const router = useRouter();
  const [clothingItemType, setClothingItemType] = useState('');
  const [clothingItemSize, setClothingItemSize] = useState('');
  const [clothingItemColor, setClothingItemColor] = useState('');
  const [clothingItemSeason, setClothingItemSeason] = useState('');
  const [clothingItemGender, setClothingItemGender] = useState('');
  const [clothingItemNotes, setClothingItemNotes] = useState('');
  const [clothingItems, setClothingItems] = useState(props.clothingItems || []);
  const [errorMessage, setErrorMessage] = useState('');
  const [myList, setMyList] = useState(props.myList);
  const [searchTerms, setSearchTerms] = useState([]);

  //When Submit button is clicked:
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newSearchTerms = {
      clothingItemType,
      clothingItemSize,
      clothingItemColor,
      clothingItemSeason,
      clothingItemGender,
    };

    setSearchTerms(newSearchTerms);

    console.log(searchTerms);

    const filteredClothingItems = getSearchResults(
      clothingItems,
      newSearchTerms,
    );

    console.log(filteredClothingItems);

    setClothingItems(filteredClothingItems);
  };

  return (
    <div>
      <Layout loggedIn={props.loggedIn}>
        <Head>
          <title>Welcome!</title>
        </Head>
        <main>
          <h1>Filter</h1>
          <p>Please select a filter.</p>
          <form onSubmit={handleSubmit}>
            {/* form fields start here */}
            <label htmlFor="type">
              {' '}
              Type:
              <select
                id="type"
                value={clothingItemType}
                onChange={(e) => setClothingItemType(e.currentTarget.value)}
              >
                <option value=" ">none</option>
                {props.clothingItemsTypes.map((type: ClothingItemsType) => {
                  return (
                    <option key={type.id} value={type.clothingItemsType}>
                      {type.clothingItemsType}
                    </option>
                  );
                })}
              </select>
            </label>
            <label htmlFor="size">
              {' '}
              Size:
              <select
                id="size"
                value={clothingItemSize}
                onChange={(e) => setClothingItemSize(e.currentTarget.value)}
              >
                <option value=" ">none</option>
                {props.clothingItemsSizes.map((size: ClothingItemsSize) => {
                  return (
                    <option key={size.id} value={size.size}>
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
                value={clothingItemColor}
                onChange={(e) => setClothingItemColor(e.currentTarget.value)}
              >
                <option value=" ">none</option>
                {props.clothingItemsColors.map((color: ClothingItemsColor) => {
                  return (
                    <option key={color.id} value={color.color}>
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
                value={clothingItemSeason}
                onChange={(e) => setClothingItemSeason(e.currentTarget.value)}
              >
                <option value=" ">none</option>
                {props.clothingItemsSeasons.map(
                  (season: ClothingItemsSeason) => {
                    return (
                      <option key={season.id} value={season.season}>
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
                value={clothingItemGender}
                onChange={(e) => setClothingItemGender(e.currentTarget.value)}
              >
                <option value=" ">none</option>
                {props.clothingItemsGender.map(
                  (gender: ClothingItemsGender) => {
                    return (
                      <option key={gender.id} value={gender.gender}>
                        {gender.gender}
                      </option>
                    );
                  },
                )}
              </select>
              <br />
            </label>
            {/* <label htmlFor="notes">
              Notes:
              <textarea
                rows={3}
                cols={20}
                id="notes"
                name="notes"
                value={clothingItemNotes}
                maxLength={100}
                onChange={(e) => setClothingItemNotes(e.currentTarget.value)}
              />
            </label> */}
            <br />
            <button>Filter</button>
            <button onClick={() => router.reload()}>Reset filters</button>
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

            {clothingItems.map((clothingItem: ClothingItemDetail) => {
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
