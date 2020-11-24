const gender = [{ gender: 'boy' }, { gender: 'girl' }, { gender: 'unisex' }];

exports.up = async (sql) => {
  await sql`
 INSERT INTO clothing_items_gender ${sql(gender, 'gender')}
 `;
};

exports.down = async (sql) => {
  for (const genderObj of gender) {
    await sql`
	DELETE FROM clothing_items_gender WHERE gender = ${genderObj.gender};
`;
  }
};
