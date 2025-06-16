import Joi from "joi";
import { SUBSCRIPTION } from "../constants/users.js";

export const createUserSchema = Joi.object({
  password: Joi.string().required().messages({
    "any.required": "Set password for user"
  }),
  email: Joi.string().email().required().messages({
    "any.required": "Email is required"
  }),
  subscription: Joi.string()
    .valid(...Object.values(SUBSCRIPTION))
    .default(SUBSCRIPTION.STARTER),
  token: Joi.string()
});


export const loginUserSchema = Joi.object({
  password: Joi.string().required().messages({
    "any.required": "Password is required"
  }),
  email: Joi.string().email().required().messages({
    "any.required": "Email is required"
  })
});