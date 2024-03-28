import Joi from "joi";

export const statisticSchema = Joi.object({
    type: Joi.string().valid("watch", "goal"),
    autoId: Joi.number().required()
});