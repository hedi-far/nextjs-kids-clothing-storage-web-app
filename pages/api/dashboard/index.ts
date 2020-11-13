import { NextApiRequest, NextApiResponse } from 'next';
import {
  getUserByUsername,
  registerUser,
  insertStorageItem,
} from '../../../util/database';

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse,
) {
  // Extract the username, password and token from the request
  // body (this process is called "destructuring")
  const { storageItemName, storageItemLocation, userId } = request.body;

  // // Check if there's a storage item matching this storage item name
  // const storageItemeAlreadyTaken =
  //   typeof (await getUserByUsername(username)) !== 'undefined';

  // if (usernameAlreadyTaken) {
  //   // TODO: Send back a full error message here
  //   // HTTP status code: 409 Conflict
  //   return response.status(409).send({ success: false });
  // }

  try {
    await insertStorageItem(storageItemName, storageItemLocation, userId);
  } catch (err) {
    // If hashing the password or registering the user fails
    // for any reason, then return an error status
    // HTTP status code: 500 Internal Server Error
    return response.status(500).send({ success: false });
  }

  response.send({ success: true });
}
