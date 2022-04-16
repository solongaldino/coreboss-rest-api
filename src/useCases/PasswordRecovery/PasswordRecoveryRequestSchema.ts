import * as Joi from "joi";

export const passwordRecoveryRequestSchema = Joi.object({
  body: Joi.object({
    email: Joi.string().email().required(),
  }),
}).unknown(true);
