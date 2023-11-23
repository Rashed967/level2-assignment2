import { Schema, model } from 'mongoose';
import { TUser, TUserAddress, TUserName } from './user.interface';

const UserNameSchema = new Schema<TUserName>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
});

const UserAddressSchema = new Schema<TUserAddress>({
  street: String,
  city: String,
  country: String,
});

export const UserSchema = new Schema<TUser>({
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

export const User = model('User', UserSchema);
