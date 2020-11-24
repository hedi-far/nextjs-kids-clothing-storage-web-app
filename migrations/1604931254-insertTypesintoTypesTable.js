const types = [
  { clothing_items_type: 't-shirt' },
  { clothing_items_type: 'tank top' },
  { clothing_items_type: 'blouse' },
  { clothing_items_type: 'polo shirt' },
  { clothing_items_type: 'long-sleeve shirt' },
  { clothing_items_type: 'dress-shirt' },
  { clothing_items_type: 'cardigan' },
  { clothing_items_type: 'hoodie' },
  { clothing_items_type: 'sweater' },
  { clothing_items_type: 'pullover' },
  { clothing_items_type: 'fleece ' },
  { clothing_items_type: 'bodysuit' },
  { clothing_items_type: 'onesie' },
  { clothing_items_type: 'overalls' },
  { clothing_items_type: 'shorts (athletic)' },
  { clothing_items_type: 'shorts' },
  { clothing_items_type: 'capris' },
  { clothing_items_type: 'pants' },
  { clothing_items_type: 'sweatpants' },
  { clothing_items_type: 'jeans' },
  { clothing_items_type: 'skirt' },
  { clothing_items_type: 'dress' },
  { clothing_items_type: 'pair of socks' },
  { clothing_items_type: 'non-slip-socks' },
  { clothing_items_type: 'tights' },
  { clothing_items_type: 'warmers' },
  { clothing_items_type: 'leggings' },
  { clothing_items_type: 'undergarments' },
  { clothing_items_type: 'vest' },
  { clothing_items_type: 'undershirt' },
  { clothing_items_type: 'belt' },
  { clothing_items_type: 'tie' },
  { clothing_items_type: 'scarf' },
  { clothing_items_type: 'mittens' },
  { clothing_items_type: 'gloves' },
  { clothing_items_type: 'baby apron' },
  { clothing_items_type: 'cloth diaper' },
  { clothing_items_type: 'hat' },
  { clothing_items_type: 'sun hat' },
  { clothing_items_type: 'cap' },
  { clothing_items_type: 'bonnet' },
  { clothing_items_type: 'beanie' },
  { clothing_items_type: 'headband' },
  { clothing_items_type: 'earmuff' },
  { clothing_items_type: 'footmuff' },
  { clothing_items_type: 'booties' },
  { clothing_items_type: 'baby shoes' },
  { clothing_items_type: 'pajamas' },
  { clothing_items_type: 'nightgown' },
  { clothing_items_type: 'jacket' },
  { clothing_items_type: 'coat' },
  { clothing_items_type: 'raincoat' },
  { clothing_items_type: 'snowsuit' },
  { clothing_items_type: 'splash pants' },
  { clothing_items_type: 'swimsuit' },
  { clothing_items_type: 'swim shirt' },
  { clothing_items_type: 'trunks' },
];

exports.up = async (sql) => {
  await sql`
 INSERT INTO clothing_items_types ${sql(types, 'clothing_items_type')}
 `;
};

exports.down = async (sql) => {
  for (const typeObj of types) {
    await sql`
	DELETE FROM clothing_items_types WHERE clothing_items_type = ${typeObj.clothing_items_type};
`;
  }
};
