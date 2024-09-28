import Joi from "joi";
import { Contact } from "./types";

export const createContactSchema = Joi.object<Partial<Contact>>({
  name: Joi.string().min(3).required(),
  email: Joi.string().email().min(3).required(),
  designation: Joi.string().min(3).required(),
  phoneNumber: Joi.string().min(9).required(),
  address: Joi.string().min(5).required(),
});

export const updateContactSchema = Joi.object<Partial<Contact>>({
  name: Joi.string().min(3),
  email: Joi.string().email().min(3),
  designation: Joi.string().min(3),
  phoneNumber: Joi.string().min(9),
  address: Joi.string().min(5),
});
