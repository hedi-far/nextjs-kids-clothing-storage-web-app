import camelcaseKeys from 'camelcase-keys';
import postgres from 'postgres';
import dotenv from 'dotenv';
import { ClothingItem } from './types';

dotenv.config();

const sql = postgres();

export async function insertClothingItem(
  storageItemId: number,
  clothingItemsTypeId: number,
  colorId: number,
  sizeId: number,
  seasonId: number,
  genderId: number,
  notes: string,
) {
  // console.log(`hello ${genderId}`);
  //when field color_id is set to "none" by user on page [id]
  // if (!colorId) {
  //   const newClothingItem = await sql<ClothingItem[]>`

  // INSERT INTO clothing_items
  //     (
  //       storage_item_id,
  //       clothing_items_type_id,
  //       size_id,
  //       season_id,
  //       gender_id,
  //       notes
  //     )
  //   VALUES
  //     (${storageItemId},
  //      ${clothingItemsTypeId},
  //      ${sizeId},
  //      ${seasonId},
  //      ${genderId},
  //      ${notes})

  //   RETURNING *;
  // `;

  //   return newClothingItem.map((s) => camelcaseKeys(s))[0];
  // }
  // //when field season_id is set to "none" by user on page [id]
  // else if (!seasonId) {
  //   const newClothingItem = await sql<ClothingItem[]>`

  //   INSERT INTO clothing_items
  //       (
  //         storage_item_id,
  //         clothing_items_type_id,
  //         color_id,
  //         size_id,
  //         gender_id,
  //         notes
  //       )
  //     VALUES
  //       (${storageItemId},
  //        ${clothingItemsTypeId},
  //        ${colorId},
  //        ${sizeId},
  //        ${genderId},
  //        ${notes})
  //     RETURNING *;
  //   `;

  //   return newClothingItem.map((s) => camelcaseKeys(s))[0];
  // }

  // //when field gender_id is set to "none" by user on page [id]
  // else if (!genderId) {
  //   const newClothingItem = await sql<ClothingItem[]>`

  //   INSERT INTO clothing_items
  //       (
  //         storage_item_id,
  //         clothing_items_type_id,
  //         color_id,
  //         size_id,
  //         season_id,
  //         notes
  //       )
  //     VALUES
  //       (${storageItemId},
  //        ${clothingItemsTypeId},
  //        ${colorId},
  //        ${sizeId},
  //        ${seasonId},
  //        ${notes})
  //     RETURNING *;
  //   `;

  //   return newClothingItem.map((s) => camelcaseKeys(s))[0];
  // }

  // // when field color_id and gender_id are set to "none" by user on page [id] - FIXME
  // else if (!colorId && !genderId) {
  //   const newClothingItem = await sql<ClothingItem[]>`

  //     INSERT INTO clothing_items
  //         (
  //           storage_item_id,
  //           clothing_items_type_id,
  //           size_id,
  //           season_id,
  //           notes
  //         )
  //       VALUES
  //       (${storageItemId},
  //        ${clothingItemsTypeId},
  //        ${sizeId},
  //        ${seasonId},
  //        ${notes})
  //       RETURNING *;
  //     `;

  //   return newClothingItem.map((s) => camelcaseKeys(s))[0];
  // }

  // // when field color_id and season_id are set to "none" by user on page [id] - FIXME
  // else if (!colorId && !seasonId) {
  //   const newClothingItem = await sql<ClothingItem[]>`

  //     INSERT INTO clothing_items
  //         (
  //           storage_item_id,
  //           clothing_items_type_id,
  //           size_id,
  //           gender_id,
  //           notes
  //         )
  //       VALUES
  //       (${storageItemId},
  //        ${clothingItemsTypeId},
  //        ${sizeId},
  //        ${genderId},
  //        ${notes})

  //       RETURNING *;
  //     `;

  //   return newClothingItem.map((s) => camelcaseKeys(s))[0];
  // }

  // // when field gender_id and season_id are set to "none" by user on page [id] - FIXME
  // else if (!genderId && !seasonId) {
  //   const newClothingItem = await sql<ClothingItem[]>`

  //     INSERT INTO clothing_items
  //         (
  //           storage_item_id,
  //           clothing_items_type_id,
  //           season_id,
  //           gender_id,
  //           notes
  //         )
  //       VALUES
  //       (${storageItemId},
  //        ${clothingItemsTypeId},
  //        ${seasonId},
  //        ${genderId},
  //        ${notes})

  //       RETURNING *;
  //     `;

  //   return newClothingItem.map((s) => camelcaseKeys(s))[0];
  // }

  // // when field gender_id and season_id and color_id are set to "none" by user on page [id] - FIXME
  // else if (storageItemId && clothingItemsTypeId && notes) {
  //   const newClothingItem = await sql<ClothingItem[]>`

  //       INSERT INTO clothing_items
  //           (
  //             storage_item_id,
  //             clothing_items_type_id,
  //             notes
  //           )
  //         VALUES
  //         (${storageItemId},
  //          ${clothingItemsTypeId},
  //          ${notes})

  //         RETURNING *;
  //       `;

  //   return newClothingItem.map((s) => camelcaseKeys(s))[0];
  // }

  // // when all fields have been filled in by user
  // else {
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
// }

// export async function deleteClothingItemByStorageItemId(
//   clothingItemId: number,
// ) {
//   const clothingItem = await sql<ClothingItem>`
//   DELETE FROM clothing_items

//   WHERE id = ${clothingItemId};

//  `;

//   return clothingItem.map((s) => camelcaseKeys(s))[0];
