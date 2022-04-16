import * as Joi from "joi";

export const updatePasswordRequestSchema = Joi.object({
  body: Joi.object({
    password: Joi.string().required(),
    newPassword: Joi.string().required(),
    userId: Joi.string().required(),
  }),
}).unknown(true);
