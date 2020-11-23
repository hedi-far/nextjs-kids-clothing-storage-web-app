import Cookies from 'js-cookie';
import { ClothingItemDetail } from './types';

//when add to list button is clicked on page [id] or on search page;
//checks whether id of specific clothing item is already in the myList cookie
export function handleAddToList(
  clothingItemId: number,
  clothingItem: ClothingItemDetail,
  myList: ClothingItemDetail[],
) {
  const found = myList.find((item) => item.id === clothingItemId);

  if (found) {
    alert('Already on your list!');
    return myList;
  } else {
    const newList = myList.concat(clothingItem);
    Cookies.set('myList', newList);
    alert('Added to list!');
    return newList;
  }
}

//when delete from list button is clicked on my-list page
export function handleDeleteFromList(
  myList: ClothingItemDetail[],
  listItemId: number,
) {
  const newList = myList.filter((item) => item.id !== listItemId);
  Cookies.set('myList', newList);
  window.location.reload();
  return newList;
}
