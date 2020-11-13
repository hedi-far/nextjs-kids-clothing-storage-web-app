export type User = {
  id: number;
  email: string;
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
  size: number;
  season?: string;
  gender?: string;
  notes?: string;
};
