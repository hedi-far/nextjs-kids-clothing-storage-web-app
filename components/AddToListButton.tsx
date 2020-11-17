import { Dispatch, SetStateAction } from 'react';
import { ClothingItemDetail } from '../util/types';
import { handleAddToList } from '../util/my-list';

type Props = {
  clothingItemId: number;
  myList: ClothingItemDetail[];
  clothingItem: ClothingItemDetail;
  setMyList: Dispatch<SetStateAction<ClothingItemDetail[]>>;
};

export default function AddToListButton(props: Props) {
  return (
    <button
      onClick={() =>
        props.setMyList(
          handleAddToList(
            props.clothingItemId,
            props.clothingItem,
            props.myList,
          ),
        )
      }
    >
      Add to List
    </button>
  );
}
