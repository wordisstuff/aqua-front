import * as Yup from 'yup';

export const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).*$/;

export const signInSchema = Yup.object().shape({
    email: Yup.string()
        .matches(emailRegex, 'Invalid email format')
        .required('Required'),
    password: Yup.string().matches(
        passwordRegex,
        'Password must be at least 6 characters long, include one uppercase letter, one number, and one special character',
    ),
});

export const formValuesSignIn = {
    email: '',
    password: '',
};
