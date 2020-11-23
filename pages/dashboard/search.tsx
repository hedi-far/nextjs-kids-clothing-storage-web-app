import Head from 'next/head';
import Link from 'next/link';
import { GetServerSidePropsContext } from 'next';
import { useState } from 'react';
import { useRouter } from 'next/router';
import nextCookies from 'next-cookies';
import Layout from '../../components/Layout';
import AddToListButton from '../../components/AddToListButton';
import {
  getClothingItemColors,
  getClothingItemGender,
  getClothingItemSeasons,
  getClothingItemSizes,
  getClothingItemTypes,
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
  Filter,
  StorageItem,
} from '../../util/types';
import { getFilterResults, searchInNotes } from '../../util/get-search-results';

type Props = {
  // loggedIn: boolean;
  storageItem: StorageItem;
  clothingItems: ClothingItemDetailByUser[];
  clothingItemsTypes: ClothingItemsType[];
  clothingItemsColors: ClothingItemsColor[];
  clothingItemsSizes: ClothingItemsSize[];
  clothingItemsSeasons: ClothingItemsSeason[];
  clothingItemsGender: ClothingItemsGender[];
  myList: ClothingItemDetail[];
  newClothesFilter: Filter;
  filteredClothingItems: ClothingItemDetailByUser[];
};

export default function Search(props: Props) {
  const router = useRouter();
  const [clothingItemType, setClothingItemType] = useState('');
  const [clothingItemSize, setClothingItemSize] = useState('');
  const [clothingItemColor, setClothingItemColor] = useState('');
  const [clothingItemSeason, setClothingItemSeason] = useState('');
  const [clothingItemGender, setClothingItemGender] = useState('');
  const [clothingItems, setClothingItems] = useState(props.clothingItems || []);
  const [errorMessage, setErrorMessage] = useState('');
  const [myList, setMyList] = useState(props.myList);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [clothesFilter, setClothesFilter] = useState({});
  const [searchNotes, setSearchNotes] = useState('');

  //When filter button is clicked:
  const handleFilter = (e: React.FormEvent) => {
    e.preventDefault();

    const clothingItemsType = clothingItemType;
    const size = clothingItemSize;
    const color = clothingItemColor;
    const season = clothingItemSeason;
    const gender = clothingItemGender;

    const newClothesFilter = {
      clothingItemsType,
      size,
      color,
      season,
      gender,
    };

    setClothesFilter(newClothesFilter);

    const filteredClothingItems = getFilterResults(
      clothingItems,
      newClothesFilter,
    );

    setClothingItems(filteredClothingItems);

    if (filteredClothingItems.length === 0) {
      setErrorMessage('No match found!');
    }

    console.log(newClothesFilter);
    console.log(filteredClothingItems);
  };

  //When search button is clicked:
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    //makes search terms case insensitive
    const newSearchNotes = new RegExp(searchNotes, 'i');

    const filteredClothingItems = searchInNotes(newSearchNotes, clothingItems);

    setClothingItems(filteredClothingItems);

    if (filteredClothingItems.length === 0) {
      setErrorMessage('No match found!');
    }
  };

  return (
    <div>
      <Layout loggedIn={true}>
        <Head>
          <title>Welcome!</title>
        </Head>
        <main>
          <h1>Filter</h1>
          <p>Please select a filter.</p>
          <form onSubmit={handleFilter}>
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
            <br />
            <button>Filter</button>
            <button onClick={() => router.reload()}>Reset your filters</button>
            <br />
            <label htmlFor="notes">
              <input
                value={searchNotes}
                type="text"
                onChange={(e) => setSearchNotes(e.currentTarget.value)}
              />
              <button onClick={handleSearch}>Search your notes</button>
            </label>
            <button onClick={() => router.reload()}>Reset your search</button>
          </form>
          <p>{errorMessage}</p>

          {/* complete list of logged in user */}
          <h1>Entire list of clothing items</h1>
          <table>
            <thead>
              <tr>
                <th>id</th>
                <th>type</th>
                <th>color</th>
                <th>size</th>
                <th>season</th>
                <th>gender</th>
                <th>notes</th>
                <th>storage unit</th>
                <th />
                <th />
                <th />
              </tr>
            </thead>

            {clothingItems.map((clothingItem: ClothingItemDetail) => {
              return (
                <tbody key={clothingItem.id}>
                  <tr>
                    <td>{clothingItem.id}</td>
                    <td>{clothingItem.clothingItemsType}</td>
                    <td>{clothingItem.color}</td>
                    <td>{clothingItem.size}</td>
                    <td>{clothingItem.season}</td>
                    <td>{clothingItem.gender}</td>
                    <td>{clothingItem.notes}</td>
                    <td>
                      <Link href={`/dashboard/${clothingItem.storageItemId}`}>
                        <a>{clothingItem.storageItemName}</a>
                      </Link>
                    </td>
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
  // const loggedIn = await isSessionTokenValid(token);
  const user = await getUserBySessionToken(token);

  if (!token || !user) {
    return {
      redirect: {
        destination: '/login?returnTo=/dashboard/search',
        permanent: false,
      },
    };
  }

  const allCookies = nextCookies(context);
  const myList = allCookies.myList || [];

  const userId = user.id;

  const clothingItems = await getClothingItemByUserId(userId);

  const clothingItemsTypes = await getClothingItemTypes();

  const clothingItemsColors = await getClothingItemColors();

  const clothingItemsSizes = await getClothingItemSizes();

  const clothingItemsSeasons = await getClothingItemSeasons();

  const clothingItemsGender = await getClothingItemGender();

  return {
    props: {
      user,
      // loggedIn,
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
