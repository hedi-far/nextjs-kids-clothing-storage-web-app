// import postgres from 'postgres';
// import dotenv from 'dotenv';
import { ClothingItemDetailByUser, SearchTerms } from './types';

// dotenv.config();

// const sql = postgres();
// const clothingItems = [{
//   id: 89,
//   storageItemId: 7,
//   clothingItemsType: 'sweatpants',
//   color: 'indigo',
//   size: '98',
//   season: 'summer',
//   gender: 'boy',
//   notes: 'eee',
//   storageItemName: 'blue box',
//   storageItemLocation: 'cupboard under stairs',
//   userId: 1
// },
// {
//   id: 90,
//   storageItemId: 7,
//   clothingItemsType: 'capris',
//   color: 'red',
//   size: '98',
//   season: 'summer',
//   gender: 'boy',
//   notes: 'eee',
//   storageItemName: 'blue box',
//   storageItemLocation: 'cupboard under stairs',
//   userId: 1
// }]

// const searchTerms = {
// clothingItemType: "sweatpants",
// clothingItemSize: "",
// clothingItemColor: "",
// clothingItemSeason: "",
// clothingItemGender: ""
// };

export function getSearchResults(clothingItems, searchTerms) {
  return clothingItems.reduce(function (filteredClothingItems, clothingItem) {
    if (
      clothingItem.clothingItemsType >= searchTerms.clothingItemType &&
      clothingItem.color >= searchTerms.clothingItemColor &&
      clothingItem.size >= searchTerms.clothingItemSize &&
      clothingItem.season >= searchTerms.clothingItemSeason &&
      clothingItem.gender >= searchTerms.clothingItemGender
    ) {
      filteredClothingItems.push(clothingItem);
    }

    return filteredClothingItems;
  }, []);
}

// getSearchResults(clothingItems, searchTerms);

//   // Get the names of the wizards in Hufflepuff
// var hufflepuff = wizards.reduce(function (newArr, wizard) {
//   if (wizard.house === 'Hufflepuff') {
//     newArr.push(wizard.name);
//   }
//   return newArr;
// }, []);

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
