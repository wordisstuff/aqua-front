import * as Yup from 'yup';


export const signUpSchema = Yup.object().shape({
    email: Yup.string()
        .email("Invalid email address") 
        .required("Required"),

    password: Yup.string()
        .min(8, "Password must be at least 8 characters long") 
        .max(64, "Password must be at most 64 characters long") 
        .required("Required"), 

    repeatPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match") 
        .required("Required"), 
});

export const formValuesSignUp = {
    email: '',
    password: '',
    repeatPassword: '',
};
