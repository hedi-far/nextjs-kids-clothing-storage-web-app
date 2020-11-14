// import { useState } from 'react';
import { MyList, ClothingItemDetail } from './types';

//When Add to List button is clicked

export function handleAddToList(
  myList: MyList,
  clothing_item: ClothingItemDetail,
) {
  const newList = myList.concat(clothing_item);
  return newList;
}

// //When 'Add to bag' button is clicked:
// const handleAddToBag = (id: number) => {
//   const newArrayOfIds = arrayOfIds.concat(id);

//   setArrayOfIds(newArrayOfIds);

//   //set number of Items in the shopping bag
//   setNumberOfItems(String(newArrayOfIds.length));
// };
// onClick={(item) => handleAddToBag(props.shoe[0].id)}
