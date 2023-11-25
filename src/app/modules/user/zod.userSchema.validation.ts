import z from 'zod';
import { TUser } from './user.interface';

export const zodFullNameSchema = z
  .object({
    firstName: z.string(),
    lastName: z.string(),
  })
  .partial();

export const zodAddreesSchema = z
  .object({
    street: z.string(),
    city: z.string(),
    country: z.string(),
  })
  .partial();

export const zodProduct = z
  .object({
    productName: z.string(),
    price: z.number(),
    qauntity: z.number(),
  })
  .partial();

//   .min(3, { message: 'userId wood be at least 3 character' })
//   .max(8, { message: 'userId wood be most 8 character' }),

export const zodUserSchema = z.object<TUser>({
  userId: z.number(),

  username: z
    .string()
    .min(5, { message: 'username wood be at least 5 character and number' })
    .max(10, { message: 'username wood be most 10 character and number' })
    .refine((value) => /^[a-zA-Z0-9]+$/.test(value), {
      message: 'Username must be alphanumeric',
    }),
  password: z
    .string()
    .min(8, { message: 'password length wood be at least 8' })
    .max(15, { message: 'password length wood be most 15' }),
  fullName: zodFullNameSchema.required(),
  age: z.number({
    required_error: 'age field must be required',
    invalid_type_error: 'age must be a number',
  }),
  email: z.string().email({ message: 'input a valid email address' }),
  isActive: z.boolean({
    invalid_type_error: 'isActive field must be a boolean value',
  }),
  hobbies: z.array(z.string(), {
    invalid_type_error: 'hobbies filed must be a array of string',
  }),
  address: zodAddreesSchema.required(),
  orders: z.array(zodProduct).optional(),
});
