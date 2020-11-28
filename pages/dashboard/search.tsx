import Head from 'next/head';
import Link from 'next/link';
import { GetServerSidePropsContext } from 'next';
import { useState } from 'react';
import { useRouter } from 'next/router';
import nextCookies from 'next-cookies';
import { css } from '@emotion/react';
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

const searchPageStyles = css`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr 1fr 1fr 1fr;
`;

const searchHeadingStyles = css`
  grid-area: 1 / 1 / 2 / 2;
  height: 40px;
  margin-top: 40px;
  img {
    height: 60px;
    width: 60px;
    margin-right: 5px;
    /* background-color: blue; */
  }
`;

const searchFormStyles = css`
  grid-area: 2 / 1 / 3 / 2;
  & form {
    margin-top: 20px;
    display: flex;
    justify-content: space-between;
    flex: wrap;
    border-radius: 15px;
  }
  /* display: grid;
  grid-template-columns: 1fr 1.3fr;
  grid-template-rows: 1fr 1fr 1fr 1fr; */
`;

const currentFilterArea = css`
  display: flex;
  align-items: flex-start;
  background-color: #e6e6e6;
  color: #645e49;
  margin: 10px;
  padding-left: 12px;
  padding-right: 12px;
  border: none;
  border-radius: 15px;
  box-shadow: -13px -9px 5px -6px rgba(135, 142, 138, 0.25);
  height: 40px;
  & span {
    font-size: 18px;
    padding: 5px;
    margin-left: 10px;
  }
`;

// const searchExplanationStyles = css`
//   grid-area: 1 / 1 / 2 / 2;
// `;

// const searchFilterStyles = css`
//   grid-area: 2 / 1 / 3 / 2;
// `;

// const filterButtonAreaStyles = css`
//   grid-area: 2 / 2 / 3 / 3;
// `;

// const searchNotesStyles = css`
//   grid-area: 3 / 1 / 4 / 2;
// `;

// const searchNotesButtonAreaStyles = css`
//   grid-area: notes-buttons;
// `;

// const messageAreaStyles = css`
//   grid-area: 4 / 1 / 5 / 2;
// `;

const formButtonStyles = css`
  background-color: white;
  color: #645e49;
  height: 30px;
  width: 120px;
  margin: 10px;
  border: none;
  box-shadow: 0px 4px 4px 0px #000000 25%;
`;

const resultsListStyles = css`
  grid-area: 3 / 1 / 4 / 2;
  text-align: center;
  table {
    width: 50%;
    margin-left: 500px;
    margin-top: 30px;
  }
`;

