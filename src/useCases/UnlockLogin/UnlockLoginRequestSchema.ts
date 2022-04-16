import * as Joi from "joi";

export const unlockLoginRequestSchema = Joi.object({
  body: Joi.object({
    token: Joi.string().required(),
  }),
}).unknown(true);
