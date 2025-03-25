import Joi from 'joi';

export const joiSchema = Joi.object({
    name: Joi.string()
        .min(2)
        .max(20)
        .required()
        .messages({
            'string.min': 'Name must be at least 2 characters long',
            'string.max': 'Name must not exceed 20 characters',
            'any.required': 'Name is required'
        }),
    surname: Joi.string()
        .min(2)
        .max(20)
        .required()
        .messages({
            'string.min': 'Surname must be at least 2 characters long',
            'string.max': 'Surname must not exceed 20 characters',
            'any.required': 'Surname is required'
        }),

    email: Joi.string()
        .email()
        .required()
        .messages({
            'string.email': 'Please provide a valid email address',
            'any.required': 'Email is required'
        }),
    password: Joi.string()
        .min(6)
        .required()
        .messages({
            'string.min': 'Password must be at least 6 characters long',
            'any.required': 'Password is required'
        })
});