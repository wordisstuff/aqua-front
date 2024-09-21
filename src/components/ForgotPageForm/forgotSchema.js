import * as yup from 'yup';

export const forgotSchema = yup.object().shape({
    email: yup.string().email('Invalid email').required('Email is required'),
});

export const resetPasswordSchema = yup.object().shape({
    password: yup.string().min(6).required('Password is required'),
});
