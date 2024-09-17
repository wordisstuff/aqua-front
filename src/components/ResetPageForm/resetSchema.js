import Joi from 'joi';

export const resetSchema = Joi.object({
    email: Joi.string().email().required,
});
