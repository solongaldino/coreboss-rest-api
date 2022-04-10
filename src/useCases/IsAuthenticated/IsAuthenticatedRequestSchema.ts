import * as Joi from "joi";

const isAuthenticatedRecoveryRequestSchema = Joi.object({
  body: Joi.object({
    xAccessToken: Joi.string().required(),
  }),
}).unknown(true);

export default isAuthenticatedRecoveryRequestSchema;