const noResultsAreaStyles = css`
  grid-area: 3 / 1 / 4 / 2;
  margin-left: 500px;
  margin-top: -100px;
  img {
    height: 400px;
    width: 400px;
  }
`;

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
  clothesFilter: Filter;
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
  const [clothesFilter, setClothesFilter] = useState({} as Filter);
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

  //when no search, display entire list of clothing items

  if (Object.entries(clothesFilter).length === 0 && searchNotes === '') {
    return (
      <div>
        {/* loggedIn is set to true by default, bc if no session token
      is found in getServerSideProps, the user will be redirected to the login page! */}
        <Layout loggedIn={true}>
          <Head>
            <title>N! Search</title>
          </Head>
          <main css={searchPageStyles}>
            <div css={searchHeadingStyles}>
              <h1>
                <img src="/icons/loupe.svg" alt="loupe" />
                Search all clothing items
              </h1>
            </div>
            <div css={searchFormStyles}>
              <h2>
                Please choose your filter(s) or type your search term(s) into
                the 'notes' field.{' '}
              </h2>
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
                    onChange={(e) =>
                      setClothingItemColor(e.currentTarget.value)
                    }
                  >
                    <option value=" ">none</option>
                    {props.clothingItemsColors.map(
                      (color: ClothingItemsColor) => {
                        return (
                          <option key={color.id} value={color.color}>
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
                    value={clothingItemSeason}
                    onChange={(e) =>
                      setClothingItemSeason(e.currentTarget.value)
                    }
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
                    onChange={(e) =>
                      setClothingItemGender(e.currentTarget.value)
                    }
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

                <button css={formButtonStyles}>Filter</button>
                <button css={formButtonStyles} onClick={() => router.reload()}>
                  Reset filters
                </button>
                <p>
                  <label htmlFor="notes">
                    <input
                      value={searchNotes}
                      type="text"
                      onChange={(e) => setSearchNotes(e.currentTarget.value)}
                    />
                  </label>

                  <button css={formButtonStyles} onClick={handleSearch}>
                    Search notes
                  </button>
                  <button
                    css={formButtonStyles}
                    onClick={() => router.reload()}
                  >
                    Reset search
                  </button>
                </p>
              </form>

              <h2 css={currentFilterArea}>
                Current search:
                <span>{clothesFilter.clothingItemsType}</span>
                <span> {clothesFilter.size}</span>
                <span>{clothesFilter.color}</span>
                <span> {clothesFilter.season}</span>
                <span> {clothesFilter.gender}</span>
                <span> {searchNotes}</span>
              </h2>
            </div>
            <h2>{errorMessage}</h2>
            <div css={resultsListStyles}>
              {/* complete list by logged-in user */}
              <h2>Your clothing items</h2>
              <table>
                <thead>
                  <tr>
                    <th>Type</th>
                    <th>Color</th>
                    <th>Size</th>
                    <th>Season</th>
                    <th>Gender</th>
                    <th>Notes</th>
                    <th>Storage unit</th>
                    <th />
                    <th />
                    <th />
                  </tr>
                </thead>

                {clothingItems.map((clothingItem: ClothingItemDetail) => {
                  return (
                    <tbody key={clothingItem.id}>
                      <tr>
                        {/* <td>{clothingItem.id}</td> */}
                        <td>{clothingItem.clothingItemsType}</td>
                        <td>{clothingItem.color}</td>
                        <td>{clothingItem.size}</td>
                        <td>{clothingItem.season}</td>
                        <td>{clothingItem.gender}</td>
                        <td>{clothingItem.notes}</td>
                        <td>
                          <Link
                            href={`/dashboard/${clothingItem.storageItemId}`}
                          >
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
            </div>
            {/* }} */}
          </main>
        </Layout>
      </div>
    );
    //when user is searching, but there are no results
  } else if (
    (Object.entries(clothesFilter).length > 0 && clothingItems.length === 0) ||
    (searchNotes && clothingItems.length === 0)
  ) {
    return (
      <div>
        {/* loggedIn is set to true by default, bc if no session token
    is found in getServerSideProps, the user will be redirected to the login page! */}
        <Layout loggedIn={true}>
          <Head>
            <title>Neatify! Search</title>
          </Head>
          <main css={searchPageStyles}>
            <div css={searchHeadingStyles}>
              <h1>
                <img src="/icons/loupe.svg" alt="loupe" />
                Search all clothing items
              </h1>
            </div>
            <div css={searchFormStyles}>
              <h2>
                Please choose your filter(s) or type your search term(s) into
                the 'notes' field.{' '}
              </h2>
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
                    onChange={(e) =>
                      setClothingItemColor(e.currentTarget.value)
                    }
                  >
                    <option value=" ">none</option>
                    {props.clothingItemsColors.map(
                      (color: ClothingItemsColor) => {
                        return (
                          <option key={color.id} value={color.color}>
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
                    value={clothingItemSeason}
                    onChange={(e) =>
                      setClothingItemSeason(e.currentTarget.value)
                    }
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
                    onChange={(e) =>
                      setClothingItemGender(e.currentTarget.value)
                    }
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

                <button css={formButtonStyles}>Filter</button>
                <button css={formButtonStyles} onClick={() => router.reload()}>
                  Reset filters
                </button>
                <p>
                  <label htmlFor="notes">
                    <input
                      value={searchNotes}
                      type="text"
                      onChange={(e) => setSearchNotes(e.currentTarget.value)}
                    />
                  </label>

                  <button css={formButtonStyles} onClick={handleSearch}>
                    Search notes
                  </button>
                  <button
                    css={formButtonStyles}
                    onClick={() => router.reload()}
                  >
                    Reset search
                  </button>
                </p>
              </form>

              <h2 css={currentFilterArea}>
                Current search:
                <span>{clothesFilter.clothingItemsType}</span>
                <span> {clothesFilter.size}</span>
                <span>{clothesFilter.color}</span>
                <span> {clothesFilter.season}</span>
                <span> {clothesFilter.gender}</span>
                <span> {searchNotes}</span>
              </h2>
            </div>
            <h2 css={noResultsAreaStyles}>
              {errorMessage}
              <img src="/img/no-results-img.svg" alt="woman searching list" />
            </h2>

            {/* <div css={resultsListStyles}>
              {/* complete list by logged-in user */}
            {/* <h2>Your search results</h2>
              <table>
                <thead>
                  <tr>
                    <th>Type</th>
                    <th>Color</th>
                    <th>Size</th>
                    <th>Season</th>
                    <th>Gender</th>
                    <th>Notes</th>
                    <th>Storage unit</th>
                    <th />
                    <th />
                    <th />
                  </tr>
                </thead>

                {clothingItems.map((clothingItem: ClothingItemDetail) => {
                  return (
                    <tbody key={clothingItem.id}>
                      <tr>
                        {/* <td>{clothingItem.id}</td> */}
            {/* <td>{clothingItem.clothingItemsType}</td>
                        <td>{clothingItem.color}</td>
                        <td>{clothingItem.size}</td>
                        <td>{clothingItem.season}</td>
                        <td>{clothingItem.gender}</td>
                        <td>{clothingItem.notes}</td>
                        <td>
                          <Link
                            href={`/dashboard/${clothingItem.storageItemId}`}
                          >
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
              </table> */}
            {/* </div>  */}
            {/* }} */}
          </main>
        </Layout>
      </div>
    );
    //when user is searching and there are results
  } else {
    return (
      <div>
        {/* loggedIn is set to true by default, bc if no session token
    is found in getServerSideProps, the user will be redirected to the login page! */}
        <Layout loggedIn={true}>
          <Head>
            <title>Neatify! Search</title>
          </Head>
          <main css={searchPageStyles}>
            <div css={searchHeadingStyles}>
              <h1>
                <img src="/icons/loupe.svg" alt="loupe" />
                Search all clothing items
              </h1>
            </div>
            <div css={searchFormStyles}>
              <h2>
                Please choose your filter(s) or type your search term(s) into
                the 'notes' field.{' '}
              </h2>
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
                    onChange={(e) =>
                      setClothingItemColor(e.currentTarget.value)
                    }
                  >
                    <option value=" ">none</option>
                    {props.clothingItemsColors.map(
                      (color: ClothingItemsColor) => {
                        return (
                          <option key={color.id} value={color.color}>
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
                    value={clothingItemSeason}
                    onChange={(e) =>
                      setClothingItemSeason(e.currentTarget.value)
                    }
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
                    onChange={(e) =>
                      setClothingItemGender(e.currentTarget.value)
                    }
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

                <button css={formButtonStyles}>Filter</button>
                <button css={formButtonStyles} onClick={() => router.reload()}>
                  Reset filters
                </button>
                <p>
                  <label htmlFor="notes">
                    <input
                      value={searchNotes}
                      type="text"
                      onChange={(e) => setSearchNotes(e.currentTarget.value)}
                    />
                  </label>

                  <button css={formButtonStyles} onClick={handleSearch}>
                    Search notes
                  </button>
                  <button
                    css={formButtonStyles}
                    onClick={() => router.reload()}
                  >
                    Reset search
                  </button>
                </p>
              </form>
              <h2 css={currentFilterArea}>
                Current search:
                <span>{clothesFilter.clothingItemsType}</span>
                <span> {clothesFilter.size}</span>
                <span>{clothesFilter.color}</span>
                <span> {clothesFilter.season}</span>
                <span> {clothesFilter.gender}</span>
                <span> {searchNotes}</span>
              </h2>
            </div>
            <h2>{errorMessage}</h2>
            <div css={resultsListStyles}>
              {/* complete list by logged-in user */}
              <h2>Your search results</h2>
              <table>
                <thead>
                  <tr>
                    <th>Type</th>
                    <th>Color</th>
                    <th>Size</th>
                    <th>Season</th>
                    <th>Gender</th>
                    <th>Notes</th>
                    <th>Storage unit</th>
                    <th />
                    <th />
                    <th />
                  </tr>
                </thead>

                {clothingItems.map((clothingItem: ClothingItemDetail) => {
                  return (
                    <tbody key={clothingItem.id}>
                      <tr>
                        {/* <td>{clothingItem.id}</td> */}
                        <td>{clothingItem.clothingItemsType}</td>
                        <td>{clothingItem.color}</td>
                        <td>{clothingItem.size}</td>
                        <td>{clothingItem.season}</td>
                        <td>{clothingItem.gender}</td>
                        <td>{clothingItem.notes}</td>
                        <td>
                          <Link
                            href={`/dashboard/${clothingItem.storageItemId}`}
                          >
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
            </div>
            {/* }} */}
          </main>
        </Layout>
      </div>
    );
  }
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
