const seasons = [
  { season: 'spring' },
  { season: 'summer' },
  { season: 'autumn' },
  { season: 'winter' },
  { season: 'all seasons' },
  { season: 'transition' },
];

exports.up = async (sql) => {
  await sql`
 INSERT INTO clothing_items_seasons 
 
 VALUES 
 (
 ${sql(seasons, 'season')}
 )
 `;
};

exports.down = async (sql) => {
  for (const seasonObj of seasons) {
    await sql`
	DELETE FROM clothing_items_seasons WHERE season = ${seasonObj.season};
`;
  }
};
