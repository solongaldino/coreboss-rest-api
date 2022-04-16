import * as Joi from "joi";

export const cancelAccountRequestSchema = Joi.object({
  body: Joi.object({
    password: Joi.string().required(),
    userId: Joi.string().required(),
  }),
}).unknown(true);
