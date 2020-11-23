import { NextApiRequest, NextApiResponse } from 'next';
import {
  insertStorageItem,
  deleteStorageItemByStorageItemId,
} from '../../../util/database';

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse,
) {
  if (request.method === 'POST') {
    const { storageItemName, storageItemLocation, userId } = request.body;

    try {
      await insertStorageItem(storageItemName, storageItemLocation, userId);
    } catch (err) {
      return response.status(500).send({ success: false });
    }
  } else if (request.method === 'DELETE') {
    const { storageItemId } = request.body;

    await deleteStorageItemByStorageItemId(storageItemId);
  }

  response.statusCode = 200;
  response.send({ success: true });
}
