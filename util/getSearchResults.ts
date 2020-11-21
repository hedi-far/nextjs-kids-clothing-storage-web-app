import postgres from 'postgres';
import dotenv from 'dotenv';
import { ClothingItemDetailByUser } from './types';

dotenv.config();

const sql = postgres();

export async function getSearchResults(userId: number) {
  const clothingItems = await sql<ClothingItemDetailByUser[]>`
  SELECT
  clothing_items.id,
  storage_item_id,
  clothing_items_type,
  color,
  size,
  season,
  gender,
  notes,
  storage_item_name,
  storage_item_location,
  storage_items.user_id

  FROM clothing_items_types
INNER JOIN clothing_items
  ON clothing_items_types.id = clothing_items.clothing_items_type_id 
LEFT OUTER JOIN clothing_items_colors
  ON clothing_items_colors.id = clothing_items.color_id
INNER JOIN clothing_items_sizes
  ON clothing_items_sizes.id = clothing_items.size_id
LEFT OUTER JOIN clothing_items_seasons
  ON clothing_items_seasons.id = clothing_items.season_id
LEFT OUTER JOIN clothing_items_gender
 ON clothing_items_gender.id = clothing_items.gender_id
INNER JOIN storage_items
  ON clothing_items.storage_item_id = storage_items.id AND storage_items.user_id = ${userId};

 `;

  return clothingItems.reduce((reducedClothingItems, clothingItemsType) => {
    const matchingClothingItem = reducedClothingItems.find(
      (type) => clothingItems.type,
    );
  });

  // recipes.reduce((reducedFoodArray, recipeIng) => {
  //     const matchingRecipe = reducedFoodArray.find(
  //       (ing) => ing.name === recipeIng.recipe_name,
  //     );
  //     if (!matchingRecipe) {
  //       reducedFoodArray.push({
  //         id: recipeIng.recipe_id,
  //         name: recipeIng.recipe_name,
  //         image: recipeIng.recipe_img,
  //         link: recipeIng.recipe_link,
  //         ing: [recipeIng.ingredient_name],
  //       });
  //     } else {
  //       matchingRecipe.ing.push(recipeIng.ingredient_name);
  //     }
  //     return reducedFoodArray;
  //   }, []);
  // }
}
