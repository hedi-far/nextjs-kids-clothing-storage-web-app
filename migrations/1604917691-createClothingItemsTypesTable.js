exports.up = async (sql) => {
  await sql`
  CREATE TABLE IF NOT EXISTS clothing_items_types (
		id integer PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY NOT NULL,
		clothing_items_type VARCHAR(50)
		);
  `;
};

exports.down = async (sql) => {
  await sql`
    DROP TABLE IF EXISTS clothing_items_types;
    `;
};
