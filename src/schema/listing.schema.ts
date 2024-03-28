import Joi from 'joi';

export const listingSchema = Joi.object({
    title: Joi.string().min(3).required(),
    description: Joi.string().required(),
    ownerName: Joi.string().required(),
    phoneNumber: Joi.string().min(6).required(),
});