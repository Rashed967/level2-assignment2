import { User } from './user.model';
import { TUser } from './user.interface';

const createUserInDB = async (user: TUser) => {
  const result = await User.create(user);
  return result;
};

const getAllUserFromDB = async () => {
  const result = await User.find(
    {},
    { username: 1, fullName: 1, age: 1, email: 1, address: 1 },
  );
  return result;
};

export const userBusinessLogic = {
  createUserInDB,
  getAllUserFromDB,
};
