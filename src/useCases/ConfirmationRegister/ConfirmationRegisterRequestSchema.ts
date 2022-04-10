import * as Joi from "joi";

const confirmationRegisterRequestSchema = Joi.object({
  body: Joi.object({
    token: Joi.string().required(),
  }),
}).unknown(true);

export default confirmationRegisterRequestSchema;
