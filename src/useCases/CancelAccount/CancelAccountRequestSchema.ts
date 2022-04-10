import * as Joi from "joi";

const cancelAccountRequestSchema = Joi.object({
  body: Joi.object({
    password: Joi.string().required(),
    userId: Joi.string().required(),
  }),
}).unknown(true);

export default cancelAccountRequestSchema;
