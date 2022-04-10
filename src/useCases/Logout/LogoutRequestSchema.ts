import * as Joi from "joi";

const logoutRequestSchema = Joi.object({
  body: Joi.object({
    xAccessToken: Joi.string().required(),
    userId: Joi.string().required(),
  }),
}).unknown(true);

export default logoutRequestSchema;
