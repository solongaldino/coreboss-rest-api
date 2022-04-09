import * as Joi from "joi";

const isRegisteredEmailRequestSchema = Joi.object({
  body: Joi.object({
    email: Joi.string().email().required(),
  }),
}).unknown(true);

export default isRegisteredEmailRequestSchema;
