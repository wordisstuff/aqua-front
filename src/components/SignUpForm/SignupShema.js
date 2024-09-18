import * as Yup from 'yup';

export const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const passwordRegex =
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.* [!@#$ %^&*]).{ 6, }$/;
const passReg = /^(?=.*\d)(?=.*[a-z]).{ 6, }$/;

export const signUpSchema = Yup.object().shape({
    email: Yup.string()
        // .matches(emailRegex, 'Invalid email format')
        .required('Required'),
    password: Yup.string()
        // .matches(
        //     passReg,
        //     'Password must be at least 6 characters long, include one uppercase letter, one number, and one special character',
        // )
        .required('Required'),
    repeatPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required('Required'),
});

export const formValuesSignUp = {
    email: '',
    password: '',
    repeatPassword: '',
};
