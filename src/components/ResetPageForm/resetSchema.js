import Joi from 'joi';
import * as Yup from 'yup';

// export const resetSchema = Joi.object({
//     email: Joi.string().email().required,
// });

const resetSchema = Yup.object({
    email: Yup.string()
        .email('Invalid email format')
        .required('Mail is required')
        .test(
            'is-valid',
            message => `${message.path} is invalid`,
            value =>
                value
                    ? isEmailValidator(value)
                    : new yup.ValidationError('Invalid value'),
        ),
});
