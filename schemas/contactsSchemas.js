import Joi from "joi";

export const createContactSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    phone: Joi.string()
        .pattern(/^\(\d{3}\) \d{3}-\d{4}$/)
        .required()
        .messages({
            "string.pattern.base": "Phone must be in the format (123) 456-7890"
        })
})

export const updateContactSchema = Joi.object({
    name: Joi.string(),
    email: Joi.string().email(),
    phone: Joi.string()
        .pattern(/^\(\d{3}\) \d{3}-\d{4}$/)
        .messages({
            "string.pattern.base": "Phone must be in the format (123) 456-7890"
        })
}).min(1).messages({
    "object.min": "Body must have at least one field"
});

export const updateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required()
});