import { Schema, model } from 'mongoose';
import {
  TProduct,
  TUser,
  TUserAddress,
  TUserName,
  UserMethodModel,
} from './user.interface';

const UserNameSchema = new Schema<TUserName>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
});

const UserAddressSchema = new Schema<TUserAddress>({
  street: String,
  city: String,
  country: String,
});

const ProductSchema = new Schema({
  productName: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
});

export const UserSchema = new Schema<TUser, UserMethodModel>({
  userId: { type: Number, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  fullName: { type: UserNameSchema, required: true },
  age: { type: Number, required: true },
  email: { type: String, required: true, unique: true },
  isActive: Boolean,
  hobbies: {
    type: [String],
    required: true,
  },
  address: { type: UserAddressSchema, required: true },
  orders: { type: Array(ProductSchema) },
});

// user static method
// find single user by userid
UserSchema.statics.findSingleUserById = async function (userId: string) {
  const user = await User.findOne({ userId }, { password: 0 });
  return user;
};

// update single user
UserSchema.statics.updateSingleUserById = async function (
  userId: number,
  updateDoc,
) {
  const user = await User.findOneAndUpdate(
    { userId },
    { $set: updateDoc },
    { new: true, runValidators: true },
  );
  return user;
};

// delete single user
UserSchema.statics.deleteSingleUserById = async function (userId) {
  const user = await User.findOneAndDelete({ userId });
  return user;
};

// add product to array
UserSchema.statics.addProductToOrderArray = async function (
  userId: number,
  product: TProduct,
) {
  try {
    const user = await User.findOne({ userId });
    if ('orders' in user) {
      user.orders.push(product);
      const result = await user.save();
      return result;
    } else {
      user.orders = [ProductSchema];
      const result = await user.save();
      return result;
    }
  } catch (error) {
    return error;
  }
};

// get all order from a single user
UserSchema.statics.getAllOrderFromSingleUser = async function (userId: number) {
  const orders = await User.findOne({ userId }, { orders: 1 });
  return orders;
};

// count total price of orders for a single user
UserSchema.statics.countTotalPriceOfOrdersforSingleUser = async function (
  userId: number,
) {
  try {
    const user = await User.aggregate([
      {
        $match: { userId: { $eq: userId } },
      },
    ]);

    return user && user;
  } catch (error) {
    return 'user not found';
  }
};

export const User = model<TUser, UserMethodModel>('User', UserSchema);
