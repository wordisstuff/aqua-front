import React, { useEffect, useId, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../../redux/auth/operation.js';
import { formValuesSignUp, signUpSchema } from './SignupShema.js';
import { useTranslation } from 'react-i18next';
import WelcomeWrap from '../ShareComponents/WelcomeWrap/WelcomeWrap.jsx';
import { NavLink, useNavigate } from 'react-router-dom';
import { icons } from '../../utils/icons/index.js';
import useCustomForm from '../../helpers/useHooks/useCustomForm.js';
import toast from 'react-hot-toast';
import style from './SignupForm.module.css';
import { GoogleButton } from '../ShareComponents/GoogleButton/GoogleButton.jsx';

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

    const onSubmit = async formData => {
        delete formData.repeatPassword;
        console.log('SignUpForm', formData);

        try {
            dispatch(registerUser(formData)).unwrap();
            reset();
            navigate('/signIn');
        } catch (error) {
            if (error.response?.status === 400) {
                toast.error(
                    'Invalid registration data. Please check your input.',
                );
            } else if (error.response?.status === 409) {
                toast.error(
                    'Email already exists. Please use a different email.',
                );
            } else {
                toast.error('An error occurred. Please try again later.');
            }
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
        <WelcomeWrap
            classNameLogo={style.form}
            classNameWelcom={style.welcomPadding}
        >
            <div className={`${style.formBlock} ${style.formPosition}`}>
                <h2 className={style.formTitle}>{t('signUpPage.signUp')}</h2>

                <form
                    className={style.mainForm}
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <div className={style.fieldThumb}>
                        <label className={style.formLabel} htmlFor={emailId}>
                            {t('signUpPage.email')}
                        </label>
                        <input
                            className={`${style.formInput} ${errors.email && style.errorName}`}
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

                    <div className={style.fieldThumb}>
                        <label className={style.formLabel} htmlFor={passId}>
                            {t('signUpPage.password')}
                        </label>

                        <div className={style.passwordWrapper}>
                            <input
                                className={`${style.formInput} ${errors.password && style.errorName}`}
                                type={openPass ? 'text' : 'password'}
                                name="password"
                                id={passId}
                                placeholder={t('signUpPage.password')}
                                {...register('password')}
                            />
                            <button
                                type="button"
                                onClick={handlePass}
                                className={style.eyeBtn}
                            >
                                <svg className={style.iconEye}>
                                    <use
                                        xlinkHref={
                                            openPass
                                                ? `${icons}#eye`
                                                : `${icons}#eye-off`
                                        }
                                    />
                                </svg>
                            </button>
                        </div>

                        {errors.password && (
                            <span>{t('signUpPage.passwordSpanError')}</span>
                        )}
                    </div>

                    <div className={style.fieldThumb}>
                        <label
                            className={style.formLabel}
                            htmlFor={repeatPassId}
                        >
                            {t('signUpPage.repeatPassword')}
                        </label>

                        <div className={style.passwordWrapper}>
                            <input
                                className={`${style.formInput} ${style.formPhone} ${errors.repeatPassword && style.errorName}`}
                                type={openRepeatPass ? 'text' : 'password'}
                                name="repeatPassword"
                                id={repeatPassId}
                                placeholder={t('signUpPage.repeatPassword')}
                                {...register('repeatPassword')}
                            />
                            <button
                                type="button"
                                onClick={handleRepeatPass}
                                className={style.eyeBtn}
                            >
                                <svg className={style.iconEye}>
                                    <use
                                        xlinkHref={
                                            openRepeatPass
                                                ? `${icons}#eye`
                                                : `${icons}#eye-off`
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
                        <button
                            className={style.btnform}
                            type="submit"
                            disabled={!isDirty || !isValid}
                        >
                            {t('signUpPage.signUp')}
                        </button>
                    </div>
                    <GoogleButton />
                </form>
                <div className={style.haveAccountSignIn}>
                    <p className={style.haveAccountText}>
                        {t('signUpPage.textAlready')}
                    </p>
                    <NavLink to="/signin" className={style.haveAccountForm}>
                        {t('signUpPage.signIn')}
                    </NavLink>
                </div>
            </div>
        </WelcomeWrap>
    );
};

export default SignUpForm;
