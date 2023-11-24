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
// - [ ]  `orders` (array of objects): An array containing the orders of the user.
//     - [ ]  `productName` (string): The name of the product in the order.
//     - [ ]  `price` (number): The price of the product in the order.
//     - [ ]  `quantity` (number): The quantity of the product in the order.

export interface TProduct {
    productName : string;
    price : number;
    qauntity : number;
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
  orders: TProduct[]  
}

// user static method model
// export interface UserMethodModel extends Model<TUser> {
//   findSingleUserById(userId: number): Promise<TUser | null>;
// }

export interface UserMethodModel extends Model<TUser> {
  findSingleUserById(userId: number): Promise<TUser | null>;
  updateSingleUserById(userId: number, updateDoc): Promise<TUser | null>;
  deleteSingleUserById(userId: number): Promise<TUser | null>;
  addProductToOrderArray(userId: number, product:TProduct) : Promise<TProduct | null>,
  getAllOrderFromSingleUser(userId: number) : Promise<TProduct[] | null>,
  countTotalPriceOfOrdersforSingleUser(userId: number) : Promise<T>

}
