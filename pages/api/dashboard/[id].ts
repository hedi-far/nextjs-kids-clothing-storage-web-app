// import { ClothingItem } from './../../../util/types';
import { NextApiRequest, NextApiResponse } from 'next';
import {
  // getStorageItemByStorageItemId,
  // getClothingItemByStorageItemId,
  insertClothingItem,
} from '../../../util/database';

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse,
) {
  // const {
  //   query: { id },
  // } = request;

  const {
    clothingItemsTypeId,
    sizeId,
    colorId,
    seasonId,
    genderId,
    notes,
    storageItemId,
  } = request.body;

  console.log(request.body);

  // console.log(request.body);

  // if (!/^\d+$/.test(storageItemId)) {
  //   response.statusCode = 404;
  //   response.setHeader('Content-Type', 'application/json');
  //   return response.end(JSON.stringify({ errors: 'Not found' }));
  // }

  // if (request.method === 'GET') {
  //   const storageItem = await getStorageItemByStorageItemId(storageItemId);
  //   // } else if (request.method === 'DELETE') {
  //   //   await deleteClothingItem;

  //   const clothingItem = await getClothingItemByStorageItemId(storageItemId);

  //   response.statusCode = 200;
  //   response.setHeader('Content-Type', 'application/json');
  //   response.end(JSON.stringify({ storageItem, clothingItem }));

  //   // const clothingItemJoin = await getClothingItems();
  // } else

  // if (request.method === 'POST')

  try {
    await insertClothingItem(
      storageItemId,
      clothingItemsTypeId,
      colorId,
      sizeId,
      seasonId,
      genderId,
      notes,
    );
  } catch (err) {
    return response.status(500).send({ success: false });
  }
  // response.statusCode = 200;
  // response.setHeader('Content-Type', 'application/json');
  // response.end(JSON.stringify({ newClothingItem }));

  response.send({ success: true });

  // response.end(`Post: ${id}`);
}
