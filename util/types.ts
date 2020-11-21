export type User = {
  id: number;
  passwordHash: string;
  username: string;
};

export type Session = {
  id: number;
  token: string;
  expiryTimestamp: Date;
  userId: number;
};

export type StorageItem = {
  id: number;
  storageItemName: string;
  storageItemLocation?: string;
  userId: number;
};

export type ClothingItem = {
  id: number;
  storageItemId: number;
  clothingItemsTypeId: number;
  colorId?: number;
  sizeId: number;
  seasonId?: number;
  genderId?: number;
  notes?: string;
};

export type ClothingItemDetail = {
  id: number;
  storageItemId: number;
  clothingItemsType: string;
  color?: string;
  size: string;
  season?: string;
  gender?: string;
  notes?: string;
  storageItemName: string;
  storageItemLocation?: string;
};

export type ClothingItemDetailByUser = {
  id: number;
  storageItemId: number;
  clothingItemsType: string;
  color?: string;
  size: string;
  season?: string;
  gender?: string;
  notes?: string;
  storageItemName: string;
  storageItemLocation?: string;
  userId: number;
};

export type ClothingItemsType = {
  id: number;
  clothingItemsType: string;
};

export type ClothingItemsColor = {
  id: number;
  color: string;
};

export type ClothingItemsSize = {
  id: number;
  size: string;
};

export type ClothingItemsSeason = {
  id: number;
  season: string;
};

export type ClothingItemsGender = {
  id: number;
  gender: string;
};

// export type MyList = {
//   id: number;
//   storageItemId: number;
//   clothingItemsType: string;
//   color?: string;
//   size: string;
//   season?: string;
//   gender?: string;
//   notes?: string;
//   storageItemName: string;
//   storageItemLocation?: string;
// };
