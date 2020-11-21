import { NextApiRequest, NextApiResponse } from 'next';
import { searchClothingItems } from '../../../util/database';
import { getClothingItemByUserId } from '../../../util/database';

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse,
) {
  if (request.method === 'Get') {
    const { userId } = request.body;

    await getClothingItemByUserId(userId);
  } else if (request.method === 'POST') {
    const {
      clothingItemsTypeId,
      sizeId,
      colorId,
      seasonId,
      genderId,
      notes,
      // storageItemId,
    } = request.body;

    console.log(request.body);
    // console.log(typeof genderId);
    try {
      const found = await searchClothingItems(
        // storageItemId,
        clothingItemsTypeId,
        colorId || null,
        sizeId,
        seasonId || null,
        genderId || null,
        notes,
      );

      console.log(found);
    } catch (err) {
      console.log(err);
      return response.status(500).send({ success: false });
    }
    // } else if (request.method === 'DELETE') {
    //   const { clothingItemId } = request.body;

    //   await deleteClothingItemByStorageItemId(clothingItemId);
    // } else if (request.method === 'PATCH') {
    //   const {
    //     storageItemId,
    //     storageItemName,
    //     storageItemLocation,
    //   } = request.body;

    //   await updateStorageItemByStorageItemId(
    //     storageItemId,
    //     storageItemName,
    //     storageItemLocation,
    //   );
    // }

    response.statusCode = 200;
    response.send({ success: true });
  }
}
