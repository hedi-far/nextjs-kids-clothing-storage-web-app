exports.up = async (sql) => {
  await sql`
  CREATE TABLE IF NOT EXISTS clothing_items (
		id integer PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY NOT NULL,
		storage_item_id int NOT NULL REFERENCES storage_items (id) ON DELETE CASCADE,
		clothing_items_type_id  int NOT NULL REFERENCES clothing_items_types (id),
    color_id int REFERENCES clothing_items_colors (id),
    size_id int NOT NULL REFERENCES clothing_items_sizes (id),
    season_id int REFERENCES clothing_items_seasons (id),
    gender_id int REFERENCES clothing_items_gender (id),
    notes text 
		);
  `;
};

exports.down = async (sql) => {
  await sql`
    DROP TABLE IF EXISTS clothing_items;
    `;
};
