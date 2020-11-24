import { ClothingItemDetail, Filter } from './types';

//checks if string that has been entered into the search field
//is found in notes
export function searchInNotes(
  searchNotes: RegExp,
  clothingItems: ClothingItemDetail[],
) {
  return clothingItems.reduce(function (
    filteredClothingItems,
    clothingItem: ClothingItemDetail,
  ) {
    if (clothingItem.notes) {
      const result = clothingItem.notes.search(searchNotes);
      if (result !== -1) {
        filteredClothingItems.push(clothingItem);
      } else if (result === -1) {
        return filteredClothingItems;
      }
    }

    return filteredClothingItems;
  },
  [] as any[]);
}

//deconstructs the entries inside object clothesFilter: checks if a filterValue has been set
//(e.g. whether filter is set for "color"), and if so checks if there is a match in clothing_items of user
export function getFilterResults(
  clothingItems: ClothingItemDetail[],
  clothesFilter: Filter,
) {
  return clothingItems.reduce(function (
    filteredClothingItems,
    clothingItem: ClothingItemDetail,
  ) {
    let matches: boolean = true;

    Object.entries(clothesFilter).forEach(([filterTerm, filterValue]) => {
      if (
        filterValue &&
        filterValue !== clothingItem[filterTerm as keyof ClothingItemDetail]
      ) {
        matches = false;
      }
    });

    if (matches === true) {
      filteredClothingItems.push(clothingItem);
    }

    return filteredClothingItems;
  },
  [] as any[]);
}
