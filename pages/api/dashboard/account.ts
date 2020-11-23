import { NextApiRequest, NextApiResponse } from 'next';
import { deleteUserByUserId } from '../../../util/database';

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse,
) {
  if (request.method === 'DELETE') {
    const { userId } = request.body;

    await deleteUserByUserId(userId);
  }
  response.statusCode = 200;
  response.send({ success: true });
}
