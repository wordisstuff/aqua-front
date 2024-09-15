import React, { useEffect, useId, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { registerUser } from '../../redux/auth/operation';
import { formValuesSignUp, signUpSchema } from './SignupShema.js';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next'; 
import WelcomeWrap from '../ShareComponents/WelcomeWrap';
import { NavLink } from 'react-router-dom'; 
import { icons as sprite } from '..//../utils/icons/index/js';


const SignUpForm = () => {
    const { t } = useTranslation();
    const [openPassword, setOpenPassword] = useState(false);
    const [openRepeatPassword, setOpenRepeatPassword] = useState(false);

    const nameId = useId();
    const emailId = useId();
    const passwordId = useId();
    const repeatPasswordId = useId();

    const dispatch = useDispatch();

    const {
        register,
        handleSubmit,
        formState: { errors, isDirty, isValid },
        reset,
    } = useForm({
        defaultValues: formValuesSignUp,
        resolver: yupResolver(signUpSchema),
        mode: 'onTouched',
    });

    const handleClickPassword = () => {
        setOpenPassword(prevState => !prevState);
    };

    const handleClickRepeatPassword = () => {
        setOpenRepeatPassword(prevState => !prevState);
    };

    const onSubmit = (data) => {
        const userData = { ...data };
        delete userData.repeatPassword;

        try {
            dispatch(registerUser(userData));
            reset();
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
                        <label htmlFor={nameId}>{t('signUpPage.name')}</label>
                        <input
                            type="text"
                            name="name"
                            id={nameId}
                            placeholder={t('signUpPage.name')}
                            {...register('name')}
                        />
                        {errors.name && (
                            <span>
                                {t('signUpPage.nameSpanError')}
                            </span>
                        )}
                    </div>

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
                            <span>
                                {t('signUpPage.emailSpanError')}
                            </span>
                        )}
                    </div>

                    <div>
                        <label htmlFor={passwordId}>{t('signUpPage.password')}</label>
                        <div>
                            <input
                                type={openPassword ? 'text' : 'password'}
                                name="password"
                                id={passwordId}
                                placeholder={t('signUpPage.password')}
                                {...register('password')}
                            />
                            <button
                                type="button"
                                onClick={handleClickPassword}
                            >
                                <svg>
                                    <use xlinkHref={openPassword ? '#eye' : '#eye-off'} />
                                </svg>
                            </button>
                        </div>
                        {errors.password && (
                            <span>
                                {t('signUpPage.passwordSpanError')}
                            </span>
                        )}
                    </div>

                    <div>
                        <label htmlFor={repeatPasswordId}>{t('signUpPage.repeatPassword')}</label>
                        <div>
                            <input
                                type={openRepeatPassword ? 'text' : 'password'}
                                name="repeatPassword"
                                id={repeatPasswordId}
                                placeholder={t('signUpPage.repeatPassword')}
                                {...register('repeatPassword')}
                            />
                            <button
                                type="button"
                                onClick={handleClickRepeatPassword}
                            >
                                <svg>
                                    <use xlinkHref={openRepeatPassword ? '#eye' : '#eye-off'} />
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
                        <button
                            type="submit"
                            disabled={!isDirty || !isValid}
                        >
                            {t('signUpPage.signUp')}
                        </button>
                    </div>
                </form>

                <div>
                    <p>
                        {t('signUpPage.textAlready')}
                    </p>
                    <NavLink to="/signin">
                        {t('signUpPage.signIn')}
                    </NavLink>
                </div>
            </div>
        </WelcomeWrap>
    );
};

export default SignUpForm;
