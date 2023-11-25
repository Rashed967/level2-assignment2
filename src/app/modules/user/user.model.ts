import { Schema, model } from 'mongoose';
import {
  TProduct,
  TUser,
  TUserAddress,
  TUserName,
  UserMethodModel,
} from './user.interface';
import bcrypt from 'bcrypt';

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
// create user in DB
UserSchema.statics.createUserInDB = async function (user: TUser) {
  try {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    user.password = hashedPassword;
    const result = await User.create(user);
    // result.password = '';
    return result;
  } catch (error) {
    return error;
  }
};

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
    { new: true, runValidators: true, projection: { password: 0 } },
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
    if (user) {
      if ('orders' in user) {
        user.orders.push(product);
        const result = await user.save();
        return result;
      } else {
        user.orders = [ProductSchema];
        const result = await user.save();
        return result;
      }
      return null;
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
    const totalPriceAgrregate = User.aggregate([
      {
        $match: {
          userId: { $eq: userId },
        },
      },
      {
        $project: {
          _id: 0,
          totalPrice: {
            $sum: '$orders.price',
          },
        },
      },
    ]);
    return totalPriceAgrregate;
};

// check existing user
UserSchema.statics.checkExistingUser = async (userId: number) => {
  const result = await User.findOne({ userId });
  return result;
};

// middle ware
// post document midllware
UserSchema.post('save', (doc, next) => {
  doc.password = '';
  next();
});

// update query middleware

export const User = model<TUser, UserMethodModel>('User', UserSchema);
