import { Request, Response } from 'express';
import { userBusinessLogic } from './user.service';

// create a user controller logic
const createUser = async (req: Request, res: Response) => {
  try {
    console.log('from user controller');
    const user = req.body;
    const result = await userBusinessLogic.createUserInDB(user);
    res.status(201).json({
      success: true,
      message: 'User created successfully',
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: 'failed',
      message: error.message,
      error: error,
    });
  }
};

// get all user controller logic
const getAllUser = async (req: Request, res: Response) => {
  try {
    const result = await userBusinessLogic.getAllUserFromDB();
    res.status(201).json({
      success: true,
      message: 'All user found successfully',
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: 'failed',
      message: error.message || 'No found anything',
      error: error,
    });
  }
};

// get a single user controller logic
const getAUserById = async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.userId);
    const result = await userBusinessLogic.getAUserById(userId);
    res.status(201).json({
      success: true,
      message: 'User found successfully',
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: 'failed',
      message: error.message || 'No found anything',
      error: error,
    });
  }
};
// get a single user controller logic
const updateSingleUserById = async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.userId);
    const user = req.body;
    const result = await userBusinessLogic.updateUserById(userId, user);
    res.status(201).json({
      success: true,
      message: 'User info updated successfully',
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: 'failed',
      message: error.message || 'Something went wrong!!!',
      error: error,
    });
  }
};

const deleteSingleUser = async (req: Request, res: Response) => {
  try {
    const userIdInNumber = parseInt(req.params.userId);
    const result = await userBusinessLogic.deleteSingleUser(userIdInNumber);
    res.status(200).json({
      success: true,
      message: 'User deleted successfully',
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'something went wrong!!',
      error: error,
    });
  }
};

// add product to order array
const addProduct = async (req: Request, res: Response) => {
  try {
    const userIdInNumber = parseInt(req.params.userId);
    const product = req.body;
    const result = await userBusinessLogic.addProduct(userIdInNumber, product);
    res.status(200).json({
      success: true,
      message: 'Order created successfully!',
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'something went wrong!!',
      error: error,
    });
  }
};

// get all order from single user
const getOrdersbyId = async (req: Request, res: Response) => {
  try {
    const userIdInNumber = parseInt(req.params.userId);
    const result = await userBusinessLogic.getOrdersById(userIdInNumber);
    res.status(200).json({
      success: true,
      message: 'Orders found successfully',
      data: result,
    });
  } catch (error: any) {
    res.status(500).josn({
      success: false,
      message: error.message || 'Something went wrong!',
      error: MediaError,
    });
  }
};

// count total price by id
const countTotalPriceById = async (req: Request, res: Response) => {
  try {
    const userIdInNumber = parseInt(req.params.userId);
    const result = await userBusinessLogic.countTotalPriceById(userIdInNumber);
    console.log(result);
    res.status(200).json({
      success: true,
      message: 'Total price found successfully',
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Something went wrong!',
      error: error,
    });
  }
};

export const userControllers = {
  createUser,
  getAllUser,
  getAUserById,
  updateSingleUserById,
  deleteSingleUser,
  addProduct,
  getOrdersbyId,
  countTotalPriceById,
};
