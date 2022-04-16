import * as Joi from "joi";

export const isAuthenticatedRecoveryRequestSchema = Joi.object({
  body: Joi.object({
    xAccessToken: Joi.string().required(),
  }),
}).unknown(true);
