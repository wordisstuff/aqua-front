import React, { useEffect, useId, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { icons as sprite } from '../../utils/icons/index.js';
import { yupResolver } from '@hookform/resolvers/yup';
import { NavLink } from 'react-router-dom';


import { selectIsLoggedIn } from '../../redux/auth/selectors';
import { logIn, refreshUser } from '../../redux/auth/operation';
import WelcomeWrap from '../ShareComponents/WelcomeWrap'; 
import style from './SignInForm.module.css';
import { signInSchema, formValuesSignIn } from './SigninShema.js';

const SignInForm = () => {
    const { t } = useTranslation(); 
    const [openPassword, setOpenPassword] = useState(false);

    const emailId = useId();
    const passwordId = useId();

    const dispatch = useDispatch();
    const isLoggedIn = useSelector(selectIsLoggedIn);

    const {
        register,
        handleSubmit,
        formState: { errors, isDirty, isValid },
        reset,
    } = useForm({
        defaultValues: formValuesSignIn,
        resolver: yupResolver(signInSchema),
        mode: 'onTouched',
    });

    const togglePasswordVisibility = () => setOpenPassword(prev => !prev);

    const onSubmit = async data => {
        try {
            await dispatch(logIn(data)).unwrap();
            reset();
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        if (errors.password) {
            toast.error(t('signInPage.passwordSpanError'));
        } else if (errors.email) {
            toast.error(t('signInPage.emailSpanError'));
        }
    }, [errors.password, errors.email, t]);

    useEffect(() => {
        if (isLoggedIn) {
            dispatch(refreshUser());
        }
    }, [isLoggedIn, dispatch]);

    return (
        <WelcomeWrap   
        classNameLogo={style.form}
        classNameWelcom={style.welcomPadding}
      >
        <div className={`${style.formBlock} ${style.formPosition}`}>
          <h2 className={style.formTitle}>{t('signInPage.signIn')}</h2>

          <form className={style.mainForm} onSubmit={handleSubmit(onSubmit)}>
            <div className={style.fieldThumb}>
              <label className={style.formLabel} htmlFor={emailId}>
                {t('signInPage.email')}
              </label>
              <input
                className={`${style.formInput} ${errors.email && style.errorName}`}
                type="text"
                name="email"
                id={emailId}
                placeholder={t('signInPage.emailPlaceholder')}
                {...register('email')}
              />
              {errors.email && (
                <span className={style.errorSpan}>
                  {t('signInPage.emailSpanError')}
                </span>
              )}
            </div>

            <div className={style.fieldThumb}>
              <label className={style.formLabel} htmlFor={passwordId}>
                {t('signInPage.password')}
              </label>
              <div className={style.passwordWrapper}>
                <input
                  className={`${style.formInput} ${errors.password && style.errorName}`}
                  type={openPassword ? 'text' : 'password'}
                  name="password"
                  id={passwordId}
                  placeholder={t('signInPage.passwordPlaceholder')}
                  {...register('password')}
                />
                {openPassword ? (
                  <button
                    onClick={togglePasswordVisibility}
                    className={style.eyeBtn}
                  >
                    <svg className={`${style.iconeye}`}>
                      <use xlinkHref={`${sprite}#eye`} />
                    </svg>
                  </button>
                ) : (
                  <button
                    onClick={togglePasswordVisibility}
                    className={style.eyeBtn}
                  >
                    <svg className={`${style.iconeye}`}>
                      <use xlinkHref={`${sprite}#eye-off`} />
                    </svg>
                  </button>
                )}
              </div>

              {errors.password && (
                <span className={style.errorSpan}>
                  {t('signInPage.passwordSpanError')}
                </span>
              )}
            </div>

            <button
              type="submit"
              className={style.btnform}
              disabled={!isDirty || !isValid}
            >
              {t('signInPage.signIn')}
            </button>
          </form>

          <div className={style.haveAccountSignIn}>
            <div className={style.question}>
              <p className={style.haveAccountText}>
                {t('signInPage.dontAccount')}
              </p>{' '}
              <NavLink to="/signup" className={style.haveAccountForm}>
                {t('signInPage.signUp')}
              </NavLink>
            </div>
            <div className={style.question}>
              <p className={style.haveAccountText}>
                {t('signInPage.forgotPassword')}
              </p>{' '}
              <NavLink to="/forgot" className={style.haveAccountForm}>
                {t('signInPage.renew')}
              </NavLink>
            </div>
          </div>
        </div>
        </WelcomeWrap>
    );
};
export default SignInForm;
