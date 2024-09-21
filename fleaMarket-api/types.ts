import mongoose, { Model } from 'mongoose';

export interface UserFields {
  username: string;
  password: string;
  token: string;
}

export interface ProductMutation {
  user: mongoose.Types.ObjectId | string;
  title: string;
  description: string;
  image: string;
  price: number;
  category: string;
}

export interface UserMethods {
  checkPassword(password: string): Promise<boolean>;
  generateToken(): void;
}

export type UserModel = Model<UserFields, {}, UserMethods>;