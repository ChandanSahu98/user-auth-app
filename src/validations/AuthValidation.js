const Joi = require("joi");

const registerSchema = Joi.object({
    username: Joi.string().alphanum().min(3).max(30).required(),
    email: Joi.string().email().required().messages({
        "string.email": "Please provide a valid email address"
    }),
    password: Joi.string().min(8).required().messages({
        "string.min": "Password must be at least 8 characters long"
    })
});

const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
});

module.exports = {
    registerSchema,
    loginSchema
};
