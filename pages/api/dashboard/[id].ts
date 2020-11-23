import { NextApiRequest, NextApiResponse } from 'next';
import {
  deleteClothingItemByStorageItemId,
  updateStorageItemByStorageItemId,
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

    try {
      await insertClothingItem(
        storageItemId,
        clothingItemsTypeId,
        colorId || null,
        sizeId,
        seasonId || null,
        genderId || null,
        notes,
      );
    } catch (err) {
      return response.status(500).send({ success: false });
    }
  } else if (request.method === 'DELETE') {
    const { clothingItemId } = request.body;
    await deleteClothingItemByStorageItemId(clothingItemId);
  } else if (request.method === 'PATCH') {
    const {
      storageItemId,
      storageItemName,
      storageItemLocation,
    } = request.body;

    await updateStorageItemByStorageItemId(
      storageItemId,
      storageItemName,
      storageItemLocation,
    );
  }

  response.statusCode = 200;
  response.send({ success: true });
}
