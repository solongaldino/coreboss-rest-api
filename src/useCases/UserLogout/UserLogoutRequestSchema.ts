import * as Joi from "joi";

const userLogoutRequestSchema = Joi.object({
  body: Joi.object({
    xAccessToken: Joi.string().required(),
    userId: Joi.string().required(),
  }),
}).unknown(true);

export default userLogoutRequestSchema;
