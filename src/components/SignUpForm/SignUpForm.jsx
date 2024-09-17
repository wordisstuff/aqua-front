import React, { useEffect, useId, useState } from 'react';
import { useDispatch } from 'react-redux';
import { registerUser } from '../../redux/auth/operation.js';
import { formValuesSignUp, signUpSchema } from './SignupShema.js';
import { useTranslation } from 'react-i18next';
import WelcomeWrap from '../ShareComponents/WelcomeWrap/WelcomeWrap.jsx';
import { NavLink, useNavigate } from 'react-router-dom';
import { icons } from '../../utils/icons/index.js';
import useCustomForm from '../../helpers/useHooks/useCustomForm.js';
import toast from 'react-hot-toast';

const SignUpForm = () => {
    const navigate = useNavigate();
    const { t } = useTranslation();
    const [openPass, setOpenPass] = useState(false);
    const [openRepeatPass, setOpenRepeatPass] = useState(false);

    const emailId = useId();
    const passId = useId();
    const repeatPassId = useId();

    const dispatch = useDispatch();

    const {
        register,
        handleSubmit,
        formState: { errors, isDirty, isValid },
        reset,
    } = useCustomForm(formValuesSignUp, signUpSchema);

    console.log('USEFORM', isDirty, isValid);
    const handlePass = () => {
        setOpenPass(prevState => !prevState);
    };

    const handleRepeatPass = () => {
        setOpenRepeatPass(prevState => !prevState);
    };

    const onSubmit = formData => {
        delete formData.repeatPassword;
        console.log('SignUpForm', formData);
        try {
            dispatch(registerUser(formData));
            reset();
            navigate('/');
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        if (errors.password) {
            toast.error(t('signUpPage.passwordSpanError'));
        } else if (errors.email) {
            toast.error(t('signUpPage.emailSpanError'));
        } else if (errors.name) {
            toast.error(t('signUpPage.nameSpanError'));
        } else if (errors.repeatPassword) {
            toast.error(t('signUpPage.repeatPasswordpanErrorTwo'));
        }
    }, [errors, t]);

    return (
        <WelcomeWrap>
            <div>
                <h2>{t('signUpPage.signUp')}</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <label htmlFor={emailId}>{t('signUpPage.email')}</label>
                        <input
                            type="email"
                            name="email"
                            id={emailId}
                            placeholder={t('signUpPage.email')}
                            {...register('email')}
                        />
                        {errors.email && (
                            <span>{t('signUpPage.emailSpanError')}</span>
                        )}
                    </div>

                    <div>
                        <label htmlFor={passId}>
                            {t('signUpPage.password')}
                        </label>
                        <div>
                            <input
                                type={openPass ? 'text' : 'password'}
                                name="password"
                                id={passId}
                                placeholder={t('signUpPage.password')}
                                {...register('password')}
                            />
                            <button type="button" onClick={handlePass}>
                                <svg>
                                    <use
                                        xlinkHref={
                                            openPass ? '#eye' : '#eye-off'
                                        }
                                    />
                                </svg>
                            </button>
                        </div>
                        {errors.password && (
                            <span>{t('signUpPage.passwordSpanError')}</span>
                        )}
                    </div>

                    <div>
                        <label htmlFor={repeatPassId}>
                            {t('signUpPage.repeatPassword')}
                        </label>
                        <div>
                            <input
                                type={openRepeatPass ? 'text' : 'password'}
                                name="repeatPassword"
                                id={repeatPassId}
                                placeholder={t('signUpPage.repeatPassword')}
                                {...register('repeatPassword')}
                            />
                            <button type="button" onClick={handleRepeatPass}>
                                <svg>
                                    <use
                                        xlinkHref={
                                            openRepeatPass ? '#eye' : '#eye-off'
                                        }
                                    />
                                </svg>
                            </button>
                        </div>
                        {errors.repeatPassword && (
                            <span>
                                {t('signUpPage.repeatPasswordpanError')}
                            </span>
                        )}
                    </div>

                    <div>
                        <button type="submit" disabled={!isDirty || !isValid}>
                            {t('signUpPage.signUp')}
                        </button>
                    </div>
                </form>

                <div>
                    <p>{t('signUpPage.textAlready')}</p>
                    <NavLink to="/signin">{t('signUpPage.signIn')}</NavLink>
                </div>
            </div>
        </WelcomeWrap>
    );
};

export default SignUpForm;
