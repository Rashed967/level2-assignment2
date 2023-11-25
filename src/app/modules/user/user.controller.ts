import { Request, Response } from 'express';
import { userBusinessLogic } from './user.service';

// create a user controller logic
const createUser = async (req: Request, res: Response) => {
  try {
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
      message: 'Cannot create a user',
      error: error.message,
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

// get a single user by id controller logic
const getAUserById = async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.userId);
    const exsitingUser = await userBusinessLogic.checkExistingUser(userId);
    if (exsitingUser) {
      const result = await userBusinessLogic.getAUserById(userId);
      res.status(201).json({
        success: true,
        message: 'User found successfully',
        data: result,
      });
    } else {
      res.status(500).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found!',
        },
      });
    }
  } catch (error: any) {
    res.status(500).json({
      success: 'failed',
      message: error.message || 'No found anything',
      error: error,
    });
  }
};
// update user information controller logic
const updateSingleUserById = async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.userId);
    const existingUser = await userBusinessLogic.checkExistingUser(userId);
    if (existingUser) {
      const user = req.body;
      const result = await userBusinessLogic.updateUserById(userId, user);
      res.status(201).json({
        success: true,
        message: 'User info updated successfully',
        data: result,
      });
    } else {
      res.status(500).json({
        success: false,
        message: 'User not found!',
        error: {
          code: 404,
          description: 'User not found!',
        },
      });
    }
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
    const userId = parseInt(req.params.userId);
    const existingUser = await userBusinessLogic.checkExistingUser(userId);
    if (existingUser) {
      const result = await userBusinessLogic.deleteSingleUser(userId);
      res.status(200).json({
        success: true,
        message: 'User deleted successfully!',
        data: null,
      });
    }
    res.status(500).json({
      success: false,
      message: 'User not found',
      error: {
        code: 404,
        description: 'User not found!',
      },
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
    if (result) {
      res.status(200).json({
        success: true,
        message: 'Order created successfully!',
        data: result,
      });
    }
    res.status(500).json({
      success: false,
      message: 'User not found',
      error: {
        code: 404,
        description: 'User not found!',
      },
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'something went wrong!!',
      error: error,
    });
  }
};

// get all order from a single user
const getOrdersbyId = async (req: Request, res: Response) => {
  try {
    const userIdInNumber = parseInt(req.params.userId);
    const result = await userBusinessLogic.getOrdersById(userIdInNumber);
    if (result) {
      res.status(200).json({
        success: true,
        message: 'Orders found successfully',
        data: result,
      });
    } else {
      res.status(500).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found!',
        },
      });
    }
  } catch (error: any) {
    res.status(500).json({
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
    const existingUser =
      await userBusinessLogic.checkExistingUser(userIdInNumber);
    if (existingUser) {
      const result =
        await userBusinessLogic.countTotalPriceById(userIdInNumber);
      res.status(200).json({
        success: true,
        message: 'Total price calculated successfully',
        data: result,
      });
    } else {
      res.status(500).json({
        success: false,
        message: 'User not found',
        error: {
          code: 404,
          description: 'User not found!',
        },
      });
    }
  } catch (error: any) {
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
