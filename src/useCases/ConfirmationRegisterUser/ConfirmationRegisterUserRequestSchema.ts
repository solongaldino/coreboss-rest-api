import * as Joi from "joi";

const confirmationRegisterUserRequestSchema = Joi.object({
  body: Joi.object({
    token: Joi.string().required(),
  }),
}).unknown(true);

export default confirmationRegisterUserRequestSchema;
