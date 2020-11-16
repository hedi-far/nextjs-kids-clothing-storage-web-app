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

    // console.log(typeof request.body.seasonId);
    // console.log(typeof null);

    // if (!request.body.colorId) {
    //   request.body.colorId = '1';
    // }

    // if (request.body.notes === undefined) {
    //   request.body.notes = 'empty!!!!';
    // }

    // console.log(request.body.clothingItemsTypeId);

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
      // console.log(err);
      return response.status(500).send({ success: false });
    }

    response.send({ success: true });
  } else if (request.method === 'DELETE') {
    const { clothingItemId } = request.body;

    await deleteClothingItemByStorageItemId(clothingItemId);
  }
  response.statusCode = 200;
  response.setHeader('Content-Type', 'application/json');
  response.end(JSON.stringify({ success: 'end' }));
}
