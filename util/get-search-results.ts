export function searchInNotes(searchNotes, clothingItems) {
  return clothingItems.reduce(function (filteredClothingItems, clothingItem) {
    const result = clothingItem.notes.search(searchNotes);
    if (result !== -1) {
      filteredClothingItems.push(clothingItem);
    } else if (result === -1) {
      return filteredClothingItems;
    }

    return filteredClothingItems;
  }, []);
}

export function getFilterResults(clothingItems, clothesFilter) {
  return clothingItems.reduce(function (filteredClothingItems, clothingItem) {
    //IMPORTANT: type and size must always be checked, bc these are required input fields and will never be empty!
    //condition 1: all filters are set - checked
    if (
      (clothesFilter.clothingItemType,
      clothesFilter.clothingItemColor,
      clothesFilter.clothingItemSize,
      clothesFilter.clothingItemSeason,
      clothesFilter.clothingItemGender)
    ) {
      if (
        clothingItem.clothingItemsType === clothesFilter.clothingItemType &&
        clothingItem.color === clothesFilter.clothingItemColor &&
        clothingItem.size === clothesFilter.clothingItemSize &&
        clothingItem.season === clothesFilter.clothingItemSeason &&
        clothingItem.gender === clothesFilter.clothingItemGender
      ) {
        filteredClothingItems.push(clothingItem);
      }
    }

    //condition 2: type, size, color, season are set - checked

    if (
      (clothesFilter.clothingItemType,
      clothesFilter.clothingItemColor,
      clothesFilter.clothingItemSize,
      clothesFilter.clothingItemSeason,
      !clothesFilter.clothingItemGender)
    ) {
      if (
        clothingItem.clothingItemsType === clothesFilter.clothingItemType &&
        clothingItem.color === clothesFilter.clothingItemColor &&
        clothingItem.size === clothesFilter.clothingItemSize &&
        clothingItem.season === clothesFilter.clothingItemSeason
      ) {
        filteredClothingItems.push(clothingItem);
      }
    }

    //condition 3: type, size, color, gender are set - checked

    if (
      (clothesFilter.clothingItemType,
      clothesFilter.clothingItemColor,
      clothesFilter.clothingItemSize,
      !clothesFilter.clothingItemSeason,
      clothesFilter.clothingItemGender)
    ) {
      if (
        clothingItem.clothingItemsType === clothesFilter.clothingItemType &&
        clothingItem.color === clothesFilter.clothingItemColor &&
        clothingItem.size === clothesFilter.clothingItemSize &&
        clothingItem.gender === clothesFilter.clothingItemGender
      ) {
        filteredClothingItems.push(clothingItem);
      }
    }

    //condition 4: size, color, season, gender are set - works

    if (
      (clothesFilter.clothingItemType,
      clothesFilter.clothingItemColor,
      clothesFilter.clothingItemSize,
      clothesFilter.clothingItemSeason,
      clothesFilter.clothingItemGender)
    ) {
      if (
        typeof clothingItem.clothingItemsType == 'string' &&
        clothingItem.color === clothesFilter.clothingItemColor &&
        clothingItem.size === clothesFilter.clothingItemSize &&
        clothingItem.season === clothesFilter.clothingItemSeason &&
        clothingItem.gender === clothesFilter.clothingItemGender
      ) {
        filteredClothingItems.push(clothingItem);
      }
    }

    //condition 5: type, size, color are set - checked

    if (
      (clothesFilter.clothingItemType,
      clothesFilter.clothingItemColor,
      clothesFilter.clothingItemSize,
      !clothesFilter.clothingItemSeason,
      !clothesFilter.clothingItemGender)
    ) {
      if (
        clothingItem.clothingItemsType === clothesFilter.clothingItemType &&
        clothingItem.color === clothesFilter.clothingItemColor &&
        clothingItem.size === clothesFilter.clothingItemSize
      ) {
        filteredClothingItems.push(clothingItem);
      }
    }

    //condition 6: type, size, season are set - checked

    if (
      (clothesFilter.clothingItemType,
      !clothesFilter.clothingItemColor,
      clothesFilter.clothingItemSize,
      clothesFilter.clothingItemSeason,
      !clothesFilter.clothingItemGender)
    ) {
      if (
        clothingItem.clothingItemsType === clothesFilter.clothingItemType &&
        clothingItem.size === clothesFilter.clothingItemSize &&
        clothingItem.season === clothesFilter.clothingItemSeason
      ) {
        filteredClothingItems.push(clothingItem);
      }
    }

    //condition 7: type, size, gender are set - checked

    if (
      (clothesFilter.clothingItemType,
      !clothesFilter.clothingItemColor,
      clothesFilter.clothingItemSize,
      !clothesFilter.clothingItemSeason,
      clothesFilter.clothingItemGender)
    ) {
      if (
        clothingItem.clothingItemsType === clothesFilter.clothingItemType &&
        clothingItem.size === clothesFilter.clothingItemSize &&
        clothingItem.gender === clothesFilter.clothingItemGender
      ) {
        filteredClothingItems.push(clothingItem);
      }
    }

    //condition 8: size, color, season are set - FIXME!!!

    if (
      (clothesFilter.clothingItemType,
      clothesFilter.clothingItemColor,
      clothesFilter.clothingItemSize,
      clothesFilter.clothingItemSeason,
      !clothesFilter.clothingItemGender)
    ) {
      if (
        typeof clothingItem.clothingItemsType == 'string' &&
        clothingItem.color === clothesFilter.clothingItemColor &&
        clothingItem.size === clothesFilter.clothingItemSize &&
        clothingItem.season === clothesFilter.clothingItemSeason
      ) {
        filteredClothingItems.push(clothingItem);
      }
    }

    //condition 9: size, color, gender are set - works

    if (
      (clothesFilter.clothingItemType,
      clothesFilter.clothingItemColor,
      clothesFilter.clothingItemSize,
      !clothesFilter.clothingItemSeason,
      clothesFilter.clothingItemGender)
    ) {
      if (
        typeof clothingItem.clothingItemsType === 'string' &&
        clothingItem.color === clothesFilter.clothingItemColor &&
        clothingItem.size === clothesFilter.clothingItemSize &&
        clothingItem.gender === clothesFilter.clothingItemGender
      ) {
        filteredClothingItems.push(clothingItem);
      }
    }

    //condition 10: type, size are set - works

    if (
      (clothesFilter.clothingItemType,
      !clothesFilter.clothingItemColor,
      clothesFilter.clothingItemSize,
      !clothesFilter.clothingItemSeason,
      !clothesFilter.clothingItemGender)
    ) {
      if (
        typeof clothingItem.clothingItemsType ===
          clothesFilter.clothingItemType &&
        clothingItem.size === clothesFilter.clothingItemSize
      ) {
        filteredClothingItems.push(clothingItem);
      }
    }

    //condition 11: type, color are set - FIXME

    if (
      (clothesFilter.clothingItemType,
      clothesFilter.clothingItemColor,
      clothesFilter.clothingItemSize,
      !clothesFilter.clothingItemSeason,
      !clothesFilter.clothingItemGender)
    ) {
      if (
        clothingItem.clothingItemsType === clothesFilter.clothingItemType &&
        clothingItem.color === clothesFilter.clothingItemColor &&
        typeof clothingItem.size == 'string'
      ) {
        filteredClothingItems.push(clothingItem);
      }
    }

    //condition 12: type, season are set -FIXME

    if (
      (clothesFilter.clothingItemType,
      !clothesFilter.clothingItemColor,
      clothesFilter.clothingItemSize,
      clothesFilter.clothingItemSeason,
      !clothesFilter.clothingItemGender)
    ) {
      if (
        clothingItem.clothingItemsType === clothesFilter.clothingItemType &&
        typeof clothingItem.size == 'string' &&
        clothingItem.season === clothesFilter.clothingItemSeason
      ) {
        filteredClothingItems.push(clothingItem);
      }
    }

    //condition 13: type, gender are set - works!

    if (
      (clothesFilter.clothingItemType,
      !clothesFilter.clothingItemColor,
      clothesFilter.clothingItemSize,
      !clothesFilter.clothingItemSeason,
      clothesFilter.clothingItemGender)
    ) {
      if (
        clothingItem.clothingItemsType === clothesFilter.clothingItemType &&
        typeof clothingItem.size == 'string' &&
        clothingItem.gender === clothesFilter.clothingItemGender
      ) {
        filteredClothingItems.push(clothingItem);
      }
    }

    //condition 14: size, color are set - FIXME

    if (
      (clothesFilter.clothingItemType,
      clothesFilter.clothingItemColor,
      clothesFilter.clothingItemSize,
      !clothesFilter.clothingItemSeason,
      !clothesFilter.clothingItemGender)
    ) {
      if (
        typeof clothingItem.clothingItemsType == 'string' &&
        clothingItem.color === clothesFilter.clothingItemColor &&
        clothingItem.size === clothesFilter.clothingItemSize
      ) {
        filteredClothingItems.push(clothingItem);
      }
    }

    //condition 15: size, season are set - FIXME

    if (
      (clothesFilter.clothingItemType,
      !clothesFilter.clothingItemColor,
      clothesFilter.clothingItemSize,
      clothesFilter.clothingItemSeason,
      !clothesFilter.clothingItemGender)
    ) {
      if (
        typeof clothingItem.clothingItemsType == 'string' &&
        clothingItem.season === clothesFilter.clothingItemSeason &&
        clothingItem.size === clothesFilter.clothingItemSize
      ) {
        filteredClothingItems.push(clothingItem);
      }
    }

    //condition 16: size, gender are set - works!

    if (
      (clothesFilter.clothingItemType,
      !clothesFilter.clothingItemColor,
      clothesFilter.clothingItemSize,
      !clothesFilter.clothingItemSeason,
      clothesFilter.clothingItemGender)
    ) {
      if (
        typeof clothingItem.clothingItemsType == 'string' &&
        clothingItem.gender === clothesFilter.clothingItemGender &&
        clothingItem.size === clothesFilter.clothingItemSize
      ) {
        filteredClothingItems.push(clothingItem);
      }
    }

    //condition 17: color, season are set - works

    if (
      (clothesFilter.clothingItemType,
      clothesFilter.clothingItemColor,
      clothesFilter.clothingItemSize,
      clothesFilter.clothingItemSeason,
      !clothesFilter.clothingItemGender)
    ) {
      if (
        typeof clothingItem.clothingItemsType == 'string' &&
        clothingItem.color === clothesFilter.clothingItemColor &&
        typeof clothingItem.size == 'string' &&
        clothingItem.season === clothesFilter.clothingItemSeason
      ) {
        filteredClothingItems.push(clothingItem);
      }
    }

    //condition 18: color, gender are set - works!

    if (
      (clothesFilter.clothingItemType,
      clothesFilter.clothingItemColor,
      clothesFilter.clothingItemSize,
      !clothesFilter.clothingItemSeason,
      clothesFilter.clothingItemGender)
    ) {
      if (
        typeof clothingItem.clothingItemsType == 'string' &&
        clothingItem.color === clothesFilter.clothingItemColor &&
        typeof clothingItem.size == 'string' &&
        clothingItem.gender === clothesFilter.clothingItemGender
      ) {
        filteredClothingItems.push(clothingItem);
      }
    }

    // condition 19: type is set - checked! works!

    if (
      (clothesFilter.clothingItemType,
      !clothesFilter.clothingItemColor,
      clothesFilter.clothingItemSize,
      !clothesFilter.clothingItemSeason,
      !clothesFilter.clothingItemGender)
    ) {
      if (
        clothingItem.clothingItemsType === clothesFilter.clothingItemType &&
        typeof clothingItem.size == 'string'
      ) {
        filteredClothingItems.push(clothingItem);
      }
    }

    //condition 20: size is set - works!
    if (
      (clothesFilter.clothingItemType,
      !clothesFilter.clothingItemColor,
      clothesFilter.clothingItemSize,
      !clothesFilter.clothingItemSeason,
      !clothesFilter.clothingItemGender)
    ) {
      if (
        typeof clothingItem.clothingItemsType == 'string' &&
        clothingItem.size === clothesFilter.clothingItemSize
      ) {
        filteredClothingItems.push(clothingItem);
      }
    }

    //condition 21: color is set - FIXME

    if (
      (clothesFilter.clothingItemType,
      clothesFilter.clothingItemColor,
      clothesFilter.clothingItemSize,
      !clothesFilter.clothingItemSeason,
      !clothesFilter.clothingItemGender)
    ) {
      if (
        typeof clothingItem.type == 'string' &&
        typeof clothingItem.size == 'string' &&
        clothingItem.color === clothesFilter.clothingItemColor
      ) {
        filteredClothingItems.push(clothingItem);
      }
    }
    //condition 22: season is set - FIXME!

    if (
      (clothesFilter.clothingItemType,
      !clothesFilter.clothingItemColor,
      clothesFilter.clothingItemSize,
      clothesFilter.clothingItemSeason,
      !clothesFilter.clothingItemGender)
    ) {
      if (
        typeof clothingItem.type == 'string' &&
        typeof clothingItem.size == 'string' &&
        clothingItem.season === clothesFilter.clothingItemSeason
      ) {
        filteredClothingItems.push(clothingItem);
      }
    }

    //condition 23: gender is set - size and type are checked bc can never be empty! - FIXME

    if (
      (clothesFilter.clothingItemType,
      !clothesFilter.clothingItemColor,
      clothesFilter.clothingItemSize,
      !clothesFilter.clothingItemSeason,
      clothesFilter.clothingItemGender)
    ) {
      if (
        typeof clothingItem.type == 'string' &&
        typeof clothingItem.size == 'string' &&
        clothingItem.gender === clothesFilter.clothingItemGender
      ) {
        filteredClothingItems.push(clothingItem);
      }
    }

    return filteredClothingItems;
  }, []);
}
