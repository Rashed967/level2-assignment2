import { Model } from 'mongoose';

export interface TUserName {
  firstName: string;
  lastName: string;
}

export interface TUserAddress {
  street: string;
  city: string;
  country: string;
}

export interface TProduct {
  productName: string;
  price: number;
  qauntity: number;
}

export interface TUser {
  userId: number;
  username: string;
  password: string;
  fullName: TUserName;
  age: number;
  email: string;
  isActive: boolean;
  hobbies: string[];
  address: TUserAddress;
}

// user static method model

export interface UserMethodModel extends Model<TUser> {
  createUserInDB(user: TUser): Promise<TUser | null>;
  findSingleUserById(userId: number): Promise<TUser | null>;
  updateSingleUserById(userId: number, updateDoc): Promise<TUser | null>;
  deleteSingleUserById(userId: number): Promise<TUser | null>;
  addProductToOrderArray(
    userId: number,
    product: TProduct,
  ): Promise<TProduct | null>;
  getAllOrderFromSingleUser(userId: number): Promise<TProduct[] | null>;
  countTotalPriceOfOrdersforSingleUser(
    userId: number,
  ): Promise<TProduct | null>;
  checkExistingUser(userId: number): Promise<TUser>;
}
