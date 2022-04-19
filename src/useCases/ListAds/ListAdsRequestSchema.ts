import * as Joi from "joi";

export const listAdsRequestSchema = Joi.object({
  query: Joi.object({
    offset: Joi.number(),
    size: Joi.number(),
  }),
}).unknown(true);
