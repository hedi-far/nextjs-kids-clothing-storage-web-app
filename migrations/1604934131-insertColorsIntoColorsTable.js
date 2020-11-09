const colors = [
  { color: 'red' },
  { color: 'blue' },
  { color: 'green' },
  { color: 'yellow' },
  { color: 'purple' },
  { color: 'pink' },
  { color: 'orange' },
  { color: 'brown' },
  { color: 'black' },
  { color: 'white' },
  { color: 'gray' },
  { color: 'gold' },
  { color: 'silver' },
  { color: 'navy blue' },
  { color: 'sky blue' },
  { color: 'lime green' },
  { color: 'teal' },
  { color: 'indigo' },
  { color: 'magenta' },
  { color: 'violet' },
];

exports.up = async (sql) => {
  await sql`
 INSERT INTO clothing_items_colors ${sql(colors, 'color')};
 `;
};

exports.down = async (sql) => {
  for (const colorObj of colors) {
    await sql`
	DELETE FROM clothing_items_colors WHERE color = ${colorObj.color};
`;
  }
};
