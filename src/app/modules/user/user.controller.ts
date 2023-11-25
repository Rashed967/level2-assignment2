import { Request, Response } from 'express';
import { userBusinessLogic } from './user.service';
import { zodProduct, zodUserSchema } from './zod.userSchema.validation';

// create a user controller logic
const createUser = async (req: Request, res: Response) => {
  try {
    const user = req.body;
    const parseData = zodUserSchema.safeParse(user);
    if (!parseData.success) {
      res.status(400).json({
        success: 'failed',
        message: 'Cannot create a user',
        error: parseData.error,
      });
    } else {
      const result = await userBusinessLogic.createUserInDB(user);
      res.status(201).json({
        success: true,
        message: 'User created successfully',
        data: result,
      });
    }
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

// delete user information controller logic
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
      message: error.message || 'something went wrong!!',
      error: error,
    });
  }
};

// add product to order array
const addProduct = async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.userId);
    const product = req.body;
    const parseData = zodProduct.safeParse(product);

    if (parseData.success) {
      const existingUser = await userBusinessLogic.checkExistingUser(userId);
      if (existingUser) {
        const result = await userBusinessLogic.addProduct(userId, product);
        res.status(200).json({
          success: true,
          message: 'Order created successfully!',
          data: null,
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
    } else {
      res.status(400).json({
        success: 'failed',
        message: 'Cannot save product to order',
        error: parseData.error,
      });
    }
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
    const userId = parseInt(req.params.userId);
    const existingUser = await userBusinessLogic.checkExistingUser(userId);
    if (existingUser) {
      const result = await userBusinessLogic.getOrdersById(userId);
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
        data: result[0],
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
