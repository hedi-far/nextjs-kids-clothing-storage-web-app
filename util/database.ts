import camelcaseKeys from 'camelcase-keys';
import postgres from 'postgres';
import dotenv from 'dotenv';
import {
  Session,
  User,
  StorageItem,
  ClothingItem,
  ClothingItemDetail,
  ClothingItemsType,
  ClothingItemsColor,
  ClothingItemsSize,
  ClothingItemsSeason,
  ClothingItemsGender,
  ClothingItemDetailByUser,
} from './types';
import setPostgresDefaultsOnHeroku from './setPostgresDefaultsOnHeroku';

//deployment mode
setPostgresDefaultsOnHeroku();

dotenv.config();

const sql =
  process.env.NODE_ENV === 'production'
    ? // Heroku needs SSL connections but
      // has an "unauthorized" certificate
      // https://devcenter.heroku.com/changelog-items/852
      postgres({ ssl: { rejectUnauthorized: false } })
    : postgres();

//dev mode
// const sql = postgres();

//User-related
export async function registerUser(username: string, passwordHash: string) {
  const users = await sql<User[]>`
    INSERT INTO users
      (username, password_hash)
    VALUES
      (${username}, ${passwordHash})
    RETURNING *;
  `;

  return users.map((u) => camelcaseKeys(u))[0];
}

export async function getUserByUsername(username: string) {
  const users = await sql<User[]>`
    SELECT * FROM users WHERE username = ${username};
  `;

  return users.map((u) => camelcaseKeys(u))[0];
}

export async function getUserBySessionToken(token: string | undefined) {
  if (typeof token === 'undefined') return undefined;

  const users = await sql<User[]>`
    SELECT
      users.id,
      users.username
    FROM
      users,
      sessions
    WHERE
      sessions.token = ${token} AND
      users.id = sessions.user_id;
  `;

  return users.map((u) => camelcaseKeys(u))[0];
}

export async function deleteUserByUserId(userId: number) {
  // // Return undefined if the id is not
  // // in the correct format
  if (!/^\d+$/.test(userId.toString())) return undefined;

  const user = await sql<User>`
  
  DELETE FROM 
  users

  WHERE users.id = ${userId}
 `;

  return user.map((s) => camelcaseKeys(s))[0];
}

//Session-related
export async function getSessionByToken(token: string) {
  const sessions = await sql<Session[]>`
    SELECT * FROM sessions WHERE token = ${token};
  `;

  return sessions.map((s) => camelcaseKeys(s))[0];
}

export async function deleteExpiredSessions() {
  await sql`
    DELETE FROM sessions WHERE expiry_timestamp < NOW();
  `;
}

export async function insertSession(token: string, userId: number) {
  const sessions = await sql<Session[]>`
    INSERT INTO sessions
      (token, user_id)
    VALUES
      (${token}, ${userId})
    RETURNING *;
  `;

  return sessions.map((s) => camelcaseKeys(s))[0];
}

export async function deleteSessionByToken(token: string | undefined) {
  if (typeof token === 'undefined') return;
  await sql`
    DELETE FROM sessions WHERE token = ${token};
  `;
}

// storage_items
export async function insertStorageItem(
  storageItemName: string,
  userId: number,
  storageItemLocation: string,
) {
  const sessions = await sql<StorageItem[]>`
    INSERT INTO storage_items
      (storage_item_name, storage_item_location, user_id)
    VALUES
      (${storageItemName}, ${userId}, ${storageItemLocation})
    RETURNING *;
  `;

  return sessions.map((s) => camelcaseKeys(s))[0];
}

export async function getStorageItemsByUserId(userId: number) {
  // // Return undefined if the id is not
  // // in the correct format
  if (!/^\d+$/.test(userId.toString())) return [];

  const storageItems = await sql<StorageItem[]>`
  SELECT * FROM storage_items WHERE user_id = ${userId};
  `;

  return storageItems.map((s) => camelcaseKeys(s));
}

export async function getStorageItemByStorageItemId(storageItemId: number) {
  // // Return undefined if the id is not
  // // in the correct format
  // if (!/^\d+$/.test(userId)) return undefined;

  const storageItems = await sql<StorageItem[]>`
  SELECT 
  *
  
  FROM 
  storage_items

  WHERE 
  storage_items.id = ${storageItemId}
  `;

  return storageItems.map((s) => camelcaseKeys(s));
}

export async function updateStorageItemByStorageItemId(
  storageItemId: number,
  storageItemName: string,
  storageItemLocation: string,
) {
  const storageItems = await sql<StorageItem[]>`
  UPDATE
  storage_items

  SET 
  storage_item_location = ${storageItemLocation},
  storage_item_name = ${storageItemName}

  WHERE 
  storage_items.id = ${storageItemId}
  RETURNING *;
  `;

  return storageItems.map((s) => camelcaseKeys(s));
}

export async function deleteStorageItemByStorageItemId(storageItemId: number) {
  const storageItem = await sql<StorageItem>`
  
  DELETE FROM 
  storage_items

  WHERE storage_items.id = ${storageItemId}
 `;

  return storageItem.map((s) => camelcaseKeys(s))[0];
}

