import * as Joi from "joi";

const unlockLoginRequestSchema = Joi.object({
  body: Joi.object({
    token: Joi.string().required(),
  }),
}).unknown(true);

export default unlockLoginRequestSchema;
