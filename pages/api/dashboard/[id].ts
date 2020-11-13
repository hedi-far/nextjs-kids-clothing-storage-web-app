// import { ClothingItem } from './../../../util/types';
import { NextApiRequest, NextApiResponse } from 'next';
import {
  getStorageItemByStorageItemId,
  getClothingItemByStorageItemId,
} from '../../../util/database';

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse,
) {
  const storageItemId = request.query.id;

  if (!/^\d+$/.test(storageItemId)) {
    response.statusCode = 404;
    response.setHeader('Content-Type', 'application/json');
    return response.end(JSON.stringify({ errors: 'Not found' }));
  }

  if (request.method === 'GET') {
    const storageItem = await getStorageItemByStorageItemId(storageItemId);
    // } else if (request.method === 'DELETE') {
    //   await deleteClothingItem;

    const clothingItem = await getClothingItemByStorageItemId(storageItemId);

    // const clothingItemJoin = await getClothingItems();

    response.statusCode = 200;
    response.setHeader('Content-Type', 'application/json');
    response.end(JSON.stringify({ storageItem, clothingItem }));
  }
}
