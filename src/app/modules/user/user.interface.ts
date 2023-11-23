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
// export interface UserMethodModel extends Model<TUser> {
//   findSingleUserById(userId: number): Promise<TUser | null>;
// }

export interface UserMethodModel extends Model<TUser> {
  findSingleUserById(userId: number): Promise<TUser | null>;
  updateSingleUserById(userId: number, updateDoc): Promise<TUser | null>;
  deleteSingleUserById(userId: number): Promise<TUser | null>;
}
