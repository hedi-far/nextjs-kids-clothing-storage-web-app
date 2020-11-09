const sizes = [
  { size: '44' },
  { size: '44/50' },
  { size: '50' },
  { size: '50/56' },
  { size: '56' },
  { size: '56/62' },
  { size: '62' },
  { size: '62/68' },
  { size: '68' },
  { size: '68/74' },
  { size: '74' },
  { size: '74/80' },
  { size: '80' },
  { size: '80/86' },
  { size: '86' },
  { size: '86/92' },
  { size: '92' },
  { size: '92/98' },
  { size: '98' },
  { size: '98/104' },
  { size: '104' },
  { size: '104/110' },
  { size: '110' },
  { size: '110/116' },
  { size: '116' },
  { size: '116/122' },
  { size: '122' },
  { size: '122/128' },
  { size: '128' },
  { size: '128/134' },
  { size: '134' },
  { size: '134/140' },
  { size: '140' },
  { size: '140/146' },
  { size: '146' },
  { size: '146/152' },
  { size: '152' },
  { size: '152/158' },
  { size: '158' },
  { size: '158/164' },
  { size: '164' },
  { size: '164/170' },
  { size: '170' },
  { size: 'XS' },
  { size: 'S' },
  { size: 'M' },
];

exports.up = async (sql) => {
  await sql`
 INSERT INTO clothing_items_sizes ${sql(sizes, 'size')};
 `;
};

exports.down = async (sql) => {
  for (let i = 0; i < sizes.length; i++) {
    await sql`
	DELETE FROM clothing_items_sizes WHERE size = ${sizes.size};
`;
  }
};

// exports.down = async (sql) => {
//   for (const user in users) {
//     await sql`
//       DELETE FROM users WHERE
//         first_name = ${user.first_name} AND
//         last_name = ${user.last_name};
//     `;
//   }
