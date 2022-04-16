import * as Joi from "joi";

export const confirmPasswordRecoveryRequestSchema = Joi.object({
  body: Joi.object({
    token: Joi.string().required(),
    password: Joi.string().required(),
  }),
}).unknown(true);
