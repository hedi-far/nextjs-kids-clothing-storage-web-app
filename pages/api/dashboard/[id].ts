import { NextApiRequest, NextApiResponse } from 'next';
import {
  deleteClothingItemByStorageItemId,
  insertClothingItem,
} from '../../../util/database';

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse,
) {
  if (request.method === 'POST') {
    const {
      clothingItemsTypeId,
      sizeId,
      colorId,
      seasonId,
      genderId,
      notes,
      storageItemId,
    } = request.body;

    // if (!colorId)
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
      console.log(err);
      return response.status(500).send({ success: false });
    }
  } else if (request.method === 'DELETE') {
    const { clothingItemId } = request.body;

    await deleteClothingItemByStorageItemId(clothingItemId);
  }
  response.statusCode = 200;
  response.send({ success: true });
}
