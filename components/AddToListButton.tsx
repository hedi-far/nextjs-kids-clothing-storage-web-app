import { Dispatch, SetStateAction } from 'react';
import { ClothingItemDetail } from '../util/types';
import { handleAddToList } from '../util/my-list';
import { css } from '@emotion/react';

//icon
const addToListButtonStyles = css`
  background-color: white;
  box-shadow: none;
  margin-top: 15px;
  & img {
    height: 30px;
    width: 30px;
  }
`;

type Props = {
  clothingItemId: number;
  myList: ClothingItemDetail[];
  clothingItem: ClothingItemDetail;
  setMyList: Dispatch<SetStateAction<ClothingItemDetail[]>>;
};

export default function AddToListButton(props: Props) {
  return (
    <button
      css={addToListButtonStyles}
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
      <img src="/icons/list.svg" alt="list button" />
    </button>
  );
}
