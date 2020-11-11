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
  storageItemLocation: string;
  userId: number;
};

// export type StorageItems = [];
