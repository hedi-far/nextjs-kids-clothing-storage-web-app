const colors = [{ color: 'multicolor' }, { color: 'patterned' }];

exports.up = async (sql) => {
  await sql`
 INSERT INTO clothing_items_colors ${sql(colors, 'color')} 
 `;
};

exports.down = async (sql) => {
  for (const colorObj of colors) {
    await sql`
	DELETE FROM clothing_items_colors WHERE color = ${colorObj.color};
`;
  }
};
