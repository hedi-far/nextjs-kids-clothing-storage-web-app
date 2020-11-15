import { NextApiRequest, NextApiResponse } from 'next';
import { insertClothingItem } from '../../../util/database';

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse,
) {
  const {
    clothingItemsTypeId,
    sizeId,
    colorId,
    seasonId,
    genderId,
    notes,
    storageItemId,
  } = request.body;

  // console.log(request.body);

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

  response.send({ success: true });
}
