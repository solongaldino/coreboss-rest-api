import * as Joi from "joi";

export const getAdsByIdRequestSchema = Joi.object({
  params: Joi.object({
    adsId: Joi.string().required(),
  }),
}).unknown(true);
