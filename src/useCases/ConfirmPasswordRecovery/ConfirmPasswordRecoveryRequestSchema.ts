import * as Joi from "joi";

const confirmPasswordRecoveryRequestSchema = Joi.object({
  body: Joi.object({
    token: Joi.string().required(),
    password: Joi.string().required(),
  }),
}).unknown(true);

export default confirmPasswordRecoveryRequestSchema;
