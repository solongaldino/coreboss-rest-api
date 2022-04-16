import * as Joi from "joi";

export const logoutRequestSchema = Joi.object({
  body: Joi.object({
    xAccessToken: Joi.string().required(),
    userId: Joi.string().required(),
  }),
}).unknown(true);
