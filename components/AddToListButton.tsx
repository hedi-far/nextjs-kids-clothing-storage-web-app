import { useState } from 'react';
import { MyList } from '../util/types';
import Cookies from 'js-cookie';
// import { handleAddToList } from '../../util/my-list';

type Props = { myList: MyList; listInfo: MyList };

export default function AddToListButton(props: Props) {
  const [myList, setMyList] = useState(props.myList);

  const handleAddToList = (listInfo: MyList) => {
    const newList = myList.concat(listInfo);
    setMyList(newList);
    Cookies.set('myList', myList);
  };

  return (
    <button onClick={() => handleAddToList(props.listInfo)}>Add to List</button>
  );
}
