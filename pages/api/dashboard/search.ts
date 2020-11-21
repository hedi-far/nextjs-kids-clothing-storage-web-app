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
    //FIXME
    try {
      const searchResult = await searchClothingItems(
        // storageItemId,
        clothingItemsTypeId,
        sizeId,
        colorId || null,
        seasonId || null,
        genderId || null,
        notes,
      );
      console.log(`Result: ${searchResult}`);
      return response.status(200).send({ searchResult });
    } catch (err) {
      console.log(err);
      return response.status(500).send({ success: false });
    }
  } else {
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
