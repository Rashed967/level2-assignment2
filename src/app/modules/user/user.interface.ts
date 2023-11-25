import { Model } from 'mongoose';

export type TUserName = {
  firstName: string;
  lastName: string;
};

export type TUserAddress = {
  street: string;
  city: string;
  country: string;
};

export type TProduct = {
  productName: string;
  price: number;
  qauntity: number;
};

export type TUser = {
  userId: number;
  username: string;
  password: string;
  fullName: TUserName;
  age: number;
  email: string;
  isActive: boolean;
  hobbies: string[];
  address: TUserAddress;
  orders?: Array<TProduct>;
};

// user static method model

export type UserMethodModel = Model<TUser> & {
  createUserInDB(user: TUser): Promise<TUser | null>;
  findSingleUserById(userId: number): Promise<TUser | null>;
  updateSingleUserById(
    userId: number,
    updateDoc: unknown,
  ): Promise<TUser | null>;
  deleteSingleUserById(userId: number): Promise<TUser | null>;
  addProductToOrderArray(
    userId: number,
    product: TProduct,
  ): Promise<TProduct | null>;
  getAllOrderFromSingleUser(userId: number): Promise<TProduct[] | null>;
  countTotalPriceOfOrdersforSingleUser(userId: number): unknown;
  checkExistingUser(userId: number): Promise<TUser>;
};
