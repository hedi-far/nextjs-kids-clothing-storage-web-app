import Head from 'next/head';
import Layout from '../../components/Layout';
// import Link from 'next/link';
import nextCookies from 'next-cookies';
import { GetServerSidePropsContext } from 'next';
import { isSessionTokenValid } from '../../util/auth';

type Props = { loggedIn: boolean };

export default function Search(props: Props) {
  return (
    <div>
      <Layout loggedIn={props.loggedIn}>
        <Head>
          <title>Welcome!</title>
        </Head>
        <main>
          <h1>Search</h1>
          {/* form fields start here */}
          <label htmlFor="type">
              {' '}
              Type (required):
              <select
                id="type"
                required
                value={clothingItemTypeId}
                // onChange={(e) => setClothingItemTypeId(e.currentTarget.value)}
              >
                <option label=" " />
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
                // onChange={(e) => setClothingItemSizeId(e.currentTarget.value)}
              >
                <option label=" " />
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
                // onChange={(e) => setClothingItemColorId(e.currentTarget.value)}
              >
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

            <label htmlFor="season">
              {' '}
              Season:
              <select
                id="season"
                value={clothingItemSeasonId}
                // onChange={(e) => setClothingItemSeasonId(e.currentTarget.value)}
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
                // onChange={(e) => setClothingItemGenderId(e.currentTarget.value)}
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
                // onChange={(e) => setClothingItemNotes(e.currentTarget.value)}
              />
            </label>
            <br />
            <button>Add storage item</button>
          </form>
          <p>{errorMessage}</p>

          {/* <Link href="/dashboard">
            <a>
              <button>Register</button>
            </a>
          </Link> */}
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
        destination: '/login?returnTo=/dashboard/search',
        permanent: false,
      },
    };
  }

  return {
    props: {
      loggedIn,
    },
  };
}
