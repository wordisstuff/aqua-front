import * as Yup from "yup";


export const formatRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


export const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{6,}$/;


const isValidLatinInput = /^[a-zA-Z\s]+$/;


export const signUpSchema = Yup.object().shape({
    name: Yup.string()
        .matches(isValidLatinInput, "Name can only contain Latin characters")
        .required("Required"),
    email: Yup.string()
        .matches(formatRegex, "Invalid email format")
        .required("Required"),
    password: Yup.string()
        .matches(passwordRegex, "Password must be at least 6 characters long, include one uppercase letter, one number, and one special character")
        .required("Required"),
    repeatPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required("Required")
});


export const formValuesSignUp = {
    name: '',
    email: '',
    password: '',
    repeatPassword: '',
};
