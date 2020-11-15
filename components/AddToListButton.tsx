import { useState } from 'react';
import { ClothingItemDetail } from '../util/types';
import Cookies from 'js-cookie';

type Props = {
  myList: ClothingItemDetail[];
  clothingItem: ClothingItemDetail;
};

export default function AddToListButton(props: Props) {
  const [myList, setMyList] = useState(props.myList);

  const handleAddToList = (clothingItem: ClothingItemDetail) => {
    //FIX ME - why is myList always empty???
    if (!myList.includes(clothingItem)) {
      const newList = myList.concat(clothingItem);
      setMyList(newList);
      console.log(newList);
      Cookies.set('myList', newList);
    } else {
      alert('Already on list');
    }

    console.log(clothingItem.id);
    console.log(myList.includes(clothingItem));
    console.log(props.myList);
    console.log(props.myList.length);
    console.log(myList);
    console.log(myList.length);
  };

  return (
    <button onClick={() => handleAddToList(props.clothingItem)}>
      Add to List
    </button>
  );
}
