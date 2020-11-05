import postgres from 'postgres';
import dotenv from 'dotenv';

dotenv.config();

const sql = postgres();

const users = await sql`
SELECT * from users;
`;
