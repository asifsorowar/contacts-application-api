import Joi from "joi";
import { CREATE_USER } from "./types";

export const createUserSchema = Joi.object<CREATE_USER>({
  email: Joi.string().email().required(),
  name: Joi.string().min(3),
  password: Joi.string().min(3).required(),
});
