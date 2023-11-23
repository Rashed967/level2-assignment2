import { User } from './user.model';
import { TUser } from './user.interface';

// create user in db
const createUserInDB = async (user: TUser) => {
  const result = await User.create(user);
  return result;
};

// get all user from db
const getAllUserFromDB = async () => {
  const result = await User.find(
    {},
    { username: 1, fullName: 1, age: 1, email: 1, address: 1 },
  );
  return result;
};

// get specific user by id
const getAUserById = async (userId: number) => {
  const result = await User.findSingleUserById(userId);
  return result;
};

// update specific user by id
const updateUserById = async (userId: number, updateDoc) => {
  const result = await User.updateSingleUserById(userId, updateDoc);
  return result;
};

export const userBusinessLogic = {
  createUserInDB,
  getAllUserFromDB,
  getAUserById,
  updateUserById,
};
