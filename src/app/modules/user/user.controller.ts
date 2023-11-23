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

export const userControllers = {
  createUser,
  getAllUser,
};
