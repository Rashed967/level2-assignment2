import { Schema, model } from 'mongoose';
import {
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

export const User = model<TUser, UserMethodModel>('User', UserSchema);
