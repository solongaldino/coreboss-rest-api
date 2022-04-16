import * as Joi from "joi";

export const confirmationRegisterRequestSchema = Joi.object({
  body: Joi.object({
    token: Joi.string().required(),
  }),
}).unknown(true);