//clothing_items

export async function insertClothingItem(
  storageItemId: number,
  clothingItemsTypeId: number,
  colorId: number,
  sizeId: number,
  seasonId: number,
  genderId: number,
  notes: string,
) {
  const newClothingItem = await sql<ClothingItem[]>`
    
  INSERT INTO clothing_items
      (
        storage_item_id,
        clothing_items_type_id,
        color_id,
        size_id,
        season_id,
        gender_id,
        notes
      )
    VALUES
      (${storageItemId}, 
       ${clothingItemsTypeId}, 
       ${colorId}, 
       ${sizeId}, 
       ${seasonId}, 
       ${genderId}, 
       ${notes})
    RETURNING *;
  `;

  return newClothingItem.map((s) => camelcaseKeys(s))[0];
}

export async function deleteClothingItemByStorageItemId(
  clothingItemId: number,
) {
  const clothingItem = await sql<ClothingItem>`
  DELETE FROM clothing_items

  WHERE id = ${clothingItemId};

 `;

  return clothingItem.map((s) => camelcaseKeys(s))[0];
}

export async function getClothingItemByStorageItemId(storageItemId: number) {
  // // Return undefined if the id is not
  // // in the correct format
  if (!/^\d+$/.test(storageItemId.toString())) return undefined;

  const clothingItems = await sql<ClothingItemDetail[]>`
  SELECT
  clothing_items.id,
  storage_item_id,
  clothing_items_type,
  color,
  size,
  season,
  gender,
  notes,
  storage_item_name,
  storage_item_location

  FROM clothing_items_types
INNER JOIN clothing_items
  ON clothing_items_types.id = clothing_items.clothing_items_type_id AND storage_item_id = ${storageItemId}
LEFT OUTER JOIN clothing_items_colors
  ON clothing_items_colors.id = clothing_items.color_id
INNER JOIN clothing_items_sizes
  ON clothing_items_sizes.id = clothing_items.size_id
LEFT OUTER JOIN clothing_items_seasons
  ON clothing_items_seasons.id = clothing_items.season_id
LEFT OUTER JOIN clothing_items_gender
 ON clothing_items_gender.id = clothing_items.gender_id
INNER JOIN storage_items
  ON storage_items.id=${storageItemId};

 `;

  return clothingItems.map((s) => camelcaseKeys(s));
}

export async function getClothingItemByUserId(userId: number) {
  // Return undefined if the id is not
  // // in the correct format
  if (!/^\d+$/.test(userId.toString())) return undefined;

  const clothingItems = await sql<ClothingItemDetailByUser[]>`
  SELECT
  clothing_items.id,
  storage_item_id,
  clothing_items_type,
  color,
  size,
  season,
  gender,
  notes,
  storage_item_name,
  storage_item_location,
  storage_items.user_id

  FROM clothing_items_types
INNER JOIN clothing_items
  ON clothing_items_types.id = clothing_items.clothing_items_type_id 
LEFT OUTER JOIN clothing_items_colors
  ON clothing_items_colors.id = clothing_items.color_id
INNER JOIN clothing_items_sizes
  ON clothing_items_sizes.id = clothing_items.size_id
LEFT OUTER JOIN clothing_items_seasons
  ON clothing_items_seasons.id = clothing_items.season_id
LEFT OUTER JOIN clothing_items_gender
 ON clothing_items_gender.id = clothing_items.gender_id
INNER JOIN storage_items
  ON clothing_items.storage_item_id = storage_items.id AND storage_items.user_id = ${userId};

 `;

  return clothingItems.map((s) => camelcaseKeys(s));
}

//clothing_item_types

export async function getClothingItemTypes() {
  const clothingItemsTypes = await sql<ClothingItemsType[]>`
SELECT
*
FROM 
clothing_items_types;
 `;

  return clothingItemsTypes.map((s) => camelcaseKeys(s));
}

//color

export async function getClothingItemColors() {
  const clothingItemsColors = await sql<ClothingItemsColor[]>`
SELECT
*
FROM 
clothing_items_colors;
 `;

  return clothingItemsColors.map((s) => camelcaseKeys(s));
}

//size

export async function getClothingItemSizes() {
  const clothingItemsSizes = await sql<ClothingItemsSize[]>`
SELECT
*
FROM 
clothing_items_sizes;
 `;

  return clothingItemsSizes.map((s) => camelcaseKeys(s));
}

//season

export async function getClothingItemSeasons() {
  const clothingItemsSeasons = await sql<ClothingItemsSeason[]>`
SELECT
*
FROM 
clothing_items_seasons;
 `;

  return clothingItemsSeasons.map((s) => camelcaseKeys(s));
}

//gender

export async function getClothingItemGender() {
  const clothingItemsGender = await sql<ClothingItemsGender[]>`
SELECT
*
FROM 
clothing_items_gender;
 `;

  return clothingItemsGender.map((s) => camelcaseKeys(s));
}
