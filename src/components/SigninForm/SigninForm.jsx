import React, { useEffect, useId, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { icons as sprite } from '../../utils/icons/index.js';
import { yupResolver } from '@hookform/resolvers/yup';
import GoogleBtn from '../GoogleBtn';
import { NavLink } from 'react-router-dom';
import { selectIsLoggedIn } from '../../redux/auth/selectors'
import { logIn, refreshUser } from '../../redux/auth/operation';
import WrapperWelcome from '../../utils/'; //треба додати 
import style from '../SigninForm/SigninForm.module.css';
import { signInSchema, formValuesSignIn } from '..//SigninForm/SigninShema.js'; 




const SignInForm = () => {
    const { t } = useTranslation(); //багато мов
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

      const handelClickPassword = () => {
        setOpenPassword((prevState) => !prevState);
      };

      const onSubmit = async (data) => {
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
        <WrapperWelcome>
            <div>
                <h2>{t('signInPage.title')}</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <label htmlFor={emailId}>{t('signInPage.email')}</label>
                        <input
                            type="text"
                            name="email"
                            id={emailId}
                            placeholder={t('signInPage.emailPlaceholder')}
                            {...register('email')}
                        />
                        {errors.email && (
                            <span className="error-message">{t('signInPage.emailSpanError')}</span>
                        )}
                    </div>
                    <div className="password-field">
                        <label htmlFor={passwordId}>{t('signInPage.password')}</label>
                        <div className="password-input-wrapper">
                            <input
                                type={openPassword ? 'text' : 'password'}
                                name="password"
                                id={passwordId}
                                placeholder={t('signInPage.passwordPlaceholder')}
                                {...register('password')}
                            />
                            <button type="button" onClick={handelClickPassword} className="password-toggle-btn">
                                <svg className="icon">
                                    <use xlinkHref={`${sprite}#${openPassword ? 'icon-eye' : 'icon-eye-off'}`} /> 
                                </svg>
                            </button>
                        </div>
                        {errors.password && (
                            <span className="error-message">{t('signInPage.passwordSpanError')}</span>
                        )}
                    </div>
                    <button type="submit" className="submit-btn" disabled={!isDirty || !isValid}>
                        {t('signInPage.signIn')}
                    </button>
                </form>
                <GoogleBtn type="In" />
                <div className="extra-links">
                    <div>
                        <p>{t('signInPage.dontAccount')}</p>
                        <NavLink to="/signup">{t('signInPage.signUp')}</NavLink>
                    </div>
                    <div>
                        <p>{t('signInPage.forgotPassword')}</p>
                        <NavLink to="/forgot">{t('signInPage.renew')}</NavLink>
                    </div>
                </div>
            </div>
        </WrapperWelcome>
    );
};
export default SignInForm;
