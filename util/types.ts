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