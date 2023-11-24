import { User } from './user.model';
import { TProduct, TUser } from './user.interface';

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

// delete single user by id
const deleteSingleUser = async (userId: number) => {
  const result = await User.deleteSingleUserById(userId);
  return result;
};

// add product to order arrray
const addProduct = async (userId: number, product: TProduct) => {
  const result = await User.addProductToOrderArray(userId, product);
  return result;
};

// get all order from sigle user
const getOrdersById = async (userId: number) => {
  const result = await User.getAllOrderFromSingleUser(userId);
  return result;
};

// count total price of orders for a single user
const countTotalPriceById = async (userId: number) => {
  const result = await User.countTotalPriceOfOrdersforSingleUser(userId);
  console.log(result);
  return result;
};

export const userBusinessLogic = {
  createUserInDB,
  getAllUserFromDB,
  getAUserById,
  updateUserById,
  deleteSingleUser,
  addProduct,
  getOrdersById,
  countTotalPriceById,
};
