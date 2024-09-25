import * as Yup from 'yup';


export const signInSchema = Yup.object().shape({
    email: Yup.string()
        .email("Invalid email address") 
        .required("Required"), 

    password: Yup.string()
        .min(6, "Password must be at least 8 characters long") 
        .max(64, "Password must be at most 64 characters long")
        .required("Required"), 
});

export const formValuesSignIn = {
    email: '',
    password: '',
};
