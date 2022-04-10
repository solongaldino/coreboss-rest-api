import * as Joi from "joi";

const passwordRecoveryRequestSchema = Joi.object({
  body: Joi.object({
    email: Joi.string().email().required(),
  }),
}).unknown(true);

export default passwordRecoveryRequestSchema;
