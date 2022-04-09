import * as Joi from "joi";

const registerUserRequestSchema = Joi.object({
  body: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
}).unknown(true);

export default registerUserRequestSchema;
