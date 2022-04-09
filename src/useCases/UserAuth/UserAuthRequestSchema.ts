import * as Joi from "joi";

const userAuthRequestSchema = Joi.object({
  body: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
}).unknown(true);

export default userAuthRequestSchema;
