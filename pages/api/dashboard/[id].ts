import { NextApiRequest, NextApiResponse } from 'next';
import { getClothingItemByClothingItemId } from '../../../util/database';

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse,
) {
  const clothingItemId = request.query.id;

  if (!/^\d+$/.test(clothingItemId)) {
    response.statusCode = 404;
    response.setHeader('Content-Type', 'application/json');
    return response.end(JSON.stringify({ errors: 'Not found' }));
  }

  console.log(clothingItemId);

  const clothingItem = await getClothingItemByClothingItemId(clothingItemId);

  console.log(clothingItem);
  response.statusCode = 200;
  response.setHeader('Content-Type', 'application/json');
  response.end(JSON.stringify({ clothingItem: clothingItem }));
}
