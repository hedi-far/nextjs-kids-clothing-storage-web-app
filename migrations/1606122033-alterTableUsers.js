exports.up = async (sql) => {
  await sql`
 ALTER TABLE users
  DROP COLUMN email
 `;
};

exports.down = async (sql) => {
  await sql`
	ALTER TABLE users
	ADD COLUMN email VARCHAR(50)
`;
};
